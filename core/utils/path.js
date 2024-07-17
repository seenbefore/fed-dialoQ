const { resolve } = require('path')
const path = require('path')

const baseRootPath = resolve(__dirname, '../../')

const temporaryPath = path.join(baseRootPath, '.t')

module.exports = {
    baseRootPath,
    temporaryPath,
}
