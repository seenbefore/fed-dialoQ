<template>
    <span class="checkbox-control">
        <el-checkbox v-model="myValue" :disabled="readonly">{{ label }}</el-checkbox>
    </span>
</template>
<script>
export default {
    name: 'CheckboxControl',
    props: {
        /**当前输入的值 */
        value: {
            type: [Boolean, String],
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        /**只读 */
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            myValue: false,
        }
    },
    watch: {
        value: {
            handler(newV) {
                this.myValue = Boolean(newV)
                this.$emit('input', this.myValue)
            },
            immediate: true,
        },
        myValue(newV) {
            this.$emit('input', newV)
        },
    },
}
</script>
<style lang="less" scoped>
.checkbox-control {
    /deep/.el-checkbox {
        display: inline;
        font-size: inherit;
        .el-checkbox__input {
            display: inline;
            position: static;
            .el-checkbox__inner {
                border-color: #333;
            }
        }
        .el-checkbox__label {
            display: inline;
            padding-left: 0;
            font-size: inherit;
            color: #333;
            line-height: inherit;
        }
    }
}
</style>
