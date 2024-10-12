const { run } = require('./common.js')
const { Log } = require('../../share/log')
const { spawnSync } = require('child_process')

run([
    {
        njkPath: './template/form/index.njk',
        fileName: 'index.vue',
    },
    {
        njkPath: './template/router.njk',
        fileName: 'router.js',
    },
])
    .then(() => {
        Log.success('form generate success')
        spawnSync('git', ['add', '-A'])
        Log.success('git add success')
    })
    .catch(() => {
        Log.error('form generate error')
    })
