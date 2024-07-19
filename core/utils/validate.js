const { spawnSync } = require('child_process')
const { Log } = require('../share/log')

/* examples: xxx@icinfo.com.cn */
const isIcinfoEmail = email => email.endsWith('@icinfo.com.cn')

/* 校验下当前执行的邮箱是否为公司邮箱 */
const validateGitEmail = async () => {
    /* 获取当前邮箱 */
    const { stdout } = spawnSync('git', ['config', '--get', 'user.email'])
    const email = stdout.toString().trim()

    if (!isIcinfoEmail(email)) {
        const message = `当前账号邮箱非公司邮箱！请先修改邮箱。可执行脚本：git config user.email xxx@icinfo.com.cn`
        Log.error(message)
        return Promise.reject(message)
    }

    return Promise.resolve(email)
}

module.exports = {
    validateGitEmail,
}
