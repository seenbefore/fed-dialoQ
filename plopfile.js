//const componentGenerator = require('./plop-templates/component/prompt')
//const entryGenerator = require('./plop-templates/entry/prompt')
const spaGenerator = require('./plop-templates/spa/prompt')
//const mockGenerator = require('./plop-templates/mock/prompt')
//const apiGenerator = require('./plop-templates/api/prompt')
const adminGenerator = require('./plop-templates/admin/prompt')

module.exports = function(plop) {
    plop.setHelper('formatPath', function(name) {
        const dirArr = name.split('/')
        let result = ''
        if (dirArr.length > 0) {
            result = dirArr.slice(1).join('/')
        } else {
            result = name
        }

        if (result === 'index') {
            return ''
        }
        return result
    })
    // 将路径转
    plop.setHelper('pathToName', function(name) {
        return name.replace(/\//gi, '-')
    })
    // 将路径转
    plop.setHelper('pathToPascalName', function(name) {
        const dirArr = name.split('/')
        if (dirArr.length > 0 && isNaN(dirArr[1])) {
            name = dirArr.slice(1).join('/')
        }
        name = name.replace(/\//gi, '-')

        const arr = name.split('-')
        return arr
            .map(key => {
                const result = key.split('')
                return result[0].toUpperCase() + result.slice(1).join('')
            })
            .join('')
    })

    plop.setGenerator('spa', spaGenerator)
    plop.setGenerator('admin', adminGenerator)
    // plop.setGenerator('component', componentGenerator)
    // plop.setGenerator('mock', mockGenerator)
    // plop.setGenerator('api', apiGenerator)
}
