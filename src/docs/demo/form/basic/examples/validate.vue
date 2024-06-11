<template>
    <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="8"></sg-base-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'
let validatePhone = (rule: any, value: any, callback: any) => {
    if (value && value.length !== 11) {
        callback(new Error('手机号码格式有误'))
    } else {
        callback()
    }
}
@Component({
    components: {},
})
export default class Demo extends Vue {
    formModel = {
        keyword: '',
    }
    @Ref('formRef')
    formRef!: FormRef
    formFields: FormColumn[] = [
        {
            columns: [
                {
                    tag: 'input',
                    name: '活动名称11111',
                    itemAttrs: {
                        label: '活动名称11111',
                        rules: [
                            {
                                required: true,
                                message: '请填写',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '请输入',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'select',
                    name: '活动区域1111',
                    itemAttrs: {
                        label: '活动区域',
                    },
                    attrs: {
                        value: '',
                        placeholder: '请选择',
                        options: [
                            {
                                label: '区域一',
                                value: '1',
                            },
                            {
                                label: '区域二',
                                value: '2',
                            },
                        ],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'date',
                    name: '活动时间',
                    itemAttrs: {
                        label: '活动时间',
                    },
                    attrs: {
                        value: [],
                        type: 'daterange',
                        'value-format': 'yyyy-MM-dd',
                        'start-placeholder': '开始时间',
                        'end-placeholder': '结束时间',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'checkbox',
                    name: '活动性质',
                    itemAttrs: {
                        label: '活动性质',
                    },
                    attrs: {
                        value: [],
                        options: [
                            {
                                label: '美食/餐厅线上活动',
                                value: '1',
                            },
                            {
                                label: '地推活动',
                                value: '2',
                            },
                            {
                                label: '线下主题活动',
                                value: '3',
                            },
                            {
                                label: '单纯品牌曝光',
                                value: '4',
                            },
                            {
                                label: '少时诵诗书萨达大所多',
                                value: '5',
                            },
                        ],
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: '手机号码',
                    itemAttrs: {
                        label: '手机号码',
                        rules: [
                            {
                                required: true,
                                message: '请填写手机号码',
                                trigger: 'change',
                            },
                            {
                                validator: validatePhone,
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '请输入',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'action',
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '提交',
                        },
                        {
                            isReset: true,
                            type: '',
                            text: '重置',
                        },
                    ],
                },
            ],
        },
    ]
    handleSearch() {
        this.formRef.validate(valid => {
            console.log(valid)
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
