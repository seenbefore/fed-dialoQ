/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-03-11 19:57
 * @description 采用TinyPNG node.js API 进行在线压缩图片，并且转换 Webp 格式文件
 * 相关链接：
 * https://tinypng.com
 * https://github.com/jdf2e/Gaea4
 *
 */
'use strict'

const path = require('path')
const fs = require('fs')
const tinify = require('tinify')
const { baseRootPath } = require('../utils/baseRootPath')
const config = require(path.resolve(baseRootPath, 'package.json'))
const chalk = require('chalk')
const glob = require('glob')
const utils = require('./utils')
if (config.tinypngkey === '') {
    console.log(chalk.red('请在package.json 文件配置tinypng的key，如果没有key，请前往【https://tinypng.com/developers】申请'))
    return
}
tinify.key = config.tinypngkey
const ENTRY = 'dist' || process.env.ENTRY
console.log('ENTRY', process.env.ENTRY)
const targets = glob.sync(`${ENTRY}/**/*.{png,jpg}`).map(filepath => {
    const name = path.basename(filepath)
    return {
        name,
        filepath,
    }
})

async function run() {
    console.log(chalk.yellow(`上传TinyPNG中... 总数：${targets.length}`))

    const result = await Promise.map(
        targets,
        async (item, index) => {
            const { name, filepath } = item

            const result = await compress(filepath, name)
            return result
        },
        {
            limit: 5,
        },
    )
    //console.log('result', result)
}
run()

function compress(filePathAll, file) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePathAll, (err, sourceData) => {
            if (err) {
                console.log(chalk.red(`${file} 压缩失败`))
                reject(err)
            } else {
                const fileSize = fs.statSync(filePathAll).size

                console.log(chalk.green(`${filePathAll} ${(fileSize / 1024).toFixed(2)}kb `))
                resolve(file)
                //console.log('fileSize', fileSize)
                //resolve(fileSize)
                // tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
                //     if (err) {
                //         console.log(chalk.red(`${file} 压缩失败`))
                //         return resolve({
                //             filePathAll,
                //             fileSize,
                //             file,
                //             message: err.message,
                //         })
                //     }
                //     //将压缩后的文件保存覆盖
                //     fs.writeFile(filePathAll, resultData, err => {
                //         if (err) {
                //             return resolve({
                //                 filePathAll,
                //                 fileSize,
                //                 file,
                //                 message: err.message,
                //             })
                //         }
                //         const compressFileSize = fs.statSync(filePathAll).size
                //         console.log(
                //             chalk.green(
                //                 `${file} ${(fileSize / 1024).toFixed(
                //                     2,
                //                 )}kb 压缩成功 ${(
                //                     compressFileSize / 1024
                //                 ).toFixed(2)}kb ${(
                //                     ((compressFileSize - fileSize) * 100) /
                //                     fileSize
                //                 ).toFixed(1)}%`,
                //             ),
                //         )
                //         resolve({
                //             filePathAll,
                //             fileSize,
                //             file,
                //             compressFileSize,
                //         })
                //     })
                // })
            }
        })
    })
}
