<template>
    <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="myModel" :span="24" class="PipelineFormTriggers">
        <div slot="urls" class="table">
            <el-table :data="myModel.triggers" style="width: 100%" class="url-table">
                <el-table-column label="目标环境" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-autocomplete
                            class="inline-input"
                            v-model="row.target"
                            :fetch-suggestions="querySearch"
                            placeholder="uat-xx[必填]"
                            :highlight-first-item="true"
                            :trigger-on-focus="true"
                            @select="handleSelect($event, row)"
                        ></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="环境名称" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.title" placeholder="xx环境[选填]"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="默认分支" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-select v-model="row.branch" placeholder="分支[必填]">
                            <el-option v-for="item in branches" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <!-- <el-input v-model="row.branch" placeholder="比如 test"></el-input> -->
                    </template>
                </el-table-column>

                <el-table-column label="自动构建" min-width="100px">
                    <template slot-scope="{ row }">
                        <el-switch v-model="row.auto"></el-switch>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="链接" width="160px">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.url" placeholder="[选填]"></el-input>
                    </template>
                </el-table-column> -->
                <el-table-column label="构建命令" min-width="180px">
                    <template slot-scope="{ row }">
                        <el-input type="textarea" v-model="row.buildCommands" placeholder="npm run build[选填]"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="部署命令" min-width="150px">
                    <template slot-scope="{ row }">
                        <el-input type="textarea" v-model="row.deployCommands" placeholder="覆盖默认部署命令[选填]"></el-input>
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
import { PipelineConfigTrigger } from '@/entry/devops/models/PipelineModel'
import { trim } from 'icinfo-util'
import * as API from '@/entry/devops/api'
@Component({
    name: 'PipelineFormTriggers',
    components: {},
})
export default class PipelineFormTriggers extends Vue {
    @Prop({
        default: () => {
            return {}
        },
    })
    formModel!: Record<string, any>
    branches: any[] = []
    /**值 */
    @Prop({ type: Object, default: () => [] })
    value!: Record<string, any>
    myModel = {
        triggers: [] as PipelineConfigTrigger[],
    }
    created() {}
    handleSelect($event: any, row: any) {
        const options = [
            {
                label: '测试环境',
                value: 'uat',
            },
            {
                label: '预发环境',
                value: 'pre',
            },
            {
                label: '线上环境',
                value: 'prd',
            },
            {
                label: '开发环境1',
                value: 'fat1',
            },
            {
                label: '开发环境2',
                value: 'fat2',
            },
            {
                label: '开发环境3',
                value: 'fat3',
            },
            {
                label: '开发环境4',
                value: 'fat4',
            },
            {
                label: '开发环境5',
                value: 'fat5',
            },
            {
                label: '开发环境6',
                value: 'fat6',
            },
        ]
        const branches = this.branches
        const { value } = $event
        const result = options.find(item => item.value === value)
        if (result) {
            this.$set(row, 'title', result.label)
        }
        if (value === 'prd') {
            this.$set(row, 'auto', false)
        }
        if (value === 'uat') {
            const branch = branches.filter(item => ['dev', 'develop', 'test', 'uat'].includes(item.value))
            if (branch.length > 0) {
                this.$set(row, 'branch', branch[0]['value'])
            }
        }
    }
    querySearch(queryString: any, cb: any) {
        if (!queryString) {
            cb([...this.options])
            return
        }
        const result = this.options.filter(item => item.value.includes(queryString))
        cb(result)
    }
    public parseData(data: any = {}) {
        const result = { ...data }
        let { buildCommands = [], deployCommands = [] } = result
        buildCommands = buildCommands.join('\n')
        deployCommands = deployCommands.join('\n')

        return {
            ...data,
            buildCommands,
            deployCommands,
        }
    }
    public formatData(data: any = {}) {
        const result = { ...data }
        const { buildCommands = '', deployCommands = '' } = result

        result.buildCommands = buildCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })
        result.deployCommands = deployCommands
            .split('\n')
            .filter((item: any) => item)
            .map((item: any) => {
                return trim(item, 2)
            })

        return result
    }
    @Watch('formModel.projectId', { deep: true, immediate: true })
    async watch_projectId(val: string) {
        if (val) {
            const result = await API.PipelineService.project_branches({
                projectId: val,
            })
            this.branches = result.data
            //this.branches.push(...result.data)
        }
    }

    async mounted() {
        const unwatch = this.$watch(
            'value',
            function(val, oldValue) {
                if (Array.isArray(val)) {
                    const result = val.map(item => {
                        item = this.parseData(item)
                        item.auto = item.auto ?? false
                        return {
                            ...item,
                        }
                    })

                    //this.$set(this.myModel, 'triggers', result)
                    this.myModel.triggers.unshift(...result)

                    unwatch()
                } else {
                }
            },
            //{ deep: true, immediate: true },
        )
    }
    @Watch('myModel.triggers', { deep: true })
    onChange(val: PipelineConfigTrigger[]) {
        // val.forEach(item => {
        //     if (item.target === 'prd') {
        //         item.auto = false
        //     }
        // })
        let result = val
            .filter(item => item.branch && item.target)
            .map(item => {
                return {
                    ...this.formatData(item),
                }
            })

        this.$emit('input', result)
    }
    options = [
        {
            label: 'uat',
            value: 'uat',
        },
        {
            label: 'fat1',
            value: 'fat1',
        },
        {
            label: 'fat2',
            value: 'fat2',
        },
        {
            label: 'fat3',
            value: 'fat3',
        },
        {
            label: 'fat4',
            value: 'fat4',
        },
        {
            label: 'fat5',
            value: 'fat5',
        },
        {
            label: 'fat6',
            value: 'fat6',
        },
        {
            label: 'pre',
            value: 'pre',
        },
        {
            label: 'prd',
            value: 'prd',
        },
    ]

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
    handleDelUrl(index: number) {
        this.myModel.triggers.splice(index, 1)
    }

    handleAddUrl() {
        this.myModel.triggers.push({
            target: '',
            branch: '',
            auto: false,
        })
    }
}
</script>

<style lang="less" scoped>
.PipelineFormTriggers ::v-deep {
    .table {
        width: 900px;
        .el-table th {
            padding: 0;
        }
    }
}
</style>
