<template>
    <div class="sg-page AdminCompQuill">
        {{ content }}
        <QuillEditor v-model="content" :upload-config="uploadConfig"></QuillEditor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuillEditor from '@/components/quill-editor/index.js'
import { http } from '@/scripts/http'
@Component({
    name: 'AdminCompQuill',
    components: {
        QuillEditor,
    },
})
export default class AdminCompQuill extends Vue {
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
                })
                .then(res => {
                    console.log(res.data)
                    const data = res.data || {}
                    return data.url
                })
        },
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
