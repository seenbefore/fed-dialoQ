const { spawn } = require('child_process')
const { Log } = require('../share/log')

/* 默认的远程url */
const defaultRemoteUrl = 'git@gitlab.icinfo.co:fed/base-vue-template.git'
/* 默认拉取的分支名称：如果想要从当前分支的源分支拉取，则可以使用 HEAD */
const defaultBranch = 'master'

/**
 * 从远程仓库拉取文件
 * @param remoteUrl 远程仓库url
 * @param branch 分支
 * @param sourcePath 需要拉取的仓库文件路径
 * @param targetPath 需要解压的文件路径
 */
function extractFromRemote(remoteUrl = defaultRemoteUrl, branch = defaultBranch, sourcePath, targetPath) {
    return new Promise((resolve, reject) => {
        const command = `git archive --remote=${remoteUrl} ${branch}:${sourcePath} | tar -x -C ${targetPath}`
        Log.info(`开始从${remoteUrl}克隆${sourcePath}文件至${targetPath}，请稍等.......`)
        const child = spawn('sh', ['-c', command])
        child.stdout.on('data', data => {
            console.log(`info: ${data}`)
        })

        // 监听标准错误输出
        child.stderr.on('data', reject)

        child.on('close', code => {
            if (code === 0) {
                Log.info(`从${remoteUrl}克隆${sourcePath}文件至${targetPath}成功。`)
                resolve()
            } else {
                Log.error(`克隆项目失败，code: ${code}`)
                reject(code)
            }
        })
    })
}

module.exports = {
    extractFromRemote,
}
