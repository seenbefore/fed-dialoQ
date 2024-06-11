<template>
    <sg-base-form label-width="80px" ref="formRef" :fields="formFields" v-model="model" :span="24" class="FormItemMember">
        <div slot="urls" class="table">
            <el-table :data="dataList" style="width: 100%" class="url-table">
                <el-table-column label="岗位" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-autocomplete
                            class="inline-input"
                            v-model="row.position"
                            :fetch-suggestions="querySearch"
                            placeholder="[必填]"
                            :highlight-first-item="true"
                            :trigger-on-focus="true"
                            @select="handleSelect($event, row)"
                        ></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="负责人" min-width="120px">
                    <template slot-scope="{ row }">
                        <el-autocomplete
                            class="inline-input"
                            v-model="row.name"
                            :fetch-suggestions="querySearchUser"
                            placeholder="[必填]"
                            :highlight-first-item="true"
                            :trigger-on-focus="true"
                            value-key="label"
                        ></el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column label="文档地址" min-width="150px">
                    <template slot-scope="{ row }">
                        <el-input v-model="row.url" placeholder="[选填]"></el-input>
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
import { trim } from 'icinfo-util'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { UserService } from '@/entry/library/services/user'
export interface IMember {
    /**
     * 岗位
     */
    position: string
    /**
     * 姓名
     */
    /**
     * 文档地址
     */
    name: string
    url?: string
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

    options = [
        {
            label: '前端',
            value: '前端',
        },
        {
            label: '后端',
            value: '后端',
        },
        {
            label: '设计',
            value: '设计',
        },
        {
            label: '产品',
            value: '产品',
        },
        {
            label: '数据',
            value: '数据',
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
    model = {}
    dataList = [] as IMember[]

    handleSelect($event: any, row: any) {}
    querySearch(queryString: any, cb: any) {
        if (!queryString) {
            cb([...this.options])
            return
        }
        const result = this.options.filter(item => item.value.includes(queryString))
        cb(result)
    }
    querySearchUser(queryString: any, cb: any) {
        if (!queryString) {
            cb([...this.userOptions])
            return
        }

        const result = this.userOptions.filter(item => item.value.includes(queryString) || item.label.includes(queryString))

        cb(result)
    }
    created() {
        this.syncData()
    }
    userOptions = [] as any[]
    public unwatch: () => void = () => void 0
    async syncData() {
        const data = await UserService.getUserOptions()
        this.userOptions = data
    }

    mounted() {
        this.unwatch = this.$watch(
            'value',
            (val, oldValue) => {
                if (Array.isArray(val)) {
                    const result = val.map(item => ({ ...item }))

                    this.dataList = result
                    this.unwatch() // 在这里调用 unwatch 来停止监听
                } else {
                    this.dataList = [] // 如果value不是数组，则清空dataList
                }
            },
            { deep: true, immediate: true },
        )
    }

    @Watch('dataList', { deep: true })
    onChange(val: IMember[]) {
        this.$emit('input', val)
    }

    handleDelUrl(index: number) {
        this.dataList.splice(index, 1)
    }

    handleAddUrl() {
        const item = {} as IMember
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
                            return item.position && item.name
                        })
                        if (result.length !== total) {
                            callback(new Error('岗位和负责人必填'))
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
