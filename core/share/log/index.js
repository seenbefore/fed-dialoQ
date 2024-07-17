class Log {
    static info(message, ...args) {
        console.log(`\x1b[34m[info]\x1b[0m: ${message}`, ...args)
        console.log('😊')
    }

    static error(message, ...args) {
        console.error(`\x1b[31m[error]\x1b[0m: ${message}`, ...args)
        console.log('😭')
    }

    static warn(message, ...args) {
        console.warn(`\x1b[33m[warn]\x1b[0m: ${message}`, ...args)
        console.log('😊')
    }

    static success(message, ...args) {
        console.log(`\x1b[32m[success]\x1b[0m: ${message}`, ...args)
        console.log('😊')
    }
}

module.exports = {
    Log,
}
