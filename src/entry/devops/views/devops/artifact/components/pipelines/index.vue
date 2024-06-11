<template>
    <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="model" :span="24" class="FormItemMember">
        <div slot="urls" class="table">
            <el-table :data="dataList" style="width: 100%" class="url-table">
                <el-table-column label="流水线id" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            class="inline-input"
                            v-model="row.id"
                            :fetch-suggestions="querySearch"
                            placeholder="[必填]"
                            :highlight-first-item="true"
                            :trigger-on-focus="true"
                            @select="handleSelect($event, row)"
                        >
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                                <span class="addr">{{ item.label }}</span>
                            </template>
                        </el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="名称" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="环境" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-select v-model="row.target" placeholder="请选择">
                            <el-option v-for="item in row.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="60px" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleDelUrl(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="sg-mt-3">
                <el-button type="" @click="handleAddUrl" icon="el-icon-plus">新增一行</el-button>
            </div>
        </div>
    </sg-base-form>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { PipelineService } from '@/entry/devops/api'
import { Pipeline } from '@/entry/devops/models'
import { getTargetOptions } from '@/entry/devops/views/devops/pipeline/components/helper'

export interface Row {
    /**
     * 流水线id
     */
    id: string

    /**
     * 环境
     */
    target: string
}

@Component({
    name: 'FormItemMember',
    components: {},
})
export default class FormItemMember extends Vue {
    /**
     * 父级表单数据
     */
    @Prop({ type: Object, default: () => ({}) })
    formModel!: Record<string, any>

    /**
     * 父级表单域的值
     * */
    @Prop({ type: Object, default: () => [] })
    value!: Record<string, any>

    PipelineOptions: any[] = []
    async syncPipelineOptions() {
        const { data } = await PipelineService.findAll()
        this.PipelineOptions = data.map(item => {
            return {
                ...item,
                value: item.id,
                label: item.name,
            }
        })
    }
    created() {
        this.syncData()
    }
    async syncData() {
        this.syncPipelineOptions()
    }
    formFields: FormColumn[] = [
        {
            span: 24,
            tag: 'slot',
            slotName: 'urls',
            itemAttrs: {
                label: '',
            },
        },
    ]
    model = {}
    dataList = [] as Row[]

    handleSelect($event: Pipeline, row: any) {
        const { target_urls, config } = $event
        const triggers = config?.triggers
        const options = getTargetOptions({
            target_urls,
            triggers,
        })
        this.$set(row, 'name', $event.name)
        this.$set(row, 'options', options)
    }
    querySearch(queryString: any, cb: any) {
        if (!queryString) {
            cb([...this.PipelineOptions])
            return
        }
        const result = this.PipelineOptions.filter(item => item.value.includes(queryString) || item.label.includes(queryString))
        cb(result)
    }

    userOptions = [] as any[]
    public unwatch: () => void = () => void 0

    mounted() {
        this.unwatch = this.$watch(
            'value',
            (val, oldValue) => {
                this.dataList = val
            },
            { deep: true, immediate: true },
        )
    }

    handleDelUrl(index: number) {
        this.dataList.splice(index, 1)
    }

    handleAddUrl() {
        const item = {} as Row
        this.dataList.push(item)
    }
    /**生成校验 */
    generateValidate() {
        return [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (Array.isArray(value) && value.length > 0) {
                        const total = value.length
                        const result = value.filter(item => {
                            return item.id && item.target && item.name
                        })
                        if (result.length !== total) {
                            callback(new Error('流水线、名称、环境必填'))
                        } else {
                            callback()
                        }
                    } else {
                        callback()
                    }
                },
                // trigger: 'change',
            },
        ]
    }
}
</script>

<style lang="less" scoped>
.FormItemMember ::v-deep {
    .table {
        .el-table th {
            padding: 0;
        }
    }
}
</style>
<style lang="less">
.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}
</style>
