import { UserMenu } from '@/@types/menu'
export const LocalMenu: UserMenu[] = [
    {
        label: '问题管理',
        icon: 'el-icon-document',
        children: [
            {
                label: '问题列表',
                uri: '/app-issues/question/list',
            },
        ],
    },
]
