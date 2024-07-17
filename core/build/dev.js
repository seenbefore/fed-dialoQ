#!/usr/bin/env node
const { exec, spawn } = require('child_process')
const chalk = require('chalk')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const execSync = require('child_process').execSync
const { baseRootPath } = require('../utils/baseRootPath')

const pkg = require(path.resolve(baseRootPath, 'package.json'))

const argv = {}
process.argv.slice(2).forEach(item => {
    let [key, value] = item.split('=')
    key = key.replace('--', '')
    argv[key] = value
})
argv['method'] = argv['method'] || 'dev'
argv['env'] = argv['env'] || 'development'
console.log(argv)
if (!argv.name) {
    console.log()
    console.log('Examples:')
    console.log()
    console.log(chalk.gray('  # create a new react project'))
    console.log('  $ igrow create demo')
    console.log()
    return
}

try {
    const name = argv.name
    console.log('VUE_APP_ENTRY', name)
    let prefix = ''
    if (name && name.indexOf(',') === -1) {
        if (name.indexOf('vue-template') > -1) {
            prefix = './src/template-entry/'
        } else {
            prefix = './src/entry/'
        }
        const matched = argv.env === 'development' ? '.env.development*' : `.env.${argv.env}`
        const dir = path.join(prefix + name, './', matched)
        const envs = glob.sync(dir)
        console.log(111, dir)
        if (!envs.length) {
            console.log(chalk.gray('没有配置文件'))
        }
        envs.forEach(filepath => {
            console.log(filepath)
            const basename = path.basename(filepath)
            const data = fs.readFileSync(filepath)
            fs.writeFileSync(basename, data)
        })
        if (argv['method'] === 'dev') {
            //execSync('sh ./build/xx.sh')
            const child2 = spawn('sh', ['./build/xx.sh'])
            child2.stderr.on('data', function(data) {
                console.log('Error msg from process 2: ' + data)
            })
            child2.on('error', err => {
                console.log('Failed to start child process 2.')
            })
        } else {
            exec(`cross-env VUE_APP_ENTRY=${name} vue-cli-service build --mode=${argv.env}`)
        }
    }
} catch (err) {
    console.warn(err)
}
