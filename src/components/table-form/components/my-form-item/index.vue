<template>
    <div class="my-form-item" :name="prop(myColumn, index)">
        <!-- 表单控件 -->
        <el-form-item v-if="fieldComponent" class="sg-form-item" v-bind="getItemAttrs(myColumn.itemAttrs)" :prop="prop(myColumn, index)">
            <component
                ref="formItem"
                :key="myColumn.prop"
                :opera-type="operaType"
                :is="fieldComponent"
                v-model="row[myColumn.prop]"
                v-bind="getFieldProps(myColumn.attrs)"
                :column="myColumn"
                :row="row"
                :index="index"
                :default-value="defaultValue"
                @input="handleInput"
            ></component>
        </el-form-item>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import ExSlot from '../ex-slot/index'
import { LinkageWatcher, OperaType } from '../../types'
import { isLinkageWatcher } from '../../utils'
const componentMap: Record<string, any> = {
    text: () => import('../my-text/index.vue'),
    input: () => import('../my-input/index.vue'),
    select: () => import('../my-select/index.vue'),
    date: () => import('../my-date/index.vue'),
    time: () => import('../my-time/index.vue'),
    checkbox: () => import('../my-checkbox/index.vue'),
    radio: () => import('../my-radio/index.vue'),
    cascader: () => import('../my-cascader/index.vue'),
    uploader: () => import('../my-uploader/index.vue'),
    autocomplete: () => import('../my-autocomplete/index.vue'),
    range: () => import('../my-range/index.vue'),
    table: () => import('../../index.vue'),
}

@Component({
    name: 'MyFormItem',
    components: { ExSlot },
})
export default class MyFormItem extends Vue {
    @Prop({ type: Number, default: 0 })
    index!: number
    /**操作类型 [edit: 编辑, readonly: 只读] */
    @Prop({ type: String, default: 'edit' })
    operaType!: OperaType
    /**只读状态下，空值的默认值 */
    @Prop({ type: String, default: '-' })
    defaultValue!: string
    /**配置项 */
    @Prop({ type: Object, default: () => ({}) })
    column!: Record<string, any>
    /**数值 */
    @Prop({ type: Object, default: () => ({}) })
    row!: Record<string, any>
    /**prop值 */
    @Prop({
        type: Function,
        default: (column: Record<string, any>, index: number) => `model[${index}].${column.prop}`,
    })
    prop!: (column: Record<string, any>, index: number) => string
    @Emit('input')
    emitInput(data: Record<string, any>) {
        return data
    }

    columnOut: Record<string, any> = {}
    get myColumn() {
        return { ...this.column, ...this.columnOut }
    }
    get formItemLoading() {
        const formItem = this.$refs?.formItem as any
        return formItem?.loading
    }
    @Ref('formItem')
    formItemRef!: any
    myFieldProps: Record<string, any> = {}
    myItemAttrs: Record<string, any> = {}

    /**
     * 获取字段组件
     * @param {*} column 配置项
     * @return {*}
     */
    get fieldComponent() {
        const column = this.myColumn
        const { tag } = column
        if (!this.withReadonlyModel(column) && this.operaType === 'readonly') {
            return componentMap['text']
        }
        const fieldComponent = componentMap[tag]
        if (fieldComponent) {
            return fieldComponent
        }
        return tag || componentMap['text']
    }
    /**
     * 获取表单字段的配置属性
     * @param {*} props 组件入参
     * @return {*}
     */
    getItemAttrs(props: Record<string, any> = {}) {
        const attrs = { ...props, ...this.myItemAttrs }
        // if (this.operaType !== 'edit') {
        //     attrs.rules = []
        // }
        return attrs
    }
    /**
     * 获取字段的配置属性
     * @param {*} props 组件入参
     * @return {*}
     */
    getFieldProps(props: Record<string, any> = {}) {
        return { ...props, ...this.myFieldProps }
    }
    /**
     * 组件有只读模式
     * @param {*} column 配置项
     * @return {*}
     */
    withReadonlyModel(column: Record<string, any> = {}) {
        const withReadonlyModel = componentMap[column.tag]
        if (withReadonlyModel) return withReadonlyModel
        return column?.withReadonlyModel ?? false
    }

    handleInput(value: any) {}

    @Watch('column', { immediate: true })
    watchMyColumn() {
        this.initWatcher()
    }
    /**监听器集合 */
    myWatchers: any[] = []
    /**初始化监听器 */
    initWatcher() {
        this.clearWatcher()
        const watchers = this.myColumn?.linkageRule
        if (!watchers) return
        ;[watchers].forEach((watcher: LinkageWatcher) => {
            if (!isLinkageWatcher(watcher)) {
                console.error('监听器类型不正确')
                return
            }
            this.addWatcher(watcher, (result: any) => {
                if (Object.prototype.toString.call(result) === '[object Object]') {
                    const { value, attrs, itemAttrs, ...rest } = result
                    // 如果返回结果为undefined, 则认为不需要修改
                    if (typeof value !== 'undefined') {
                        this.$set(this.row, this.myColumn.prop, value)
                    }
                    this.$set(this, 'columnOut', { ...(rest || {}) })
                    this.$set(this, 'myFieldProps', {
                        ...this.getFieldProps(this.myColumn.props || {}),
                        ...(attrs || {}),
                    })
                    this.$set(this, 'myItemAttrs', { ...(itemAttrs || {}) })
                }
            })
        })
    }
    /**
     * 添加监听器
     * @param {LinkageWatcher} watcher 监听器对象
     * @param {Function} callback 回调函数
     */
    addWatcher(watcher: LinkageWatcher, callback: (result: any) => void) {
        const unwatch = this.$watch(
            function() {
                const watchValue = watcher.watch.map((item: string) => this.row[item])
                return watchValue
            },
            async function(newV, oldV) {
                try {
                    // 动态结果执行函数
                    const result: any = await watcher.handler({
                        value: newV,
                        values: this.row,
                        formItemRef: this.formItemRef,
                        index: this.index,
                    })
                    // 如果返回结果为undefined, 则认为不需要修改
                    if (result !== undefined) {
                        callback(result)
                    }
                } catch (error) {
                    console.error(error)
                }
            },
            watcher.options,
        )
        this.myWatchers.push(unwatch)
    }
    /**清空监听器 */
    clearWatcher() {
        while (this.myWatchers.length) {
            const myWatcher = this.myWatchers.pop()
            myWatcher()
        }
    }
}
</script>
<style lang="less" scoped>
.my-form-item {
    ::v-deep {
        .el-form-item {
            display: flex;
            .el-form-item__label {
                padding: 0 15px;
                background: #f5faff;
                display: flex;
                align-items: center;
            }
            .el-form-item__content {
                flex: 1;
                padding: 15px 10px;
            }
        }
    }
}
</style>
