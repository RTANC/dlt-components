export function passwordValidator (password) {
    const reg = new RegExp('^([A-Za-z0-9_+-]){8,}$')
    return reg.test(password)
}

export function emailValidator (password) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(password)
}