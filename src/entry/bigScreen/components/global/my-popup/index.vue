<template>
    <div v-if="showPop" class="pop-container" @click="handleClose">
        <div class="pop-body" @click.stop>
            <div class="pop-title">
                <div class="pop-tittxt">{{ title }}</div>
                <img :src="require('./img/pop-title.svg')" />
            </div>
            <div class="pop-content">
                <slot></slot>
            </div>
            <div class="pop-close" @click="handleClose"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'MyPopup',
    components: {},
})
export default class MyPopup extends Vue {
    @Prop({ default: false }) value!: boolean
    @Prop({ default: '' }) title!: string

    mounted() {}

    @Watch('value', { immediate: true })
    onSecondChange(val: boolean) {
        // this.showPop = val
    }

    handleClose() {
        this.$emit('input', false)
        this.$emit('close')
    }

    showPop = true
}
</script>

<style lang="less" scoped>
@cp: #2d74cb;
@gap: 20px;
.pop-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2022;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    .pop-body {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 1000px;
        border: 1px solid rgba(26, 98, 223, 1);
        border-radius: 15px;
        border-radius: 8px;
        background: #071944;

        .pop-title {
            display: flex;
            align-items: center;
            flex-direction: column;
            .pop-tittxt {
                position: relative;
                display: flex;
                overflow: hidden;
                // justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 0 @gap;
                width: 100%;
                height: 54px;
                color: #ffffff;
                // letter-spacing: 1px;
                font-weight: 400;
                font-size: 26px;
            }
            img {
                width: 984px;
                height: 8px;
            }
        }
        .pop-content {
            flex: 1;
            padding: @gap 30px;
        }
        .pop-close {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 36px;
            height: 36px;
            background-image: url(./img/pop-close.svg);
            background-position: center;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            cursor: pointer;
        }
    }
}
</style>
