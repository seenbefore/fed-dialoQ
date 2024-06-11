const { notEmpty, getEntryPrompt } = require('../utils.js')

const entryPrompt = getEntryPrompt()

module.exports = {
    description: '生成api-hook数据',
    prompts: [
        entryPrompt,
        {
            type: 'input',
            name: 'url',
            message: '请输入url',
            validate: notEmpty('url'),
        },
        {
            type: 'input',
            name: 'description',
            message: '请求描述',
        },
    ],
    actions: data => {
        const { url, entry } = data
        const [entryName, projectName] = entry
        const uri = '{{pathCase url}}'

        const actions = [
            {
                type: 'add',
                path: `src/${entryName}/${projectName}/api-hooks/${uri}.js`,
                templateFile: 'plop-templates/api/index.hbs',
                data: {
                    url: url,
                    name: uri,
                },
            },
        ]

        return actions
    },
}
