
const validateUsername = email => username => {
    if (username) {
        const regexp = /^[a-zA-Z]+[a-zA-Z0-9_-]*$/
        if (username.length > 24) return "Too long value for username. The max length allowed for this field is 24 characters"
        if (!regexp.test(username)) return "Invalid username. It must start with a letter and it can only have alphanumeric characters and the symbol - and _"

        // If there's no email, this field becomes required
    } else if (!email) {
        return "Username required"
    }
    return null
}

const validateEmail = username => email => {
    if (email) {
        const regexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-zA-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/
        if (!regexp.test(email)) return "Invalid email"
        // If there's no username, this field becomes required
    } else if (!username) {
        return "Email required"
    }
    return null
}

const validateUsernameOrEmail = usernameOrEmail => {
    const emailError=validateEmail(null)(usernameOrEmail)
    if(emailError){
        return validateUsername(null)(usernameOrEmail)
    }
    return null
}

const validatePassword = (username, email) => password => {
    if (password) {
        if (password.length < 6) return "Too short password. It must be, at least, 6 characters in length."
        if ((username && username.toLowerCase() === password.toLowerCase()) || (email && email.toLowerCase() === password.toLowerCase())) {
            return "The password can't be the same as the username nor the email"
        }
    } else {
        return "Password required"
    }
}

const validateName = name => {
    if (name) {
        if (name.length < 3) return "Too short name. It must be, at least, 3 characters in length"
        if (name.length > 64) return "Too long name. It must be, at most, 64 characters in length"
    } else {
        return "Full name required"
    }
}

export default {
    validateUsername,
    validateEmail,
    validateUsernameOrEmail,
    validatePassword,
    validateName
}