<template>
    <section class="page-register sg-flexbox column align-center justify-center ">
        <div class="main">
            <sg-base-form class="column" ref="formRef" :fields="fields" v-model="model" @submit="onSubmit" :span="24"></sg-base-form>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import * as API from '@/entry/devops/api/index'
import { userStore } from '@/entry/devops/store/useStore'
@Component({
    components: {},
})
export default class Register extends Vue {
    public $refs!: {
        formRef: FormRef
    }
    origin = ''
    model: any = {}
    FormView = {
        loading: false,
    }
    fields = [
        {
            class: 'form-headline',
            columns: [
                {
                    render: h => {
                        return [
                            h(
                                'h2',
                                {
                                    props: {},
                                    class: 'form-headline',
                                },
                                `注册信息`,
                            ),
                        ]
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'username',
                    itemAttrs: {
                        label: '用户名',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '请输入英文 一般姓名全拼 如：majinhui',
                    },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'input',
                    name: 'name',
                    itemAttrs: {
                        label: '真实姓名',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        placeholder: '如：张三',
                    },
                },
            ],
        },

        // {
        //     columns: [
        //         {
        //             tag: 'input',
        //             name: 'phone',
        //             itemAttrs: {
        //                 label: '手机号码',
        //                 rules: [
        //                     {
        //                         required: true,
        //                         message: '必填',
        //                     },
        //                 ],
        //             },
        //             attrs: {
        //                 placeholder: '十一位手机号码',
        //             },
        //         },
        //     ],
        // },
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
                        //type: 'password',
                        placeholder: '',
                        value: '123456',
                    },
                    // appendRender: h => {
                    //     return [
                    //         h(
                    //             'span',
                    //             {
                    //                 class: 'tip',
                    //             },
                    //             '默认：123456',
                    //         ),
                    //     ]
                    // },
                },
            ],
        },
        {
            columns: [
                {
                    tag: 'select',
                    name: 'position',
                    itemAttrs: {
                        label: '岗位',
                        rules: [
                            {
                                required: true,
                                message: '必填',
                            },
                        ],
                    },
                    attrs: {
                        value: '产品经理',
                        options: [
                            {
                                label: '产品经理',
                                value: '产品经理',
                            },
                            {
                                label: '设计师',
                                value: '设计师',
                            },
                            {
                                label: '前端开发',
                                value: '前端开发',
                            },
                            {
                                label: '后端开发',
                                value: '后端开发',
                            },
                            {
                                label: '测试',
                                value: '测试',
                            },

                            {
                                label: '运维',
                                value: '运维',
                            },
                            {
                                label: '其他',
                                value: '其他',
                            },
                        ],
                    },
                },
            ],
        },
        // {
        //     columns: [
        //         {
        //             tag: 'input',
        //             name: 'email',
        //             itemAttrs: {
        //                 label: '邮箱',
        //                 rules: [
        //                     {
        //                         required: true,
        //                         message: '必填',
        //                     },
        //                 ],
        //             },
        //             attrs: {
        //                 placeholder: 'xxx@icinfo.com.cn',
        //             },
        //         },
        //     ],
        // },

        {
            columns: [
                {
                    tag: 'slot',
                    itemAttrs: {
                        label: ' ',
                    },
                    render: h => {
                        const state = location.origin + '/register'
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
                                            this.onSubmit()
                                        },
                                    },
                                },
                                `立即注册`,
                            ),
                            h(
                                'el-button',
                                {
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.$router.go(-1)
                                        },
                                    },
                                },
                                `返回`,
                            ),
                        ]
                    },
                },
            ],
        },
    ] as FormRow[]

    public onSubmit() {
        const model = this.model
        const formRef = this.$refs['formRef']
        console.log(model)
        if (!/^[A-Za-z]+$/.test(model.username)) {
            return this.$message.error('用户名必须是英文')
        }

        formRef.validate(async (valid: any, errors: any) => {
            if (valid) {
                try {
                    this.FormView.loading = true
                    await API.UserService.register(model)
                    this.FormView.loading = false
                    this.$message.success('注册成功')
                    this.$confirm('立刻去登录').then(() => {
                        userStore.logout()
                        userStore.rememberAccount(model)
                        this.$router.push({
                            path: '/login',
                            query: {
                                action: 'AutoLogin',
                            },
                        })
                    })
                } catch (err) {
                    this.FormView.loading = false
                }
            } else {
                // this.$message.error(JSON.stringify(errors))
            }
        })
    }

    async created() {}
    mounted() {
        const user: any = this.$route.query.user
        if (user) {
            try {
                const result = JSON.parse(user)

                this.model = {
                    ...result,
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped lang="less">
.page-register ::v-deep {
    min-height: 100%;

    .main {
        width: 600px;
        padding: 15px 25px;

        box-shadow: 0 20px 24px 0 rgba(48, 48, 48, 0.1), 0 0 1px 0 rgba(48, 48, 48, 0.2);
    }

    .tip {
        color: #969799;
    }
}
</style>
