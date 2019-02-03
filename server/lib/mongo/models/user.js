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
 */

const userSchemaDef = {
    username: {
        type: String,
        required: function () {
            return !this.email
        },
        maxlength: [32, 'Too long value for username. The max length allowed for this field is {MAXLENGTH} characters'],
        validate: {
            validator: (value) => /^[a-zA-Z]+[a-zA-Z0-9_-]*$/.test(value),
            message: (props) => `${props.value} is not a valid username. It must start with a letter and it can only have alphanumeric characters and the symbol - and _`
        }
    },

    email: {
        type: String,
        required: function () {
            return !this.username
        },
        validate: {
            validator: (value) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-zA-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/.test(value),
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
            paths: { email: { message: "You must provide an email" } }
        })
    }
}

UserSchema.statics.findByUsernameOrEmail = async function (username, email, includeSensitiveProperties = false) {
    if (username || email) {
        let user
        if (username) {
            user = await this.findOneByFilter({ username }, includeSensitiveProperties)
        }
        if (!user && email) {
            user = await this.findOneByFilter({ email }, includeSensitiveProperties)
        }
        return user
    }
    else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide, at least, an username or an email"
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

        const foundUser = await this.findByUsernameOrEmail(user.username, user.email)
        if (!foundUser) {
            debug("New user trying to sign up")
            user = await this.create(user)
            user = user.toObject({ flattenMaps: true, versionKey: false })
            return await this.removeSensitiveProperties(user)
        }
        else {
            let paths = {};
            if (user.username && user.username === foundUser.username) {
                paths.username = { message: "There is already a registered user with this username" }
            }
            if (user.email && user.email === foundUser.email) {
                paths.email = { message: "There is already a registered user with this email" }
            }
            throw await createCustomError({
                name: "ValidationError",
                message: "There is already a registered user with that username or email",
                paths
            })
        }
    } else {
        let message, paths
        if (!user) {
            message = "User must not be null"
        } else if (!user.password) {
            message = "You must provide a password"
            paths = { password: { message: "You must provide a password" } }
        }
        throw await createCustomError({
            name: "ValidationError",
            message,
            paths
        })
    }
}

UserSchema.statics.signIn = async function (username, email, password) {
    if ((username || email) && password) {
        let user = await this.findByUsernameOrEmail(username, email, true)
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
        let paths = {}
        if (!username) {
            paths.username = { message: "The username must not be null if you don't provide an email" }
        }
        if (!email) {
            paths.email = { message: "The email must not be null if you don't provide an user" }
        }
        if (!password) {
            paths.password = { message: "You must provide a password" }
        }
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide, at least, an username or an email and a password",
            paths
        })
    }
}

mongoose.model('User', UserSchema)
debug('User model compiled')