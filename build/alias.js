const path = require('path')
const fs = require('fs')

const entryPath = path.join(__dirname, '../src/entry')
const setAlias = config => {
    const dirs = fs.readdirSync(entryPath)
    dirs.forEach(dir => {
        if (!dir.startsWith('.')) {
            config.resolve.alias.set(`@${dir}`, path.resolve(__dirname, `../src/entry/${dir}`))
        }
    })
}

module.exports = {
    setAlias,
}
