import { UserMenu } from '@/@types/menu'
const menu = require('./menu.json')
export const LocalMenu: UserMenu[] = [
    {
        label: '我的工作台',
        icon: 'el-icon-document',
        uri: '/我的工作台',
        children: [
            {
                label: '测试页面',
                icon: 'el-icon-document',
                uri: '/test',
            },
        ],
    },
    ...menu,
    {
        label: '电子卷宗',
        icon: 'el-icon-document',
        uri: '/电子卷宗',
        children: [
            {
                label: '案卷配置',
                icon: 'el-icon-document',
                uri: '/file-review/case-config',
            },
            {
                label: '我的卷宗',
                icon: 'el-icon-document',
                uri: '/file-review/my-case',
            },
            {
                label: '卷宗查询',
                icon: 'el-icon-document',
                uri: '/file-review/case-search',
            },
        ],
    },
]
