<template>
    <span>
        <img :src="myValue" :style="{ width, height, display: getDisplay }" />
    </span>
</template>
<script>
export default {
    name: 'ImageControl',
    props: {
        /**当前输入的值 */
        value: {
            type: [String],
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '',
        },
        configInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        getDisplay() {
            // 执法人员签名一般是和执法证号在一行显示 参考DT2A0553300ZJXXDJBCTZS00002
            if (this.configInfo.templateFieldEn?.toLowerCase()?.includes('signpic')) {
                return ''
            }
            // 原来逻辑
            return this.myValue ? 'block' : 'none'
        },
    },
    data() {
        return {
            myValue: '',
        }
    },
    watch: {
        value: {
            handler(newV) {
                this.myValue = newV
            },
            immediate: true,
        },
    },
}
</script>
