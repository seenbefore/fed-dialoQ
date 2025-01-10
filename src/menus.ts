import { UserMenu } from '@/@types/menu'
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
        label: '系统管理',
        icon: 'el-icon-document',
        uri: '/系统管理',
        children: [
            {
                label: '数据字典',
                uri: '/system/dict',
            },
            {
                label: '文件管理',
                uri: '/system/file-manage',
            },
            {
                label: '菜单管理',
                uri: '/system/menu',
            },
            {
                label: '操作日志',
                uri: '/system/operation-log',
            },
            {
                label: '角色管理',
                uri: '/system/role',
            },
            {
                label: '部门管理',
                uri: '/system/department',
            },
            {
                label: '人员管理',
                uri: '/system/user',
            },
        ],
    },
    {
        label: '实战案例',
        icon: 'el-icon-document',
        uri: '/实战案例',
        children: [
            {
                label: '电子卷宗',
                icon: 'el-icon-document',
                uri: '/电子卷宗',
                children: [
                    {
                        label: '系统管理员',
                        uri: '/系统管理员',
                        children: [
                            {
                                label: '案卷配置',
                                uri: '/file-review/case-config',
                            },
                        ],
                    },
                    {
                        label: '案件承办人',
                        uri: '/案件承办人',
                        children: [
                            {
                                label: '我的卷宗',
                                uri: '/file-review/my-case',
                            },
                            {
                                label: '卷宗查询',
                                uri: '/file-review/case-search',
                            },
                        ],
                    },
                    {
                        label: '档案管理员',
                        uri: '/档案管理员',
                        children: [
                            {
                                label: '卷宗管理',
                                uri: '/file-review/case-sort',
                            },
                            {
                                label: '卷宗号配置',
                                uri: '/file-review/case-number-config',
                            },
                            {
                                label: '卷宗查询记录',
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
                        uri: '/题库管理',
                        children: [
                            {
                                label: '题库列表',
                                uri: '/question-bank/list',
                            },
                        ],
                    },
                    {
                        label: '考场管理',
                        uri: '/考场管理',
                        children: [
                            {
                                label: '试卷列表',
                                uri: '/question-bank/paper',
                            },
                            {
                                label: '考场管理',
                                uri: '/question-bank/exam/room',
                            },
                        ],
                    },
                    {
                        label: '考生管理',
                        uri: '/考生管理',
                        children: [
                            {
                                label: '考生列表',
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
                        uri: '/law-supervision/publicity',
                        children: [
                            {
                                label: '事前信息公示',
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
                        uri: '/content/article',
                    },
                ],
            },
        ],
    },

    {
        label: '关于项目',
        icon: 'el-icon-document',
        uri: '',
        children: [
            {
                label: '接口文档',
                uri: 'http://api.fed.icinfo.co/unifiedcase/electric-archive-service/electric-archive-service/dev',
            },
        ],
    },
    {
        label: '数据库',
        icon: 'el-icon-folder',
        uri: '',
        children: [
            {
                label: '数据库管理',
                uri: '/database/manage',
            },
        ],
    },
]
