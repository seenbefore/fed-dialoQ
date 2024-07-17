const path = require('path')
const baseConfig = require('./baseConfig')
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY || 'src'
const pages = require('../../../build/entry').pages
const page = pages[VUE_APP_ENTRY]

/* 获取基础的配置 */
const { chainWebpack, ...config } = baseConfig()

const vueConfig = {
    ...config,
    chainWebpack: config => {
        /* 拿到基础的配置 */
        chainWebpack(config)
    },
}

const entryVueConfigUrl = page.VueConfig
let entryVueConfig
if (entryVueConfigUrl) {
    const requireConfig = require(entryVueConfigUrl)
    if (typeof requireConfig === 'function') {
        entryVueConfig = requireConfig(vueConfig)
    } else {
        entryVueConfig = requireConfig
    }
}

const isEmptyConfig = Object.keys(entryVueConfig || {}).length === 0

/**
 * @return {import('@vue/cli-service').ConfigFunction}
 */
module.exports = () => {
    return isEmptyConfig ? vueConfig : entryVueConfig
}
