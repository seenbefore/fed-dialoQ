<template>
    <div class="sg-page AdminCompSvgIcon">
        <div :class="$style.title">
            - 图标集中放置在 @/components/SvgIcon/icons/ 目录里
            <br />
            - 单色模式(非'mt-'前缀)，大小继承至 font-size，颜色继承至 color
            <br />
            - 多色模式('mt-'前缀)，大小继承至 font-size，颜色则原始显示
            <br />
            -
            <b style="color:red">建议：不要用中文命名，在一些项目下可能无法访问</b>
        </div>
        <div :class="$style.itemsBox">
            <el-tooltip v-for="name in names" :key="name" effect="light">
                <div :class="$style.item">
                    <svg-icon :class="$style.svg" :icon="name" />
                    <div :class="$style.name" v-text="name"></div>
                </div>
                <div slot="content" v-text="`<svg-icon icon='${name}' />`"></div>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { names } from '@/components/SvgIcon/index.vue'
@Component({
    name: 'AdminCompSvgIcon',
    components: {},
})
export default class AdminCompSvgIcon extends Vue {
    names = names
    mounted() {}
}
</script>

<style lang="less" module>
.title {
    margin-bottom: 0.6em;
}
.itemsBox {
    display: flex;
    flex-flow: wrap;
    text-align: center;
    background-color: #ddd;
}
.item {
    width: 110px;
    padding: 10px 5px;
}
.svg {
    font-size: 32px;
    color: #606266;
    transition: color 0.3s;
}
.item:hover .svg {
    color: #5cb6ff;
}
.name {
    margin-top: 10px;
}
</style>
