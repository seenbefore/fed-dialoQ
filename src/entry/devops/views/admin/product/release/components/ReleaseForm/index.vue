<template>
    <section class="sg-card ReleaseForm" v-loading="initLoading">
        <div class="sg-card-body">
            <!-- {{ FormView.model }} -->

            <sg-base-form class="column" ref="formRef" :fields="FormView.fields" v-model="FormView.model" @submit="onSubmit" label-width="120px" :span="24"></sg-base-form>
        </div>
        <div class="sg-card-foot">
            <el-button type="" @click="$close(false, true)">返回</el-button>
            <el-button type="primary" @click="onSubmit" :loading="FormView.loading" v-if="action !== 'detail'">{{ submitText }}</el-button>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import * as API from '@/entry/devops/api/index'
import { MyMixins } from '@/entry/devops/mixins'
import { userStore } from '@/entry/devops/store/useStore'
import moment from 'moment'

interface FormViewModelProps {
    id?: string

    [propName: string]: any
}
interface FormViewProps {
    loading: boolean
    model: FormViewModelProps
    fields: FormRow[]
}
@Component({
    name: 'ReleaseForm',
    components: {},
})
export default class ReleaseForm extends MyMixins {
    @Prop({ default: '' }) id!: string
    /**
     * verify 验收
     */
    @Prop({ default: '' }) action!: 'verify' | 'detail' | ''
    isEdit = !!this.$route.query.id

    get submitText() {
        if (this.isEdit) {
            return '保存'
        }
        return '创建'
    }
    UserOptions: any[] = []
    isTester() {
        return userStore?.info.name === this.FormView.model.testerManager && !!this.id
    }
    initLoading = false
    private FormView: FormViewProps = {
        loading: false,
        model: {},
        fields: [
            // 基本信息
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
                                    `基本信息`,
                                ),
                            ]
                        },
                    },
                    {
                        span: 24,
                        tag: this.action === 'verify' ? 'text' : 'input',
                        name: 'title',
                        itemAttrs: {
                            label: '产品/系统名称',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            //disabled: this.action === 'verify',
                            placeholder: '比如 法人证书服务平台-帮助中心-V1.0.2',
                        },
                    },
                    {
                        span: 8,
                        tag: 'date',
                        name: 'date',
                        itemAttrs: {
                            label: '发布日期',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            //disabled: this.action === 'verify',
                            value: '', // 必填
                            placeholder: moment(new Date()).format('YYYY-MM-DD'),
                            //type: 'datetime',
                            'value-format': 'yyyy-MM-dd',
                            format: 'yyyy-MM-dd',
                        },
                    },
                    {
                        span: 8,
                        tag: 'autocomplete',
                        name: 'deliveryManager',
                        itemAttrs: {
                            label: '发布负责人',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            //disabled: this.action === 'verify',
                            value: '',
                            'value-key': 'label',
                            debounce: 500,
                            'highlight-first-item': true,
                            'trigger-on-focus': false,
                            placeholder: '模糊查询',
                            fetchSuggestions: (queryString: string, cb: any) => {
                                const options = this.UserOptions || []

                                if (!queryString) {
                                    return cb([])
                                }
                                const results = queryString ? options.filter(this.createStateFilter(queryString)) : options
                                cb(results)
                            },
                        },
                        appendRender: h => {
                            if (!this.id) {
                                return [
                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                            },
                                            on: {
                                                click: () => {
                                                    this.FormView.model.deliveryManager = userStore.info?.name || ''
                                                },
                                            },
                                        },
                                        [`我`],
                                    ),
                                ]
                            }
                        },
                    },

                    {
                        span: 8,
                        tag: 'autocomplete',
                        name: 'testerManager',
                        itemAttrs: {
                            label: '测试人员',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            //disabled: this.action === 'verify',
                            value: '',
                            //value: userStore?.info.name || '',
                            //value: userStore?.info.name || '',
                            'value-key': 'label',
                            debounce: 500,
                            'highlight-first-item': true,
                            'trigger-on-focus': false,
                            placeholder: '模糊查询',
                            fetchSuggestions: (queryString: string, cb: any) => {
                                const options = this.UserOptions || []

                                if (!queryString) {
                                    return cb([])
                                }
                                const results = queryString ? options.filter(this.createStateFilter(queryString)) : options
                                cb(results)
                            },
                        },
                        appendRender: h => {
                            if (!this.id) {
                                return [
                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                            },
                                            on: {
                                                click: () => {
                                                    this.FormView.model.testerManager = userStore.info?.name || ''
                                                },
                                            },
                                        },
                                        [`我`],
                                    ),
                                ]
                            }
                        },
                    },
                    {
                        span: 24,
                        tag: 'text',
                        name: 'testSheetAddress',
                        itemAttrs: {
                            label: '提测单地址',
                        },
                    },
                    {
                        span: 24,
                        tag: 'slot',
                        name: 'participants',
                        itemAttrs: {
                            label: '相关人员',
                        },

                        render: h => {
                            const { participants } = this.FormView.model

                            if (Array.isArray(participants)) {
                                const result = participants.map(item => `${item.post}-${item.name}`).join('、')

                                return [h('span', {}, [result])]
                            }
                        },
                    },
                ],
            },

            // 发布信息
            {
                class: 'form-headline',
                columns: [
                    {
                        render: h => {
                            // if (this.action === 'verify') {
                            //     return []
                            // }
                            return [
                                h(
                                    'h2',
                                    {
                                        props: {},
                                        class: 'form-headline',
                                    },
                                    `发布信息（发布负责人填写）`,
                                ),
                            ]
                        },
                    },
                    {
                        tag: 'input',
                        name: 'content',
                        itemAttrs: {
                            label: '发布内容',
                        },
                        attrs: {
                            rows: '5',
                            type: 'textarea',
                            value: '',
                            placeholder: '具体内容或者链接',
                        },
                        // ifRender: () => {
                        //     return this.action === '' || this.action === 'detail'
                        // },
                    },
                    {
                        tag: 'input',
                        name: 'services',
                        itemAttrs: {
                            label: '发布服务',
                            helpMessage: '参考 https://doc.weixin.qq.com/sheet/e3_AfEA5gYvAOAI3QuXtX0RcChs3fXKL?scode=AGgAjQcJAGo5fnhLSRAVYAVgYKAMM&tab=ejbs22',
                        },
                        attrs: {
                            rows: '5',

                            type: 'textarea',
                            value: '',
                            placeholder: '具体内容或者链接',
                        },
                        appendRender: h => {
                            //return [h('div', { class: 'tip1' }, [`https://doc.weixin.qq.com/sheet/e3_AfEA5gYvAOAI3QuXtX0RcChs3fXKL?scode=AGgAjQcJAGo5fnhLSRAVYAVgYKAMM&tab=ejbs22`])]
                        },
                        // ifRender: () => {
                        //     return this.action === '' || this.action === 'detail'
                        // },
                    },
                    {
                        tag: 'input',
                        name: 'scripts',
                        itemAttrs: {
                            label: '发布脚本',
                        },
                        attrs: {
                            rows: '5',
                            type: 'textarea',
                            value: '',
                            placeholder: '具体内容或者链接',
                        },
                        // ifRender: () => {
                        //     return this.action === '' || this.action === 'detail'
                        // },
                    },
                    {
                        tag: 'input',
                        name: 'deployPlan',
                        itemAttrs: {
                            label: '发布计划',
                        },
                        attrs: {
                            rows: '5',
                            type: 'textarea',
                            value: '',
                            placeholder: '具体内容或者链接',
                        },
                        // ifRender: () => {
                        //     return this.action === '' || this.action === 'detail'
                        // },
                    },
                ],
            },

            // 验收结果
            {
                class: 'form-headline',
                columns: [
                    {
                        render: h => {
                            if (this.action != 'verify') {
                                return
                            }
                            return [
                                h(
                                    'h2',
                                    {
                                        attrs: {
                                            id: 'YS',
                                        },
                                        props: {},
                                        class: 'form-headline',
                                    },
                                    `验收结果`,
                                ),
                            ]
                        },
                    },
                    {
                        tag: 'date',
                        name: 'actualStartTime',
                        itemAttrs: {
                            label: '开始发布时间',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                            placeholder: '',
                            type: 'datetime',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'default-time': '20:00:00',
                            onInput: (val, { formModel }) => {
                                if (formModel['actualStartTime'] && formModel['actualEndTime']) {
                                    let startMoment = moment(formModel['actualStartTime'])
                                    let endMoment = moment(formModel['actualEndTime'])
                                    let diff = endMoment.diff(startMoment, 'hours')
                                    if (diff >= 4) {
                                        formModel.testResult = '超时'
                                    } else {
                                        formModel.testResult = '合格'
                                    }
                                    console.log('actualStartTime', diff)
                                }
                            },
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                    },
                    {
                        tag: 'date',
                        name: 'actualVerifyTime',
                        itemAttrs: {
                            label: '开始验证时间',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                            placeholder: '',
                            type: 'datetime',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'default-time': '20:00:00',
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                    },
                    {
                        tag: 'date',
                        name: 'actualEndTime',
                        itemAttrs: {
                            label: '验证结束时间',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            value: '',
                            placeholder: '',
                            type: 'datetime',
                            'value-format': 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            'default-time': '20:00:00',
                            onInput: (val, { formModel }) => {
                                if (formModel['actualStartTime'] && formModel['actualEndTime']) {
                                    let startMoment = moment(formModel['actualStartTime'])
                                    let endMoment = moment(formModel['actualEndTime'])
                                    let diff = endMoment.diff(startMoment, 'hours')
                                    console.log('actualEndTime', diff)
                                    if (diff >= 4) {
                                        formModel.testResult = '超时'
                                    } else {
                                        formModel.testResult = '合格'
                                    }
                                }
                            },
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                    },
                    {
                        tag: () => import('./issues.vue'),
                        name: 'issues',
                        itemAttrs: {
                            label: '问题点',
                        },
                        attrs: {
                            value: [],
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                    },
                    {
                        tag: 'radio',
                        name: 'testResult',
                        itemAttrs: {
                            label: '验收结论',
                            helpMessage: '结束时间和开始时间差大于4小时，视为超时',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        attrs: {
                            disabled: true,
                            options: [
                                {
                                    label: '合格',
                                    value: '合格',
                                },
                                {
                                    label: '超时',
                                    value: '超时',
                                },
                            ],
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                        appendRender: h => {
                            const formModel = this.FormView.model
                            if (formModel['actualStartTime'] && formModel['actualEndTime']) {
                                let startMoment = moment(formModel['actualStartTime'])
                                let endMoment = moment(formModel['actualEndTime'])
                                let diff = endMoment.diff(startMoment, 'hours')
                                if (diff) {
                                    return [
                                        h(
                                            'el-tag',
                                            {
                                                class: 'sg-ml-2',
                                            },
                                            `耗时：${diff}小时`,
                                        ),
                                    ]
                                }
                            }
                            return []
                        },
                    },
                    {
                        tag: 'input',
                        name: 'notes',
                        itemAttrs: {
                            label: '备注',
                        },
                        attrs: {
                            placeholder: '',
                            type: 'textarea',
                        },
                        ifRender: () => {
                            return this.action === 'verify' || this.action === 'detail'
                        },
                    },
                    // {
                    //     tag: 'select',
                    //     name: 'atUsers',
                    //     itemAttrs: {
                    //         label: '默认通知人',
                    //         helpMessage: '发布完成之后，默认通知人',
                    //     },
                    //     attrs: {
                    //         value: [],
                    //         filterable: true,
                    //         multiple: true,
                    //         placeholder: '每次构建完成的通知对象',
                    //         isFilterValue: true,
                    //         'default-first-option': true,
                    //         options: async () => {
                    //             let result = await API.UserService.getUserOptions()
                    //             result = result.filter(item => item.phone)
                    //             return result.map(item => {
                    //                 return {
                    //                     label: `${item.label}`,
                    //                     value: item.phone,
                    //                     username: item.username,
                    //                 }
                    //             })
                    //         },
                    //     },
                    // },
                ],
            },
        ],
    }

    public formatData(data: any = {}) {
        return data
    }

    public parseData(data: any = {}) {
        const { actualStartTime, actualVerifyTime, actualEndTime, ...rest } = data
        //console.log(111, actualStartTime, moment(new Date(actualStartTime)).format('YYYY-MM-DD HH:mm:ss'))

        const result = {
            actualStartTime: '',
            actualVerifyTime: '',
            actualEndTime: '',
            ...rest,
        }
        if (actualStartTime) {
            result.actualStartTime = moment(new Date(actualStartTime)).format('YYYY-MM-DD HH:mm:ss')
        }
        if (actualVerifyTime) {
            result.actualVerifyTime = moment(new Date(actualVerifyTime)).format('YYYY-MM-DD HH:mm:ss')
        }
        if (actualEndTime) {
            result.actualEndTime = moment(new Date(actualEndTime)).format('YYYY-MM-DD HH:mm:ss')
        }

        return result
    }
    public onSubmit() {
        const model = this.FormView.model
        const formRef = this.$refs['formRef'] as FormRef
        const post = this.isEdit ? API.ReleaseOrderService.update : API.ReleaseOrderService.create

        formRef.validate(async valid => {
            if (valid) {
                try {
                    const payload = this.formatData(model)

                    this.FormView.loading = true
                    console.log(payload)
                    await post({
                        ...payload,
                    })
                    this.$message.success('保存成功')
                    this.FormView.loading = false
                    // 新建的话完成后回退页面
                    if (this.isEdit) {
                        this.$close(true, true)
                    } else {
                        this.$close(true, true)
                    }
                } catch (err) {
                    this.FormView.loading = false
                }
            }
        }, true)
    }
    createStateFilter(queryString: string) {
        return (state: any) => {
            return state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.label.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        }
    }
    async syncUsers() {
        const data = await API.UserService.getUserOptions()
        this.UserOptions.push(...data)
    }
    async created() {
        try {
            this.initLoading = true
            await this.syncUsers()

            if (this.isEdit) {
                const id = this.$route.query.id
                const { data } = await API.ReleaseOrderService.get({ id })
                this.$set(this.FormView, 'model', this.parseData(data))
                //this.FormView.model = this.parseData(data)
                //console.log(1111, this.FormView.model)

                this.$nextTick(() => {
                    if (this.action === 'verify') {
                        const target = document.getElementById('YS') // 获取目标元素对象
                        target?.scrollIntoView() // 滚动到目标元素
                    }
                })
            } else {
                this.FormView.model.date = moment(new Date()).format('YYYY-MM-DD')
                const position = userStore.info?.position || ''
                if (position.indexOf('测试') > -1) {
                    this.FormView.model.testerManager = userStore.info?.name || ''
                }
            }
        } catch (error) {
        } finally {
            this.initLoading = false
        }
    }
    mounted() {
        // this.$notifyByQiWei(
        //     {
        //         title: '洒洒水',
        //         content: '123456789',
        //     },
        //     ['马金慧'],
        // )
    }
}
</script>

<style lang="less" scoped>
.ReleaseForm ::v-deep {
    height: 100%;
    .sg-data-form .el-form-item {
        margin-bottom: 8px;
    }
    .sg-base-form-text {
        // line-height: 1.2;
    }
    .sg-card-body {
        height: calc(100% - 50px);
        overflow: auto;
        > .sg-data-form-container {
            max-width: 800px;
        }
    }
    .sg-card-foot {
        border-top: 1px solid #ddd;
        padding-left: 180px;
        display: flex;
        align-items: center;
        height: 50px;
    }
    .form-headline {
        margin: 0;
        margin-bottom: 7px;
        font-size: 16px;
    }
    .column {
        .sg-data-form .el-textarea,
        .sg-data-form .el-input,
        .sg-data-form .el-select,
        .sg-data-form .el-autocomplete,
        .sg-data-form .el-cascader {
            //max-width: 500px;
        }

        .sg-data-form-field {
            display: flex;
            align-items: center;
        }

        .tip {
            color: #999;
            line-height: 1.2;
            flex: 1;
            margin-left: 15px;
        }

        .deploy-checkbox {
            .el-checkbox {
                display: block;
            }
        }
    }
}
</style>

<style lang="less">
.customer-autocomplete {
    .row {
        line-height: normal;
        padding: 7px 0;
    }
    .customerName {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .addressDetail {
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .addressDetail {
        color: #ddd;
    }
}
</style>
