import { UserMenu } from '@/@types/menu'
let host = `${location.origin}${process.env.BASE_URL}`
host = process.env.VUE_APP_MODE === 'hash' ? `${host}#/` : host
export const LocalMenu: UserMenu[] = [
    {
        label: '工作台',
        icon: 'el-icon-monitor',
        uri: '',
        children: [
            {
                label: '分析页',
                uri: '/workbench/analysis',
            },
            {
                label: 'AI助手',
                uri: '/workbench/chat',
            },
        ],
    },
    {
        label: '调研管理',
        icon: 'el-icon-document',
        uri: '/调研管理',
        children: [
            {
                label: '问卷管理',
                uri: '/survey/questionnaire',
            },
            {
                label: '数据分析',
                uri: '/survey/analysis',
            },
        ],
    },
    {
        label: '系统管理',
        icon: 'el-icon-setting',
        uri: '/系统管理',
        children: [
            {
                label: '文件管理',
                uri: '/system/file-manage',
            },
        ],
    },
]
