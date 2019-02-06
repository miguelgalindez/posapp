const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const { createCustomError } = require('../../error-crafter')
const debug = require('debug')(`server:${__filename}`)

/**
 * TODO: Find out how to make unique constraint work properly
 * TODO: Define indexes on email and username
 * TODO: Remove needless debug messages
 * TODO: Implement password recovery considering oauth redirection
 * TODO: Remove "User not found" message when the user are trying 
 *          to sign in
 */

const userPattern = /^[a-zA-Z]+[a-zA-Z0-9_-]*$/
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-zA-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/

const userSchemaDef = {
    username: {
        type: String,
        required: function () {
            return !this.email
        },
        maxlength: [32, 'Too long value for username. The max length allowed for this field is {MAXLENGTH} characters'],
        validate: {
            validator: (value) => userPattern.test(value),
            message: (props) => `${props.value} is not a valid username. It must start with a letter and it can only have alphanumeric characters and the symbol - and _`
        }
    },

    email: {
        type: String,
        required: function () {
            return !this.username
        },
        validate: {
            validator: (value) => emailPattern.test(value),
            message: (props) => `${props.value} is not a valid email.`
        }
    },

    password: {
        type: String,
        required: function () {
            return !this.oauthProvider
        },
        minlength: [6, 'Too short password. It must be, at least, {MINLENGTH} characters in length.'],
        validate: {
            validator: function (value) {
                const differentFromUsername = !value || !this.username || this.username.toLowerCase() !== value.toLowerCase()
                const differentFromEmail = !value || !this.email || this.email.toLowerCase() !== value.toLowerCase()
                return differentFromUsername && differentFromEmail
            },
            message: () => "The password can't be the same as the username nor the email"
        },
        select: false
    },

    oauthProvider: {
        type: String,
        required: function () {
            return !this.password
        }
    },

    roles: [String],

    name: {
        type: String,
        required: true,
        minlength: [3, 'Too short name. It must be, at least, {MINLENGTH} characters in length'],
        maxlength: [64, 'Too long name. It must be, at most, {MAXLENGTH} characters in length']
    },

    photo: String
}

const sensitiveProperties = Object.keys(userSchemaDef).reduce((accumulator, property) => {
    if (userSchemaDef[property].select === false) {
        accumulator.push(property)
    }
    return accumulator
}, ["_id", "__v"])

const stringToIncludeSensitiveProperties = sensitiveProperties.reduce((string, property) => {
    return string.concat(`+${property} `)
}, "")


const UserSchema = new Schema(userSchemaDef)

UserSchema.statics.castUserID = async function (user) {
    if (user && user._id) {
        user.id = await user._id.toHexString()
        await delete user._id
    }
    return user
}

UserSchema.statics.removeSensitiveProperties = async function (user) {
    if (user) {
        // TODO: Test if castUserID method modify the same object 
        await this.castUserID(user)
        await sensitiveProperties.forEach(sensitiveProperty => {
            delete user[sensitiveProperty]
        })
    }
    return user
}

UserSchema.statics.findOneByFilter = async function (filter, includeSensitiveProperties = false) {
    if (filter && typeof filter === 'object') {
        let user = await this.findOne(filter).select(includeSensitiveProperties ? stringToIncludeSensitiveProperties : undefined).lean()
        return await this.castUserID(user)
    } else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide a filter for the query"
        })
    }
}

UserSchema.statics.findByEmail = async function (email, includeSensitiveProperties = false) {
    if (email) {
        return await this.findOneByFilter({ email }, includeSensitiveProperties)
    } else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide an email",
            errors: { email: { message: "You must provide an email" } }
        })
    }
}

UserSchema.statics.findByUsername = async function (username, includeSensitiveProperties = false) {
    if (username) {
        return await this.findOneByFilter({ username }, includeSensitiveProperties)
    } else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide an username",
            errors: { username: { message: "You must provide an username" } }
        })
    }
}


UserSchema.statics.findByUsernameOrEmail = async function (usernameOrEmail, includeSensitiveProperties = false) {
    const isValidEmail = emailPattern.test(usernameOrEmail)
    const isValidUsername = userPattern.test(usernameOrEmail)

    if (isValidEmail || isValidUsername) {
        let user
        if (isValidEmail) {
            user = await this.findOneByFilter({ email: usernameOrEmail }, includeSensitiveProperties)
        } else {
            user = await this.findOneByFilter({ username: usernameOrEmail }, includeSensitiveProperties)
        }
        return user
    }
    else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide a valid username or email",
            errors: { usernameOrEmail: { message: "You must provide a valid username or email" } }
        })
    }
}

UserSchema.statics.hashPassword = async function (password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await this.schema.statics.hashPassword(this.password)
    next()
})

UserSchema.statics.signWithOAuth = async function (user) {
    if (user) {
        debug("Creating new user who accessed through OAuth")
        user = await this.findOneAndUpdate(
            { email: user.email },
            { ...user },
            { upsert: true, runValidators: true, new: true }).lean()

        return await this.removeSensitiveProperties(user)
    } else {
        throw new Error("User must not be null")
    }
}

UserSchema.statics.signUp = async function (user) {
    if (user && user.password) {
        const foundUser = await this.findByUsernameOrEmail(user.username) || await this.findByUsernameOrEmail(user.email)
        if (!foundUser) {
            debug("New user trying to sign up")
            user = await this.create(user)
            user = user.toObject({ flattenMaps: true, versionKey: false })
            return await this.removeSensitiveProperties(user)
        }
        else {
            let errors = {};
            if (user.username && user.username === foundUser.username) {
                errors.username = { message: "There is already a registered user with this username" }
            }
            if (user.email && user.email === foundUser.email) {
                errors.email = { message: "There is already a registered user with this email" }
            }
            throw await createCustomError({
                name: "ValidationError",
                message: "There is already a registered user with that username or email",
                errors
            })
        }
    } else {
        let message, errors
        if (!user) {
            message = "User must not be null"
        } else if (!user.password) {
            message = "You must provide a password"
            errors = { password: { message: "You must provide a password" } }
        }
        throw await createCustomError({
            name: "ValidationError",
            message,
            errors
        })
    }
}

UserSchema.statics.signIn = async function (usernameOrEmail, password) {
    if (usernameOrEmail && password) {
        let user = await this.findByUsernameOrEmail(usernameOrEmail, true)
        if (user) {
            debug("Trying to authenticate an user against their password")
            const match = await bcrypt.compare(password, user.password)
            return match ? this.removeSensitiveProperties(user) : null
        }
        else {
            throw new Error("User not found")
        }
    }
    else {
        let errors = {}
        if (!usernameOrEmail) {
            errors.usernameOrEmail = { message: "You must provide a valid username or email" }
        }

        if (!password) {
            errors.password = { message: "You must provide a password" }
        }
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide, at least, an username/email and a password",
            errors
        })
    }
}

mongoose.model('User', UserSchema)
debug('User model compiled')