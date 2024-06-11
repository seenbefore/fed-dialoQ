import Vue from 'vue'
import { MessageBox } from 'element-ui'
/**
 * 覆盖element的确认提示框 参数保持一致
export interface ElMessageBoxShortcutMethod {
  (message: string, title: string, options?: ElMessageBoxOptions): Promise<MessageBoxData>
  (message: string, options?: ElMessageBoxOptions): Promise<MessageBoxData>
}
 */
Vue.prototype.$confirm = function(...args: any) {
    let _title = '确认提示'
    let _message = args[0] ?? '您确认删除吗？'
    let options = {}
    if (typeof args[1] === 'string') {
        _title = args[1]
    } else if (typeof args[1] === 'object') {
        options = args[1]
    }
    if (typeof args[2] === 'object') {
        options = args[2]
    }

    if (args.length === 3) {
        _message = args[0]
    }

    const h = this.$createElement

    return MessageBox({
        title: '',
        message: h('div', null, [
            h(
                'div',
                {
                    class: 'title',
                    style: '',
                },
                [
                    h(
                        'span',
                        {
                            style: '',
                            class: 'el-icon-warning',
                        },
                        '',
                    ),
                    h('span', null, _title),
                ],
            ),
            h(
                'div',
                {
                    class: 'message',
                },
                _message,
            ),
        ]),
        showClose: false,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'sg-confirm-box',
        beforeClose: (action: any, instance: any, done: any) => {
            done()
            // cancel
            // if (action === 'confirm') {
            //     instance.confirmButtonLoading = true
            //     instance.confirmButtonText = '执行中...'
            //     setTimeout(() => {
            //         done()
            //         setTimeout(() => {
            //             instance.confirmButtonLoading = false
            //         }, 300)
            //     }, 0)
            // } else {
            //     done()
            // }
        },
        ...options,
    })
}
