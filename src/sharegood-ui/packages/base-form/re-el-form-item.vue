<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FormItem from 'element-ui/packages/form/src/form-item.vue'
// @ts-ignore
import { getPropByPath } from 'element-ui/src/utils/util'
@Component({
    name: 'ReElFormItem',
    extends: FormItem,
    components: {},
})
export default class ReElFormItem extends Vue {
    /**自动触发子组件校验 */
    @Prop({ type: Boolean, default: false })
    autoTriggerSubComponentValidate!: boolean

    mounted() {}

    prop!: string
    required!: boolean
    rules!: any[]
    form!: any
    getRules() {
        let formRules = this.form.rules
        const selfRules = this.rules
        const requiredRule = this.required !== undefined ? { required: !!this.required } : []

        const prop = getPropByPath(formRules, this.prop || '')
        formRules = formRules ? prop.o[this.prop || ''] || prop.v : []

        const rules = ([] as any[]).concat(selfRules || formRules || []).concat(requiredRule)

        // 触发子组件内置的validate方法
        if (this.autoTriggerSubComponentValidate) {
            const defaultSlots = (this as any).$slots.default.filter((item: any) => !item.isComment)?.[0]
            const slotValidate: any[] = defaultSlots?.componentInstance?.generateValidate?.()
            if (slotValidate) {
                rules.push(...slotValidate)
            }
        }

        return rules
    }

    onFieldBlur!: any
    onFieldChange!: any
    addValidateEvents() {
        const rules = this.getRules()

        this.$on('el.form.blur', this.onFieldBlur)
        this.$on('el.form.change', this.onFieldChange)
    }
}
</script>

<style lang="less" scoped></style>
