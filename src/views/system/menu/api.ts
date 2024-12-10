import { ExAxiosRequestConfig } from 'icinfo-request'

export interface MenuVO {
    /** id */
    id: string
    /** 名称 */
    name: string
    /** 图标 */
    icon: string
    /** 路由地址 */
    uri: string
    /** 排序 */
    sort: number
    /** 状态 0隐藏 1显示 */
    status: string
    /** 创建时间 */
    createTime: string
    /** 子菜单 */
    children?: MenuVO[]
}

export const list = async (
    data?: {
        /** 菜单名称 */ name?: string
        /** 状态 */ status?: string
    },
    options?: ExAxiosRequestConfig,
) => {
    // 模拟数据
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: '1',
                    name: '系统管理',
                    icon: 'el-icon-setting',
                    uri: '/system',
                    sort: 1,
                    status: '1',
                    createTime: '2024-01-01 12:00:00',
                    children: [
                        {
                            id: '11',
                            name: '用户管理',
                            icon: 'el-icon-user',
                            uri: '/system/user',
                            sort: 1,
                            status: '1',
                            createTime: '2024-01-01 12:00:00',
                        },
                        {
                            id: '12',
                            name: '角色管理',
                            icon: 'el-icon-s-check',
                            uri: '/system/role',
                            sort: 2,
                            status: '1',
                            createTime: '2024-01-01 12:00:00',
                        },
                    ],
                },
                {
                    id: '2',
                    name: '业务管理',
                    icon: 'el-icon-s-order',
                    uri: '/business',
                    sort: 2,
                    status: '1',
                    createTime: '2024-01-01 12:00:00',
                    children: [
                        {
                            id: '21',
                            name: '业务列表',
                            icon: 'el-icon-document',
                            uri: '/business/list',
                            sort: 1,
                            status: '0',
                            createTime: '2024-01-01 12:00:00',
                        },
                    ],
                },
            ],
            recordsTotal: 2,
        },
    }
}

export const save = async (
    data?: {
        /** id */ id?: string
        /** 名称 */ name?: string
        /** 图标 */ icon?: string
        /** 路由地址 */ uri?: string
        /** 排序 */ sort?: number
        /** 状态 */ status?: string
        /** 父级id */ parentId?: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
    }
}

export const remove = async (
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
    }
}
