<template>
    <span class="sg-data-export">
        <el-button class="sg-data-export-button sg-data-export__button" type="primary" @click="onExport" v-bind="$attrs">
            <slot :scope="this">{{ label }}</slot>
        </el-button>
    </span>
</template>

<script>
import RenderExport from '../../src/utils/renderExport'
export default {
    name: 'SgDataExport',
    props: {
        // 导出文件名称
        name: {
            type: String,
            default: 'data',
        },
        // 按钮文案
        label: {
            type: String,
            default: '导出',
        },
        // 数据列配置
        columns: {
            type: Array,
            default: () => [],
        },
        // 元数据
        data: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    mounted() {
        new RenderExport(this.columns, {
            defaultValue: '',
        })
    },
    methods: {
        onExport(name) {
            this.$emit('click')
            const fileName = typeof name === 'string' ? name || this.name || 'data' : this.name || 'data'
            if (!this.data.length) {
                console.warn('[没有数据]')
                return
            }
            new RenderExport(this.columns, {
                defaultValue: '',
            }).downloadExl(this.data, fileName)
            this.$emit('success')
        },
    },
}
</script>
