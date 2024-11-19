<template>
    <span class="select-control" :class="{ 'show-popup': popupVisible }">
        <span class="selected-text" v-text="myValue"></span>
        <el-select :value="value" placeholder="请选择" ref="select" @change="change" popper-class="select-control-popper" :multiple="multiple" @visible-change="visibleChange">
            <el-option v-for="item in myOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </span>
</template>
<script>
import { debounce } from 'lodash'
export default {
    name: 'SelectControl',
    props: {
        value: {
            type: String,
            default: '',
        },
        options: {
            type: [String, Array, Promise, Function],
            default() {
                return []
            },
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            popupVisible: false,
            showText: '',
            myOptions: [],
        }
    },
    computed: {
        myValue() {
            const selected = this.myOptions.find(({ value }) => value === this.value)
            if (selected && selected.value !== '') return selected.label
            return this.value
        },
    },
    watch: {
        options: {
            async handler(newV) {
                await this.initOptions()
            },
            immediate: true,
            deep: true,
        },
    },
    async mounted() {},
    methods: {
        async initOptions() {
            const defaultOptions = [{ label: '请选择', value: '' }]
            if (Array.isArray(this.options)) {
                this.myOptions = [...defaultOptions, ...this.options]
            } else if (typeof this.options === 'function') {
                const result = this.options()
                if (result.then) {
                    this.loading = true
                    const options = await result.finally(() => (this.loading = false))
                    this.myOptions = [...defaultOptions, ...(options || [])]
                } else if (Array.isArray(result)) {
                    this.myOptions = [...defaultOptions, ...result]
                }
            }
        },
        async change(value) {
            this.$emit('input', value)
        },
        visibleChange(visible) {
            this.popupVisible = visible
        },
    },
}
</script>
<style lang="less">
.select-control-popper {
    transform: translateX(-30px);
    &.is-multiple .el-select-dropdown__item.selected {
        padding-right: 50px;
    }
}
</style>
<style lang="less" scoped>
.select-control {
    position: relative;
    border-bottom: 1px solid;
    .selected-text {
        &:empty::before {
            content: '请选择';
            color: #ccc;
        }
        // &::after {
        //     content: '\e6df';
        //     position: absolute;
        //     color: #ccc;
        //     font-family: element-icons !important;
        //     -webkit-font-smoothing: antialiased;
        //     -moz-osx-font-smoothing: grayscale;
        //     font-style: normal;
        //     font-weight: 400;
        //     line-height: 1;
        //     text-transform: none;
        //     vertical-align: baseline;
        //     font-variant: normal;
        //     transition: ease-in-out 0.5s;
        // }
    }
    &::after {
        content: '\e6df';
        color: #ccc;
        font-family: element-icons !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        text-transform: none;
        vertical-align: baseline;
        font-variant: normal;
    }
    &.show-popup {
        &::after {
            content: '\e6e1';
        }
    }
    // &::after {
    //     content: '';
    //     padding: 5px 12px;
    //     background-position: center;
    //     background-size: 25px;
    //     background-repeat: no-repeat;
    //     cursor: pointer;
    //     background-image: url('../../images/select_icon.svg');
    // }
    /deep/.el-select {
        position: absolute;
        width: 24px;
        height: 29px;
        overflow: hidden;
        opacity: 0;
        cursor: pointer;
        .el-input__inner {
            padding: 0;
            width: 0;
            height: 29px;
        }
        .el-select__tags {
            display: none;
        }
    }
}
</style>
