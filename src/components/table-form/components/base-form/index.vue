<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { OperaType } from '../../types'
@Component({
    name: 'BaseForm',
    components: {},
})
export default class BaseForm extends Vue {
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

    mounted() {
        this.initValue()
    }

    /**初始值 */
    get initialValue() {
        const { value = '' } = this.column?.attrs ?? {}
        return value ?? ''
    }
    /**初始化值 */
    initValue() {
        if (this.column.prop === undefined) return
        const value = this.row[this.column.prop]
        this.$emit('input', value ?? this.initialValue)
    }

    /**
     * 获取渲染内容
     * @param {*} column 列配置信息
     * @param {*} row 列表行数值
     * @return {*}
     */
    getRender(column: Record<string, any>, row: Record<string, any>) {
        const value = row[column.prop]
        return column.render ? column.render : () => value
    }

    /**
     * 获取默认值
     * @param {*} column 列配置信息
     * @return {*}
     */
    myDefaultValue(column: Record<string, any>) {
        return column.defaultValue ?? this.defaultValue
    }
}
</script>
