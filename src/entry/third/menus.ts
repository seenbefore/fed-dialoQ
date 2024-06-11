import { UserMenu } from '@/@types/menu'

export const LocalMenu: UserMenu[] = [
    {
        label: '我的工作台',
        icon: 'el-icon-document',
        uri: '/我的工作台',
        children: [
            {
                label: '我的待办',
                icon: 'el-icon-document',
                uri: '/workbench/todo',
            },
            {
                label: '我的已办',
                icon: 'el-icon-document',
                uri: '/workbench/done',
            },
        ],
    },

    {
        label: '公共',
        icon: 'el-icon-document',
        uri: '/公共',
        children: [
            {
                label: '404',
                icon: 'el-icon-document',
                uri: '/404',
            },
            {
                label: '360企业详情',
                icon: 'el-icon-document',
                uri: location.origin + '/market-customer/corporate-portrait/360-search/portrait-detail?pripid=3310823000050689&external=1',
            },
        ],
    },
    {
        label: '辅助文档',
        icon: 'el-icon-document',
        uri: '/辅助文档',
        children: [
            {
                label: '说明',
                icon: 'el-icon-document',
                uri: '/readme/ReadMe',
            },
            {
                label: 'PageTab-标签页',
                icon: 'el-icon-document',
                uri: '/readme/PageTab',
            },
        ],
    },
]
