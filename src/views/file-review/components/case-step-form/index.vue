<template>
    <div class="inner">
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'
import { getArchiveVolumeRecordById } from '@/services/auto/my/volume'

@Component({
    name: 'CaseSave',
    components: {},
})
export default class CaseSave extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    formModel: Record<string, any> = {}
    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        span: 24,
                        tag: 'input',
                        name: 'arrangeDesc',
                        itemAttrs: {
                            label: '本卷情况说明',
                            rules: [
                                { required: true, message: '请输入本卷情况说明' },
                                { max: 500, message: '最多输入500字' },
                            ],
                        },
                        attrs: {
                            type: 'textarea',
                            rows: 6,
                            placeholder: '请输入',
                            maxlength: 500,
                            'show-word-limit': true,
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'archivingUserName',
                        itemAttrs: {
                            label: '立卷人',
                            rules: [
                                { required: true, message: '请输入立卷人' },
                                { max: 50, message: '最多输入50字' },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                    },
                    {
                        tag: 'date',
                        name: 'archivingTime',
                        itemAttrs: {
                            label: '立卷时间',
                            rules: [{ required: true, message: '请选择立卷时间' }],
                        },
                        attrs: {
                            type: 'date',
                            placeholder: '请选择日期',
                            'value-format': 'yyyy-MM-dd',
                            'picker-options': {
                                disabledDate: (time: Date) => {
                                    return time.getTime() > Date.now()
                                },
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'checkerName',
                        itemAttrs: {
                            label: '检查人',
                            rules: [
                                { required: true, message: '请输入检查人' },
                                { max: 50, message: '最多输入50字' },
                            ],
                        },
                        attrs: {
                            placeholder: '请输入',
                            maxlength: 50,
                        },
                    },
                    {
                        tag: 'date',
                        name: 'checkTime',
                        itemAttrs: {
                            label: '检查时间',
                            rules: [{ required: true, message: '请选择检查时间' }],
                        },
                        attrs: {
                            type: 'date',
                            placeholder: '请选择日期',
                            'value-format': 'yyyy-MM-dd',
                            'picker-options': {
                                disabledDate: (time: Date) => {
                                    return time.getTime() > Date.now()
                                },
                            },
                        },
                    },
                ],
            },
        ]

        return {
            span: 12,
            fields,
        }
    }
    async submit() {
        await this.formRef.validate(null, true)
        return this.formModel
    }
    async getArchiveVolumeRecordById() {
        const res = await getArchiveVolumeRecordById({
            volumeRecordId: this.$route.query.id as string,
        })
        this.formModel = res.data
    }
    async created() {
        await this.getArchiveVolumeRecordById()
    }
}
</script>

<style lang="less" scoped></style>
