const path = require('path')
const baseConfig = require('./core/data/configurations/vueConfigs/mainConfig.js')
const { parseSvg } = require('./core/data/configurations/vueConfigs/utils/parseSvg')

/* 获取基础的配置 */
const { chainWebpack, ...config } = baseConfig()

module.exports = {
    ...config,
    chainWebpack: config => {
        /* 拿到基础的配置 */
        chainWebpack(config)

        /* 处理svg */
        const svgSpriteIconsDir = path.join(__dirname, './src/components/SvgIcon/icons/')
        parseSvg(config, svgSpriteIconsDir)
    },
}
