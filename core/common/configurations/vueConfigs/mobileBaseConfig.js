const path = require('path')
const postcssPxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const getBaseConfig = require('./baseConfig.js')

const addStyleResource = rule => {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, './styles/vars.less')],
        })
}

const staticResource = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        vant: 'vant',
    },
    cdn: {
        css: [process.env.BASE_URL + 'static/assets/npm/vant/2.12.33/index.css'],
        js: [
            process.env.BASE_URL + 'static/assets/npm/babel-polyfill/polyfill.min.js',
            process.env.BASE_URL + 'static/assets/npm/lib-flexble/0.3.2/flexible.js',
            process.env.BASE_URL + 'static/assets/npm/vue/2.6.11/vue.min.js',
            process.env.BASE_URL + 'static/assets/npm/vue-router/3.3.4/vue-router.min.js',
            process.env.BASE_URL + 'static/assets/npm/axios/0.19.2/axios.min.js',
            process.env.BASE_URL + 'static/assets/npm/vuex/3.4.0/vuex.min.js',
            process.env.BASE_URL + 'static/assets/npm/vant/2.12.33/vant.min.js',
        ],
    },
}

const { css, chainWebpack, ...config } = getBaseConfig({ staticResource })

/**
 * @return {import('@vue/cli-service').ConfigFunction}
 */
module.exports = () => {
    return {
        ...config,
        css: {
            ...css,
            loaderOptions: {
                postcss: {
                    plugins({ resourcePath: path }) {
                        const pxtorem = postcssPxtorem({
                            rootValue: 37.5, // 设计稿宽度的1/10
                            unitPrecision: 5, // 小数位
                            minPixelValue: 1, // 转换的最小单位
                            // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                            selectorBlackList: ['.icon-svg', 'weui', 'mu', 'swiper'], // 忽略的样式, 正则
                            propList: ['*'],
                        }) // @H5 将 px 转成 rem

                        return [autoprefixer, pxtorem]
                    },
                },
            },
        },
        chainWebpack: config => {
            chainWebpack(config)
            const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
            types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        },
    }
}
