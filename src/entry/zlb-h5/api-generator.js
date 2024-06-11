const axios = require('axios')
const { generate } = require('icinfo-api-generator')
async function main() {
    const apis = ['http://api.fed.icinfo.co/gongan/officekeeper/default/master/api.json']
    apis.forEach(async url => {
        // @ts-ignore
        const result = await axios(url)

        generate(result.data, {
            tsDir: 'src/entry/zlb-h5/services',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@zlb-h5/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
        })

        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()
