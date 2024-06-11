# 数据mock

## .env 配置
更改配置后需要重启服务
```
# 是否启用 mock
VUE_APP_MOCK = true
```


## main.ts 入口文件
项目目录下确保有mock文件，如果没有可以从`src/mock`下拷贝一份
```javascript
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('./mock')
}
```

## 数据格式
有两种模式

### json
`data`目录下, 当请求地址为 `/sms/sendSms` ====> `data/sms/sendSms.json` 返回数据 `sendSms.json` 中的数据

可以通过在`package.json`中添加私有库 `"api-server": "git+ssh://git@gitlab.icinfo.co:fed/tool.api.git#v0.2.4"`自动生成 （后端需要引入[maven 插件](http://wiki.icinfo.co/pages/viewpage.action?pageId=13837340)，提供地址比如`http://api.fed.icinfo.co/zzk/dtcenter/dt-qualities/develop/api.json`）

创建`api-generator.js`
```javascript
const axios = require('axios')
const { generate } = require('icinfo-api-generator')

async function main() {
    ;[
        // 后端提供
        'http://api.fed.icinfo.co/zzk/dtcenter/dt-qualities/develop/api.json',
    ].forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            // 生成数据的目录
            mockDir: 'src/template-entry/vue-template-admin/mock/data',
             // 生成API的目录
            tsDir: 'src/template-entry/vue-template-admin/services',
            merge: true,
            request: 'http.request',
            // 根据项目修改http地址
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
        })

        // eslint-disable-next-line no-console
        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()
```

执行即可

```
node  api-generator.js
```

### javascript
`modules`目录下，可以利用`mock.js` 和请求参数生成特定数据。文件名称随意，可在一个文件中定义多个请求，也可以通过`npm run mock` 生成mock文件

格式如下
```javascript
import { mock } from 'mockjs'
const roles = [
    '系统管理员',
    '平台管理员',
    '数据统计人员',
    '信息录入人员',
    '普通人员',
]
export default [
    {
        name: '/mock/system/user/list',
        method: 'post',
        description: '用户列表',
        onMock(opt, query, body) {
            let { page = 1, pageSize, length } = body
            page = page || 1
            pageSize = pageSize || length || 10
            return mock({
                code: 0,
                data: {
                    [`list|${pageSize}`]: [
                        {
                            'id|+1': 0,
                            name: '@name',
                            nickName: '@cname',
                            'status|1': [0, 1],
                            'role|1': roles,
                            'isAdmin|1': [0, 1],
                        },
                    ],
                    pager: {
                        page: page,
                        pageSize: pageSize,
                        total: 198,
                    },
                },
                message: '请求提示',
            })
        },
    },
]

```
**通过命令创建**
```bash
# 选择 mock
npm run new 
```

**调用**
```javascript
this.$http.post('/mock/system/user/list').then(conosle.log)
```


