const { spawn } = require('child_process')
const { Log } = require('../share/log')
const { runCommand } = require('./run')
const path = require('path')
const fs = require('fs')
const { temporaryPath } = require('../utils/path')
const AdmZip = require('adm-zip')
const { isMac } = require('../utils/platform')
/* 默认的远程url */
const defaultRemoteUrl = 'git@gitlab.icinfo.co:fed/base-vue-template.git'
/* 默认拉取的分支名称：如果想要从当前分支的源分支拉取，则可以使用 HEAD */
const defaultBranch = 'master'

/* mac直接使用 tar */
const macExtractFromRemote = async (remoteUrl = defaultRemoteUrl, branch = defaultBranch, sourcePath, targetPath, innermostDir = false) => {
    const dir = path.dirname(sourcePath)
    const command = `git archive --remote=${remoteUrl} ${branch} ${sourcePath} | tar -x${innermostDir ? ` --strip-components=${dir.split('/').length + 1}` : ''} -C ${targetPath}`
    Log.info(`开始从【${remoteUrl}】克隆【${sourcePath}】文件至【${targetPath}】，请稍等.......`)
    return runCommand(command)
}

/* windows 采用 zip 压缩 */
const windowsExtractFromRemote = async (remoteUrl = defaultRemoteUrl, branch = defaultBranch, sourcePath, targetPath, innermostDir = false) => {
    if (!fs.existsSync(temporaryPath)) {
        fs.mkdirSync(temporaryPath)
    }
    const parseSourcePath = sourcePath.replace(/\\/g, '//')
    const archiveZipPath = path.join(temporaryPath, 'archive.zip')
    const command = `git archive --format=zip --remote=${remoteUrl} ${branch} ${parseSourcePath} -o ${archiveZipPath}`
    Log.info(`开始从【${remoteUrl}】克隆【${sourcePath}】文件至【${targetPath}】，请稍等.......`)
    /* 获取zip，并且写入临时目录 */
    await runCommand(command)
    Log.info(`开始解压${temporaryPath}文件，请稍等.......`)
    /* 开始解压 */
    const zip = new AdmZip(archiveZipPath)
    const zipEntries = zip.getEntries()
    const replaceSourcePath = sourcePath.replace(/\\/g, '/')
    zipEntries.forEach(zipEntry => {
        const entryName = zipEntry.entryName
        if (entryName.length >= replaceSourcePath.length) {
            const fileName = zipEntry.entryName.replace(replaceSourcePath, '')
            const outPath = path.join(targetPath, fileName)
            if (zipEntry.isDirectory) {
                fs.mkdirSync(outPath, { recursive: true })
            } else {
                fs.writeFileSync(outPath, zip.readFile(zipEntry))
            }
        }
    })
    Log.success('解压完成。')
    fs.unlinkSync(archiveZipPath)
    Log.success(`已从【${remoteUrl}】克隆【${sourcePath}】文件至【${targetPath}】`)
}

/**
 * 从远程仓库拉取文件
 * @param remoteUrl 远程仓库url
 * @param branch 分支
 * @param sourcePath 需要拉取的仓库文件路径
 * @param targetPath 需要解压的文件路径
 * @param innermostDir 是否只要最里层文件
 */
async function extractFromRemote(remoteUrl = defaultRemoteUrl, branch = defaultBranch, sourcePath, targetPath, innermostDir = false) {
    const baseExtractFromRemote = isMac ? macExtractFromRemote : windowsExtractFromRemote
    return baseExtractFromRemote(remoteUrl, branch, sourcePath, targetPath, innermostDir)
}

module.exports = {
    extractFromRemote,
    defaultRemoteUrl,
}
