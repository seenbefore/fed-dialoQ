<template>
    <div class="my-container-class" :style="styleContainer">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MyContainer',
    components: {},
})
export default class MyContainer extends Vue {
    @Prop({ default: '' }) width!: string
    @Prop({ default: '' }) height!: string
    @Prop({ default: '' }) left!: string
    @Prop({ default: '' }) right!: string
    @Prop({ default: '' }) top!: string
    @Prop({ default: '' }) bottom!: string
    @Prop({ default: '' }) backgroundSrc!: string
    created() {}
    mounted() {}
    private unitCalc(param: string | number) {
        if (param === '') return ''
        if (Number(param) == param) {
            return `${param}px`
        } else {
            return param
        }
    }
    get styleContainer() {
        const { top, right, left, bottom, width, height, backgroundSrc } = this
        const styles: any = {
            top: this.unitCalc(top),
            right: this.unitCalc(right),
            left: this.unitCalc(left),
            bottom: this.unitCalc(bottom),
            width: this.unitCalc(width),
            height: this.unitCalc(height),
        }
        if (backgroundSrc) {
            styles['background-image'] = `url(${backgroundSrc})`
        }
        return styles
    }
}
</script>

<style lang="less" scoped>
.my-container-class {
    position: fixed;
    background-size: 100% 100%;
}
</style>
