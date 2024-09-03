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
]
