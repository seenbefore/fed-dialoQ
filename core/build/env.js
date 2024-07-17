const dotenv = require('./dotenv/index.js')
const dotenvExpand = require('dotenv-expand')
const fs = require('fs')
const path = require('path')
const argv = process.argv.slice(2)
let mode = 'development'
argv.forEach(item => {
    const [key, value] = item.split('=')
    if (key.indexOf('mode') > -1) {
        mode = value
    }
})
function loadEnv(context = process.cwd()) {
    const basePath = path.resolve(context, `.env${mode ? `.${mode}` : ``}`)
    const localPath = `${basePath}.local`
    const load = envPath => {
        try {
            const env = dotenv.config({
                path: envPath,
            })
            //console.log('load', envPath, process.env.NODE_ENV, env)
            // console.log('loadEnv', env, mode, env.parsed.NODE_ENV)
            process.env.NODE_ENV = env.parsed.NODE_ENV
            dotenvExpand(env)
            // todo 不清楚为什么 NODE_ENV 会被覆盖成 development 强制重写一遍
            //if (env.parsed.NODE_ENV) {
            // console.log(333333333, env.parsed.NODE_ENV, process.env.NODE_ENV)

            // console.log(4444, process.env.NODE_ENV)
            //}
        } catch (err) {
            // console.log('loadEnv err', err)
        }
    }
    if (mode.indexOf('development') > -1) {
        load(localPath)
        load(basePath)
    } else {
        load(basePath)
    }
}

module.exports = loadEnv
