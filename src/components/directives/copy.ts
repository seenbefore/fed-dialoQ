import Clipboard from 'clipboard'
import { Message } from 'element-ui'
import Vue from 'vue'

Vue.directive('copy', {
    bind: (el: any, binding: any) => {
        const handler = () => {
            const text = binding.value || ''
            const clipboard = new Clipboard(el, {
                text: () => {
                    return typeof text === 'string' ? text : JSON.stringify(text)
                },
            })
            clipboard.on('success', () => {
                Message({
                    message: '复制成功',
                    type: 'success',
                })
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                Message.error('浏览器不支持复制')
                clipboard.destroy()
            })
        }
        handler()
        el.addEventListener('click', handler, false)
    },
})
