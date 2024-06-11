<template>
    <div class="table-form" :class="themeStyle">
        <el-form size="small" ref="form" :model="formData" v-bind="$attrs" @submit.native.prevent>
            <el-table ref="table" :data="value" v-bind="$attrs" v-on="$listeners" style="width: 100%" :header-cell-style="headerCellStyleHandle">
                <my-table-column :columns="myColumns" :opera-type="operaType"></my-table-column>
            </el-table>
        </el-form>
        <div class="footer-btns">
            <slot name="footer-btns">
                <el-button class="add-btn" v-if="footAddBtnText && operaType === 'edit'" type="text" icon="el-icon-circle-plus-outline" @click="footAddBtnClick">
                    {{ footAddBtnText }}
                </el-button>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import MyTableColumn from './components/my-table-column/index.vue'
import { Form, Table } from 'element-ui'
import { TableFormColumn, OperaType } from './types'
import { bfsTree, dfsTree } from './utils'

@Component({
    name: 'TableForm',
    components: { MyTableColumn },
})
export default class TableForm extends Vue {
    created() {}
    mounted() {}

    /**表单值 */
    @Prop({ type: Array, default: () => [] })
    value!: Record<string, any>[]
    /**配置项 */
    @Prop({ type: Array, default: () => [] })
    fields!: TableFormColumn[]
    /**操作类型 [edit: 编辑, readonly: 只读] */
    @Prop({ type: String, default: 'edit' })
    operaType!: OperaType
    /**底部新增按钮名 */
    @Prop({ type: String, default: '' })
    footAddBtnText!: string
    /**底部新增按钮事件 */
    @Prop({ type: Function, default: null })
    footAddBtnHandle!: () => void
    /**主题样式(single-table) */
    @Prop({ type: String, default: '' })
    themeStyle!: string
    /**只读状态下，空值的默认值 */
    @Prop({ type: String, default: '-' })
    defaultValue!: string
    @Emit('input')
    emitInput(data?: Record<string, any>) {
        return data
    }

    $refs!: {
        form: Form
        table: Table
    }

    get formData() {
        return { model: this.value }
    }
    @Watch('formData.model', { deep: true })
    watchFormDataModel(newV: Record<string, any>[]) {
        console.log(newV)
        this.emitInput(newV)
    }
    get myColumns() {
        return this.fields
    }
    get myAttrs() {
        return {
            border: this.themeStyle !== 'single-table',
            ...(this.$attrs || {}),
        }
    }

    // 校验整个表单
    validate() {
        return new Promise((resolve, reject) => {
            this.$refs['form'].validate((valid, result) => {
                if (!valid) {
                    // TODO: 定位到错误位置，横向滚动有问题
                    // const [firstErrorKey] = Object.keys(result)
                    // const firstErrorItem = this.$el.querySelector(
                    //     `[name="${firstErrorKey}"]`,
                    // )
                    // firstErrorItem &&
                    //     firstErrorItem.scrollIntoView({
                    //         behavior: 'smooth',
                    //         inline: 'end',
                    //     })
                    return reject({ valid, result })
                }
                resolve({ valid, result })
            })
        })
    }

    // 重置数据
    reset(index?: number, prop = '') {
        console.log('[reset]', index)
        // TODO: 某行表单重置有问题，数组会被重置为[null]
        if (index !== undefined) {
            const fieldRefs = (this.$refs.form as any).fields || []
            fieldRefs.forEach((fieldRef: any) => {
                // 只有index，进行模糊匹配
                let reg = new RegExp(`^model\\[${index}\\]*`)
                // 有index和prop进行精准匹配
                if (prop) {
                    reg = new RegExp(`^model\\[${index}\\].${prop}$`)
                }
                if (reg.test(fieldRef.prop)) {
                    fieldRef.resetField()
                }
            })
        } else {
            this.$refs['form'].resetFields()
        }
        this.$emit('reset')
    }

    /**
     * 追加数据
     * @param {Object} value 要追加的数据(可选参数，不传，则自动取配置项里的value生成)
     */
    appendData(value?: Record<string, any>) {
        const data: Record<string, any> = value || {}
        if (!value) {
            dfsTree(this.fields, (field: TableFormColumn) => {
                if (field.prop) {
                    data[field.prop] = field.attrs?.value ?? ''
                }
            })
        }
        this.formData.model.push(data)
        this.emitInput(this.formData.model)
    }
    /**
     * 移除指定行的数据
     * @param {Number} index 行下标
     */
    deleteData(index: number) {
        this.formData.model.splice(index, 1)
        this.emitInput(this.formData.model)
    }
    /**
     * 底部添加按钮点击事件
     */
    footAddBtnClick() {
        if (typeof this.footAddBtnHandle === 'function') {
            this.footAddBtnHandle()
            return
        }
        this.appendData()
    }

    /**
     * 表头单元格的 style 的回调方法
     * @param {Object} params 行下标
     * @return {*}
     */
    headerCellStyleHandle({ row, column, rowIndex, columnIndex }: any) {
        bfsTree(this.fields, (node, index, level) => {
            if (rowIndex === level) {
                const headerColspan = node?.headerColspan
                if (typeof headerColspan !== 'undefined') {
                    const num = new Array(headerColspan).fill(0)
                    num.forEach((item, index_) => {
                        /**为了解决，第一个表头合并表头单元格时，无效问题。强行注入一个表头占位，所以要加1 */
                        row[index + index_ + 1].colSpan = index_ === 0 ? headerColspan : 0
                    })
                }
            }
        })
        if (column.colSpan === 0) {
            return 'display: none'
        }
    }
}
</script>

<style lang="less" scoped>
.table-form {
    ::v-deep {
        .el-form-item {
            margin-bottom: 0;
        }
        .el-form-item__error {
            padding-top: 0;
            top: unset;
            bottom: 1px;
            width: 100%;
        }
        .el-form-item__content {
            width: 100%;
        }
        .footer-btns {
            background: #edf6ff;
            text-align: center;
            .add-btn {
                color: #0797f3;
                font-weight: 600;
                & > i {
                    color: #0797f3;
                    font-weight: 600;
                }
                & > span {
                    margin-left: 0;
                }
            }
        }
        .el-table thead th.el-table__cell {
            background: #f5faff;
            color: #5b8098;
        }
        td.el-table__cell {
            padding: 0;
            .cell {
                height: 100%;
                padding: 0;
            }
        }
        col[width='1'] {
            /**不能将宽度设置为0，在低版本chrome（如chrome90）中嵌套表头不生效 */
            // width: 0px;
        }
        .placehoudler-th {
            border-color: rgba(0, 0, 0, 0);
            .cell {
                padding: 0;
                width: 0;
                overflow: hidden;
            }
        }
        .el-table td {
            padding: 0;
        }
    }
    &.single-table {
        ::v-deep {
            .el-table thead th.el-table__cell,
            td.el-table__cell {
                background: #f8f8f8;
            }
            .el-table td.el-table__cell,
            .el-table th.el-table__cell.is-leaf {
                border-bottom: 1px dashed rgba(232, 232, 232, 1);
            }
            .el-form-item .el-form-item__label {
                background: rgba(0, 0, 0, 0);
            }
            th.single-cell {
                color: #333333;
                .cell {
                    &::before {
                        content: '';
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background: #0480fa;
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                }
            }
            td.single-cell {
                .cell {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    & > div {
                        width: 30px;
                        height: 30px;
                        background: #dddddd;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #333333;
                    }
                }
            }
        }
    }
}
</style>
