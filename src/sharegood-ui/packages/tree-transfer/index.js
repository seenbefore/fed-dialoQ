import CP from './src/index.vue'

/* istanbul ignore next */
CP.install = function(Vue) {
    Vue.component(CP.name, CP)
}

export default CP
