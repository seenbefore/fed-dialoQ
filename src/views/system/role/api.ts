import { ExAxiosRequestConfig } from 'icinfo-request'

export interface RoleVO {
    /** id */
    id: string
    /** 角色名称 */
    name: string
    /** 角色描述 */
    description: string
    /** 状态 0停用 1启用 */
    status: string
    /** 创建时间 */
    createTime: string
}

export const list = async (
    data?: {
        /** 角色名称 */ name?: string
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
                    name: '系统管理员',
                    description: '最高权限,可进行系统权限配置、系统管理等',
                    status: '1',
                    createTime: '2024-01-01 12:00:00',
                },
                {
                    id: '2',
                    name: '地市管理员',
                    description: '可进行本地市考生管理、监考管理等',
                    status: '1',
                    createTime: '2024-01-01 12:00:00',
                },
            ],
            recordsTotal: 2,
        },
    }
}

export const save = async (
    data?: {
        /** id */ id?: string
        /** 角色名称 */ name?: string
        /** 角色描述 */ description?: string
        /** 状态 */ status?: string
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
