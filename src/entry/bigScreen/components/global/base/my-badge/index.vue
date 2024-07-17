<template>
    <div class="my-badge" :style="stylesCom">
        <img src="./assets/down-bg.png" alt="" class="down-bg" />
        <slot>
            <div class="inner-icon">
                <img :src="img" :style="stylesImg" />
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MyBadge',
    components: {},
})
export default class MyBadge extends Vue {
    @Prop({ type: String, default: '' }) img!: string
    @Prop({ type: String, default: '83' }) width!: string
    @Prop({ type: String, default: '40' }) height!: string
    @Prop({ type: String, default: '28' }) imgSize!: string
    get stylesCom() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
        }
    }
    get stylesImg() {
        return {
            width: `${this.imgSize}px`,
            height: `${this.imgSize}px`,
        }
    }
}
</script>

<style lang="less" scoped>
.my-badge {
    position: relative;
    display: flex;
    justify-content: center;

    .down-bg {
        position: absolute;
        bottom: -6px;
        width: 100%;
    }

    .inner-icon {
        position: relative;
        top: -10px;

        img {
            display: block;
            width: 28px;
            height: 28px;
        }
    }
}
</style>
