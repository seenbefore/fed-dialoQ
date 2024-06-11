<template>
    <div class="FormExamplesCustom">
        {{ formModel }}

        <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSubmit" :span="8">
            <template v-slot:uploadA="{ row: { model, name } }">
                <el-upload action="" multiple :limit="3" :file-list="[]" :show-file-list="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                        {{ model[name] }}
                    </div>
                </el-upload>
            </template>
        </sg-base-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
//import CustomInput from './input.vue'
import QuillEditor from '@/components/quill-editor'
import { FormColumn, FormRef } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class Demo extends Vue {
    formModel = {
        switch: true,
        input: '123',
        uploadA: [{ name: 'name', url: 'url' }],
    }
    @Ref('formRef')
    formRef!: FormRef
    formFields: FormColumn[] = [
        {
            columns: [
                {
                    span: 24,
                    tag: 'slot',
                    slot: 'uploadA',
                    name: 'uploadA',
                    itemAttrs: {
                        label: 'slot上传',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'el-switch',
                    name: 'switch',
                    itemAttrs: {
                        label: '全局组件switch',
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
                    span: 24,
                    tag: QuillEditor,
                    name: 'content',
                    itemAttrs: {
                        label: '自定义content',
                        rules: [
                            {
                                required: true,
                                message: '请填写',
                            },
                        ],
                    },
                    attrs: {},
                },
            ],
        },
        {
            columns: [
                {
                    tag: () => import('./input.vue'),
                    name: 'input',
                    itemAttrs: {
                        label: '自定义input',
                        rules: [
                            {
                                required: true,
                                message: '请填写',
                            },
                        ],
                    },
                    attrs: {
                        tip: '请输入英文',
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
