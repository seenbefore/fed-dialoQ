const files = require.context('@/views', true, /\.js$/)
const modules = {}

files.keys().forEach(key => {
    if (key.includes('mock.js')) {
        modules[key] = files(key).default || files(key)
    }
})

export default modules
