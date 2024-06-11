<template>
    <div class="preview-fiels-nav" :class="{ 'preview-fiels-nav-gap': !showClose }">
        <div class="pfn-operate pfn-op-pre" @click="handlePre">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="pfn-operate pfn-op-next" @click="handleNext">
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ENUM_TOGGLE } from '../config'

@Component({
    name: 'PreviewFilesGroupNavPag',
    components: {},
})
export default class PreviewFilesGroupNavPag extends Vue {
    /** 是否可以关闭 */
    @Prop({ default: true }) showClose!: boolean

    handlePre() {
        this.$emit('toggle', ENUM_TOGGLE.PRE)
    }
    handleNext() {
        this.$emit('toggle', ENUM_TOGGLE.NEXT)
    }
}
</script>

<style scoped lang="less">
.preview-fiels-nav {
    @lr: 3px;
    .pfn-operate {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 45px;
        background: rgba(0, 0, 0, 0.7);
        box-shadow: 0 0 3px #999;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 34px;
        font-weight: 600;
    }
    .pfn-op-pre {
        left: @lr;
        padding-right: 3px;
    }
    .pfn-op-next {
        right: @lr;
        padding-left: 5px;
    }
}
.preview-fiels-nav-gap {
    @lr: 30px;
    .pfn-operate {
        width: 55px;
        height: 55px;
    }
    .pfn-op-pre {
        left: @lr;
        padding-right: 3px;
    }
    .pfn-op-next {
        right: @lr;
        padding-left: 5px;
    }
}
</style>
