const files = require.context('.', true, /\.js$/)
const modules = {}

files.keys().forEach(key => {
    if (key === './index.js') return
    modules[key] = files(key).default || files(key)
})

export default modules
