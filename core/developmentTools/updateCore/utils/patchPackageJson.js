const { join } = require('path')
const { Log } = require('../../../share/log')
const { writeJson } = require('../../../utils/write')
const { baseRootPath } = require('../../../utils/path')
const { runCommand } = require('../../../utils/run')

/* 需要更新的json的key */
const updateJsonKeys = [
    {
        key: 'scripts',
        fieldName: '脚本',
    },
    {
        key: 'dependencies',
        fieldName: '依赖',
    },
    {
        key: 'devDependencies',
        fieldName: '开发依赖',
    },
]

/**
 * 修改object
 * @param origin
 * @param target
 * @param logName
 */
const patchObject = (origin, target, logName = '字段') => {
    const keys = Object.keys(origin),
        length = keys.length
    let hasDiff = false
    for (let i = 0; i < length; ++i) {
        const key = keys[i]
        const originValue = origin[key] || ''
        const targetValue = target[key] || ''
        if (!targetValue || targetValue !== originValue) {
            hasDiff = true
            if (!targetValue) {
                Log.info(`增加${key}${logName}：${originValue}`)
            } else {
                Log.info(`修改${key}${logName}：${targetValue} -> ${originValue}`)
            }
            target[key] = originValue
        }
    }

    return hasDiff
}

/* 依据远程的json、文件修改本地的json文件 */
const patchPackageJson = async (remotePackage, localPackage) => {
    let hasDiff = false,
        install = false
    updateJsonKeys.forEach(({ key, fieldName }) => {
        Log.info(`开始检查${key}${fieldName}`)
        const _hasDiff = patchObject(remotePackage[key], localPackage[key], fieldName)
        if (_hasDiff) {
            hasDiff = true
            if (key === 'dependencies' || key === 'devDependencies') {
                /* 需要安装依赖 */
                install = true
            }
        }
    })
    if (hasDiff) {
        /* 更新package.json */
        Log.info('更新 package.json 文件')
        writeJson(join(baseRootPath, 'package.json'), localPackage)
    }
    if (install) {
        try {
            Log.info('开始更新依赖')
            await runCommand('npm install --unsafe-perm') // 为了增加权限增加 --unsafe-perm
            Log.info('依赖更新完成')
        } catch (e) {
            Log.error('依赖更新失败', e)
        }
    }
}

module.exports = {
    patchPackageJson,
}
