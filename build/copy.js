const glob = require('glob')
const path = require('path')
const fs = require('fs')
try {
    const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY
    console.log('VUE_APP_ENTRY', VUE_APP_ENTRY)
    let prefix = ''
    if (VUE_APP_ENTRY && VUE_APP_ENTRY.indexOf(',') === -1) {
        if (VUE_APP_ENTRY.indexOf('vue-template') > -1) {
            prefix = './src/template-entry/'
        } else {
            prefix = './src/entry/'
        }

        glob.sync(require('path').join(prefix + VUE_APP_ENTRY, './', `.env.*`)).forEach(filepath => {
            console.log(filepath)
            let basename = path.basename(filepath)
            let data = fs.readFileSync(filepath)
            fs.writeFileSync(basename, data)
        })
    }
} catch (err) {
    console.warn(err)
}
