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

    {
        label: '辅助文档',
        icon: 'el-icon-document',
        uri: '/辅助文档',
        children: [
            {
                label: '说明',
                icon: 'el-icon-document',
                uri: '/readme/ReadMe',
            },
            {
                label: '内置图标',
                icon: 'el-icon-document',
                uri: '/readme/SvgIcon',
            },
            {
                label: '图片预览组件',
                icon: 'el-icon-document',
                uri: '/readme/ImagePreview',
            },
            {
                label: '项目模板 vue-template-admin',
                icon: 'el-icon-document',
                uri: 'http://192.168.1.147:3001/admin/post/4479903c-a1b7-47f6-a867-96089b893deb?class=p10',
            },
        ],
    },
]
