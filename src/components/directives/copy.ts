import Vue from 'vue'
import { Message } from 'element-ui'
import Clipboard from 'clipboard'
Vue.directive('copy', {
    bind: (el: any, binding: any) => {
        const handler = () => {
            const text = binding.value || ''
            const clipboard = new Clipboard(el, {
                text: () => {
                    // const str = binding.value || binding.expression
                    // console.log(binding)

                    const result = typeof text === 'string' ? text : JSON.stringify(text)
                    return result
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
