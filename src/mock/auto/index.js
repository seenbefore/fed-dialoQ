const files = require.context('.', true, /\.json$/)
const modules = {
    AUTO_MOCK_DATA: [],
}
const map = {}

files.keys().forEach(key => {
    if (key === './index.js') return
    const path = key.replace(/(\.\/|\.json)/g, '')
    map['/' + path] = key
})
Object.keys(map).forEach(path => {
    modules['AUTO_MOCK_DATA'].push({
        name: path,
        method: 'post',
        onMock() {
            return require('../auto' + path + '.json')
        },
    })
    modules['AUTO_MOCK_DATA'].push({
        name: path,
        method: 'get',
        onMock() {
            return require('../auto' + path + '.json')
        },
    })
})
export default modules
