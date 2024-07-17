/**
 * 自动化导入模块
 */
const modules: any = require.context('./components', true, /index\.vue$/)

const components: any = {}

modules.keys().forEach((key: any) => {
    console.log('key :>> ', key)
    // const name = key.replace('index.vue', '').split('/')[1]
    const name = key.split('/')[1]
    console.log('name :>> ', name)
    const value = modules(key).default || modules(key)
    components[name] = value
})

console.log('auto-load-components :>> ', components)

export default components
