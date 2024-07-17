const path = require('path')
const fs = require('fs')
const { baseRootPath } = require('../utils/baseRootPath')

const entryPath = path.join(baseRootPath, 'src/entry')
const setAlias = config => {
    const dirs = fs.readdirSync(entryPath)
    dirs.forEach(dir => {
        if (!dir.startsWith('.')) {
            config.resolve.alias.set(`@${dir}`, path.resolve(baseRootPath, `src/entry/${dir}`))
        }
    })

    /* 设置core的别名 */
    config.resolve.alias.set('@@core', path.resolve(baseRootPath, 'core'))
}

module.exports = {
    setAlias,
}
