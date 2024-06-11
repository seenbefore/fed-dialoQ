<template>
    <el-tooltip v-bind="$attrs" :placement="placement" popper-class="sg-help-tooltip">
        <div slot="content" v-html="text"></div>
        <i class="sg-help-icon" :class="icon"></i>
    </el-tooltip>
</template>

<script>
export default {
    name: 'SgBaseHelp',
    props: {
        // 提示
        text: {
            type: String,
            default: '',
        },

        placement: {
            type: String,
            default: 'top',
        },
        icon: {
            type: String,
            default: 'el-icon-info',
        },
    },

    data() {
        return {}
    },

    methods: {},
}
</script>
