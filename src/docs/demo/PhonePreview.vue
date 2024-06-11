<template>
    <div>
        <el-button type="primary" @click="handlePreview">点击预览</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'PhonePreviewDemo',
    components: {},
})
export default class PhonePreviewDemo extends Vue {
    async handlePreview() {
        await this.$modalDialog(() => import('@/components/phone-perview/index.vue'), {
            url: `https://time.geekbang.org`,
        })
    }
}
</script>

<style lang="less" scoped></style>
