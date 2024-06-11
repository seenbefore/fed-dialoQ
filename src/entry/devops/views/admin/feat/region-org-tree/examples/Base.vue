<template>
    <div class="">
        <el-divider content-position="left"><h3>区域机构树</h3></el-divider>
        <region-org-tree style="width: 500px" v-model="selectedOrgs" :left-tree-config="leftTreeConfig" :right-tree-config="rightTreeConfig" placeholder="请随便选"></region-org-tree>
        {{ selectedOrgs }}
        <br />
        <br />
        <br />
        <el-divider content-position="left"><h3>区域机构树-直接使用面板</h3></el-divider>
        <region-org-tree-menu v-model="selectedOrgs1" :left-tree-config="leftTreeConfig" :right-tree-config="rightTreeConfig" />
        {{ selectedOrgs1 }}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import RegionOrgTree from '@/components/region-org-tree/index.vue'
import RegionOrgTreeMenu from '@/components/region-org-tree/menu-box.vue'
import { LeftTreeConfig, RightTreeConfig, RegionOrgTreeOption } from '@/components/region-org-tree/types'

@Component({
    components: { RegionOrgTree, RegionOrgTreeMenu },
})
export default class BaseDemo extends Vue {
    selectedOrgs: RegionOrgTreeOption[] = [
        { id: '浙江省省本级', name: '浙江省省本级' },
        { id: '浙江省信用监管处', name: '浙江省信用监管处' },
    ]
    selectedOrgs1: RegionOrgTreeOption[] = [
        { id: '浙江省省本级', name: '浙江省省本级' },
        { id: '浙江省信用监管处', name: '浙江省信用监管处' },
    ]
    leftTreeConfig: LeftTreeConfig = {
        optionFieldName: {
            value: 'id',
            label: 'name',
        },
        options: async () => {
            await this.delay()
            return [
                {
                    id: '浙江省',
                    name: '浙江省',
                    children: [
                        // {
                        //     id: '省本级',
                        //     name: '省本级',
                        // },
                        {
                            id: '杭州市',
                            name: '杭州市',
                            children: [
                                // {
                                //     id: '市本级',
                                //     name: '市本级',
                                // },
                                {
                                    id: '西湖区',
                                    name: '西湖区',
                                    children: [
                                        // {
                                        //     id: '西湖区',
                                        //     name: '西湖区',
                                        // },
                                        {
                                            id: '北山街道',
                                            name: '北山街道',
                                            children: [
                                                // {
                                                //     id: '北山街道',
                                                //     name: '北山街道',
                                                // },
                                                {
                                                    id: '文明村社区',
                                                    name: '文明村社区',
                                                },
                                                {
                                                    id: '保叔山庄社区',
                                                    name: '保叔山庄社区',
                                                },
                                            ],
                                        },
                                        {
                                            id: '西溪街道',
                                            name: '西溪街道',
                                        },
                                        {
                                            id: '古荡街道',
                                            name: '古荡街道',
                                        },
                                    ],
                                },
                                {
                                    id: '上城区',
                                    name: '上城区',
                                },
                                {
                                    id: '拱墅区',
                                    name: '拱墅区',
                                },
                            ],
                        },
                        {
                            id: '宁波市',
                            name: '宁波市',
                        },
                        {
                            id: '温州市',
                            name: '温州市',
                        },
                        {
                            id: '嘉兴市',
                            name: '嘉兴市',
                        },
                        {
                            id: '湖州市',
                            name: '湖州市',
                        },
                        {
                            id: '绍兴市',
                            name: '绍兴市',
                        },
                        {
                            id: '金华市',
                            name: '金华市',
                        },
                        {
                            id: '衢州市',
                            name: '衢州市',
                        },
                        {
                            id: '舟山市',
                            name: '舟山市',
                        },
                        {
                            id: '台州市',
                            name: '台州市',
                        },
                        {
                            id: '丽水市',
                            name: '丽水市',
                        },
                    ],
                },
            ]
        },
    }
    rightTreeConfig: RightTreeConfig = {
        optionFieldName: {
            value: 'id',
            label: 'name',
        },
        options: async ({ selectedRegion, keyword }) => {
            await this.delay()
            console.log('调用部门树接口参数', selectedRegion)
            const value = selectedRegion?.value
            if (value) {
                return [
                    {
                        id: `${value}浙江省卫健委`,
                        name: `${value}浙江省卫健委`,
                    },
                    {
                        id: `${value}浙江省市场监管局`,
                        name: `${value}浙江省市场监管局`,
                        children: [
                            {
                                id: `${value}省本级`,
                                name: `${value}省本级`,
                            },
                            {
                                id: `${value}信用监管处`,
                                name: `${value}信用监管处`,
                            },
                            {
                                id: `${value}食品处`,
                                name: `${value}食品处`,
                            },
                        ],
                    },
                    {
                        id: `${value}浙江省公安厅`,
                        name: `${value}浙江省公安厅`,
                    },
                    {
                        id: `${value}浙江省交通厅`,
                        name: `${value}浙江省交通厅`,
                    },
                    {
                        id: `${value}浙江省民政厅`,
                        name: `${value}浙江省民政厅`,
                    },
                    {
                        id: `${value}浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅`,
                        name: `${value}浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅浙江省农业农村厅`,
                    },
                    {
                        id: `${value}浙江省文化厅`,
                        name: `${value}浙江省文化厅`,
                    },
                    {
                        id: `${value}浙江省XX厅`,
                        name: `${value}浙江省XX厅`,
                    },
                    {
                        id: `${value}浙江省YY厅`,
                        name: `${value}浙江省YY厅`,
                    },
                ]
            } else if (keyword) {
                return [
                    {
                        id: '浙江省浙江省市场监督管理局',
                        name: '浙江省浙江省市场监督管理局',
                    },
                    {
                        id: `浙江省省本级`,
                        name: `浙江省省本级`,
                    },
                    {
                        id: `浙江省信用监管处`,
                        name: `浙江省信用监管处`,
                    },
                    {
                        id: '浙江省杭州市市场监管局',
                        name: '浙江省杭州市市场监管局',
                    },
                    {
                        id: '浙江省西湖区市场监管局',
                        name: '浙江省西湖区市场监管局',
                    },
                    {
                        id: '浙江省农贸商品市场监管科',
                        name: '浙江省农贸商品市场监管科',
                    },
                    {
                        id: '浙江省西湖区北山街道市场监管所',
                        name: '浙江省西湖区北山街道市场监管所',
                    },
                    {
                        id: '浙江省拱墅区卖鱼桥街道市场监管所浙江省拱墅区卖鱼桥街道市场监管所浙江省拱墅区卖鱼桥街道市场监管所',
                        name: '浙江省拱墅区卖鱼桥街道市场监管所浙江省拱墅区卖鱼桥街道市场监管所浙江省拱墅区卖鱼桥街道市场监管所',
                    },
                    {
                        id: '浙江省萧山区市场监管局',
                        name: '浙江省萧山区市场监管局',
                    },
                    {
                        id: '浙江省市场监督管理局1',
                        name: '浙江省市场监督管理局1',
                    },
                    {
                        id: '杭州市市场监管局1',
                        name: '杭州市市场监管局1',
                    },
                    {
                        id: '西湖区市场监管局1',
                        name: '西湖区市场监管局1',
                    },
                    {
                        id: '农贸商品市场监管科1',
                        name: '农贸商品市场监管科1',
                    },
                    {
                        id: '西湖区北山街道市场监管所1',
                        name: '西湖区北山街道市场监管所1',
                    },
                    {
                        id: '拱墅区卖鱼桥街道市场监管所1',
                        name: '拱墅区卖鱼桥街道市场监管所1',
                    },
                    {
                        id: '萧山区市场监管局1',
                        name: '萧山区市场监管局1',
                    },
                ]
            }
            return []
        },
        renderOptionContent: (h, { option, optionNode }) => {
            return h('div', {}, [optionNode, h('el-tag', {}, '派出所')])
        },
    }
    delay(time = 1000) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }
}
</script>

<style lang="less" scoped>
p,
h3 {
    margin: 0;
}
</style>
