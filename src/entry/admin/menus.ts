import { UserMenu } from '@/@types/menu'
const host = `${location.origin}${process.env.BASE_URL}`
export const LocalMenu: UserMenu[] = [
    {
        label: '我的工作台',
        icon: 'el-icon-document',
        uri: '/我的工作台',
        children: [
            {
                icon: 'el-icon-document',
                label: 'test菜单',
                uri: '/test',
            },
        ],
    },
]
