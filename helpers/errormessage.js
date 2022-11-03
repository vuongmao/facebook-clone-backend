exports.invalidMessageError = (fieldname) => {
    return {message: `Invalid ${fieldname}.`}
}

exports.existMessageError = (fieldname) => {
    return {message: `This ${fieldname} already exist.`};
}

exports.lengthMessageError = (fieldname, min, max) => {
    return {message: `${fieldname} must between ${min} and ${max} characters`}
}