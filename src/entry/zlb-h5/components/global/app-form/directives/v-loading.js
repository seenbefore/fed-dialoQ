import Vue from 'vue'
import { generateGUID } from 'icinfo-util'
const vmMap = {}
const directiveHandler = (el, binding, init = false) => {
    if (init) {
        const uuid = generateGUID()
        const Profile = Vue.extend({
            render(h) {
                return h('van-loading', {
                    props: { color: '#1989fa' },
                    style: { position: 'absolute', right: '40px' },
                })
            },
        })
        vmMap[uuid] = new Profile().$mount()
        el.setAttribute('loading-uuid', uuid)
    }
    const uuid = el.getAttribute('loading-uuid')
    const loading = binding.value
    const vm = vmMap[uuid]
    const flag = el.contains(vm.$el)
    if (!flag && loading) {
        el.appendChild(vm.$el)
    } else if (flag && !loading) {
        el.removeChild(vm.$el)
    }
}

export default {
    inserted: (el, binding) => directiveHandler(el, binding, true),
    componentUpdated: (el, binding) => directiveHandler(el, binding, false),
}
