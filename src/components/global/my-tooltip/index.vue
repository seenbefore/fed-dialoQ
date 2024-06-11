<template>
    <el-tooltip v-bind="$attrs" :placement="placement">
        <div slot="content" v-html="content"></div>
        <span v-html="text"></span>
    </el-tooltip>
</template>

<script>
export default {
    components: {},
    props: {
        // 待复制的文本
        text: {
            type: String,
            default: '',
        },
        // 待复制的文本
        content: {
            type: String,
            default: '',
        },
        placement: {
            type: String,
            default: 'top',
        },
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less"></style>
