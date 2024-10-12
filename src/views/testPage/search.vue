<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'TestPageSearch',
})
export default class TestPageSearch extends Vue {
    @Prop({ type: Object, default: () => ({}) })
    public queryModel!: Record<string, any>

    public get formAttrs() {
        return {
            fields: [
                {
                    span: 8,
                    tag: 'select',
                    name: '效能评价考核',
                    itemAttrs: {
                        label: '效能评价考核',
                    },
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '指标',
                    itemAttrs: {
                        label: '指标',
                    },
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '标签',
                    itemAttrs: {
                        label: '标签',
                    },
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'date',
                    name: '考核生成时间',
                    itemAttrs: {
                        label: '考核生成时间',
                    },
                    attrs: {
                        clearable: true,
                        value: '',
                        placeholder: '请选择',
                        'value-format': 'yyyy-MM-dd',
                    },
                },
                {
                    tag: 'input',
                    span: 8,
                    name: '单位名称',
                    itemAttrs: {
                        label: '单位名称',
                    },
                    attrs: {
                        placeholder: '请输入',
                    },
                },
                {
                    tag: 'input',
                    span: 8,
                    name: '统一社会信用代码',
                    itemAttrs: {
                        label: '统一社会信用代码',
                    },
                    attrs: {
                        placeholder: '请输入',
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '信用等级',
                    itemAttrs: {
                        label: '信用等级',
                    },
                    visible: false,
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '所属区域',
                    itemAttrs: {
                        label: '所属区域',
                    },
                    visible: false,
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '是否消防安全重点单位',
                    itemAttrs: {
                        label: '是否消防安全重点单位',
                    },
                    visible: false,
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '管辖单位',
                    itemAttrs: {
                        label: '管辖单位',
                    },
                    visible: false,
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    span: 8,
                    tag: 'select',
                    name: '注册类型',
                    itemAttrs: {
                        label: '注册类型',
                    },
                    visible: false,
                    attrs: {
                        placeholder: '全部',
                        options: [
                            {
                                label: '选项1',
                                value: '选项1',
                            },
                        ],
                    },
                },
                {
                    tag: 'action',
                    span: '24',
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '查询',
                        },
                        {
                            isReset: true,
                            text: '重置',
                        },
                        {
                            isMore: true,
                            text: '更多',
                        },
                    ],
                },
            ],
            labelWidth: '170px',
        }
    }

    public handleSearch(): void {
        this.$emit('submit', this.queryModel)
    }
}
</script>

<template>
    <sg-base-form ref="formRef" v-bind="formAttrs" v-model="queryModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
</template>
