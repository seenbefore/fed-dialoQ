const fs = require('fs')
const path = require('path')
var _terser = require('terser')

/**
 * 去除js文件中注释的版本号，应对安全扫描
 * @param {any} outputPath 打包目录 process.env.outputDir
 * @param {any} rule 匹配js的正则表达式  /static\/assets\/npm/g
 * @returns {any}
 */
class OutputJSPlugin {
    constructor(outputPath, rule) {
        this.outputPath = outputPath || 'dist'
        this.rule = rule || /static\/assets\/npm/g
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('OutputJSPlugin', compilation => {
            if (process.env.NODE_ENV !== 'production') {
                return
            }
            const { assets } = compilation
            const jsAssets = Object.keys(assets).filter(name => /\.js$/.test(name) && this.rule.test(name))
            jsAssets.forEach(js => {
                try {
                    const asset = assets[js]
                    const code = asset.source().toString()
                    const assetPath = path.join(this.outputPath, js)
                    console.log('去除版本号', assetPath)
                    // 压缩 JavaScript 代码
                    var minifiedCode = _terser.minify(code, {
                        output: {
                            comments: false,
                        },
                    }).code
                    fs.writeFileSync(assetPath, minifiedCode, 'utf8')
                } catch (error) {
                    console.log(`去除版本异常 ${js}`)
                }
            })
        })
    }
}

module.exports = OutputJSPlugin
