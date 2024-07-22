const fs = require('fs')
const path = require('path')
const { updateFiles } = require('./updateFiles.js')
const { baseRootPath } = require('../../utils/path.js')
const { extractFromRemote } = require('../../utils/gitHelpers')

// 用当前项目作为模板，从 gitlab 上拉取代码
const gitRepoUrl = 'git@gitlab.icinfo.co:fed/base-vue-template.git'
const archivePath = 'src/entry'
const baseFolder = path.join(baseRootPath, 'src/entry')

const cloneAndWriteEntry = (entryType, entryDirName, isExtend) => {
    const entryDir = path.join(baseFolder, entryDirName)
    const cloneEntryPath = path.join(archivePath, entryType)
    fs.mkdirSync(entryDir, { recursive: true })
    /* clone repo */
    extractFromRemote(gitRepoUrl, 'master', cloneEntryPath, entryDir, true).then(() => {
        updateFiles(entryDir, entryType, entryDirName, isExtend)
    })
}

module.exports = {
    cloneAndWriteEntry,
}
