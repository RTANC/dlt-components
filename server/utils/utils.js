exports.bool2bit = (bool) => {
    return bool ? 1 : 0
}

exports.str2bit = (str) => {
    return str === 'true' ? 1 : 0
}