<template>
    <el-dialog title="所有已选" visible @close="cancel">
        <el-tag :key="tag[valueKey]" v-for="tag in tags" closable @close="delTag(tag)">
            {{ tag ? tag[labelKey] : '' }}
        </el-tag>
        <template v-slot:footer>
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
    name: 'EditGirdDialog',
    components: {},
})
export default class EditGirdDialog extends Vue {
    @Prop({ type: Array, default: () => [] })
    value!: Record<string, any>[]
    @Prop({ type: String, default: 'value' })
    valueKey!: string
    @Prop({ type: String, default: 'label' })
    labelKey!: string

    tags: Record<string, any>[] = [...this.value]

    /**移除 */
    delTag(item: any) {
        const { flag, index } = this.isChecked(item)
        if (flag) {
            this.tags.splice(index, 1)
        }
    }
    /**是否选中 */
    isChecked(data: any) {
        let index = -1
        const flag = this.tags.some((item, i) => {
            const temp = item[this.valueKey] === data[this.valueKey]
            if (temp) {
                index = i
            }
            return temp
        })
        return { flag, index }
    }
    confirm() {
        this.$options.confirm && this.$options.confirm(this.tags)
    }
    cancel() {
        this.$options.cancel && this.$options.cancel()
    }
}
</script>
<style lang="less" scoped>
.el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
}
</style>
