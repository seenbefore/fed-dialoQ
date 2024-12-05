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
                label: '系统管理员',
                icon: 'el-icon-document',
                uri: '/系统管理员',
                children: [
                    {
                        label: '案卷配置',
                        icon: 'el-icon-document',
                        uri: '/file-review/case-config',
                    },
                ],
            },
            {
                label: '案件承办人',
                icon: 'el-icon-document',
                uri: '/案件承办人',
                children: [
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
            {
                label: '档案管理员',
                icon: 'el-icon-document',
                uri: '/档案管理员',
                children: [
                    {
                        label: '卷宗整理',
                        icon: 'el-icon-document',
                        uri: '/file-review/case-sort',
                    },
                    {
                        label: '卷宗号配置',
                        icon: 'el-icon-document',
                        uri: '/file-review/case-number-config',
                    },
                    {
                        label: '卷宗查询记录',
                        icon: 'el-icon-document',
                        uri: '/file-review/case-search-record',
                    },
                ],
            },
        ],
    },
    {
        label: '题库管理',
        icon: 'el-icon-document',
        uri: '/question-bank',
        children: [
            {
                label: '题库列表',
                icon: 'el-icon-document',
                uri: '/question-bank/list',
            },
            {
                label: '考卷列表',
                icon: 'el-icon-document',
                uri: '/question-bank/paper',
            },
        ],
    },
]
