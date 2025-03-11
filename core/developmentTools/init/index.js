/* 做一些初始化的操作。初始化操作不校验邮箱 */
const { writeJson } = require('../../utils/write')
const { Log } = require('../../share/log')
const { join } = require('path')
const { removeDirSync } = require('../../utils/file')
const { baseRootPath } = require('../../utils/path')
// 获取参数
const args = process.argv.slice(2)

/**
 * 获取命令行参数值
 * @param {string[]} args 命令行参数数组
 * @param {string} key 参数名
 * @returns {string} 参数值
 */
const getArgValue = (args, key) => {
    // 查找 --key=value 格式
    const equalArg = args.find(arg => arg.startsWith(`${key}=`))
    if (equalArg) {
        return equalArg.split('=')[1]
    }

    // 查找 --key value 格式
    const index = args.indexOf(key)
    if (index !== -1 && index + 1 < args.length) {
        return args[index + 1]
    }

    return ''
}

const name = getArgValue(args, '--name')
const description = getArgValue(args, '--description')
console.log(`参数 name:${name}，description:${description}`)

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
    if (name) {
        packageJson.name = name
    }
    if (description) {
        packageJson.description = description
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

const updateEnvFiles = async projectName => {
    Log.info('开始更新环境配置文件')
    const fs = require('fs')
    const glob = require('glob')
    const envFiles = glob.sync(join(baseRootPath, '.env*'))

    for (const file of envFiles) {
        const content = fs.readFileSync(file, 'utf8')
        const updatedContent = content.replace(/front-base-vue-template/g, projectName)
        fs.writeFileSync(file, updatedContent, 'utf8')
        Log.info(`更新文件: ${file}`)
    }
}

const deleteConfig = async () => {
    await Promise.all([deleteTsConfigPaths(), deleteScripts()])
}

const init = async () => {
    await deleteEntry()
    /* 删除一些配置文件 */
    await deleteConfig()
    /* 更新环境配置文件中的项目名称 */
    if (name) {
        await updateEnvFiles(name)
    }
    Log.success('项目初始化完成！')
}

init()
