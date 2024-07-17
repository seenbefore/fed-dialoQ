const axios = require('axios')
const { generate } = require('icinfo-api-generator')
const { Log } = require('../../../core/share/log')

const apiUrls = []

async function main() {
    const length = apiUrls.length
    if (!length) {
        return
    }
    for (let i = 0; i < length; ++i) {
        const url = apiUrls[i]
        const result = await axios(url)
        generate(result.data, {
            // API生成地址
            tsDir: 'src/entry/library/api/auto',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@library/scripts/http'`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
        })
        Log.success('已成功生成：', url.replace(/\/api\.json$/, ''))
    }
}

main()
