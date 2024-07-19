const { cloneAndWriteEntry } = require('./cloneAndWriteEntry')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const { Log } = require('../../share/log/index.js')
const { baseRootPath } = require('../../utils/path.js')
const { validateGitEmail } = require('../../utils/validate')

validateGitEmail().then(async email => {
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
    ]

    inquirer.prompt(questions).then(({ entryTypeName, entryDirName }) => {
        const entryType = entryTypes.find(m => m.name === entryTypeName).value
        cloneAndWriteEntry(entryType, entryDirName)
    })
})
