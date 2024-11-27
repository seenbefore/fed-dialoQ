const { notEmpty, getParentRouteView, pathToPascalName } = require('../utils.js')
const path = require('path')
const pages = require('../../core/build/entry.js').pages
const parentPages = getParentRouteView()
const choices = Object.keys(pages)
    .map((key, index) => {
        const target = pages[key]
        const { title, DirName } = target
        const result = {
            key,
            name: title + ' ' + DirName,
            value: DirName,
        }
        return result
    })
    .sort((a, b) => {
        //console.log(1, a, b)
        // TODO src的长度较小 优先第一位
        const result = a.value.length - b.value.length
        return result
    })
const prompts = choices.length
    ? [
          {
              type: 'list',
              name: 'dirname',
              message: '选择项目',
              choices: choices,
          },
      ]
    : []
module.exports = {
    description: '生成一个页面',
    prompts: [
        ...prompts,
        {
            type: 'input',
            name: 'uri',
            message: '请输入页面文件路径 比如 首页 /、 测试 /demo',
            validate: notEmpty('uri'),
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入页面标题，允许空（比如：我的订单）',
        },
        {
            type: 'list',
            name: 'hasChildRoutes',
            message: '是否包含子路由',
            choices: [
                {
                    name: '不包含',
                    value: '',
                },
                {
                    name: '包含',
                    value: '1',
                },
            ],
        },
        {
            type: 'list',
            name: 'parentPath',
            message: '选择父级路由',
            choices: [
                ...parentPages,
                {
                    name: '一级路由',
                    value: '',
                },
            ],
        },
        {
            type: 'checkbox',
            name: 'blocks',
            message: '路由配置meta',
            choices: [
                {
                    name: '是否需要授权访问',
                    value: 'requireAuth',
                    checked: false,
                },
                {
                    name: '是否缓存组件',
                    value: 'keepAlive',
                    checked: false,
                },
            ],
        },
        {
            type: 'checkbox',
            name: 'language',
            message: '是否使用TypeScript',
            choices: [
                {
                    name: 'typescript',
                    value: 'typescript',
                    checked: true,
                },
            ],
        },
    ],
    actions: data => {
        let { dirname, uri, title, hasChildRoutes, parentPath, language } = data
        // 首页
        const isIndex = uri === '/'
        uri = uri.substring(0, 1) !== '/' ? '/' + uri : uri
        let routeName = isIndex ? 'Index' : pathToPascalName(uri)
        let componentFileName = hasChildRoutes ? '_layout' : 'index'
        let parentRouteName = isIndex ? '' : pathToPascalName(parentPath)
        const dir = isIndex ? '/index' : uri
        let vueFile = ''
        if (hasChildRoutes) {
            vueFile = 'plop-templates/admin/layout.hbs'
        } else {
            if (language.includes('typescript')) {
                vueFile = 'plop-templates/admin/index-ts.hbs'
            } else {
                vueFile = 'plop-templates/admin/index.hbs'
            }
        }
        let vuePath = `${path.join(dirname, 'views')}${dir}/${componentFileName}.vue`
        let routerPath = `${path.join(dirname, 'views')}${dir}/router.js`
        let routerFile = 'plop-templates/admin/route.hbs'
        console.log('页面访问地址', uri)
        const actions = [
            {
                force: true,
                type: 'add',
                path: vuePath,
                templateFile: vueFile,
                data: {
                    componentFileName,
                    name: routeName,
                    title,
                },
            },
            {
                force: true,
                type: 'add',
                path: routerPath,
                templateFile: routerFile,
                data: {
                    componentFileName,
                    title,
                    path: uri,
                    name: routeName,
                    parent: parentRouteName,
                    requireAuth: data.blocks.includes('requireAuth'),
                    keepAlive: data.blocks.includes('keepAlive'),
                },
            },
        ]

        return actions
    },
}
