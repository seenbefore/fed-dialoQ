<script lang="ts">
import { imagePreviewDirective } from '@/components/image-preview/directive'
import { Component, Vue } from 'vue-property-decorator'
import App from 'vue'

/* demo使用，所以注册到当前组件 */
App.use(imagePreviewDirective)

@Component({
    name: 'UseDirective',
})
export default class UseDirective extends Vue {
    public list = [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    ]
}
</script>

<template>
    <div>
        <img class="img-class" v-image-preview src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" alt="" />
        <div>点击图片打开预览页面</div>
        <br />
        <div v-image-preview class="use-directive-block">
            <div>指令挂载在容器外部，实现点击某个图片放大某个</div>
            <img class="img-class" v-for="item in list" :key="item" :src="item" alt="" />
        </div>
    </div>
</template>

<style scoped lang="less">
.use-directive-block {
    .img-class {
        margin-right: 15px;
    }
}
</style>
