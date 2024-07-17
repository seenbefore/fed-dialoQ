const { spawn } = require('child_process')
const { Log } = require('../share/log')

const runCommand = async command => {
    return new Promise((resolve, reject) => {
        const child = spawn('sh', ['-c', command])
        Log.info(`开始执行脚本: ${command}`)
        child.stdout.on('data', data => {
            Log.info(`info: ${data}`)
        })

        // 监听标准错误输出
        child.stderr.on('data', err => {
            Log.error(`命令执行失败：${err}`)
            reject(err)
        })

        child.on('close', code => {
            if (code === 0) {
                Log.success(`${command} 脚本执行完成。`)
                resolve()
            } else {
                Log.error(`脚本执行失败，code: ${code}`)
                reject(code)
            }
        })
    })
}

module.exports = {
    runCommand,
}
