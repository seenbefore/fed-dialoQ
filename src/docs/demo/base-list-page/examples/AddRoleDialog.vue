<template>
    <el-dialog class="add-role-dialog" :title="'添加角色'" visible width="1000px" @close="cancel" v-loading="loading">
        {{ formModel }}
        <sg-base-form ref="form" label-width="120px" v-model="formModel" :fields="formFields" :span="12" auto-trigger-sub-component-validate></sg-base-form>
        <template v-if="!isMeetingRoomType" v-slot:footer>
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { applyAreaTypeMap, applyFieldTypeMap, applyLevelMap, APPLY_AREA_TYPE, APPLY_FIELD_TYPE, APPLY_LEVEL } from './Service'

@Component({
    name: 'BookRoomDialog',
    components: {},
})
export default class BookRoomDialog extends Vue {
    mounted() {
        this.formModel = {
            applyAreaType: APPLY_AREA_TYPE.ALL_PROVINCE,
            applyAreaCodeList: [],
        }
    }

    @Ref('form')
    formRef!: FormRef
    /**表单值 */
    formModel: Record<string, any> = {}
    /**表单配置 */
    get formFields(): FormRow[] {
        return [
            {
                class: 'table-row',
                columns: [
                    {
                        span: 24,
                        class: 'table-col',
                        name: 'paramName',
                        label: '配置项名称',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                                {
                                    validator: (rule: any, value: string, callback: any) => {
                                        if (value) {
                                            if (value.length <= 50) {
                                                callback()
                                            } else {
                                                callback(new Error('最多支持50个字符'))
                                            }
                                        }
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
            {
                class: 'table-row',
                columns: [
                    {
                        span: 24,
                        class: 'table-col',
                        name: 'applyLevel',
                        label: '适用级别',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            options: Object.values(applyLevelMap),
                        },
                        itemAttrs: {
                            rules: [{ required: true, message: '必选' }],
                        },
                    },
                ],
            },
            {
                class: 'table-row',
                ifRender: (model: any) => {
                    return model.applyLevel !== APPLY_LEVEL.TOWNSHIP
                },
                columns: [
                    {
                        span: 12,
                        class: 'table-col',
                        name: 'applyFieldType',
                        label: '适用领域',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            options: Object.values(applyFieldTypeMap),
                            listeners: {
                                change: () => {
                                    this.formModel.applyFieldCodeList = []
                                },
                            },
                        },
                        itemAttrs: {
                            rules: [{ required: true, message: '必选' }],
                        },
                    },
                    {
                        span: 12,
                        class: 'table-col',
                        name: 'applyFieldCodeList',
                        tag: 'select',
                        attrs: {
                            value: [],
                            placeholder: '请选择',
                            multiple: true,
                            collapseTags: true,
                            options: async () => {
                                return []
                            },
                        },
                        componentProps: ({ formModel: { applyFieldType }, schema, formActionType }) => {
                            return {
                                attrs: {
                                    disabled: applyFieldType !== APPLY_AREA_TYPE.ASSIGN,
                                },
                                itemAttrs: {
                                    rules: [{ required: applyFieldType === APPLY_AREA_TYPE.ASSIGN, message: '必选' }],
                                },
                            }
                        },
                    },
                ],
            },
            {
                class: 'table-row',
                columns: [
                    {
                        span: 24,
                        class: 'table-col',
                        name: '$applyAreaType',
                        label: '适用区域',
                        tag: () => import('./ApplyAreaTypeComp.vue'),
                        attrs: { value: {} },
                        parseData: (data, { name }) => {
                            const { applyAreaType, applyAreaCodeList } = data ?? {}
                            return {
                                [name]: { applyAreaType, applyAreaCodeList },
                            }
                        },
                        formatData: (data, { name }) => {
                            const { applyAreaType, applyAreaCodeList } = data ?? {}
                            return {
                                applyAreaType,
                                applyAreaCodeList,
                            }
                        },
                        // 监听自定义组件抛出的事件
                        on: {
                            applyAreaCodeListChange: (data: string[]) => {
                                console.log('applyAreaCodeListChange', data)
                            },
                        },
                        itemAttrs: {
                            rules: [{ required: true, message: '必选' }],
                        },
                    },
                ],
            },
            {
                class: 'table-row',
                columns: [
                    {
                        span: 24,
                        class: 'table-col',
                        name: 'relationWorkflowId',
                        label: '关联工作流',
                        tag: 'select',
                        attrs: {
                            placeholder: '请选择',
                            options: async () => {
                                return []
                            },
                        },
                        // itemAttrs: {
                        //     rules: [
                        //         {
                        //             required: true,
                        //             message: '必选',
                        //         },
                        //     ],
                        // },
                    },
                ],
            },
        ]
    }
    async submit() {
        await this.formRef.validate()
        // await this.formRef.validateField('$applyAreaType')
        console.log('submit:>>', this.formModel)
        this.$options.confirm?.()
    }
    cancel() {
        this.$options.cancel?.()
    }
}
</script>
