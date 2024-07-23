const { cloneAndWriteEntry } = require('./cloneAndWriteEntry.js')
const inquirer = require('inquirer')
const { validateGitEmail } = require('../../utils/validate.js')
const { entryTypes, questions } = require('./config.js')

validateGitEmail().then(async email => {
    inquirer.prompt(questions).then(params => {
        const { entryTypeName, entryDirName, isCustom } = params
        const entryType = entryTypes.find(m => m.name === entryTypeName).value
        cloneAndWriteEntry(entryType, entryDirName, params)
    })
})
