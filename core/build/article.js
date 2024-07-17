const glob = require('glob')
const path = require('path')
const { baseRootPath } = require('../utils/baseRootPath')

const root = path.resolve(baseRootPath, 'public/json')
const downloadDir = path.resolve(baseRootPath, 'dist/mp3')
const axios = require('axios')
const fs = require('fs')
//
const data = []
const audio_download_urls = []
glob.sync(path.resolve(root, './*.json')).forEach((dir, index) => {
    const name = path.basename(dir, '')
    data.push({
        id: index,
        title: name,
    })
    try {
        const json = require(dir)
        const { data } = json
        const { audio_download_url, article_title } = data
        console.log('audio_download_url', audio_download_url)
        if (audio_download_url) {
            audio_download_urls.push({
                url: audio_download_url,
                name: article_title,
            })
        }
    } catch (error) {}
})
console.log(data)

async function download(url, name) {
    return new Promise((resolve, reject) => {
        name = name.replace('|', '')
        const filepath = `${downloadDir}/${name}.mp3`
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer',
        })
            .then(response => {
                // 将ArrayBuffer数据写入到本地文件
                fs.writeFile(filepath, response.data, err => {
                    if (err) {
                        console.error('文件写入失败:', err)
                        reject(err)
                    } else {
                        console.log(`文件下载并写入成功:${filepath}`)
                        resolve('ok')
                    }
                })
            })
            .catch(error => {
                console.error('文件下载失败:', error)
                reject(err)
            })
    })
}
async function bootstrap() {
    for (let item of audio_download_urls) {
        await download(item.url, item.name)
    }
    console.log('done')
}
bootstrap()

//download('https://static001.geekbang.org/resource/audio/da/8c/da37b210987f037a13a67291fe3a248c.mp3', '洒洒水')
