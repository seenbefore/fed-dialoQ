import { throttle as _throttle, debounce as _debounce } from 'lodash'
import { MessageBox } from 'element-ui'

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 */
export const confirm = function(message = '此操作将永久删除该文件, 是否继续?', title = '提示') {
    return function(target: any, name: any, descriptor: any) {
        const fn = descriptor.value
        descriptor.value = function(...rest: Array<any>) {
            console.log(`这是调用方法【${name}】前打印的日志`)
            MessageBox.confirm(message, title)
                .then(() => {
                    fn.call(this, ...rest)
                })
                .catch(() => {})
            //console.log(`这是调用方法【${name}】后打印的日志`)
        }
    }
}
export const log = function() {
    /**
     * @param target 对应 methods 这个对象
     * @param name 对应属性方法的名称
     * @param descriptor 对应属性方法的修饰符
     */
    return function(target: any, name: any, descriptor: any) {
        console.log(target, name, descriptor)
        const fn = descriptor.value
        console.log(fn)
        descriptor.value = function(...rest: Array<any>) {
            console.log(`这是调用方法【${name}】前打印的日志`)
            fn.call(this, ...rest)
            console.log(`这是调用方法【${name}】后打印的日志`)
        }
    }
}

/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const throttle = function(wait: number, options = {}) {
    return function(target: any, name: any, descriptor: any) {
        descriptor.value = _throttle(descriptor.value, wait, options)
    }
}

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const debounce = function(wait: number, options = {}) {
    return function(target: any, name: any, descriptor: any) {
        descriptor.value = _debounce(descriptor.value, wait, options)
    }
}
/**
 *  计算方法耗时装饰器
 *  用于需要计时的方法,可传异步方法
 * **/
export const logMehtodTime = function(): MethodDecorator {
    return (_target, methodIdentifier: any, descriptor: TypedPropertyDescriptor<any>) => {
        const originMethodImpl = descriptor.value!
        descriptor.value = async function(...args: unknown[]) {
            console.time(methodIdentifier)
            const res = await originMethodImpl.apply(this, args)
            console.timeEnd(methodIdentifier)
            return res
        }
    }
}

/**
 * 防重复点击装饰器
 * 用于发送异步请求 防止多次点击按钮的方法
 * 通过方法名创建一个唯一的Uid,如果是同一个方法则Uid是同一个,不同方法会创建不一样的Uid,根据Uid来判断防重复提交，最后执行完删除Uid
 * @param {fucntion} fn 多次点击失败后传入执行的函数,比如自定义错误提示
 */
export const preReClick = function(fn?: any): MethodDecorator {
    let UidMaps: {
        [key: string]: string
    } = {}
    return (_target, methodIdentifier: any, descriptor: TypedPropertyDescriptor<any>) => {
        const originMethodImpl = descriptor.value!
        descriptor.value = async function(...args: unknown[]) {
            if (!UidMaps.hasOwnProperty(methodIdentifier)) {
                UidMaps[methodIdentifier] = '$_' + Date.now().toString(36)
            }
            const Uid = UidMaps[methodIdentifier]
            if (this[Uid]) return fn && fn.apply(this)
            this[Uid] = true
            try {
                await originMethodImpl.apply(this, args)
            } catch (e) {
            } finally {
                this[Uid] = false
                UidMaps.hasOwnProperty(methodIdentifier) && Reflect.deleteProperty(UidMaps, methodIdentifier)
                return _target
            }
        }
    }
}

/**
 *  确认取消装饰器
 *  @param {object} options 确认提示框删除参数配置options
 *
 */
export const myDelete = function(
    options: any = {
        message: '是否确认删除?',
        title: '提示',
    },
): MethodDecorator {
    return (_target, methodIdentifier: any, descriptor: TypedPropertyDescriptor<any>) => {
        const originMethodImpl = descriptor.value!
        descriptor.value = async function(...args: unknown[]) {
            if (typeof options === 'string') {
                options = Object.assign({}, { message: options, title: '提示' })
            } else if (Object.prototype.toString.call(options) === '[object Object]') {
                options = Object.assign({}, { message: '是否确认删除?', title: '提示' }, options)
            }
            MessageBox.confirm(options.message, options.title, options)
                .then(() => {
                    originMethodImpl.apply(this, args)
                })
                .catch(() => {})
        }
    }
}
