const { join } = require('path')
const { Log } = require('../../share/log/index.js')
const { extractFromRemote, defaultRemoteUrl } = require('../../utils/gitHelpers.js')
const { baseRootPath, temporaryPath } = require('../../utils/path.js')
const { patchPackageJson } = require('./utils/patchPackageJson')

const inspectPackageJson = async () => {
    Log.info('开始检查 package.json 文件')
    Log.info('拉取远端 package.json 文件')
    await extractFromRemote(defaultRemoteUrl, 'master', 'package.json', temporaryPath)
    const remotePackage = require(join(temporaryPath, 'package.json'))
    const localPackage = require(join(baseRootPath, 'package.json'))
    await patchPackageJson(remotePackage, localPackage)
}

const inspectConfig = async () => {
    Log.info('开始检查配置文件')
    await inspectPackageJson()
}

module.exports = {
    inspectPackageJson,
    inspectConfig,
}
