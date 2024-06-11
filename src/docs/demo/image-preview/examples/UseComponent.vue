<script lang="ts">
import ImagePreview from '@/components/image-preview/index.vue'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component({
    name: 'UseComponent',
    components: { ImagePreview },
})
export default class UseComponent extends Vue {
    @Ref('imagePreviewRef')
    public imagePreviewRef!: ImagePreview

    public clickHandler(): void {
        this.imagePreviewRef.open()
    }
}
</script>

<template>
    <div>
        <img class="img-class" @click="clickHandler" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" alt="" />
        <div>点击图片打开预览页面</div>
        <ImagePreview ref="imagePreviewRef" url="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" :append-to-body="true"></ImagePreview>
    </div>
</template>
