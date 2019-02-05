const validateRequired = pathName => pathValue => {
    if(!pathValue) return pathName 
        ? `The field ${pathName} is required`
        : "This field is required"
    return null
}

export default {
    validateRequired
}