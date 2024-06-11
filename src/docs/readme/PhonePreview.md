## 说明

### 介绍
移动端上的预览效果


### 安装
```bash
npm install --registry https://registry.npmmirror.com qrcode 
```

下载[src/components/phone-perview](http://gitlab.icinfo.co/fed/vue-template-admin/-/tree/dev/src/components/phone-perview)组件到项目中


### 示例
```javascript
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'PhonePreviewDemo',
    components: {},
})
export default class PhonePreviewDemo extends Vue {
    async handlePreview() {
        await this.$modalDialog(() => import('@/components/phone-perview/index.vue'), {
            // 预览地址
            url: `https://time.geekbang.org`,
        })
    }
}

```