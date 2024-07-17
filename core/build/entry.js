const glob = require('glob')
const path = require('path')
const fs = require('fs')
const { baseRootPath } = require('../utils/path.js')
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY || 'src'
const pages = {}
const root = path.resolve(baseRootPath, 'src')
//
glob.sync(path.resolve(root, './**/App.vue')).forEach(dir => {
    let chunk = dir.split('/').slice(-2)[0]
    const entry$ = path.resolve(baseRootPath, dir.split('/App.vue')[0])
    const settings$ = path.join(entry$, `./settings.js`)
    const entry = path.join(entry$, `./main.ts`)
    const VueConfig = chunk === 'src' ? '' : path.join(entry$, `./vue.config.js`)
    const settings = require(settings$)
    let template = settings.template ? settings.template : path.join(entry$, `./index.html`)
    /* if template not exists, use public index.html */
    if (!fs.existsSync(template)) {
        template = path.join(baseRootPath, 'core/common/template/index.html')
    }

    const { title = '', keywords = '', description = '', filename = 'index.html' } = settings

    if (!settings.disabled) {
        pages[chunk] = {
            entry,
            title,
            keywords,
            description,
            template,
            filename,
            VueConfig,
            DirName: entry$,
        }
    }
})

const entry = {
    pages: {
        [VUE_APP_ENTRY]: pages[VUE_APP_ENTRY],
    },
}

exports.pages = pages
exports.entry = entry
