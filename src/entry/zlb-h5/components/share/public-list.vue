<script lang="ts">
import { TableModel } from '@zlb-h5/mixins/TableModel'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'PublicList',
})
export default class PublicList extends Vue {
    @Prop({ type: Object, required: true, default: new TableModel() })
    public tableModel!: TableModel<any>
}
</script>

<template>
    <van-pull-refresh v-model="tableModel.pullLoading" @refresh="tableModel.reset()">
        <van-list v-model="tableModel.listLoading" :finished="tableModel.finished" finished-text="没有更多了" @load="tableModel.load()">
            <slot></slot>
        </van-list>
    </van-pull-refresh>
</template>

<style scoped lang="less"></style>
