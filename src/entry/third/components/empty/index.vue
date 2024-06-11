<template>
    <div class="empty-page">
        <div class="empty-icon"></div>
        <div class="empty-title">{{ message }}</div>
        <div class="empty-description">
            <span>{{ tip }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class Empty extends Vue {
    @Prop({ default: '未匹配到相关结果' }) message!: string
    @Prop({ default: '试试更改搜索条件' }) tip!: string
}
</script>
<style lang="less" scoped>
.empty-page {
    height: 100%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.empty-icon {
    width: 64px;
    height: 64px;
    background: url(./empty.svg) no-repeat 50%;
    background-size: contain;
    margin-bottom: 15px;
}
.empty-title {
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 8px;
}
.empty-description {
    font-size: 14px;
    line-height: 20px;
    color: #606c80;
}
</style>
