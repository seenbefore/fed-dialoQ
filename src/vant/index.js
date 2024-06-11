/* 后期优化：手动把不需要用到的组件注释掉 */

import Vue from 'vue'
import Vant from 'vant'
import './rewrite/index.less'
import 'vant/lib/index.css'

setDefault()

Vue.use(Vant)

/**
 * 默认值处理
 */
function setDefault() {
    /* Toast */
    // Toast.setDefaultOptions('loading', {
    //     message: '加载中...',
    //     forbidClick: true,
    //     duration: 0,
    // })
    // Toast.setDefaultOptions = function() {
    //     setTimeout(() => {
    //         throw new Error(
    //             'Toast.setDefaultOptions 功能被禁用（只能集中处理）',
    //         )
    //     })
    // }
    // Toast.resetDefaultOptions = function() {
    //     setTimeout(() => {
    //         throw new Error('Toast.resetDefaultOptions 功能被禁用')
    //     })
    // }
}
