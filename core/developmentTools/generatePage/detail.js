const { run } = require('./common.js')
const { Log } = require('../../share/log')
const { spawnSync } = require('child_process')

run([
    {
        njkPath: './template/detail/index.njk',
        fileName: 'index.vue',
    },
    {
        njkPath: './template/router.njk',
        fileName: 'router.js',
    },
])
    .then(() => {
        Log.success('detail generate success')
        spawnSync('git', ['add', '-A'])
        Log.success('git add success')
    })
    .catch(() => {
        Log.error('detail generate error')
    })
