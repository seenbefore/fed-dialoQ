const fs = require('fs')
const path = require('path')
const { Log } = require('../../share/log/index.js')
const { baseRootPath } = require('../../utils/path.js')

const reserveKeyPrefix = 'reserve_'

const entryTypes = [
    {
        name: '后台管理系统',
        value: 'admin',
    },
    {
        name: '移动端h5',
        value: 'h5',
    },
    {
        name: '浙里办h5',
        value: 'zlb-h5',
    },
    {
        name: '大屏',
        value: 'bigScreen',
    },
    {
        name: '门户',
        value: 'library',
    },
]

/**
 * 当是定制模块的时候的可选文件列表
 * 默认会保留：环境变量配置文件、main.ts、views、router
 */
const optionalFiles = [
    {
        fieldName: 'store',
        filePath: 'store',
    },
    {
        fieldName: 'http',
        filePath: 'scripts/http/*',
    },
    {
        fieldName: 'App',
        suffix: '.vue',
        filePath: 'App.vue',
    },
    {
        fieldName: 'menus',
        filePath: 'menus.ts',
    },
    {
        fieldName: 'styles',
        filePath: 'styles',
    },
    {
        fieldName: 'layout',
        filePath: 'layout',
    },
    {
        fieldName: 'settings',
        suffix: '.js',
        filePath: 'settings.js',
    },
    {
        fieldName: 'api-generator',
        suffix: '.js',
        filePath: 'api-generator.js',
    },
]

const questions = [
    {
        type: 'list',
        name: 'entryTypeName',
        message: '请选择一个选项:',
        choices: entryTypes.map(m => m.name),
    },
    {
        type: 'input',
        name: 'entryDirName',
        message: '请输入子项目名称:',
        validate: value => {
            if (/^([a-zA-Z0-9_]+)$/.test(value)) {
                const entryFilePath = path.join(baseRootPath, 'src/entry', value)
                if (fs.existsSync(entryFilePath)) {
                    Log.info(` 子项目已存在，路径：${entryFilePath}。请重新输入子项目名称：`)
                    return false
                }
                return true
            } else {
                Log.info(' 请输入正确的子项目名称，例如：admin')
                return false
            }
        },
    },
    {
        type: 'list',
        name: 'isCustom',
        message: '是否为定制项目？',
        default: '否',
        choices: ['是', '否'],
    },
    ...optionalFiles.map(m => {
        return {
            type: 'list',
            name: `${reserveKeyPrefix}${m.fieldName}`,
            message: `是否保留${m.fieldName}${m.suffix || ''}？`,
            when: answers => answers.isCustom === '是',
            default: '否',
            choices: ['是', '否'],
        }
    }),
]

module.exports = {
    entryTypes,
    questions,
    optionalFiles,
    reserveKeyPrefix,
}
