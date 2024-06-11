import Vue from 'vue'
import { Message } from 'element-ui'
import Clipboard from 'clipboard'
Vue.directive('copy', {
    bind: (el: any, binding: any) => {
        const handler = () => {
            const text = binding.value || ''
            const clipboard = new Clipboard(el, {
                text: () => (typeof text === 'string' ? text : JSON.stringify(text)),
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
        // 绑定点击事件，就是所谓的一键 copy 啦
        //el.addEventListener('click', handler)
    },
})
