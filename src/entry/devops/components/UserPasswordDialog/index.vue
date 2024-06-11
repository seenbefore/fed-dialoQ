<template>
    <el-dialog ref="dialog" class="UserPasswordDialog" :close-on-click-modal="false" :title="'修改密码'" width="600px" :fullscreen="false" v-bind="$attrs" :visible="true" @close="cancel">
        <div class="body ">
            <sg-base-form class="column" ref="formRef" :fields="fields" v-model="model" :span="24"></sg-base-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRow, FormRef } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class UserEdUserPasswordDialog extends Vue {
    public $refs!: {
        formRef: FormRef
    }
    private model = {
        username: '',
        password: '',
    }
    private FormView = {
        loading: false,
    }
    private fields: FormRow[] = [
        {
            columns: [
                {
                    tag: 'text',
                    name: 'username',
                    itemAttrs: {
                        label: '用户名',
                    },
                    attrs: {
                        disabled: true,
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'input',
                    name: 'password',
                    itemAttrs: {
                        label: '密码',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        'show-password': true,
                        type: 'password',
                        placeholder: '',
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'slot',
                    itemAttrs: {
                        label: ' ',
                    },
                    render: h => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                        loading: this.FormView.loading,
                                    },
                                    on: {
                                        click: () => {
                                            this.handleUpdate()
                                        },
                                    },
                                },
                                `确认`,
                            ),
                        ]
                    },
                },
            ],
        },
    ]
    async handleUpdate() {
        const model = this.model
        const formRef = this.$refs['formRef']
        console.log(model)

        formRef.validate(async (valid: any, errors: any) => {
            if (valid) {
                try {
                    this.FormView.loading = true
                    await API.UserService.update_password({
                        password: model.password,
                    })
                    this.FormView.loading = false
                    this.$message.success('修改密码成功，重新登录')
                    this.confirm()
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        })
    }

    async created() {
        const { data } = await API.UserService.current()
        this.model.username = data.username
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
}
</script>

<style lang="less" scoped></style>
