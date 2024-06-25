const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const { updateFiles } = require('./updateFiles.js')

// 用当前项目作为模板，从 gitlab 上拉取代码
const gitRepoUrl = 'git@gitlab.icinfo.co:fed/base-vue-template.git'
const archivePath = 'src/entry'
const baseFolder = path.join(__dirname, '../../src/entry')

const cloneAndWriteEntry = (entryType, entryDirName) => {
    const entryDir = path.join(baseFolder, entryDirName)
    const cloneEntryPath = path.join(archivePath, entryType)
    fs.mkdirSync(entryDir, { recursive: true })
    const command = `git archive --remote=${gitRepoUrl} HEAD:${cloneEntryPath} | tar -x -C ${entryDir}`
    console.log('info: 开始克隆项目，请稍等.......')
    const child = spawn('sh', ['-c', command])
    child.stdout.on('data', data => {
        console.log(`info: ${data}`)
    })

    // 监听标准错误输出
    child.stderr.on('data', data => {
        console.error(`error: ${data}`)
    })

    child.on('close', code => {
        if (code === 0) {
            console.log('info: 克隆项目成功。')
            updateFiles(entryDir, entryType, entryDirName)
        } else {
            console.error(`error: 克隆项目失败，code: ${code}`)
        }
    })
}

module.exports = {
    cloneAndWriteEntry,
}
