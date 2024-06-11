## 介绍
API生成工具

## 安装

**方式一**
```bash
npm install git+ssh://git@gitlab.icinfo.co:fed/tool.api.git#v0.2.4
```

```javascript
const { generate } = require('api-server')
```

**方式二**
```bash
npm install icinfo-api-generator -D
```

```javascript
const { generate } = require('icinfo-api-generator')
```

## 使用

**新建api-generator.js**
```javascript
const axios = require('axios')
const { generate } = require('icinfo-api-generator')
async function main() {
    const apis = [
        'http://api.fed.icinfo.co/CBB/cbb-application/icinfo-devops-library/default/develop/api.json',
    ]
    apis.forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            mockDir: 'src/mock/auto',
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
        })

        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()


```

**运行**
```bash
node api-generator.js
```