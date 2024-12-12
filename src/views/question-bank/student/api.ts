import { ExAxiosRequestConfig } from 'icinfo-request'

export interface VO {
    /** id */
    id: string
    /** 姓名 */
    name: string
    /** 手机号码 */
    phone: string
    /** 身份证号 */
    idCard: string
    /** 工作单位 */
    company: string
    /** 注册日期 */
    registerDate: string
    /** 是否消防人员 0否 1是 */
    isFireman: string
}

export const list = async (
    data?: {
        /** 分页参数 页码数 */ pageNum?: number
        /** 分页参数 每页条数 */ length?: number
        /** 姓名/身份证号/手机号码 */ keyword?: string
        /** 考试类型 */ examType?: string
        /** 消防人员 */ fireman?: string
        /** 消防单位 */ fireUnit?: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: '6581',
                    name: '胡小明',
                    phone: '17677777777',
                    idCard: '430556199909090909',
                    company: '无',
                    registerDate: '2024-12-07 19:29:45',
                    isFireman: '0',
                },
                {
                    id: '6578',
                    name: '周小雪',
                    phone: '13059600296',
                    idCard: '333333333333333333',
                    company: '无',
                    registerDate: '2024-12-06 14:58:20',
                    isFireman: '1',
                },
            ],
            recordsTotal: 2,
        },
    }
}

export const save = async (
    data?: {
        /** 姓名 */ name?: string
        /** 手机号码 */ phone?: string
        /** 身份证号 */ idCard?: string
        /** 工作单位 */ company?: string
        /** 是否消防人员 */ isFireman?: string
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

export const detail = async (
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
        data: {
            id: '6581',
            name: '胡小明',
            phone: '17677777777',
            idCard: '430556199909090909',
            company: '无',
            registerDate: '2024-12-07 19:29:45',
            isFireman: '1',
        },
    }
}
