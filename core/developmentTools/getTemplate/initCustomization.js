/* 作为当前项目的扩展项目 */
const { Log } = require('../../share/log/index.js')
const { baseRootPath } = require('../../utils/path.js')
const path = require('path')
const fs = require('fs')
const { removeDirSync } = require('../../utils/file.js')
const { replaceEntryFilesPath, eachFilesUpdateContent } = require('./updateFilesTool.js')
const { reserveKeyPrefix, optionalFiles } = require('./config.js')

/* 获取保留的文件内容 */
const getReservedFileList = params => {
    const keys = Object.keys(params)
    return keys.reduce((result, key) => {
        if (key.startsWith(reserveKeyPrefix)) {
            const value = params[key]
            /* 保留文件的key */
            if (value === '是') {
                const item = optionalFiles.find(it => it.fieldName === key.replace(reserveKeyPrefix, ''))
                result.push(item.filePath)
            }
        }
        return result
    }, [])
}

/* 固定保留的文件名称 */
const regularReservedFiles = ['main.ts', 'views', 'router', /\.env.*/, 'vue.config.js']

/* 删除不保留的文件 */
const deleteUnReserveFiles = (entryPath, filePathList, prefix = '') => {
    fs.readdirSync(entryPath).forEach(it => {
        const filePath = path.join(entryPath, it)
        if (!regularReservedFiles.some(s => s === it || s?.test?.(it))) {
            // 非保留文件
            if (fs.statSync(filePath).isDirectory()) {
                // 如果是文件夹，判断是否包含这个文件夹开头的文件
                const dirPath = path.join(prefix, it)
                const item = filePathList.find(s => (typeof s === 'string' ? !s.includes('.') && s.startsWith(dirPath) : false))
                if (item) {
                    const splitPath = item.split('/')
                    /* 判断是否有子级目录 */
                    if (splitPath && splitPath.length > 1) {
                        /* 二级目录 */
                        if (prefix) {
                            const lastPath = item.split(dirPath)[1]
                            if (lastPath && lastPath !== '/*') {
                                deleteUnReserveFiles(filePath, filePathList, splitPath.shift())
                            }
                        } else {
                            deleteUnReserveFiles(filePath, filePathList, splitPath.shift())
                        }
                    }
                } else {
                    removeDirSync(path.join(entryPath, it))
                }
            } else {
                if (!filePathList.some(s => s === it || s?.test?.(it))) {
                    removeDirSync(path.join(entryPath, it))
                }
            }
        }
    })
}

const startReplace = (entryPath, fileList, entryDirName) => {
    if (!fileList.length) {
        replaceEntryFilesPath(entryPath, `@${entryDirName}`, `@`, (filePath, content) => {
            if (filePath === path.join(entryPath, 'main.ts')) {
                return content.replace(/\.\//g, '@/')
            } else if (filePath === path.join(entryPath, 'router/index.ts')) {
                content = content.replace('../settings', '@/settings')
                content = content.replace('require.context(`../views`, true, /router\\.js/)', '[require.context(`@/views`, true, /router\\.js/), require.context(`../views`, true, /router\\.js/)]')
            }
            return content
        })
    } else {
        eachFilesUpdateContent(entryPath, (filePath, content) => {
            let updateContent = content
            /* 不用处理环境变量 */
            if (!/\.env(\..+)?$/.test(filePath)) {
                optionalFiles.forEach(optional => {
                    const { filePath: l } = optional
                    const p = l.split('/*').shift() || l
                    const fullPPath = path.join(entryPath, p)
                    const fullPPathLength = fullPPath.split('/').length
                    const filePathLength = filePath.split('/').length
                    /* 说明当前目录和需要替换的目录层级一致或者当前目录在外层 */
                    if (fullPPathLength === filePathLength || filePathLength > fullPPathLength) {
                        /* 判断当前是否选中咯 */
                        if (!fileList.includes(l)) {
                            /* 替换有@符号携带的路径 */
                            updateContent = updateContent.replace(new RegExp(`@${entryDirName}/${p}`, 'g'), `@/${p}`)

                            const points = new Array(filePathLength - fullPPathLength).fill('\\.{2}')
                            /* 替换相对路径 */
                            const pointStr = `${points.length ? points.join('/') : '\\.'}/${p}`
                            /* XXX 不能直接new RegExp */
                            updateContent = updateContent.replace(new RegExp(pointStr, 'g'), `@/${p}`)
                        }
                    }
                })
            }
            return updateContent
        })
    }
}

const initCustomization = params => {
    const { entryDirName } = params
    Log.info('开始初始化扩展模块')
    /* 保留的文件内容 */
    const fileList = getReservedFileList(params)
    const entryPath = path.join(baseRootPath, 'src/entry', entryDirName)
    deleteUnReserveFiles(entryPath, fileList)
    startReplace(entryPath, fileList, entryDirName)
}

module.exports = {
    initCustomization,
}
