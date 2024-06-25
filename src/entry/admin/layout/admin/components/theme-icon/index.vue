<template>
    <el-tooltip class="item" effect="dark" :content="tip" placement="top">
        <div class="theme-icon" @click="handleClick">
            <div class="theme-icon-sidebar">
                <div class="theme-icon-sidebar-logo" :style="{ 'background-color': logo }"></div>
                <div class="theme-icon-sidebar-menu" :style="{ 'background-color': menu }"></div>
            </div>
            <div class="theme-icon-content">
                <div class="theme-icon-content-header" :style="{ 'background-color': header }"></div>
                <div class="theme-icon-content-main" :style="{ 'background-color': main }">
                    <div class="active" v-if="active === name">
                        <i class="el-icon-check" :style="{ color: activeColor }"></i>
                    </div>
                </div>
            </div>
        </div>
    </el-tooltip>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: 'default',
        },
        name: {
            type: String,
            default: 'default',
        },
        active: {
            type: String,
            default: '',
        },
        menu: {
            type: String,
            default: '',
        },
        logo: {
            type: String,
            default: '',
        },
        header: {
            type: String,
            default: '',
        },
        main: {
            type: String,
            default: '',
        },
        tip: {
            type: String,
            default: '默认菜单风格',
        },
        activeColor: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleClick() {
            this.$emit('update:active', this.$props.name)
            this.$emit('input', this.$props.name)
        },
        //
    },
}
</script>

<style lang="less" scoped>
.theme-icon {
    display: inline-flex;
    overflow: hidden;
    width: 50px;
    height: 50px;
    outline: none;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    &-sidebar {
        display: flex;
        flex-direction: column;
        width: 18px;
        &-logo {
            width: 20px;
            height: 10px;
            background-color: #263445;
        }
        &-menu {
            flex: 1;
            background-color: rgb(40, 65, 90);
        }
    }
    &-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        &-header {
            height: 10px;
            background-color: #fff;
        }
        &-main {
            position: relative;
            flex: 1;
            background-color: #f0f2f5;
            .active {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                i {
                    color: #000;
                    font-weight: bold;
                    font-size: 22px;
                }
            }
        }
    }
}
.theme-icon + .theme-icon {
    margin-left: 20px;
}
</style>
