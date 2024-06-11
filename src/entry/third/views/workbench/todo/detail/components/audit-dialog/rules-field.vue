<!--  -->
<template>
    <div class="RulesField">
        <!-- {{ formModel }} -->
        <el-form ref="formRef" :model="formModel">
            <div class="ic-row">
                <div class="ic-headline ic-col-flex-1">
                    <div class="ic-line "></div>
                    <div class="title">
                        <span class=" ic-font-16">授信落实条件</span>
                    </div>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
                </div>
            </div>
            <sg-data-view ref="tableRef" v-bind="tableAttrs" v-if="formModel.tableData"></sg-data-view>
            <!-- <el-button type="primary" @click="validate">校验表格</el-button> -->
        </el-form>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormRef, FormRow, TableColumn, TableRef } from '@/sharegood-ui'

interface FormModel {
    name?: string
}
@Component({
    name: 'RulesField',
    components: {},
})
export default class RulesField extends Vue {
    async mounted() {
        this.handleAdd()
        this.tableRef.onLoad({ page: 1 })
    }
    /**
     * 约束事项
     */
    ruleOptions = [
        {
            label: '请选择',
            value: '',
        },
        {
            label: '基本户',
            value: '1',
        },
        {
            label: '存贷比',
            value: '2',
        },
        {
            label: '外汇账户',
            value: '3',
        },
        {
            label: '外汇结算量（美元）',
            value: '4',
        },
        {
            label: '月均代发人数',
            value: '5',
        },
        {
            label: '融资家数',
            value: '6',
        },
        {
            label: '融资金额',
            value: '7',
        },
        {
            label: '其他业务开通情况',
            value: '8',
        },
        {
            label: '用信期限',
            value: '9',
        },
    ]
    timeOptions = [
        {
            label: '请选择',
            value: '',
        },
        {
            label: '用信前',
            value: '用信前',
        },
        {
            label: '授信到期前',
            value: '存授信到期前贷比',
        },
    ]
    otherOptions = [
        {
            label: '企业互联',
            value: '企业互联',
        },
        {
            label: '公积金缴存',
            value: '公积金缴存',
        },
        {
            label: '电费签约',
            value: '电费签约',
        },
        {
            label: '水费签约',
            value: '水费签约',
        },
        {
            label: '税费签约',
            value: '税费签约',
        },
        {
            label: '一户通签约',
            value: '一户通签约',
        },
    ]
    requireRules = [{ required: true, message: '请输入', trigger: 'change' }]
    yxRules = [
        //{ required: true, message: '请输入用信期限' },
        {
            validator: (rule: any, value: any, callback: any) => {
                console.log(1234, value)
                if (value[0] && value[1]) {
                    callback()
                } else {
                    callback('用信期限格式有误')
                }
            },
        },
    ]

    formModel = {
        tableData: [] as any[],
    }
    @Watch('formModel.tableData', { deep: true })
    watchTable(val: any) {
        this.$emit('input', val)
    }
    /**生成校验 */
    generateValidate() {
        return [
            {
                validator: (rule: any, value: any, callback: any) => {
                    this.validate((valid: boolean) => {
                        if (!valid) {
                            callback('授信落实条件格式有误')
                        }
                        callback()
                    })
                },
                trigger: 'change',
            },
        ]
    }
    async validate(cb?: any) {
        const myForm = this.$refs.formRef as any
        return new Promise((resolve, reject) => {
            myForm.validate((valid: boolean, result: any) => {
                if (valid) {
                    // 表格校验通过，执行后续操作
                    console.log('表格校验通过')
                    resolve(true)
                    cb && cb(true)
                } else {
                    // 表格校验不通过，提示错误信息

                    console.log('表格校验不通过')
                    reject(false)
                    cb && cb(false)
                }
            })
        })
    }
    handleAdd() {
        this.formModel.tableData.push({})
        this.tableRef.onLoad()
    }
    handleDel(index: number) {
        this.formModel.tableData.splice(index, 1)
    }

    @Ref('tableRef')
    tableRef!: TableRef
    get tableAttrs() {
        return {
            border: false,
            pageVisible: false,
            auto: false,

            load: async (pageInfo: any) => {
                return {
                    result: this.formModel.tableData,
                    total: 100,
                }
            },
            columns: [
                {
                    label: '约束事项',
                    prop: 'rule',
                    width: '180px',
                    render: (h, { row, index }) => {
                        let prop = `tableData.${index}.rule`
                        let options = this.ruleOptions

                        return (
                            <el-form-item prop={prop} rules={this.requireRules}>
                                <el-select
                                    value={row['rule']}
                                    onInput={(val: any) => {
                                        this.$set(row, 'rule', val)
                                        if (['8'].includes(val)) {
                                            this.$set(row, 'val', [])
                                        } else if (['2'].includes(val)) {
                                            this.$set(row, 'val', '')
                                        } else if (['9'].includes(val)) {
                                            this.$set(row, 'val', [])
                                        } else {
                                            this.$set(row, 'val', '开立')
                                        }
                                    }}
                                >
                                    {options.map(item => (
                                        <el-option key={item.value} label={item.label} value={item.value}></el-option>
                                    ))}
                                </el-select>
                            </el-form-item>
                        )
                    },
                },
                {
                    label: '达标值',
                    prop: 'val',
                    minWidth: '150px',
                    'show-overflow-tooltip': false,
                    tooltip: false,
                    // align: 'left',
                    render: (h, { row, index }) => {
                        let prop = `tableData.${index}.val`
                        let ruleVal = row['rule']

                        if (['2'].includes(ruleVal)) {
                            return (
                                <el-form-item prop={prop} rules={this.requireRules}>
                                    <el-input
                                        style={{ width: '60px' }}
                                        value={row['val']}
                                        onInput={(val: any) => {
                                            row['val'] = val
                                        }}
                                    ></el-input>
                                </el-form-item>
                            )
                        } else if (['8'].includes(ruleVal)) {
                            let options = this.otherOptions

                            return (
                                <el-form-item prop={prop} rules={this.requireRules}>
                                    <el-checkbox-group
                                        class="checkbox"
                                        value={row['val']}
                                        onInput={(val: any) => {
                                            row['val'] = val
                                        }}
                                    >
                                        {options.map(item => (
                                            <el-checkbox key={item.value} label={item.value}>
                                                {item.label}
                                            </el-checkbox>
                                        ))}
                                    </el-checkbox-group>
                                </el-form-item>
                            )
                        } else if (['9'].includes(ruleVal)) {
                            return (
                                <el-form-item prop={prop} rules={this.yxRules}>
                                    <div>
                                        固定资产贷款用信期限在
                                        <span>
                                            <el-input
                                                style={{ width: '60px' }}
                                                value={row['val'][0]}
                                                onInput={(val: any) => {
                                                    this.$set(row['val'], 0, val)
                                                }}
                                            ></el-input>
                                        </span>
                                        年内，到期不得续贷;(有固定资产贷款时显示)
                                    </div>
                                    <div>
                                        流动资产贷款用信期限在
                                        <span>
                                            <el-input
                                                style={{ width: '60px' }}
                                                value={row['val'][1]}
                                                onInput={(val: any) => {
                                                    this.$set(row['val'], 1, val)
                                                }}
                                            ></el-input>
                                        </span>
                                        年内 (有流动资产贷款时显示)。
                                    </div>
                                </el-form-item>
                            )
                        } else {
                            return '开立'
                        }
                    },
                },

                {
                    label: '达标时间（用信前、授信到期前）',
                    prop: '达标时间',
                    width: '150px',
                    render: (h, { row, index }) => {
                        let prop = `tableData.${index}.达标时间`
                        let options = this.timeOptions

                        return (
                            <el-form-item prop={prop} rules={this.requireRules}>
                                <el-select
                                    value={row['达标时间']}
                                    onInput={(val: any) => {
                                        row['达标时间'] = val
                                    }}
                                >
                                    {options.map(item => (
                                        <el-option key={item.value} label={item.label} value={item.value}></el-option>
                                    ))}
                                </el-select>
                            </el-form-item>
                        )
                    },
                },

                {
                    label: '操作',
                    prop: '操作',
                    width: '80px',
                    render: (h, { row, index }) => {
                        return (
                            <img
                                title="删除"
                                style={{ cursor: 'pointer' }}
                                src={require('./assets/删除.png')}
                                onClick={() => {
                                    this.formModel.tableData.splice(index, 1)
                                    this.tableRef.onLoad()
                                }}
                            >
                                删除
                            </img>
                        )
                    },
                },
            ] as TableColumn[],
        }
    }
}
</script>

<style lang="less" scoped>
.RulesField::v-deep {
    .el-input__inner {
        height: 30px !important;
        line-height: 30px !important;
    }
    .cell.el-tooltip {
        white-space: normal !important;
    }
    .checkbox {
        text-align: left;
    }
    .el-form-item.is-success .el-input__inner {
        border-color: #ccc;
    }
}
</style>
