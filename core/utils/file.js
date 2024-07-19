const { rmSync, existsSync } = require('fs')
/* 删除文件夹 */
const removeDirSync = async path => {
    if (existsSync(path)) {
        rmSync(path, { recursive: true })
    }
}

module.exports = {
    removeDirSync,
}
