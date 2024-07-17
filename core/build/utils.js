const glob = require('glob')
const path = require('path')
const fs = require('fs')
// 并发
class Limit {
    constructor(options = {}) {
        this.limit = options.limit
        this.count = 0
        this.queue = []
    }
    enqueue(fn) {
        // 关键代码: fn, resolve, reject 统一管理
        return new Promise((resolve, reject) => {
            this.queue.push({
                fn,
                resolve,
                reject,
            })
        })
    }
    dequeue() {
        if (this.count < this.limit && this.queue.length) {
            // 等到 Promise 计数器小于阈值时，则出队执行
            const { fn, resolve, reject } = this.queue.shift()
            this.run(fn)
                .then(resolve)
                .catch(reject)
        }
    }
    // async/await 简化错误处理
    async run(fn) {
        this.count += 1
        // 维护一个计数器
        const value = await fn()
        this.count -= 1
        // 执行完，看看队列有东西没
        this.dequeue()
        return value
    }

    build(fn) {
        if (this.count < this.limit) {
            // 如果没有到达阈值，直接执行
            return this.run(fn)
        }
        // 如果超出阈值，则先扔到队列中，等待有空闲时执行
        return this.enqueue(fn)
    }
}

Promise.map = function(list, fn, options = {}) {
    const { limit = 3 } = options
    const instance = new Limit({ limit })
    return Promise.all(
        list.map((...args) => {
            return instance.build(() => fn(...args))
        }),
    )
}
