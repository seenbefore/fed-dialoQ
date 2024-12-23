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
    {
        label: '系统管理',
        icon: 'el-icon-document',
        uri: '/系统管理',
        children: [
            {
                label: '数据字典',
                icon: 'el-icon-document',
                uri: '/system/dict',
            },
            {
                label: '菜单管理',
                icon: 'el-icon-document',
                uri: '/system/menu',
            },
            {
                label: '操作日志',
                icon: 'el-icon-document',
                uri: '/system/operation-log',
            },
            {
                label: '角色管理',
                icon: 'el-icon-document',
                uri: '/system/role',
            },
            {
                label: '部门管理',
                icon: 'el-icon-document',
                uri: '/system/department',
            },
            {
                label: '人员管理',
                icon: 'el-icon-document',
                uri: '/system/user',
            },
        ],
    },
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
                        label: '卷宗管理',
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
        label: '考试平台',
        icon: 'el-icon-document',
        uri: '/question-bank',
        children: [
            {
                label: '题库管理',
                icon: 'el-icon-document',
                uri: '/题库管理',
                children: [
                    {
                        label: '题库列表',
                        icon: 'el-icon-document',
                        uri: '/question-bank/list',
                    },
                ],
            },
            {
                label: '考场管理',
                icon: 'el-icon-document',
                uri: '/考场管理',
                children: [
                    {
                        label: '试卷列表',
                        icon: 'el-icon-document',
                        uri: '/question-bank/paper',
                    },
                ],
            },
            {
                label: '考生管理',
                icon: 'el-icon-document',
                uri: '/考生管理',
                children: [
                    {
                        label: '考生列表',
                        icon: 'el-icon-document',
                        uri: '/question-bank/student',
                    },
                ],
            },
        ],
    },
    {
        label: '执法监督',
        icon: 'el-icon-document',
        uri: '/law-supervision',
        children: [
            {
                label: '执法公示',
                icon: 'el-icon-document',
                uri: '/law-supervision/publicity',
                children: [
                    {
                        label: '事前信息公示',
                        icon: 'el-icon-document',
                        uri: '/law-supervision/publicity/pre-publicity',
                    },
                ],
            },
        ],
    },
    {
        label: '内容管理',
        icon: 'el-icon-document',
        uri: '/content',
        children: [
            {
                label: '文章管理',
                icon: 'el-icon-document',
                uri: '/content/article',
            },
        ],
    },
    {
        label: 'AI助手',
        icon: 'el-icon-chat-dot-round',
        uri: '/ai-assistant',
        children: [
            {
                label: '聊天室',
                icon: 'el-icon-chat-line-round',
                uri: '/ai-assistant/chat',
            },
        ],
    },
]
