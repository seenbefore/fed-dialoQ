<script lang="ts">
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import ImagePreview from '@/components/image-preview/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'UseHooks',
    components: { ImagePreview },
})
export default class UseHooks extends Vue {
    public clickHandler(): void {
        useImagePreview([
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        ]).then(() => {
            this.$message.info('关闭了预览')
        })
    }
}
</script>

<template>
    <div>
        <img class="img-class" @click="clickHandler" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" alt="" />
        <div>点击图片打开预览页面</div>
    </div>
</template>
