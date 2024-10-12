const nunjucks = require('nunjucks')
const { baseRootPath } = require('../../utils/path.js')
const { join } = require('path')
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { Log } = require('../../share/log')
const { spawnSync } = require('child_process')

const GenerateNjk = nunjucks.configure({
    autoescape: false,
    lstripBlocks: true,
    trimBlocks: true,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>',
    },
})

const convertName = value =>
    value
        .split('-')
        ?.reduce((result, item) => {
            result.push(item.charAt(0).toUpperCase() + item.slice(1))
            return result
        }, [])
        .join('')

// 获取输入的命令内容
const args = process.argv.slice(2)
const [dirName, title, insertToViews] = args
const baseRoutePath = dirName.startsWith('/') ? dirName.slice(1) : dirName
const componentName = convertName(baseRoutePath)
const baseCwd = join(baseRootPath, `src/views/${baseRoutePath}`)
const cwd = `${process.env.INIT_CWD || process.cwd()}/${baseRoutePath}`
const insertPath = insertToViews === 'false' ? cwd : baseCwd

if (!existsSync(insertPath)) {
    mkdirSync(insertPath)
}

const data = {
    componentName,
    routerPath: `/${baseRoutePath}`,
    title: title || '',
    searchComponentName: `${componentName}Search`,
}

const genPageByNjk = (njkPath, targetPath) => {
    return new Promise((resolve, reject) => {
        try {
            const content = readFileSync(njkPath, 'utf-8')
            const templateData = GenerateNjk.renderString(content, data)
            writeFileSync(targetPath, templateData, 'utf-8')
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

Promise.all([
    genPageByNjk(join(__dirname, './template/index.njk'), join(insertPath, 'index.vue')),
    genPageByNjk(join(__dirname, './template/router.njk'), join(insertPath, 'router.js')),
    genPageByNjk(join(__dirname, './template/search.njk'), join(insertPath, 'search.vue')),
])
    .then(() => {
        Log.success('page generate success')
        // git add
        spawnSync('git', ['add', '-A'])
        Log.success('git add success')
    })
    .catch(e => {
        Log.error('page generate error', e)
    })
