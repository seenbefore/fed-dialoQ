const { spawn } = require('child_process')
const { Log } = require('../share/log')
const { runCommand } = require('./run')
const path = require('path')

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
 * @param innermostDir 是否只要最里层文件
 */
async function extractFromRemote(remoteUrl = defaultRemoteUrl, branch = defaultBranch, sourcePath, targetPath, innermostDir = false) {
    const dir = path.dirname(sourcePath)
    const command = `git archive --remote=${remoteUrl} ${branch} ${sourcePath} | tar -x${innermostDir ? ` --strip-components=${dir.split('/').length + 1}` : ''} -C ${targetPath}`
    Log.info(`开始从【${remoteUrl}】克隆【${sourcePath}】文件至【${targetPath}】，请稍等.......`)
    return runCommand(command)
}

module.exports = {
    extractFromRemote,
    defaultRemoteUrl,
}
