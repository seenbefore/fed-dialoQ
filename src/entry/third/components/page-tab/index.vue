<template>
    <div class="page-tab">
        <el-radio-group v-model="comVal" :style="myStyle">
            <el-radio-button v-for="item in options" :label="item.value" :key="item.value" :style="{ width }">
                <slot :row="item">{{ item.label }}</slot>
            </el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number, Boolean],
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        width: {
            type: Number,
            default: 572,
        },
        // 容器宽度
        maxWidth: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    computed: {
        myStyle() {
            const result = {}
            if (this.maxWidth) {
                result.width = this.maxWidth
            }
            return result
        },
        comVal: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            },
        },
    },
}
</script>

<style lang="less" scoped>
.page-tab {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    ::v-deep {
        .el-radio-group {
            user-select: none;
            padding: 5px 20px;
            background: #eeeeee;
            border-radius: 4px;
            display: flex;
            width: 100%;
            min-width: 500px;
        }
        .el-radio-button {
            flex: 1;
        }
        .el-radio-button__inner {
            height: 40px;
            width: 100%;
            font-size: 18px;
            color: #666666;
            font-weight: 400;
            background-color: transparent;
            border: none;
            border-radius: 6px;
            text-align: center;
            padding: 0;
            line-height: 40px;
            position: relative;
        }
        .el-radio-button.is-active .el-radio-button__inner {
            background: #ffffff;
            box-shadow: 0px 2px 4px 0px rgba(77, 121, 255, 0.3) !important;
            font-size: 18px;
            color: #0b91ff;
            font-weight: 600;
        }
    }
}
</style>
