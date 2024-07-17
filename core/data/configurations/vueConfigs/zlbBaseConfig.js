const postcssPxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const ReplaceFontSize = require('./plugins/ReplaceFontSize.js')

module.exports = () => {
    const getMobileBaseConfig = require('./mobileBaseConfig.js')
    const { css, ...reset } = getMobileBaseConfig()
    console.log(css, '?')
    return {
        ...reset,
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

                        return [ReplaceFontSize(), autoprefixer, pxtorem]
                    },
                },
            },
        },
    }
}
