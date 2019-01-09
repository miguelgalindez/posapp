const mongoose, { Schema } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
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
        unique: true,
        sparse: true,
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
        required: true,
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
    }
})

UserSchema.query.byUsername = function (username) {
    return this.where({
        username: new RegExp(username, 'i')
    })
} 
// const user = await User.find().byUsername('asd@asd.asd')
// const user = await User.findOne().byUsername('asd@asd.asd')

mongoose.model('User', UserSchema)