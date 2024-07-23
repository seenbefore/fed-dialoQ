const fs = require('fs')
const path = require('path')
const { updateFiles } = require('./updateFiles.js')
const { baseRootPath } = require('../../utils/path.js')
const { extractFromRemote } = require('../../utils/gitHelpers.js')
const { initCustomization } = require('./initCustomization.js')

// 用当前项目作为模板，从 gitlab 上拉取代码
const gitRepoUrl = 'git@gitlab.icinfo.co:fed/base-vue-template.git'
const archivePath = 'src/entry'
const baseFolder = path.join(baseRootPath, 'src/entry')

const cloneAndWriteEntry = (entryType, entryDirName, params) => {
    const entryDir = path.join(baseFolder, entryDirName)
    const cloneEntryPath = path.join(archivePath, entryType)
    fs.mkdirSync(entryDir, { recursive: true })
    /* clone repo */
    extractFromRemote(gitRepoUrl, 'master', cloneEntryPath, entryDir, true).then(() => {
        updateFiles(entryDir, entryType, entryDirName)
        if (params.isCustom === '是') {
            /* xxx 后续可以优化为 先 初始化定制模块 再 替换文件。或者合并为一起。 */
            initCustomization(params)
        }
    })
}

module.exports = {
    cloneAndWriteEntry,
}
