const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const { createCustomError } = require('../../error-crafter')
const debug = require('debug')(`server:${__filename}`)

/**
 * TODO: Find out how to make unique constraint work properly
 * TODO: Define indexes on email and username
 * TODO: Remove needless debug messages
 * TODO: Find out the best approach to follow for aouth signing
 */

const userSchemaDef = {
    username: {
        type: String,
        required: function () {
            return !this.email
        },
        maxlength: [24, 'Too long value for username. The max length allowed for this field is 24 characters'],
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
        minlength: [6, 'Too short password. It must be, at least, 6 characters in length.'],
        validate: {
            validator: function (value) {
                return value != this.username && value !== this.email
            },
            message: () => "The password can't be the same as the username nor the email"
        },
        select: false
    },

    roles: [String],

    name: {
        type: String,
        required: true,
        minlength: [3, 'Too short name. It must be, at least, 3 characters in length'],
        maxlength: [64, 'Too long name. It must be, at most, 64 characters in length']
    },
    photo: String
}

const sensitiveProperties = Object.keys(userSchemaDef).reduce((properties, property) => {
    if (userSchemaDef[property].select === false) {
        properties.push(property)
    }
    return properties
}, ["_id", "__v"])

const stringToIncludeSensitiveProperties = sensitiveProperties.reduce((string, property) => {
    return string.concat(`+${property} `)
}, "")

const UserSchema = new Schema(userSchemaDef)


UserSchema.statics.findByEmail = async function (email, includeSensitiveProperties = false) {
    if (email) {
        return await this.findOne({
            email: new RegExp(email, 'i')
        }).select(includeSensitiveProperties ? stringToIncludeSensitiveProperties : undefined).lean()
    } else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide an email"
        })
    }
}

UserSchema.statics.findByUsernameOrEmail = async function (username, email, includeSensitiveProperties = false) {
    if (username || email) {
        return await this.findOne().or([
            { username },
            { email }
        ]).select(includeSensitiveProperties ? stringToIncludeSensitiveProperties : undefined).lean()
    } else {
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
        // TODO: check if mongoose saves additional properties from those defined by the schema
        debug("Creating new user who accessed through OAuth")
        user = await this.findOneAndUpdate({ email: user.email }, { ...user }, { upsert: true, runValidators: true, new: true }).lean()        
        return await removeSensitiveProperties(user)
    } else {
        throw new Error("User must not be null")
    }
}

UserSchema.statics.signUp = async function (user) {
    if (user) {
        const foundUser = await this.findByUsernameOrEmail(user.username, user.email)
        if (!foundUser) {
            debug("New user trying to sign up")
            user = await this.create(user)
            return await removeSensitiveProperties(user)
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
        throw await createCustomError({
            name: "ValidationError",
            message: "User must not be null"
        })
    }
}

UserSchema.statics.signIn = async function (username, email, password) {
    if ((username || email) && password) {
        let user = await this.findByUsernameOrEmail(username, email, true)
        if (user) {
            debug("Trying to authenticate an user against their password")
            if (user.password) {
                const match = await bcrypt.compare(password, user.password)
                return match ? removeSensitiveProperties(user) : null
            } else {
                throw await createCustomError({
                    name: "UserWithoutPassword",
                    message: "Your account doesn't have a password. You must authenticate through OAuth",
                    // TODO: add oauthProvider property (here and in the app file)
                })
            }
        }
        else {
            throw new Error("User not found")
        }
    }
    else {
        let errors = {}
        if (!username) {
            errors.username = "The username must not be null if you don't provide an email"
        }
        if (!email) {
            errors.email = "The email must not be null if you don't provide an user"
        }
        if (!password) {
            errors.password = "You must provide a password"
        }
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide, at least, an username or an email and a password",
            errors
        })
    }
}

async function removeSensitiveProperties(user) {
    if (user) {
        user.id = await user._id.toHexString()
        debug("Deleting sensitive properties ", sensitiveProperties)
        await sensitiveProperties.forEach(sensitiveProperty => {
            delete user[sensitiveProperty]
        })
    }
    return user
}

mongoose.model('User', UserSchema)
debug('User model compiled')