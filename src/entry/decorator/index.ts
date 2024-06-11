import { UserService, OpenService } from '@/entry/devops/api'

export function NotifyByQiWei() {
    /**
     * @param target 对应 methods 这个对象
     * @param name 对应属性方法的名称
     * @param descriptor 对应属性方法的修饰符
     */
    return function(target: any, name: any, descriptor: any) {
        const fn = descriptor.value
        descriptor.value = async function(...args: Array<any>) {
            fn.call(this, ...args)
            console.log(`这是调用方法【${name}】后打印的日志`)
        }
    }
}
