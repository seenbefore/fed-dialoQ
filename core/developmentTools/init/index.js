/* 做一些初始化的操作。初始化操作不校验邮箱 */
const { writeJson } = require('../../utils/write')
const { Log } = require('../../share/log')
const { join } = require('path')
const { removeDirSync } = require('../../utils/file')
const { baseRootPath } = require('../../utils/path')

/* 删除 src/entry 目录。由业务自己决定使用那些项目模板 */
const deleteEntry = async () => {
    Log.info('开始删除 src/entry 目录')
    await removeDirSync(join(baseRootPath, 'src/entry'))
}

const deleteScripts = async () => {
    Log.info('开始删除 package.json 脚本')
    const packageJsonPath = join(baseRootPath, 'package.json')
    const packageJson = require(packageJsonPath)
    const scripts = packageJson.scripts
    if (Reflect.has(scripts, 'base:init')) {
        Reflect.deleteProperty(scripts, 'base:init')
    }
    packageJson.scripts = scripts
    await writeJson(packageJsonPath, packageJson)
}

const deleteTsConfigPaths = async () => {
    Log.info('开始删除 tsconfig.json paths 配置')
    const tsConfigPath = join(baseRootPath, 'tsconfig.json')
    const tsConfig = require(tsConfigPath)
    const paths = tsConfig.compilerOptions.paths
    const keys = Object.keys(paths),
        length = keys.length
    for (let i = 0; i < length; ++i) {
        const key = keys[i],
            value = paths[key]
        /* 删除scr/entry的别名 */
        if (Array.isArray(value) && value.some(s => s.includes('src/entry'))) {
            Reflect.deleteProperty(paths, key)
        }
    }
    tsConfig.compilerOptions.paths = paths
    /* 重新写入 */
    await writeJson(tsConfigPath, tsConfig)
}

const deleteConfig = async () => {
    await Promise.all([deleteTsConfigPaths(), deleteScripts()])
}

const init = async () => {
    await deleteEntry()
    /* 删除一些配置文件 */
    await deleteConfig()
    Log.success('项目初始化完成！')
}

init()
