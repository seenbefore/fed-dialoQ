/**
 * 获取远程的指定文件内容
 * npm run load <sourceUrl> [targetUrl]
 * examples:
 * # 把远程的 src/components 拉取到 src/abc/
 * npm run load src/components src/abc
 * @return {Promise<void>}
 */
const { extractFromRemote, defaultRemoteUrl } = require('../../utils/gitHelpers')
const { Log } = require('../../share/log')
const { baseRootPath } = require('../../utils/path')
const { join } = require('path')
const { existsSync, mkdirSync } = require('fs')
const { validateGitEmail } = require('../../utils/validate')

validateGitEmail().then(async email => {
    /* 获取脚本的参数 */
    const args = process.argv.slice(2)
    const [sourceUrl, targetUrl] = args

    if (!sourceUrl) {
        Log.error(`请输入远程文件的url。具体参考仓库：${defaultRemoteUrl}`)
        process.exit(1)
        return
    }

    const writeUrl = targetUrl ? join(baseRootPath, targetUrl) : baseRootPath

    Log.info(`开始从${defaultRemoteUrl}拉取${sourceUrl}文件到${writeUrl}`)

    /* 检查目标文件夹是否存在 */
    if (!existsSync(writeUrl)) {
        mkdirSync(writeUrl)
    }

    /* 拉取远程文件 */
    await extractFromRemote(defaultRemoteUrl, 'master', sourceUrl, writeUrl)

    Log.success('文件拉取成功！请注意是否需要更新 package.json')
})
