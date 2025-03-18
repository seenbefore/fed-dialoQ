<!-- 适用领域和适用区划选择示例 -->
<template>
    <div class="domain-region-example">
        <div class="form-item">
            <label>适用领域：</label>
            <my-tree-select
                :data="territoryList"
                v-model="formModel.domainCodes$"
                :is-show-select-all="true"
                placeholder="请选择"
                label-key="title"
                value-key="territoryId"
                children-key="children"
                :multiple="true"
                @input="handleDomainChange"
            />
        </div>

        <div class="form-item">
            <label>适用区划：</label>
            <my-tree-select
                :data="areaCodeList"
                v-model="formModel.regionCodes$"
                :is-show-select-all="true"
                placeholder="请选择"
                label-key="title"
                value-key="key"
                children-key="children"
                :multiple="true"
                @input="handleRegionChange"
            />
        </div>

        <!-- 展示处理后的数据 -->
        <div class="result">
            <h3>处理后的数据：</h3>
            <pre>{{ formModel }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyTreeSelect from '../index.vue'
import { handleTreeSelectChange, findMatchingNodes } from '../utils'

@Component({
    name: 'DomainAndRegionExample',
    components: {
        MyTreeSelect,
    },
})
export default class DomainAndRegionExample extends Vue {
    // 表单数据
    formModel = {
        domainCodes: '',
        domainCodes$: [],
        regionCodes: '',
        regionCodes$: [],
    }

    // 适用领域数据
    territoryList: any[] = []
    // 适用区划数据
    areaCodeList: any[] = []

    async mounted() {
        await Promise.all([this.getTerritoryList(), this.getAreaCodeList()])

        // 模拟初始化数据
        this.initializeData()
    }

    /** 获取领域列表 */
    async getTerritoryList() {
        try {
            // const { data } = await this.$http.request({
            //     url: '/sysmanage/territory/getTerritoryList',
            //     method: 'GET',
            //     params: {
            //         permissionFilter: false,
            //     },
            // })
            this.territoryList = [
                {
                    key: '145',
                    territoryId: '145',
                    title: '纪检监察',
                    children: [
                        {
                            key: '146',
                            territoryId: '146',
                            title: '信访举报',
                        },
                        {
                            key: '147',
                            territoryId: '147',
                            title: '案件查处',
                        },
                    ],
                },
                {
                    key: '154',
                    territoryId: '154',
                    title: '档案管理',
                    children: [
                        {
                            key: '155',
                            territoryId: '155',
                            title: '档案归档',
                        },
                        {
                            key: '156',
                            territoryId: '156',
                            title: '档案查阅',
                        },
                    ],
                },
                {
                    key: '160',
                    territoryId: '160',
                    title: '行政审批',
                    children: [
                        {
                            key: '161',
                            territoryId: '161',
                            title: '企业注册',
                        },
                        {
                            key: '162',
                            territoryId: '162',
                            title: '资质认证',
                        },
                    ],
                },
            ]
        } catch (error) {
            console.error('获取领域列表失败：', error)
            // 模拟领域数据
        }
    }

    /** 获取区划列表 */
    async getAreaCodeList() {
        try {
            // const { data } = await this.$http.request({
            //     url: '/sysmanage/area/getHasSelfAreaTree',
            //     method: 'GET',
            //     params: {
            //         minLevel: '4',
            //     },
            // })
            // 模拟区划数据
            this.areaCodeList = [
                {
                    key: '330100000000',
                    title: '杭州市',
                    children: [
                        {
                            key: '330113000000',
                            title: '临平区',
                            children: [
                                {
                                    key: '330113004000',
                                    title: '星桥街道',
                                },
                                {
                                    key: '330113005000',
                                    title: '乔司街道',
                                },
                                {
                                    key: '330113006000',
                                    title: '崇贤街道',
                                },
                            ],
                        },
                        {
                            key: '330106000000',
                            title: '西湖区',
                            children: [
                                {
                                    key: '330106001000',
                                    title: '蒋村街道',
                                },
                                {
                                    key: '330106002000',
                                    title: '转塘街道',
                                },
                            ],
                        },
                    ],
                },
            ]
        } catch (error) {
            console.error('获取区划列表失败：', error)
        }
    }

    /** 初始化数据 */
    initializeData() {
        // 模拟后端返回的初始数据
        const initialData = {
            domainCodes: '', // 示例：纪检,档案
            regionCodes: '330113004000,330113005000', // 示例：星桥街道,乔司街道
        }

        // 处理适用领域初始数据
        this.formModel.domainCodes = initialData.domainCodes
        this.formModel.domainCodes$ = findMatchingNodes(this.territoryList, initialData.domainCodes, { valueKey: 'territoryId', labelKey: 'title' })

        // 处理适用区划初始数据
        this.formModel.regionCodes = initialData.regionCodes
        this.formModel.regionCodes$ = findMatchingNodes(this.areaCodeList, initialData.regionCodes, { valueKey: 'key', labelKey: 'title' })
    }

    /** 处理适用领域变化 */
    handleDomainChange(val: any[]) {
        console.log(2222, val)
        const result = handleTreeSelectChange(val, {
            valueKey: 'territoryId',
            labelKey: 'title',
            displayFields: ['territoryId', 'title'],
        })
        console.log(111, result)
        this.formModel.domainCodes$ = result.displayData
        this.formModel.domainCodes = result.rawValue
    }

    /** 处理适用区划变化 */
    handleRegionChange(val: any[]) {
        console.log(2222, val)
        const result = handleTreeSelectChange(val, {
            valueKey: 'key',
            labelKey: 'title',
            displayFields: ['key', 'title'],
        })
        this.formModel.regionCodes$ = result.displayData
        this.formModel.regionCodes = result.rawValue
    }
}
</script>

<style scoped lang="less">
.domain-region-example {
    padding: 20px;

    .form-item {
        margin-bottom: 20px;

        label {
            display: inline-block;
            width: 100px;
            margin-right: 10px;
        }
    }

    .result {
        margin-top: 30px;
        padding: 15px;
        background-color: #f5f7fa;
        border-radius: 4px;

        h3 {
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 16px;
        }

        pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    }
}
</style>
