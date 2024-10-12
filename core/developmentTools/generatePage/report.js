const { run } = require('./common.js')
const { Log } = require('../../share/log')
const { spawnSync } = require('child_process')

run([
    {
        njkPath: './template/report/index.njk',
        fileName: 'index.vue',
    },
    {
        njkPath: './template/router.njk',
        fileName: 'router.js',
    },
    {
        njkPath: './template/report/search.njk',
        fileName: 'search.vue',
    },
])
    .then(() => {
        Log.success('report generate success')
        spawnSync('git', ['add', '-A'])
        Log.success('git add success')
    })
    .catch(() => {
        Log.error('report generate error')
    })
