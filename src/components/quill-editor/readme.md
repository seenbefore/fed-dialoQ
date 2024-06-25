## quill富文本编辑器
请参考[Vue-Quill-Editor](https://www.kancloud.cn/liuwave/quill/1434140)


**使用**
```html
<template>
    <QuillEditor
        v-model="content"
        :upload-config="uploadConfig"
        :video-config="videoConfig"
    ></QuillEditor>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { http } from '@/scripts/http'
@Component({
    name: 'Demo',
    components: {
        QuillEditor,
    },
})
export default class Demo extends Vue {
    content = ''
    uploadConfig = {
        //action: 'http://localhost:8181/openapi/upload2',
        'http-request': ({ data, file, filename }: any) => {
            const formData = new FormData()
            formData.append('file', file)
            //formData.append('param1', '1')
            //return Promise.resolve('https://tva1.sinaimg.cn/large/008i3skNly1gqzmpw2gjoj30u50ktwkj.jpg')
            return http
                .request({
                    url: '/open/upload',
                    data: formData,
                    //baseURL: 'http://192.168.1.242:8081/devops',
                    method: 'post',
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                    onUploadProgress(event) {
                        data.onProgress({ percent: Math.round((event.loaded / event.total) * 100) })
                    },
                })
                .then(res => {
                    console.log(res.data)
                    const data = res.data || {}
                    return data.url
                })
        },
    }
    
    // 视频配置
    videoConfig = {
        // 示例
        // 插入视频默认宽度，不传默认600
        // width: 300,
        // 插入视频默认高度，不传默认auto
        // height: 169,
        // 视频上传请求, 不传默认共用uploadConfig.httpRequest
        // httpRequest: async (data: any) => {
        //     // return 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
        //     const resp = await portalUploadAutoType(
        //         { file: data.file },
        //         {
        //             exApiHooks: ['uploadFile'],
        //             exShowLoading: false,
        //             // 上传进度
        //             onUploadProgress(event) {
        //                 data.file.percent = Math.round((event.loaded / event.total) * 100)
        //                 data.onProgress(data.file)
        //             },
        //         },
        //     )
        //     return resp.data.url
        // },
    }
    mounted() {}
}
</script>

```



### 基础属性

| 参数 | 说明         | 类型     | 可选值 | 默认值         |
| ---- | ------------ | -------- | ------ | -------------- |
| uploadConfig | 上传配置 | Object  | —      | -           |
| videoConfig  | 视频配置 | Object  | —      | -           |
| disabled | 是否可编辑 | Boolean  | —      | false          |


#### uploadConfig
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| multiple | 是否支持多选文件 | boolean | — | — |
| data | 上传时附带的额外参数 | object | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| show-file-list | 是否显示已上传文件列表 | boolean | — | true |
| drag | 是否启用拖拽上传 | boolean | — | false |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效）| string | — | — |
| on-preview | 点击文件列表中已上传的文件时的钩子 | function(file) | — | — |
| on-remove | 文件列表移除文件时的钩子 | function(file, fileList) | — | — |
| on-success | 文件上传成功时的钩子 | function(response, file, fileList) | — | — |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | — | — |
| on-change | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | function(file, fileList) | — | — |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。| function(file, fileList) | — | — |
| list-type | 文件列表的类型 | string | text/picture/picture-card | text |
| auto-upload | 是否在选取文件后立即进行上传 | boolean | — | true |
| file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | — | [] |
| http-request | 覆盖默认的上传行为，可以自定义上传的实现 | function | — | — |
| disabled | 是否禁用 | boolean | — | false |
| limit | 最大允许上传个数 |  number | — | — |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | - |

#### videoConfig
| 参数        | 说明                                               | 类型                                                             | 可选值 | 默认值 |
| ----------- | -------------------------------------------------- | ---------------------------------------------------------------- | ------ | ------ |
| width       | 插入视频默认宽度，不传默认600                      | number                                                           | —      | 600    |
| height      | 插入视频默认高度，不传默认auto                     | number                                                           | —      | auto   |
| httpRequest | 视频上传请求, 不传默认共用uploadConfig.httpRequest | { file: File; onProgress?: (data: { percent: number }) => void } | —      | -      |

### 方法

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |


### 事件

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |


### 配置
**引入依赖包**，参考`vue-template-admin`的`vue.config.js`
```javascript
const staticResourceMap = {
    // 开发环境
    dev: {
        externals: {
            quill: 'Quill',
            'quill-image-resize-module': 'ImageResize',
        },
        cdn: {
            css: [
                    'static/assets/npm/quill/1.3.7/quill.core.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.snow.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.bubble.min.css',
            ],
            js: [
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/quill/image-resize.min.js',
            ],
        },
    },
    // 生产环境
    build: {
        externals: {
            quill: 'Quill',
            'quill-image-resize-module': 'ImageResize',
        },
        cdn: {
            css: [
              
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.core.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.snow.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.bubble.min.css',
            ],
            js: [
                
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/quill/image-resize.min.js',
            ],
        },
    },
}
```