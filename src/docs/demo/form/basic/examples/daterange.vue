<template>
    <div class="FormExamplesCustom">
        {{ formModel }}

        <sg-base-form ref="formRef" v-model="formModel" @submit="handleSubmit" v-bind="getFormAttrs"></sg-base-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'

import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class Demo extends Vue {
    formModel = {}
    @Ref('formRef')
    formRef!: FormRef
    getFormAttrs = {
        labelWidth: '80px',
        span: 12,
        fields: [
            {
                columns: [
                    {
                        tag: 'daterange',
                        name: '日期范围',
                        itemAttrs: {
                            label: '日期范围',
                        },
                        attrs: {
                            //value: ['2023-1-1', '2023-1-10'],
                            // 'start-placeholder': '选择开始时间',
                            // 'end-placeholder': '选择结束时间',
                        },
                    },
                    // {
                    //     tag: 'daterange',
                    //     name: '最近一次更新时间',
                    //     itemAttrs: {
                    //         label: '最近一次更新时间',
                    //     },
                    //     attrs: {
                    //         placeholder: '请输入',
                    //     },
                    // },
                    // {
                    //     tag: 'daterange',
                    //     name: '日期范围2',
                    //     itemAttrs: {
                    //         label: '日期范围',
                    //     },
                    //     attrs: {
                    //         placeholder: '请输入',
                    //     },
                    // },
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
        ] as FormRow,
    }

    handleSubmit() {
        this.formRef.validate(valid => {
            console.log(valid)
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.FormExamplesCustom ::v-deep {
    .ql-container {
        height: 200px;
    }
}
</style>
