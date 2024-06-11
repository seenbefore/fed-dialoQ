<template>
    <div class="my-image-toolbar">
        <div v-for="item in listAction" :key="item.action" :title="item.title" class="img-toolbar-button" @click="handleClick(item.action)">
            <i :class="item.icon"></i>
            <div class="toolbar-text">{{ item.title }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ENUM_ACTION } from './config'

@Component({
    name: 'MyImageToolBar',
    components: {},
})
export default class MyImageToolBar extends Vue {
    listAction = [
        {
            icon: 'el-icon-zoom-out',
            action: ENUM_ACTION.ZOOMOUT,
            title: '缩小',
        },
        {
            icon: 'el-icon-zoom-in',
            action: ENUM_ACTION.ZOOMIN,
            title: '放大',
        },
        {
            icon: 'el-icon-refresh',
            action: ENUM_ACTION.RESET,
            title: '复原',
        },
        {
            icon: 'el-icon-refresh-left',
            action: ENUM_ACTION.ROTATELEFT,
            title: '左旋转',
        },
        {
            icon: 'el-icon-refresh-right',
            action: ENUM_ACTION.ROTATERIGHT,
            title: '右旋转',
        },
    ]
    handleClick(action: string) {
        this.$emit('click', action)
    }
}
</script>

<style scoped lang="less">
.my-image-toolbar {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #606266;
    border-radius: 32px;
    padding: 8px 23px;
    display: flex;
    opacity: 0.8;
    user-select: none;
    .img-toolbar-button {
        width: 60px;
        // height: 42px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        & + .img-toolbar-button {
            // margin-left: 10px;
        }
        .toolbar-text {
            font-size: 12px;
            white-space: nowrap;
        }
    }
}
</style>
