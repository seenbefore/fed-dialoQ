<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { useSignature } from 'icinfo-electronic-signature'

@Component({
    name: 'SignComponent',
})
export default class SignComponent extends Vue {
    @Ref('container')
    public container!: HTMLDivElement

    public mounted(): void {
        const { useSubmit } = useSignature(this.container, '张三')
        // 返回签名base64 signBase64
        useSubmit((signBase64: string) => {
            // 将base64进行上传即可。如果有ocr需求，可以在上传之前自行进行校验
            // 上传例子
            console.log(signBase64)
        })
    }
}
</script>

<template>
    <div class="sign__container" ref="container"></div>
</template>

<style lang="less" scoped>
.sign {
    &__container {
        width: 100%;
        height: 100%;
    }
}
</style>
