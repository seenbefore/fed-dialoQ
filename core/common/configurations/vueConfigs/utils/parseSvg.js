/**
 * 处理svg
 * @param config chainWebpack 的 config
 * @param svgSpriteIconsDir svg存放的文件夹
 */
const parseSvg = (config, svgSpriteIconsDir) => {
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
}

exports.parseSvg = parseSvg
