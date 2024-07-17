const path = require('path')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const _ = require('lodash')
const env = process.env
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY || 'src'
const pages = require('../../../build/entry').pages
const page = pages[VUE_APP_ENTRY]
const OutputJSPlugin = require('../../../build/OutputJSPlugin')
const CopyPublicDir = require('./plugins/CopyPublicDir')
const { setAlias } = require('../../../build/alias')
const { Log } = require('../../../share/log/index.js')

const entry = {
    pages: {
        [VUE_APP_ENTRY]: page,
    },
}

if (page.DirName) {
    const loadEnv = require('../../../build/env.js')
    loadEnv(page.DirName)
}

const isDev = env.VUE_APP_ENV === 'dev'
const staticResourceMap = {
    // 开发生产环境同一套
    devAndProd: {
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            'element-ui': 'ELEMENT',
            axios: 'axios',
            echarts: 'echarts',
            xlsx: 'XLSX',
            'xlsx-style-medalsoft': 'XLS',
            quill: 'Quill',
            'quill-image-resize-module': 'ImageResize',
        },
        cdn: {
            css: [
                process.env.BASE_URL + 'static/assets/npm/quill/1.3.7/quill.core.min.css',
                process.env.BASE_URL + 'static/assets/npm/quill/1.3.7/quill.snow.min.css',
                process.env.BASE_URL + 'static/assets/npm/quill/1.3.7/quill.bubble.min.css',
            ],
            js: [
                process.env.BASE_URL + 'static/assets/npm/babel-polyfill/polyfill.min.js',
                process.env.BASE_URL + 'static/assets/npm/vue/2.6.12/vue.min.js',
                process.env.BASE_URL + 'static/assets/npm/vue-router/3.4.3/vue-router.min.js',
                process.env.BASE_URL + 'static/assets/npm/vuex/3.6.2/vuex.min.js',
                process.env.BASE_URL + 'static/assets/npm/element-ui/2.13.2/index.js',
                process.env.BASE_URL + 'static/assets/npm/axios/0.19.2/axios.min.js',

                process.env.BASE_URL + 'static/assets/npm/echarts/5.3.2/echarts.min.js',
                process.env.BASE_URL + 'static/assets/npm/xlsx/0.16.8/xlsx.full.min.js',
                process.env.BASE_URL + 'static/assets/npm/xlsx-style-medalsoft/0.8.13/xlsx.full.min.js',
                process.env.BASE_URL + 'static/assets/npm/quill/1.3.7/quill.min.js',
                process.env.BASE_URL + 'static/assets/npm/quill/image-resize.min.js',
            ],
        },
    },
}
const staticResource = staticResourceMap['devAndProd']
/* 当代理的前缀为空时 */
if (isDev) {
    const isEmpty = prefix => prefix === '' || prefix === '/'
    if (isEmpty(env.VUE_APP_BASEURL_API) && env.DEV_PROXY_TARGET_API) {
        env.VUE_APP_BASEURL_API = '/@API'
    }
}

const outputDir = env.outputDir || 'dist'

/**
 * @return {import('@vue/cli-service').ConfigFunction}
 */
module.exports = (configOptions = { staticResource }) => {
    Log.info(
        [
            `环境变量如下:`,
            `\t入口文件 ${VUE_APP_ENTRY}`,
            `\t编译模式 ${process.env.NODE_ENV}`,
            `\t当前环境 ${process.env.VUE_APP_ENV}`,
            `\t接口前缀 ${process.env.VUE_APP_BASEURL_API}`,
            `\tURL路径 ${process.env.BASE_URL}`,
            `\t打包路径 ${outputDir}`,
            `\t代理地址 ${process.env.DEV_PROXY_TARGET_API}`,
            `\t本地缓存 ${process.env.VUE_APP_STORAGE_VERSION}`,
        ].join('\n'),
    )

    const devServerOptions = env.DEV_PROXY_TARGET_API
        ? {
              devServer: {
                  host: '0.0.0.0',
                  /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
                  proxy: {
                      [env.VUE_APP_BASEURL_API]: {
                          changeOrigin: true,
                          pathRewrite: { '^/@API': '' },
                          target: env.DEV_PROXY_TARGET_API,
                      },
                  },
              },
          }
        : {
              devServer: {
                  host: '0.0.0.0',
              },
          }
    return {
        ...entry,
        outputDir,
        lintOnSave: true, //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
        ...devServerOptions,
        assetsDir: 'static-hash',
        publicPath: env.BASE_URL,

        css: {
            extract: false,
            loaderOptions: {
                postcss: {
                    plugins({ resourcePath: path }) {
                        return [autoprefixer]
                    },
                },
            },
            sourceMap: isDev ? env.DEV_CSS_SOURCEMAP === 'true' : false,
        },

        productionSourceMap: env.VUE_APP_ENV === 'stage',

        configureWebpack: config => {
            if (isDev) config.devtool = 'source-map'
            // 不打包固定的第三方依赖
            Object.assign(config, {
                externals: configOptions.staticResource['externals'],
            })
            config.module.rules.push({
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            },
                        },
                    },
                    {
                        loader: path.resolve(__dirname, '../../build/md-loader/index.js'),
                    },
                ],
            })

            /* 为了处理模板文件的加载 */
            config.module.rules.push({
                test: /\.txt$|\.njk$/,
                use: 'raw-loader',
            })

            config.optimization = {
                // 默认命名 连接符~
                splitChunks: {
                    automaticNameDelimiter: '.',
                },
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                // drop_console: true, // 删除所有console语句
                            },
                            output: {
                                // 删除所有注释 应对安全扫描
                                comments: false,
                            },
                        },
                        extractComments: false,
                    }),
                ],
            }

            return {
                // 打包后将dist/static下的js文件删除注释 和 copy 静态文件/版本文件
                plugins: [new OutputJSPlugin(outputDir), CopyPublicDir(outputDir)],
            }
        },

        chainWebpack: config => {
            setAlias(config)
            /// 多页面处理
            Object.keys(entry.pages).forEach(key => {
                config.plugins.delete(`prefetch-${key}`)

                config.plugin('html-' + key).tap(args => {
                    args[0].cdn = configOptions.staticResource.cdn
                    return args
                })
            })

            /* 跳过 babel-loader */
            config.module.rule('js').exclude.add(path => {
                return /[\\/]src[\\/]libs[\\/].+\.js$/.test(path)
            })

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
}
