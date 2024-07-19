import { UserMenu } from '@/@types/menu'

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
]
