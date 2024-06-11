interface HandlerResult {
    isStop?: boolean
    [prop: string]: any
}
interface Options {
    handler: () => Promise<boolean>
    onEnd?: () => void
    interval?: number
}
class Polling {
    // 间隙 默认1s
    interval!: number
    count = 0
    // 定时器
    timer: any
    //
    handler!: () => Promise<boolean>
    onEnd!: () => void
    IS_STOP = false
    constructor(options: Options) {
        this.handler = options.handler
        this.interval = options.interval ? options.interval : 1000
        this.onEnd =
            options.onEnd ||
            function() {
                //console.log()
            }
    }

    async start(): Promise<any> {
        this.IS_STOP = false
        return this.nextTick()
    }
    async nextTick(): Promise<any> {
        try {
            // 人工停止
            if (this.IS_STOP) {
                this.onEnd && this.onEnd()
                return
            }
            this.count = this.count + 1
            console.log('count', this.count)
            const isStop = await this.handler()
            // 根据条件正常停止
            if (isStop) {
                this.onEnd && this.onEnd()
                return
            }

            await this.sleep()
            await this.nextTick()
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
            }, this.interval)
        })
    }
}

export default Polling
