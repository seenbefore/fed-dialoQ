:::demo

```html
<template>
    <!-- 走访记录反馈表 -->

    <div class="feedback-dialog-container">
        <!-- <el-button
            type=""
            @click="handlePrint('printFeedback')"
            class="no-print"
            >打印</el-button
        >
        <el-button type="" @click="handleDownload()" class="no-print"
            >下载</el-button
        > -->
        <div id="printFeedback">
            <div class="feedback-dialog-head">
                <span class="title">客户走访情况登记表</span>
            </div>
            <div class="feedback-dialog-main">
                <div class="card" style="margin-bottom:40px;">
                    <div class="card-head">
                        <span class="title">企业基本信息</span>
                    </div>
                    <div class="card-main">
                        <sg-base-form
                            ref="baseInfoForm"
                            :span="24"
                            v-model="editForm.model"
                            :fields="editForm.fields"
                            label-width="200px"
                            size="medium"
                            class=""
                        ></sg-base-form>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head">
                        <span class="title">走访情况</span>
                    </div>
                    <div class="card-main">
                        <sg-base-form
                            ref="feedbackForm"
                            :span="24"
                            v-model="editForm2.model"
                            :fields="editForm2.fields"
                            label-width="180px"
                            size="medium"
                            class=""
                        >
                            <div
                                slot="foot"
                                class="sg-flexbox justify-between table-row-foot"
                            >
                                <div class="sg-flex-11">登记人：张珊珊</div>
                                <div class="sg-flex-11">登记人：张珊珊</div>
                                <div class="sg-flex-11">登记人：张珊珊</div>
                            </div>
                        </sg-base-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-foot">
            <el-button type="primary" @click="handleSubmit" class="no-print"
                >提交</el-button
            >
            <el-button type="" class="no-print" @click="handleReset">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FeedBackDialog',

    props: {
        model: {
            type: Object,
            default() {
                return {}
            },
        },
        meta: {
            type: Object,
            default() {
                return {}
            },
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            editForm: {
                model: {
                    客户名称: '浙江汇信科技有新公司',
                },
                fields: [
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                name: '客户名称',
                                label: '客户名称',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 12,
                                name: '营业执照号码',
                                label: '营业执照号码',
                                tag: 'text',
                            },
                            {
                                class: 'table-col',
                                span: 12,
                                name: '有效期限',
                                label: '有效期限',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 12,
                                name: '法定代表人',
                                label: '法定代表人',
                                tag: 'text',
                                itemAttrs: {
                                    labelWidth: '200px',
                                },
                            },
                            {
                                class: 'table-col',
                                span: 12,
                                name: '手机/联系电话',
                                label: '手机/联系电话',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 24,
                                name: '企业注册地址',
                                label: '企业注册地址',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 12,
                                name: '注册资金（万元)',
                                label: '注册资金（万元)',
                                tag: 'text',
                            },
                            {
                                class: 'table-col',
                                span: 12,
                                name: '成立日期',
                                label: '成立日期',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 24,
                                name: '注册行业',
                                label: '注册行业',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 24,
                                name: '经营范围',
                                label: '经营范围',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 12,
                                name: '上年销售总额（万元)',
                                label: '上年销售总额（万元)',
                                tag: 'text',
                            },
                            {
                                class: 'table-col',
                                span: 12,
                                name: '上年纳税总额（万元)',
                                label: '上年纳税总额（万元)',
                                tag: 'text',
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                class: 'table-col',
                                span: 12,
                                name: '上年出口额（万元)',
                                label: '上年出口额（万元)',
                                tag: 'text',
                            },
                            {
                                class: 'table-col',
                                span: 12,
                                name: '上年进口额（万元)',
                                label: '上年进口额（万元)',
                                tag: 'text',
                            },
                        ],
                    },
                ],
            },

            editForm2: {
                model: {
                    法定代表人: '浙江汇',
                    控股股东或实际控制人: '1',
                },
                fields: [
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 12,
                                class: 'table-col',
                                name: '主营业务',
                                label: '主营业务',
                                tag: 'input',
                                atrrs: {},
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 12,
                                class: 'table-col',
                                name: ' 是否有跨境电商业务',
                                label: ' 是否有跨境电商业务',
                                tag: 'radio',
                                attrs: {
                                    value: '是',
                                    options: [
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ],
                                },

                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '实际经营地址',
                                label: '实际经营地址',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 8,
                                class: 'table-col',
                                name: '法定代表人',
                                label: '法定代表人',
                                tag: 'input',
                                attrs: {
                                    readonly: true,
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '证件类型',
                                label: '证件类型',
                                tag: 'select',
                                attrs: {
                                    placeholder: '请选择',
                                    options: [
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '证件号码',
                                label: '证件号码',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 8,
                                class: 'table-col',
                                name: '控股股东或实际控制人',
                                label: '控股股东或实际控制人',
                                tag: 'input',
                                attrs: {
                                    value: '1',
                                    placeholder: '请输入',
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '证件类型',
                                label: '证件类型',
                                tag: 'select',
                                attrs: {
                                    placeholder: '请选择',
                                    options: [
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '证件号码',
                                label: '证件号码',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 8,
                                class: 'table-col',
                                name: '从业人数',
                                label: '从业人数',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '经营场地所有权',
                                label: '经营场地所有权',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 8,
                                class: 'table-col',
                                name: '经营场地面积(㎡)',
                                label: '经营场地面积(㎡)',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    labelWidth: '150px',
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 12,
                                class: 'table-col',
                                name: '上年销售总额（万元)',
                                label: '上年销售总额（万元)',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 12,
                                class: 'table-col',
                                name: '上年纳税总额（万元)',
                                label: '上年纳税总额（万元)',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 12,
                                class: 'table-col',
                                name: '上年出口额（万元)',
                                label: '上年出口额（万元)',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                            {
                                span: 12,
                                class: 'table-col',
                                name: '上年进口额（万元)',
                                label: '上年进口额（万元)',
                                tag: 'input',
                                attrs: {
                                    placeholder: '请输入',
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '客户经营情况',
                                label: '客户经营情况',
                                tag: 'radio',
                                attrs: {
                                    placeholder: '请输入',
                                    value: '',
                                    options: [
                                        {
                                            label: '好',
                                            value: '好',
                                        },
                                        {
                                            label: '一般',
                                            value: '一般',
                                        },
                                        {
                                            label: '不佳',
                                            value: '不佳',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '客户融资需求',
                                label: '客户融资需求',
                                tag: 'radio',
                                attrs: {
                                    placeholder: '请输入',
                                    value: '',
                                    options: [
                                        {
                                            label: '强',
                                            value: '强',
                                        },
                                        {
                                            label: '一般',
                                            value: '一般',
                                        },
                                        {
                                            label: '无',
                                            value: '无',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        ifRender(model) {
                            return model['客户融资需求'] == '无'
                        },
                        columns: [
                            {
                                ifRender(model) {
                                    return model['客户融资需求'] == '无'
                                },
                                span: 24,
                                class: 'table-col',
                                name: '请选择原因',
                                label: '请选择原因',
                                tag: 'checkbox',
                                attrs: {
                                    placeholder: '请输入',
                                    value: [],
                                    options: [
                                        {
                                            label: '自有资金充足',
                                            value: '自有资金充足',
                                        },
                                        {
                                            label: '已在他行进行融资',
                                            value: '已在他行进行融资',
                                        },
                                        {
                                            label: '融资利率',
                                            value: '融资利率',
                                        },
                                        {
                                            label: '其他',
                                            value: '其他',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '客户其他业务需求',
                                label: '客户其他业务需求',
                                tag: 'checkbox',
                                attrs: {
                                    placeholder: '请输入',
                                    value: [],
                                    options: [
                                        {
                                            label: '人民币结算',
                                            value: '人民币结算',
                                        },
                                        {
                                            label: '国际结算',
                                            value: '国际结算',
                                        },
                                        {
                                            label: '企业网银',
                                            value: '企业网银',
                                        },
                                        {
                                            label: '理财业务',
                                            value: '理财业务',
                                        },
                                        {
                                            label: '代发业务',
                                            value: '代发业务',
                                        },
                                        {
                                            label: '其他',
                                            value: '其他',
                                        },
                                    ],
                                },
                                itemAttrs: {
                                    rules: [
                                        {
                                            required: true,
                                            message:'必填'
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '备注',
                                label: '备注',
                                tag: 'input',
                                attrs: {
                                    type: 'textarea',
                                    placeholder: '请输入备注',
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row mb-20',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                name: '备注1',
                                label: '附件',
                                tag: 'input',
                                attrs: {
                                    type: 'textarea',
                                    placeholder: '请输入备注',
                                },
                            },
                        ],
                    },
                    {
                        class: 'table-row',
                        columns: [
                            {
                                span: 24,
                                class: 'table-col',
                                slotName: 'foot',
                            },
                        ],
                    },
                ],
            },
        }
    },
    computed: {
        myVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    methods: {
        handleReset(){
            this.$refs.feedbackForm.reset()
        },
        handleDownload2() {
            const element = document.getElementById('printFeedback')
            window.html2pdf(element)
        },
        handleDownload() {
            window.html2canvas(document.getElementById('printFeedback'), {
                //dpi: 172, //导出pdf清晰度
                scale: window.devicePixelRatio || 2,
                onrendered: function(canvas) {
                    const contentWidth = canvas.width
                    const contentHeight = canvas.height

                    //一页pdf显示html页面生成的canvas高度;
                    const pageHeight = (contentWidth / 592.28) * 841.89
                    //未生成pdf的html页面高度
                    let leftHeight = contentHeight
                    //pdf页面偏移
                    let position = 0
                    //html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
                    const imgWidth = 595.28
                    const imgHeight = (592.28 / contentWidth) * contentHeight

                    const pageData = canvas.toDataURL('image/jpeg', 1.0)
                    const pdf = new window.jsPDF('', 'pt', 'a4')

                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(
                            pageData,
                            'JPEG',
                            0,
                            0,
                            imgWidth,
                            imgHeight,
                        )
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(
                                pageData,
                                'JPEG',
                                0,
                                position,
                                imgWidth,
                                imgHeight,
                            )
                            leftHeight -= pageHeight
                            position -= 841.89
                            //避免添加空白页
                            if (leftHeight > 0) {
                                pdf.addPage()
                            }
                        }
                    }
                    pdf.save('content.pdf')
                },
                //背景设为白色（默认为黑色）
                background: '#fff',
            })
        },
        handlePrint(id) {
            window.print()
        },
        handleSubmit() {
            this.$refs.feedbackForm.validate(valid => {
                console.log(1, valid)
            })
        },
        handleClose() {
            this.myVisible = false
        },
    },
    async created() {},
}
</script>
<style lang="less">
@media print {
    .no-print {
        display: none;
    }
}
</style>
<style  lang="less">
.feedback-dialog-container {
    width: 1000px;
    margin: 0 auto;
    .feedback-dialog-head {
        text-align: center;
        border-bottom: 1px solid #ededed;
        padding: 20px 0;
        .title {
            font-size: 24px;
            color: #333;
            font-weight: bold;
        }
    }
    .card-head {
        padding: 10px 0;
        .title {
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            font-weight: bold;
            &::before {
                content: '·';
                font-size: 20px;
                display: inline-block;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
    }
    .table-row-foot {
        background: #f9f9f9;
        padding: 10px 50px;
    }

   
        /* .el-radio__original,
        .el-checkbox__original {
            position: static;
            opacity: 1;
        }
        .el-radio__inner,
        .el-checkbox__inner {
            display: none;
        } */
        .sg-base-form-text {
            white-space: nowrap;
            overflow: hidden;
        }
        .el-form-item {
            margin-bottom: 0;
            input,
            textarea {
                border: none !important;
                resize: none;
                padding-left: 0;
                padding-right: 0;
            }
        }
        .mb-20 {
            margin-bottom: 20px;
        }
        .table-row {
            border: 1px solid #ededed;
            .el-col:first-child {
                .el-form-item__label {
                    border-left: none;
                }
            }
            margin-top: -1px;
        }
        .el-form-item__label {
            background: #f9f9f9;
            border-left: 1px solid #ededed;
            border-right: 1px solid #ededed;
            padding-right: 20px;
        }
        .sg-data-form-field,
        .sg-form-field {
            padding: 0 15px;
        }
        .el-form-item__error {
            top: 26%;
            right: 15px;
            left: auto;
            z-index: 10;
        }
    
}
</style>


```
:::
