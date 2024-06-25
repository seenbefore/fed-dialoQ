const fs = require('fs')
const path = require('path')

const writeJson = (jsonPath, json) => {
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4))
}

const updateGenerateApiConfig = (entryType, entryDirName) => {
    console.log('info: 开始修改生成的 api 配置文件。')
    const generateApiConfigFile = path.join(__dirname, `../../src/entry/${entryDirName}/api-generator.js`)
    if (!fs.existsSync(generateApiConfigFile)) {
        console.log(`error: ${generateApiConfigFile} 不存在。`)
    }
    let content = fs.readFileSync(generateApiConfigFile, 'utf8')
    content = content.replace(new RegExp(`src/entry/${entryType}`), `src/entry/${entryDirName}`)
    fs.writeFileSync(generateApiConfigFile, content)
    console.log('info: 修改生成的 api 配置文件成功。')
}

const addBuildCommand = (jsonPath, entryDirName) => {
    console.log('info: 开始增加打包脚本。')
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
            console.log(`warning: 命令${key}已存在。请自行增加脚本：`, `${key}: ${value}`)
        } else {
            Reflect.set(scripts, key, value)
        }
    })
    packageJson.scripts = scripts
    writeJson(jsonPath, packageJson)
    console.log('info: 打包脚本增加完成。')
    console.log(`success: ${entryDirName} 子项目已增加完成。可以执行: npm run dev:${entryDirName} 进行启动。`)
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
                console.log(`warning: ${fileName} 的 compilerOptions.paths.${pathKey} 配置有误。并自行增加配置：`, `[${value}]`)
            }
        } else {
            Reflect.set(paths, pathKey, [value])
        }
        parseJson.compilerOptions.paths = paths
        writeJson(fileName, parseJson)
        console.log(`info: ${fileName} 文件修改完成。`)
    } catch (error) {
        console.log(`error: json序列化异常，请检查 ${fileName} 配置文件。`, error)
    }
}

const updateConfigJson = entryDirName => {
    console.log('info: 开始修改 tsConfig.json 文件')
    updateConfigJsonPath(path.join(__dirname, '../../tsconfig.json'), entryDirName)
    console.log('info: 开始修改 jsconfig.json 文件')
    updateConfigJsonPath(path.join(__dirname, '../../jsconfig.json'), entryDirName)
    addBuildCommand(path.join(__dirname, '../../package.json'), entryDirName)
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
                console.log('info: 文件：' + filePath + ' 替换成功。')
            }
        } else {
            console.log('info: 文件：' + filePath + ' 不存在。')
        }
    })
}

const updateFiles = (entryDir, entryType, entryDirName) => {
    console.log('info: 开始替换文件路径，请稍等.......')
    replaceEntryFilesPath(entryDir, `@/entry/${entryType}`, `@${entryDirName}`)
    console.log('info: 替换文件路径完成。')
    updateGenerateApiConfig(entryType, entryDirName)
    updateConfigJson(entryDirName)
}

module.exports = {
    updateFiles,
}
