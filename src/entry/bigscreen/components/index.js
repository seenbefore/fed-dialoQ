import Vue from 'vue'

// 基础组件
const files = require.context('./global/base', true, /index\.vue$/)
const components = {}

files.keys().forEach(key => {
    const name = key.replace('index.vue', '').split('/')[1]
    components[name] = files(key).default || files(key)
})
Object.entries(components).forEach(item => {
    const options = item[1].options || {}
    // 获取TS的组件名 否则用组件的文件目录名称作为组件名
    const name = options.name || item[1].name || item[0]
    console.log('global base components', name)
    Vue.component(name, item[1])
})

// 高阶组件
const composeFiles = require.context('./global/compose', true, /index\.vue$/)
const composeComponents = {}

composeFiles.keys().forEach(key => {
    const name = key.replace('index.vue', '').split('/')[1]
    composeComponents[name] = composeFiles(key).default || files(key)
})
Object.entries(composeComponents).forEach(item => {
    const options = item[1].options || {}
    // 获取TS的组件名 否则用组件的文件目录名称作为组件名
    const name = options.name || item[1].name || item[0]
    console.log('global base components', name)
    Vue.component(name, item[1])
})
