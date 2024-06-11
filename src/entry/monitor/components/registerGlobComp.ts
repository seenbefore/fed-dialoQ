import Vue from 'vue'

const files = require.context('./global', true, /index\.vue$/)
const components: any = {}

files.keys().forEach(key => {
    const name = key.replace('index.vue', '').split('/')[1]
    components[name] = files(key).default || files(key)
})
Object.entries(components).forEach((item: any) => {
    const options = item[1].options || {}
    // 获取TS的组件名 否则用组件的文件目录名称作为组件名
    const name = options.name || item[1].name || item[0]
    console.log('global components', name)
    Vue.component(name, item[1])
})
