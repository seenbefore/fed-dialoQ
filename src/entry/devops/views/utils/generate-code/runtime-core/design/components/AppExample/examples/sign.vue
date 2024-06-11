<script lang="ts">
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { useSignature } from 'icinfo-electronic-signature'
import { Component, Prop, Ref } from 'vue-property-decorator'

@Component({
    name: 'SignComponent',
})
export default class SignComponent extends UseApplication {
    @Prop({ type: Object, default: () => ({}) })
    public properties!: any

    @Ref('container')
    public container!: HTMLDivElement

    public unWatch: () => void = () => void 0

    public mounted(): void {
        const { useSubmit, useUpdate } = useSignature(this.container, this.properties ?? '张三')
        // 返回签名base64 signBase64
        useSubmit((signBase64: string) => {
            // 将base64进行上传即可。如果有ocr需求，可以在上传之前自行进行校验
            // 上传例子
            console.log(signBase64)
        })

        this.unWatch = this.$watch(
            () => this.properties,
            value => {
                this.$nextTick(() => {
                    Reflect.ownKeys(this.properties).forEach(key => {
                        if (key !== 'isAutoDestroy') {
                            useUpdate(key as any, Reflect.get(this.properties, key))
                        }
                    })
                })
            },
            { deep: true },
        )
    }

    public beforeDestroy(): void {
        this.unWatch()
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
