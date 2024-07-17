class Log {
    static info(message, ...args) {
        console.log(`\x1b[34m[info]\x1b[0m: ${message}`, ...args)
    }

    static error(message, ...args) {
        console.error(`\x1b[31m[error]\x1b[0m: ${message}`, ...args)
    }

    static warn(message, ...args) {
        console.warn(`\x1b[33m[warn]\x1b[0m: ${message}`, ...args)
    }

    static success(message, ...args) {
        console.log(`\x1b[32m[success]\x1b[0m: ${message}`, ...args)
    }
}

module.exports = {
    Log,
}
