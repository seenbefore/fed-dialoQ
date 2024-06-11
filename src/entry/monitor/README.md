## 介绍
埋点数据展示平台


## 使用

- **Run：**

```bash

npm run dev:monitor
```

- **Build：**

```bash
# 测试环境
npm build:uat:monitor

# 生产环境
npm build:prd:monitor
```



## 运维部署 
### 测试环境
- 测试地址：http://vue-template-admin_monitor.uat.icinfo.co/#/login
- 蜻蜓流水线：http://192.168.1.147:3001/admin/devops/pipeline/vue-template-admin_monitor?_=%E5%9F%8B%E7%82%B9%E7%9B%91%E6%8E%A7%E5%B9%B3%E5%8F%B0-monitor





### 正式
先找夏俊伟在正式上部署对应的数据服务，获取对应项目的`clientId`、`clientSecret`以及对应的接口地址比如`http://192.168.1.178:7070`（nginx配置需要）

修改
`src/entry/monitor/settings.js`
比如处罚
```javascript
module.exports = {
    key: 'monitor',
    title: '监控平台',
    keywords: '',
    description: '',
    filename: 'index.html',
    template: 'public/index.html',
    settings: {
        apps: [
            // 已上线
            {
                clientName: '浙江省统一行政处罚办案系统（2.0版）',
                // 正式环境应用域名
                host: 'zjxzcf.zjsft.gov.cn',
                clientId: 'SKK7Ewwa',
                clientSecret: 'iTfMoYWtaawXVbH5vobWYVPdYCwKtpC8',
            },
        ],
    },
}


```

蜻蜓上打正式包
**命令**
```bash
npm build:prd:monitor
```

**nginx**
```
server {
   
      # 埋点反向代理地址
        location /@MITO/api/ {
            # 结合实际的服务地址
            proxy_pass http://192.168.1.178:7070/api/;
        }
}     


```


