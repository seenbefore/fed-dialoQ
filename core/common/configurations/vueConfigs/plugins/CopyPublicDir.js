const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { baseRootPath } = require('../../../../utils/path.js')

/**
 * copy public 文件夹到打包的产物中
 * @param outputDir
 * @return {*}
 */
module.exports = function(outputDir) {
    return new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../../../public'),
            to: path.resolve(baseRootPath, outputDir),
        },
        /* 把 core 的配置文件也一起打包进去 */
        {
            from: path.resolve(__dirname, '../../../../config.json'),
            to: path.resolve(baseRootPath, outputDir),
        },
    ])
}
