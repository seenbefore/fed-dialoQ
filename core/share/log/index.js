class Log {
    static info(message, ...args) {
        console.log(`[info]: ${message}`, ...args)
    }

    static error(message, ...args) {
        console.error(`[error]: ${message}`, ...args)
    }

    static warn(message, ...args) {
        console.warn(`[warn]: ${message}`, ...args)
    }

    static success(message, ...args) {
        console.log(`[success]: ${message}`, ...args)
    }
}

module.exports = {
    Log,
}
