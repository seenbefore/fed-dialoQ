import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/components/keep-alive'
// 基于element-ui封装的公共组件
import '@/sharegood-ui'
// 注入自定义全局组件
import '@/components/registerGlobComp'

// 注入 v-highlight 指令 可选
import '@/components/directives/highlight'
// markdown编辑器 可选
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ReElTableColumn from '@/sharegood-ui/packages/data-view/re-el-table-column.vue'

// svg-icon 组件
const SvgIcon = function() {
    return import(/* webpackChunkName: "low-priority" */ '@/components/SvgIcon/index.vue')
}

Vue.component('SvgIcon', SvgIcon)
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.component('ElTableColumn', ReElTableColumn)
