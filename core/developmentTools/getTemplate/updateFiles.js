const fs = require('fs')
const path = require('path')
const { baseRootPath } = require('../../utils/path.js')
const { Log } = require('../../share/log/index.js')
const { writeJson } = require('../../utils/write')

const updateGenerateApiConfig = (entryType, entryDirName) => {
    Log.info('开始修改生成的 api 配置文件。')
    const generateApiConfigFile = path.join(baseRootPath, `src/entry/${entryDirName}/api-generator.js`)
    if (!fs.existsSync(generateApiConfigFile)) {
        Log.error(`${generateApiConfigFile} 不存在。`)
    }
    let content = fs.readFileSync(generateApiConfigFile, 'utf8')
    content = content.replace(new RegExp(`src/entry/${entryType}`), `src/entry/${entryDirName}`)
    fs.writeFileSync(generateApiConfigFile, content)
    Log.info('修改生成的 api 配置文件成功。')
}

const addBuildCommand = (jsonPath, entryDirName) => {
    Log.info('开始增加打包脚本。')
    const packageJson = require(jsonPath)
    let scripts = packageJson.scripts
    if (!scripts) {
        scripts = {}
    }
    ;[
        {
            key: `dev:${entryDirName}`,
            value: `cross-env VUE_APP_ENTRY=${entryDirName} vue-cli-service serve --open --mode=development`,
        },
        {
            key: `build:uat:${entryDirName}`,
            value: `cross-env VUE_APP_ENTRY=${entryDirName} vue-cli-service build --mode=uat`,
        },
        {
            key: `build:prd:${entryDirName}`,
            value: `cross-env VUE_APP_ENTRY=${entryDirName} vue-cli-service build --mode=production`,
        },
    ].forEach(({ key, value }) => {
        if (Reflect.has(scripts, key)) {
            Log.warn(`命令${key}已存在。请自行增加脚本：`, `${key}: ${value}`)
        } else {
            Reflect.set(scripts, key, value)
        }
    })
    packageJson.scripts = scripts
    writeJson(jsonPath, packageJson)
    Log.info('打包脚本增加完成。')
    Log.success(`${entryDirName} 子项目已增加完成。可以执行: npm run dev:${entryDirName} 进行启动。`)
}

const updateConfigJsonPath = (jsonPath, entryDirName) => {
    const fileName = path.basename(jsonPath)
    try {
        const json = require(jsonPath)
        const parseJson = typeof json === 'string' ? JSON.parse(json) : json
        let paths = parseJson.compilerOptions.paths
        if (!paths) {
            paths = {}
        }
        const pathKey = `@${entryDirName}/*`
        const value = `src/entry/${entryDirName}/*`
        const originValue = Reflect.get(paths, pathKey)
        if (originValue) {
            if (Array.isArray(originValue)) {
                originValue.push(value)
            } else {
                Log.warn(`${fileName} 的 compilerOptions.paths.${pathKey} 配置有误。请自行增加配置：[${value}]`)
            }
        } else {
            Reflect.set(paths, pathKey, [value])
        }
        parseJson.compilerOptions.paths = paths
        writeJson(fileName, parseJson)
        Log.info(`${fileName} 文件修改完成。`)
    } catch (error) {
        Log.error(`json序列化异常，请检查 ${fileName} 配置文件。`, error)
    }
}

const updateConfigJson = entryDirName => {
    Log.info('开始修改 tsConfig.json 文件')
    updateConfigJsonPath(path.join(baseRootPath, 'tsconfig.json'), entryDirName)
    Log.info('开始修改 jsconfig.json 文件')
    updateConfigJsonPath(path.join(baseRootPath, 'jsconfig.json'), entryDirName)
    addBuildCommand(path.join(baseRootPath, 'package.json'), entryDirName)
}

// 修改文件中的字符串
const replaceEntryFilesPath = (directory, searchString, replaceString) => {
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file)
        if (fs.statSync(filePath).isDirectory()) {
            replaceEntryFilesPath(filePath, searchString, replaceString)
        } else if (fs.statSync(filePath).isFile()) {
            let content = fs.readFileSync(filePath, 'utf8')
            if (content.includes(searchString)) {
                content = content.replace(new RegExp(searchString, 'g'), replaceString)
                fs.writeFileSync(filePath, content)
                Log.info('info: 文件：' + filePath + ' 替换成功。')
            }
        } else {
            Log.info('文件：' + filePath + ' 不存在。')
        }
    })
}

const updateFiles = (entryDir, entryType, entryDirName) => {
    Log.info('开始替换文件路径，请稍等.......')
    replaceEntryFilesPath(entryDir, `@/entry/${entryType}`, `@${entryDirName}`)
    replaceEntryFilesPath(entryDir, `@${entryType}`, `@${entryDirName}`)
    Log.info('替换文件路径完成。')
    updateGenerateApiConfig(entryType, entryDirName)
    updateConfigJson(entryDirName)
}

module.exports = {
    updateFiles,
}
