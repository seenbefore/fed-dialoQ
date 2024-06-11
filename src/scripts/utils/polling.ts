import { log } from '@/decorator'

interface HandlerResult {
    isStop?: boolean
    [prop: string]: any
}
interface Options {
    // handler: () => Promise<boolean>
    // onEnd?: () => void
    delay?: number
}
class Polling {
    // 间隙 默认1s
    count = 0
    // 定时器
    timer: any
    //
    handler!: () => Promise<boolean>
    IS_STOP = false
    options = {
        delay: 1000,
    }
    constructor(handler: any, options?: Options) {
        this.handler = handler
        Object.assign(this.options, options || {})
    }
    async tick(): Promise<any> {
        try {
            // 人工停止
            if (this.IS_STOP) {
                return 'stop'
            }
            console.log('count', this.count)
            const doNext = await this.handler()
            this.count = this.count + 1
            // 根据条件正常停止
            if (doNext === true) {
                await this.sleep()
                return await this.tick()
            }
            return 'finish'
        } catch (err) {
            this.stop()
            return err
        }
    }
    stop() {
        this.IS_STOP = true
    }
    async sleep() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('')
            }, this.options.delay)
        })
    }
}
// let aa = 0
// const dd = new Polling({
//     handler: async () => {
//         aa = aa + 1
//         if (aa == 4) {
//             throw new Error('ssss')
//         }
//         if (aa <= 10) {
//             return true
//         }

//         return false
//     },
//     interval: 1000,
// })
// dd.tick()
//     .then(status => {
//         console.log(33333, status)
//     })
//     .catch(err => {
//         console.log(4444, err)
//     })

// setTimeout(() => {
//     dd.stop()
// }, 3000)
const defaultOptions = {
    delay: 1000,
}

type MyPollingOption = typeof defaultOptions

/**
 * 异步轮询类
 */
export class MyPolling {
    timer: any
    handler: () => Promise<boolean>
    isStopped: boolean
    options: MyPollingOption

    constructor(handler: () => Promise<boolean>, options?: MyPollingOption) {
        this.timer = null
        this.handler = handler
        this.isStopped = false
        this.options = {
            ...defaultOptions,
            ...options,
        }
    }

    async start() {
        try {
            while (!this.isStopped) {
                const result = await this.handler()
                if (result === false) {
                    this.stop()
                }
                await this.sleep(this.options.delay)
            }
        } catch (error) {
            this.stop()
        }
    }

    stop() {
        this.isStopped = true
        clearTimeout(this.timer)
    }

    sleep(delay: number) {
        return new Promise(resolve => setTimeout(resolve, delay))
    }
}
// 定义一个异步函数

async function fetchData() {
    // 执行异步操作...
    // 如果出错或者返回false，则停止轮询
    // 否则继续轮询
}

// 创建轮询实例并启动

//   const polling = new MyPolling(fetchData);
//   polling.start();

export default Polling
