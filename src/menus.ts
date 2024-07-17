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
                uri: '/admin/dashboard',
            },
            {
                label: '我的已办',
                icon: 'el-icon-document',
                uri: '/workbench/done',
            },
        ],
    },
]
