// 修改文件中的字符串
const fs = require('fs')
const path = require('path')
const { Log } = require('../../share/log/index.js')

const replaceEntryFilesPath = (directory, searchString, replaceString, callBack) => {
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file)
        if (fs.statSync(filePath).isDirectory()) {
            replaceEntryFilesPath(filePath, searchString, replaceString, callBack)
        } else if (fs.statSync(filePath).isFile()) {
            let content = fs.readFileSync(filePath, 'utf8')
            const hasCallBack = callBack && typeof callBack === 'function'
            if (hasCallBack) {
                content = callBack(filePath, content)
            }
            if (content.includes(searchString)) {
                content = content.replace(new RegExp(searchString, 'g'), replaceString)
                fs.writeFileSync(filePath, content)
                Log.info('info: 文件：' + filePath + ' 替换成功。')
            } else {
                if (hasCallBack) {
                    fs.writeFileSync(filePath, content)
                    Log.info('info: 文件：' + filePath + ' 替换成功。')
                }
            }
        } else {
            Log.warn('文件：' + filePath + ' 不存在。')
        }
    })
}

const eachFilesUpdateContent = (directory, callBack) => {
    try {
        fs.readdirSync(directory).forEach(file => {
            const filePath = path.join(directory, file)
            if (fs.statSync(filePath).isDirectory()) {
                eachFilesUpdateContent(filePath, callBack)
            } else if (fs.statSync(filePath).isFile()) {
                let content = fs.readFileSync(filePath, 'utf8')
                if (callBack && typeof callBack === 'function') {
                    content = callBack(filePath, content)
                    fs.writeFileSync(filePath, content, 'utf-8')
                }
            } else {
                Log.warn('文件：' + filePath + ' 不存在。')
            }
        })
    } catch (e) {
        Log.error(e)
    }
}

module.exports = {
    replaceEntryFilesPath,
    eachFilesUpdateContent,
}
