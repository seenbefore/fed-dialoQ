import { mock } from 'mockjs'
export default [
    {
        name: '/mock/getUserInfo',
        method: 'get',
        description: 'mockGetUserInfo',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                data: {
                    roles: 'admin', // admin 超级管理员 developer 普通
                    menus: [
                        {
                            id: '0b49614e2bdc4e1c8fd97cda420449ba',
                            label: '系统维护',
                            children: [
                                // {
                                //     id: '40699cb0bac84860bc742d01e51ba5e2',
                                //     uri: '/admin/form/layout',
                                //     label: '布局表单',
                                // },
                                {
                                    id: '40699cb0bac84860bc742d01e51ba5ec',
                                    label: '基本查询',
                                    uri: '/crud/index',
                                },
                            ],
                            uri: '/系统维护',
                        },
                        {
                            id: '0b49614e2bdc4e1c8fd97cda420449ba',
                            label: '外部系统',
                            children: [
                                {
                                    id: '40699cb0bac84860bc742d01e51ba5e2',
                                    uri: 'https://www.icinfo.cn/',
                                    label: '子应用',
                                },
                                {
                                    id: '40699cb0bac84860bc742d01e51ba5ec',
                                    label: '汇信科技官网',
                                    uri: 'https://www.icinfo.cn?external=1',
                                },
                            ],
                            uri: '/外部系统',
                            icon: 'iconfont iconshouye',
                        },
                    ],
                },
                message: '请求提示',
            })
        },
    },
]
