const path = require('path')
const loadEnv = require('../../../build/env.js')
loadEnv(path.resolve(__dirname, '.'))
const _ = require('lodash')
const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem') // @H5 将 px 转成 rem
const CompressionPlugin = require('compression-webpack-plugin')
const env = process.env
const isDev = process.env.VUE_APP_ENV === 'dev'
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY || 'src'
const pages = require('../../../build/entry').pages
const page = pages[VUE_APP_ENTRY]
const entry = {
    pages: {
        [VUE_APP_ENTRY]: page,
    },
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

const devServerOptions = env.PDF_PROXY_URL
    ? {
          devServer: {
              host: '0.0.0.0',
              /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */

              proxy: {
                  '/@API_PDF': {
                      changeOrigin: true,
                      pathRewrite: {
                          '^/@API_PDF': '',
                      },
                      target: env.PDF_PROXY_URL,
                  },
              },
          },
      }
    : {}

module.exports = {
    ...devServerOptions,
    css: {
        extract: false,
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
        sourceMap: isDev ? process.env.DEV_CSS_SOURCEMAP === 'true' : false,
    },
    configureWebpack: config => {
        if (isDev) config.devtool = 'source-map'
        // 不打包固定的第三方依赖
        Object.assign(config, {
            externals: staticResource.externals,
        })
        config.optimization = {
            // 默认命名 连接符~
            splitChunks: {
                automaticNameDelimiter: '.',
            },
        }
    },

    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        // 多页面处理
        Object.keys(entry.pages).forEach(key => {
            config.plugins.delete(`prefetch-${key}`)

            config.plugin('html-' + key).tap(args => {
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = staticResource.cdn
                }
                if (process.env.NODE_ENV === 'development') {
                    args[0].cdn = staticResource.cdn
                }
                return args
            })
        })

        /* 跳过 babel-loader */
        config.module.rule('js').exclude.add(path => {
            return /[\\/]src[\\/]libs[\\/].+\.js$/.test(path)
        })

        const svgSpriteIconsDir = path.join(__dirname, '../../../', './src/components/SvgIcon/icons/')
        config.module.rule('svg').exclude.add(svgSpriteIconsDir)
        config.module
            .rule('svg-sprite')
            .after('svg')
            .test(/\.(svg)(\?.*)?$/)
            .include.add(svgSpriteIconsDir)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'svgSpriteIcon__[name]' })
            .end()
            .use('svgo-loader')
            .loader('svgo-loader')

        // /* @H5.vant */
        // const vant = config.module
        //     .rule('less')
        //     .oneOf('vant')
        //     .before('vue-modules')
        //     .test(/[\\/]node_modules[\\/]vant[\\/]/)
        // config.module
        //     .rule('less')
        //     .oneOf('normal')
        //     .toConfig()
        //     .use.forEach(({ __useName, loader, options = {} }) => {
        //         const ops = _.cloneDeep(options)
        //         if (__useName === 'less-loader') {
        //             delete ops.globalVars
        //             ops.modifyVars = {
        //                 hack: `true; @import '${path.join(
        //                     __dirname,
        //                     '../../../',
        //                     './src/vant/vars.less',
        //                 )}'`,
        //             }
        //         }
        //         vant.use(__useName)
        //             .loader(loader)
        //             .options(ops)
        //     })

        if (process.env.VUE_APP_GZIP === 'true') {
            const productionGzipExtensions = ['js', 'css']
            config.plugin('compressionPlugin').use(
                new CompressionPlugin({
                    filename: '[path][base].gz', // 注意: compress版本不同配置不同
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            )
        }
    },
}
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, './styles/vars.less')],
        })
}
