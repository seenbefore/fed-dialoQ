<template>
    <div>
        <el-tabs v-model="formModel.status" class="my-tabs">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in tabsFormSchema" :key="index"></el-tab-pane>
        </el-tabs>
        <sg-base-form ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="8"></sg-base-form>
        <sg-data-view :columns="columns" :load="load" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableLoadValue, TableRef } from '@/sharegood-ui'

@Component({
    components: {},
})
export default class Demo extends Vue {
    @Watch('formModel.status')
    onStatusChange(val: any) {
        this.tableRef.onLoad({ page: 1 })
    }
    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }
    tabsFormSchema = [
        {
            name: 'all',
            label: '全部',
        },
        {
            name: 'todo',
            label: '代办',
        },
        {
            name: 'done',
            label: '已办',
        },
    ]
    formModel = {
        status: 'all',
    }
    @Ref('formRef')
    formRef!: FormRef
    formFields: FormColumn[] = [
        {
            columns: [
                {
                    tag: 'input',
                    name: '文章名称',
                    itemAttrs: {
                        label: '文章名称',
                    },
                    attrs: {
                        placeholder: '支持模糊查询',
                    },
                },
                {
                    tag: 'date',
                    name: '[timeStart,timeEnd]',
                    itemAttrs: {
                        label: '日期范围',
                    },
                    attrs: {
                        value: ['2022-10-1', '2022-10-7'],
                        type: 'daterange',
                        'value-format': 'yyyy-MM-dd',
                        'start-placeholder': '开始时间',
                        'end-placeholder': '结束时间',
                    },
                },

                {
                    span: 24,
                    tag: 'action',
                    buttons: [
                        {
                            isSubmit: true,
                            type: 'primary',
                            text: '查询',
                            svgIcon: 'icon-search',
                        },
                        {
                            isReset: true,
                            text: '重置',
                            svgIcon: 'icon-reset',
                        },
                    ],
                },
            ],
        },
    ]
    @Ref('tableRef')
    tableRef!: TableRef
    async load(opt: any) {
        const state = this.formRef.getState()
        console.log('table请求参数', state, opt)

        return await this.syncData({
            ...opt,
            ...state,
        })
    }
    columns: TableColumn[] = [
        {
            label: '序号',
            type: 'index',
            prop: 'index',
        },
        {
            align: 'left',
            label: '配置名称',
            prop: 'name',
            width: '200px',
        },
        {
            align: 'left',
            label: '端口',
            prop: 'port',
            width: '100px',
        },
        {
            align: 'left',
            label: '备注',
            prop: 'note',
            minWidth: '200px',
        },
    ]
    async syncData(opt?: any): Promise<TableLoadValue> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    result: [
                        {
                            name: '张国荣',
                            birthday: '1967-12-12',
                            fans: 10000,
                            gender: 1,

                            dom: '香港,帅气',

                            remark:
                                '张国荣（1956年9月12日-2003年4月1日），出生于香港，中国香港男歌手、演员、音乐人，影视歌多栖发展的代表之一。1977年正式出道。1983年以《风继续吹》获得关注。1984年演唱的《Monica》是香港歌坛第一支同获十大中文金曲、十大劲歌金曲的舞曲',
                        },
                        {
                            name: '张学友',
                            birthday: '1967-11-12',
                            fans: 20000,
                            gender: 1,

                            dom: '歌神,吻别',

                            remark:
                                '1990年，张学友在拍摄电影《阿飞正传》的间隙，也在筹备新专辑，每日奔波两地，十分辛苦。唱到今天，2020年7月10日，张学友59岁了。还有多少人，在等他的演唱会？岁月，请你慢点走，且让歌神再唱一首',
                        },
                    ],
                    total: 120,
                })
            }, 200)
        })
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
