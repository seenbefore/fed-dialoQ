<template>
    <el-dialog class="UseDialog" :title="'使用到项目'" visible width="800px" @close="cancel" v-loading="loading">
        <!-- {{ formModel }}
        {{ communityId }} -->
        <sg-base-form ref="form" label-width="120px" v-model="formModel" :fields="formFields" :span="12"></sg-base-form>
        <template v-if="!isMeetingRoomType" v-slot:footer>
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import moment from 'moment'
import { userStore } from '@/entry/library/store/useStore'
import * as API from '@/entry/library/services/community_used'
import { UserService } from '@/entry/library/services/user'

@Component({
    name: 'UseDialog',
    components: {},
})
export default class UseDialog extends Vue {
    @Prop() id!: string
    @Prop({ required: true }) communityId!: string
    @Prop({ required: true }) communityName!: string
    async mounted() {
        if (this.id) {
            const { data } = await API.get({
                id: this.id,
            })
            this.$set(this, 'formModel', data)
        }
    }

    @Ref('form')
    formRef!: FormRef
    /**表单值 */
    formModel: Record<string, any> = {
        communityId: this.communityId,
        communityName: this.communityName,
        owner: userStore.info?.name || '',
    }
    /**表单配置 */
    get formFields(): FormRow[] {
        return [
            {
                columns: [
                    {
                        span: 24,
                        name: 'projectName',
                        label: '项目名称',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        name: 'feature',
                        label: '功能模块',
                        tag: 'input',
                        attrs: {
                            placeholder: '请输入',
                        },
                        itemAttrs: {
                            rules: [
                                // {
                                //     required: true,
                                //     message: '请填写',
                                // },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'autocomplete',
                        name: 'owner',
                        itemAttrs: {
                            label: '使用人',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                        componentProps: ({ formActionType }) => {
                            return {
                                attrs: {
                                    value: '',
                                    'value-key': 'label',
                                    debounce: 500,
                                    'highlight-first-item': true,
                                    'trigger-on-focus': true,
                                    placeholder: '模糊查询',
                                    options: async () => {
                                        let options = await UserService.getUserOptions()

                                        return options
                                    },
                                },
                            }
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        name: 'date',
                        label: '使用日期',
                        tag: 'date',
                        attrs: {
                            value: moment(new Date()).format('YYYY-MM-DD'), // 必填
                            'value-format': 'yyyy-MM-dd',
                        },
                        itemAttrs: {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写',
                                },
                            ],
                        },
                    },
                ],
            },
            // {
            //     columns: [
            //         {
            //             span: 24,
            //             name: 'intro',
            //             label: '使用说明',
            //             tag: 'input',
            //             attrs: {
            //                 placeholder: '请输入',
            //                 type: 'textarea',
            //             },
            //         },
            //     ],
            // },
        ]
    }
    async submit() {
        await this.formRef.validate()
        const payload = {
            ...this.formModel,
        }
        await API.create({
            ...payload,
            // communityId: this.communityId,
            // communityName: this.communityName,
        })
        console.log('submit:>>', this.formModel)
        this.$options.confirm?.(true)
    }
    cancel() {
        this.$options.cancel?.()
    }
}
</script>
