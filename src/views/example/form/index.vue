<template>
    <div>
        <sg-base-form v-bind="getFormAttrs" @submit="handleSubmit" @reset="handleReset" />
        <el-button @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

interface FormData {
    username: string
    type: string
}

@Component({
    name: 'FormExample',
})
export default class FormExample extends Vue {
    private fields = [
        {
            columns: [
                {
                    tag: 'input',
                    name: 'username',
                    itemAttrs: {
                        label: '用户名',
                        required: true,
                    },
                    attrs: {
                        placeholder: '请输入用户名',
                    },
                },
                {
                    tag: 'select',
                    name: 'type',
                    itemAttrs: {
                        label: '类型',
                    },
                    attrs: {
                        options: [
                            { label: '选项1', value: '1' },
                            { label: '选项2', value: '2' },
                        ],
                    },
                },
            ],
        },
    ]

    private rules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    }

    get getFormAttrs() {
        return {
            fields: this.fields,
            rules: this.rules,
        }
    }

    private handleSubmit(formData: FormData) {
        console.log('提交的表单数据:', formData)
    }

    private handleReset(formData: FormData) {
        console.log('表单已重置', formData)
    }
}
</script>
