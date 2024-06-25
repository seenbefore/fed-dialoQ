import CP from './src/index.vue'

/* istanbul ignore next */
CP.version = '1.0.0'
CP.install = function(Vue) {
    console.log('base-uploader', CP.version)
    Vue.component(CP.name, CP)
}

export default CP
