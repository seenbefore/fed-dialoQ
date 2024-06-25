### 浙里办模板介绍
- 登录方式
    - 目前登录方式统一修改为通过irs提供的单点登录方式：`ZWJSBridge.ssoTicket()`。
    - 通过该方法获取到一个`ticketId`，然后后端通过这个`ticketId`获取用户信息返回给前端。
- 样式
    - 部分适老化样式已配置。会自动根据是否切换为适老化样式来切换样式
        - 适老化样式配置：`src/entry/zlb-h5/assets/less/var.less`。可根据自身业务做调整。
    - `src/entry/zlb-h5/assets/less/index.less`。内置了一些常用的样式
- 浙里办应用信息配置
    - `src/entry/zlb-h5/share/ZLBConfig.ts`。具体配置参考。
- 埋点信息已配置
    - `src/entry/zlb-h5/App.vue`。beforeUpdate 方法内部。
- 测试环境登录，可以使用固定的 `ticketId` 进行测试
    - 通过 `process.env.VUE_APP_IS_NOT_ZLB` 环境变量区分是否为测试环境。
    - `src/entry/zlb-h5/mixins/initMixins.ts`。初始化的mixins，用于做一些前置的处理，修改 initLogin 中的固定 `ticketId` 即可。
- 加密
    - 默认掉用 `post` 接口的时候是会将参数都加密传输的。加密规则使用的是 `3des`
    - `src/entry/zlb-h5/scripts/http/exAuth.ts`。加密方法。
- 打包
    - 打包需要修改配置文件
        - 脚本: `npm run build:zlb-prd:zlb-h5`
        - 配置更改。`src/entry/zlb-h5/.env.production`
```shell
## 将 2002323517 修改为 ZLBConfig 中的 miniAppId。
## 将 v0.0.2 修改为对应的版本。注意：版本在每次打包都应该变！
BASE_URL = '/web/mgop/gov-open/zj/2002323517/v0.0.2/'
```

### 关于zlb-h5项目复制注意事项
- 浙里办模板中所有的文件都在`src/entry/zlb-h5`目录下，所以直接将整个目录复制即可，复制之后需要修改和复制以下配置和声明文件
  - 修改`package.json`，增加脚本。参考下面配置
    ```shell
    "api:zlb-h5": "node src/entry/zlb-h5/api-generator",
    "dev:zlb-h5": "cross-env VUE_APP_ENTRY=zlb-h5 vue-cli-service serve --open --mode=development",
    "build:zlb-dev:zlb-h5": "rm -rf build-zip && cross-env VUE_APP_ENTRY=zlb-h5 vue-cli-service build --mode=zlb-development",
    "build:zlb-prd:zlb-h5": "rm -rf build-zip && cross-env VUE_APP_ENTRY=zlb-h5 vue-cli-service build --mode=production"
    ```
  - 复制声明文件
    - 将`src/typing/global.d.ts`和`src/typing/zjb.d.ts`复制到复制的项目中
  - 修改`tsconfig.json`
    - 增加别名
    ```json
        "paths": {
            "@zlb-h5/*": ["src/entry/zlb-h5/*"]
        },
    ```
