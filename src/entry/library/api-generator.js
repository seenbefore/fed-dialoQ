const axios = require('axios')
const { generate } = require('icinfo-api-generator')

async function main() {
    ;[
        // 组件货架
        'http://api.fed.icinfo.co/CBB/cbb-application/icinfo-shelves-spring-boot/default/master/api.json',
        // 可视化表单
        'http://api.fed.icinfo.co/CBB/cbb-starter/icinfo-from-spring-boot-starter/default/master/api.json',
    ].forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            // mock数据生成地址
            // mockDir: 'src/mock/data',
            // API生成地址
            tsDir: 'src/entry/library/api/auto',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
        })

        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()
