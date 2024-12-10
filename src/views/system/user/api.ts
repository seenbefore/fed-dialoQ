import { ExAxiosRequestConfig } from 'icinfo-request'

export interface UserVO {
    /** id */
    id: string
    /** 区划 */
    area: string
    /** 姓名 */
    name: string
    /** 手机号码 */
    mobile: string
    /** 角色 */
    role: string
    /** 备注 */
    remark: string
    /** 状态 0停用 1启用 */
    status: string
}

export const list = async (
    data?: {
        /** 姓名/账号 */ keyword?: string
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
                    id: '31',
                    area: '浙江省绍兴市',
                    name: '吕小明',
                    mobile: '18666666666',
                    role: '系统管理员',
                    remark: '',
                    status: '1',
                },
                {
                    id: '29',
                    area: '浙江省',
                    name: '杨小明',
                    mobile: '15777777777',
                    role: '系统管理员',
                    remark: '',
                    status: '1',
                },
                {
                    id: '28',
                    area: '浙江省',
                    name: '陈小明',
                    mobile: '13888888888',
                    role: '系统管理员',
                    remark: '',
                    status: '1',
                },
            ],
            recordsTotal: 3,
        },
    }
}

export const save = async (
    data?: {
        /** id */ id?: string
        /** 区划 */ area?: string
        /** 姓名 */ name?: string
        /** 手机号码 */ mobile?: string
        /** 角色 */ role?: string
        /** 备注 */ remark?: string
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
