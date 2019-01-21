const mongoose = require('mongoose')
const { Schema } = mongoose
const { createCustomError } = require('../../error-crafter')
const debug = require('debug')(`server:${__filename}`)

const UserSchema = new Schema({
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
        maxlength: [24, 'Too long password. It must be, at most, 24 characters in length.'],
        validate: {
            validator: function (value) {
                return value != this.username && value !== this.email
            },
            message: () => "The password can't be the same as the username nor the email"
        }
    },

    roles: [String],

    name: {
        type: String,
        required: true,
        minlength: [3, 'Too short name. It must be, at least, 3 characters in length'],
        maxlength: [64, 'Too long name. It must be, at most, 64 characters in length']
    },
    photo: String
})

UserSchema.query.byUsername = async function (username) {
    return await this.where({
        username: new RegExp(username, 'i')
    })
}

UserSchema.statics.findByEmail = async function (email) {
    if (email) {
        return await this.findOne({
            email: new RegExp(email, 'i')
        })
    } else {
        return null
    }
}

UserSchema.statics.findByUsernameOrEmail = async function (username, email) {
    if (username || email) {
        return await this.findOne({
            $or: [
                { username },
                { email }
            ]
        })
    } else {
        throw await createCustomError({
            name: "ValidationError",
            message: "You must provide, at least, an username or an email"
        })
    }
}

UserSchema.statics.signUp = async function (user) {
    if (user) {

        const u = await this.findByUsernameOrEmail(user.username, user.email)
        if (!u) {
            return await this.create(user)
        } else {
            let errors = {};
            if (user.username && user.username === u.username) {
                errors.username = { message: "Duplicated username" }
            }
            if (user.email && user.email === u.email) {
                errors.email = { message: "Duplicated email" }
            }

            throw await createCustomError({
                name: "ValidationError",
                message: "There is already a registered user with that username or email",
                errors
            })
        }
    } else {
        // TODO - Improve this error throwing - try to follow the mongoose standard
        throw new Error('User must be not null')
    }
}

UserSchema.statics.signIn = async function (user) {
    if (user && (user.username || user.email)) {
        try {
            let u = await this.findByUsernameOrEmail(user.username, user.email)
            if (u) {
                // We have to check if the user is trying to signing in through OAuth
                if (user.signedInWithOauth) {
                    return user.email == u.email ? u : null
                }
                // TODO - Password hashing
                return user.password == u.password ? u : null
            }
        } catch (error) {
            debug(error)
            // TODO - Improve this error throwing - try to follow the mongoose standard
            throw new Error(error)
        }
    }
    return null;
}

mongoose.model('User', UserSchema)
debug('User model compiled')