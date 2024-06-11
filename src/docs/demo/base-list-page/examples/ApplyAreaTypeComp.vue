<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch, Emit, Model } from 'vue-property-decorator'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { applyAreaTypeMap, applyFieldTypeMap, applyLevelMap, APPLY_AREA_TYPE, APPLY_FIELD_TYPE, APPLY_LEVEL } from './Service'

@Component({
    name: 'BookRoomDialog',
    components: {},
})
export default class BookRoomDialog extends Vue {
    /**值 */
    @Prop({ type: Object, default: () => ({}) })
    value!: Record<string, any>
    /**抛出input事件 */
    @Emit('input')
    emitInput(value: Record<string, any>) {
        return value
    }
    /**抛出applyAreaCodeListChange事件 */
    @Emit('applyAreaCodeListChange')
    emitApplyAreaCodeListChange(value: Record<string, any>) {
        return value
    }

    mounted() {}

    render() {
        return (
            <div>
                <el-input v-model={this.formModel.applyAreaType} placeholder="输入“你好”后面输入框禁用" />
                <el-input v-model={this.formModel.applyAreaCodeList} disabled={this.formModel.applyAreaType === '你好'} />
            </div>
        )
    }

    @Ref('form')
    formRef!: FormRef
    /**表单值 */
    get formModel(): Record<string, any> {
        return this.value
    }

    /**生成校验 */
    generateValidate() {
        return [
            {
                validator: (rule: any, value: any, callback: any) => {
                    const { applyAreaType } = value ?? {}
                    console.log({ rule, value })
                    if (!applyAreaType) {
                        callback('第一个输入框必须输入文字')
                    }
                    callback
                },
                // trigger: 'change',
            },
        ]
    }
}
</script>
<style lang="less" scoped>
::v-deep {
    .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }
}
</style>
