// UI组件
import Loading from './components/loading'

// 用于遍历注册
const components = [Loading]
//const components = [SmsCode]
// install 方法：因为 Vue.use 的时候找的就是install方法
const install: any = function(Vue: any, options?: any) {
    if (install.installed) {
        return
    }
    install.installed = true
    // 注册全局组件
    components.map((component: any) => {
        let name = ''
        // ts 组件
        if (typeof component === 'function') {
            const com$: any = Object.values(component)
            name = com$[1]['name']
            Vue.component(name, component)
        } else {
            name = component.name
            Vue.component(name, component)
        }

        Vue.component(component.name, component)
    })
    //Vue.use(ModelDialog, options)
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export default {
    // 导出的对象需拥有 install 方法
    install,
    version: '0.3.0',
}
