const axios = require('axios')
const { generate } = require('icinfo-api-generator')
async function main() {
    // 注意 文档地址后加/api.json
    const apis = ['http://api.fed.icinfo.co/unifiedcase/electric-archive-service/electric-archive-service/dev/api.json']
    apis.forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            // mockDir: 'src/mock/auto',
            tsDir: 'src/services/auto',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
            // 指定生成限定的接口路径
            include: ['/config/archiveVolume'],
        })

        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()
