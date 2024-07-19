const { join } = require('path')
const { existsSync, mkdirSync } = require('fs')
const { Log } = require('../../share/log/index.js')
const { extractFromRemote, defaultRemoteUrl } = require('../../utils/gitHelpers.js')
const { baseRootPath, temporaryPath } = require('../../utils/path.js')
const { inspectConfig } = require('./inspectConfig.js')
const { removeDirSync } = require('../../utils/file')
const { validateGitEmail } = require('../../utils/validate')

validateGitEmail().then(async email => {
    /* 获取脚本的参数 */
    const args = process.argv.slice(2)
    const [force] = args

    const cover = async () => {
        await extractFromRemote(defaultRemoteUrl, 'master', 'core', baseRootPath)
    }

    /* 如果版本大于或者等于版本不修改配置文件。 */
    let updateConfig = true
    /* npm run update:core force */
    /* 不管版本强制更新core文件夹 */
    if (force === 'force') {
        Log.info('开始强制覆盖core文件夹。')
        await cover()
        Log.success('core文件夹覆盖成功')
    } else {
        /* 创建一个临时文件用于处理内容 */
        if (!existsSync(temporaryPath)) {
            mkdirSync(temporaryPath)
        }
        /* 拉取config配置文件 */
        await extractFromRemote(defaultRemoteUrl, 'master', 'core/config.json', temporaryPath)
        Log.info('配置文件拉取成功，开始对比版本')
        /* remote version */
        const { version } = require(join(temporaryPath, 'core/config.json'))
        /* local version */
        const { version: localVersion } = require(join(baseRootPath, 'core/config.json'))
        /* 版本格式为 x.x.x x 为数字，所以可以直接使用运算符对比。 */
        if (version === localVersion) {
            Log.warn(`版本相同，无需更新。当前版本：${localVersion}。如需强制更新可执行：npm run update:core force`)
            updateConfig = false
        } else if (localVersion > version) {
            // 可能修改了config的version？或者远程的config不对
            Log.warn(`本地版本大于远程版本，无法更新。本地版本：${localVersion}，远程版本：${version}`)
            updateConfig = false
        } else {
            Log.info('开始更新core文件内容，请稍等')
            await cover()
            Log.success('core文件更新成功')
        }
    }
    if (updateConfig) {
        await inspectConfig()
    }
    /* 删除临时文件夹 */
    if (existsSync(temporaryPath)) {
        await removeDirSync(temporaryPath)
    }
})
