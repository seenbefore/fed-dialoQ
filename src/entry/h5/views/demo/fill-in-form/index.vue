<template>
    <div class="sg-page DemoFillInForm">
        <section class="sec-form-1">
            <app-form ref="formRef1" :fields="demoFormFields" :show-foot-btns="true" v-model="demoFormData" @cancel="backHome" @submit="submitFormData">
                <template slot="examplesSlot">
                    <div class="note">注：此处为自定义插槽内容</div>
                </template>
            </app-form>

            <van-overlay :show="showOverlay" @click="showOverlay = false">
                <div class="wrapper">
                    <p>请确认事件概要信息是否录入真实准确？</p>
                </div>
            </van-overlay>
        </section>
    </div>
</template>

<script lang="ts">
import AppForm, { GroupField } from '@h5/components/global/app-form/index.vue'
import http from '@h5/scripts/http'
import { isMobile } from 'icinfo-util'
import { Notify, Toast } from 'vant'
import { Component, Vue } from 'vue-property-decorator'

// 常量
const CONFIGCONST: any = {
    holderText: '请输入',
    holderSelect: '请选择',
}

@Component({
    name: 'DemoFillInForm',
    components: {},
})
export default class DemoFillInForm extends Vue {
    public $refs!: {
        formRef1: AppForm
    }

    /** 分组表单 */
    public demoFormFields: GroupField[] = [
        {
            groupName: '事件概要',
            groupId: 'groupId01',
            children: [
                {
                    tag: 'text',
                    name: 'title',
                    label: '事件标题',
                    props: {
                        class: 'event-title',
                        rows: 5,
                        text: '少杰杰正在辛勤得搬砖',
                    },
                },
                {
                    tag: 'uploader',
                    name: 'photos',
                    label: '现场图片',
                    required: true,
                    props: {
                        isFullRow: true,
                        accept: 'png/jpg/jpeg',
                        maxCount: 5,
                        maxSize: 5 * 1024 * 1024,
                        httpRequest: async (fileData: any) => {
                            const formData = new FormData()
                            formData.append('file', fileData.file)
                            const { data } = await http.request({
                                url: 'http://192.168.1.147:3000/api/open/upload',
                                data: formData,
                                method: 'post',
                                headers: {
                                    'content-type': 'multipart/form-data',
                                },
                            })
                            return data.url
                        },
                    },
                },
                {
                    tag: 'date-picker',
                    name: 'pickerTime',
                    label: '发生时间',
                    required: true,
                    props: {
                        placeholder: CONFIGCONST.holderSelect,
                        type: 'datetime',
                        valueFormat: 'yyyy-M-d HH:mm',
                        maxDate: new Date(),
                    },
                },
                {
                    tag: 'input',
                    name: 'party',
                    label: '当事人',
                    required: true,
                    props: {
                        placeholder: CONFIGCONST.holderText,
                    },
                },
                {
                    tag: 'input',
                    name: 'events',
                    label: '事件简要',
                    required: true,
                    props: {
                        placeholder: CONFIGCONST.holderText,
                        rows: 3,
                        maxlength: 500,
                        showWordLimit: true,
                    },
                    on: {
                        input: () => {
                            this.fillOver()
                        },
                    },
                },
            ],
        },
        {
            groupName: '当事人信息',
            groupId: 'groupId02',
            children: [
                {
                    tag: 'select-picker',
                    name: 'relation',
                    label: '联系方式',
                    required: true,
                    defaultValue: 'SJH',
                    props: {
                        placeholder: CONFIGCONST.holderSelect,
                        options: [
                            { value: 'SJH', label: '手机号' },
                            { value: 'YX', label: '邮箱' },
                            { value: 'QT', label: '其他' },
                        ],
                    },
                    on: {
                        change: (item: any) => {
                            if (item.value === 'QT') {
                                Notify({
                                    type: 'warning',
                                    message: '请线下补充说明！',
                                })
                            }
                            // 联动禁用表单项
                            setTimeout(() => {
                                const $checkType = this.$refs.formRef1.getRefField('checkType')
                                $checkType && this.$set($checkType, 'disabled', item.value === 'YX')
                            }, 100)
                        },
                    },
                },
                {
                    tag: 'input',
                    name: 'moblie',
                    label: '手机号',
                    required: true,
                    props: {
                        placeholder: CONFIGCONST.holderText,
                    },
                    rules: [
                        {
                            trigger: 'onBlur',
                            validator: (value: string, rule: any) => {
                                return isMobile(value)
                            },
                            message: '请输入正确的手机号码',
                        },
                    ],
                    ifRender: (items: any) => {
                        return items && items.relation === 'SJH'
                    },
                },
                {
                    tag: 'radio',
                    name: 'sex',
                    label: '性别',
                    required: true,
                    props: {
                        options: [
                            { value: '男', label: '男' },
                            { value: '女', label: '女' },
                        ],
                    },
                },
                {
                    tag: 'cascader',
                    name: 'birthPlace',
                    label: '籍贯',
                    required: true,
                    props: {
                        options: [
                            {
                                label: '浙江省',
                                value: '330000',
                                children: [
                                    {
                                        label: '杭州市',
                                        value: '330100',
                                        children: [
                                            {
                                                label: '萧山区',
                                                value: '330109',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: '江苏省',
                                value: '320000',
                                children: [{ label: '南京市', value: '320100' }],
                            },
                        ],
                    },
                },
                {
                    tag: 'radio',
                    name: 'checkType',
                    label: '类型',
                    props: {
                        options: [
                            { value: '国内', label: '国内' },
                            { value: '国外', label: '国外' },
                        ],
                    },
                    // ifRender: (items: any) => {
                    //     return items && items.relation === 'YX'
                    // },
                },
            ],
        },
        {
            groupName: '其他信息',
            groupId: 'groupId03',
            children: [
                {
                    tag: 'checkbox',
                    name: 'isCheak',
                    label: '已阅读《UI规范》条款',
                    defaultValue: true,
                    props: {
                        class: 'check-full-label',
                    },
                },
                {
                    tag: 'checkbox',
                    name: 'dealResult',
                    label: '处理结果',
                    required: true,
                    defaultValue: [],
                    props: {
                        class: 'check-full-label',
                        isGroup: true,
                        options: [
                            { label: '点赞', value: '点赞' },
                            { label: '送票', value: '送票' },
                            { label: '收藏', value: '收藏', disabled: true },
                        ],
                    },
                },
                {
                    tag: 'number-input',
                    name: 'money',
                    label: '送票金额',
                    required: true,
                    props: {
                        class: 'no-bottom-line',
                        placeholder: CONFIGCONST.holderText,
                        type: 'digit',
                        unit: '元',
                    },
                    ifRender: (items: any) => {
                        return items.dealResult ? items.dealResult.includes('送票') : false
                    },
                },
                {
                    tag: () => import('./components/business.vue'),
                    name: 'eventItem',
                    label: '活动事项',
                    required: true,
                    props: {
                        placeholder: '请选择活动事项',
                    },
                    on: {
                        change: (item: any) => {
                            this.demoFormData.eventItem = item
                        },
                    },
                },
                {
                    tag: 'slot',
                    name: '自定义组件',
                    label: '示例',
                    slotName: 'examplesSlot',
                },
            ],
        },
    ]
    public demoFormData: Record<string, any> = {}
    /** 设置防抖装饰 */
    public debounceTemp: Function = function() {}
    /** 弹窗提示框 */
    public showOverlay = false

    created() {
        this.debounceTemp = this.debounce(this.showTip, 1000)
    }
    mounted() {}

    /** 输入完成 */
    fillOver() {
        this.debounceTemp()
    }
    /** 显示提示框 */
    showTip() {
        this.showOverlay = true
    }
    /** 取消，返回首页 */
    backHome() {
        this.$router.replace('/index/home')
    }
    /** 提交表单 */
    submitFormData(valid: boolean) {
        console.log(valid)
        Toast(JSON.stringify(this.demoFormData))
    }

    /** 防抖函数 */
    debounce(callBack: any, delay = 1000) {
        let timer: any
        return function() {
            const _self = this // 注意 this 指向
            const args = arguments // arguments中存着e
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                callBack.apply(_self, args)
            }, delay)
        }
    }
}
</script>

<style lang="less" scoped>
.DemoFillInForm {
    .note {
        height: 35px;
        line-height: 35px;
        box-sizing: content-box;
        // prettier-ignore
        padding: 10PX 18PX;
        font-size: 14px;
        color: #158dff;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        p {
            width: 80%;
            height: 100px;
            margin: 0;
            padding: 32px;
            background-color: #fff;
            border-radius: 4px;
            text-align: center;
        }
    }

    /deep/.event-title {
        .van-field__control {
            color: #1989fa;
        }
    }
}
</style>
