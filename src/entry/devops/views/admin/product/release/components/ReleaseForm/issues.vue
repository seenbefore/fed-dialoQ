<template>
    <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="myModel" :span="24" class="ReleaseFormServices">
        <div slot="table" class="table">
            <el-table :data="myModel.dataList" style="width: 100%" class="url-table">
                <el-table-column label="问题内容" min-width="150px">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.value" placeholder="" type="textarea"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="解决时长(h)" width="150px">
                    <template slot-scope="{ row }">
                        <el-input-number v-model="row.time" placeholder="小时"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="责任人" width="100px">
                    <template slot-scope="{ row }">
                        <!-- <el-select v-model="row.owner">
                            <el-option v-for="item in owners" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select> -->
                        <el-autocomplete popper-class="my-autocomplete" v-model="row.owner" :fetch-suggestions="querySearch">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                            </template>
                        </el-autocomplete>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="60px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleDel(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sg-mt-3">
                <el-button type="" @click="handleAdd" icon="el-icon-plus">新增一行</el-button>
            </div>
        </div>
    </sg-base-form>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'

@Component({
    name: 'ReleaseFormServices',
    components: {},
})
export default class ReleaseFormServices extends Vue {
    /**值 */
    @Prop({ type: Object, default: () => [] })
    value!: Record<string, any>
    @Prop({ type: Object, default: () => {} })
    formModel!: Record<string, any>
    myModel = {
        dataList: [] as any[],
    }
    get owners() {
        const formModel = this.formModel || {}
        const participants = formModel.participants || []
        const result = participants.map((item: any) => {
            return {
                label: item.name,
                value: item.name,
            }
        })
        return result
    }
    querySearch(queryString: any, cb: any) {
        var results = [...this.owners]

        cb(results)
    }
    async mounted() {
        const unwatch = this.$watch('value', function(val, oldValue) {
            if (Array.isArray(val)) {
                val.forEach(item => {
                    item.auto = item.auto ?? true
                })
                this.myModel.dataList.push(...val)
                unwatch()
            }
        })
    }
    @Watch('myModel.dataList', { deep: true })
    onChange(val: any[]) {
        console.log('dataList input1')
        const result = val.filter(item => item.value)
        this.$emit('input', result)
    }

    formFields: FormColumn[] = [
        {
            span: 24,
            tag: 'slot',
            slotName: 'table',
            itemAttrs: {
                label: '',
            },
        },
    ]
    handleDel(index: number) {
        this.myModel.dataList.splice(index, 1)
    }

    handleAdd() {
        this.myModel.dataList.push({
            value: '',
        })
    }
}
</script>

<style lang="less" scoped>
.ReleaseFormServices ::v-deep {
    .table {
        width: 100%;
        .el-table th {
            padding: 0;
        }
    }
}
</style>
