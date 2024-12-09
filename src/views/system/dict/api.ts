import { ExAxiosRequestConfig } from 'icinfo-request'

export const list = async (
    data?: {
        /** 分页参数 页码数 */ pageNum?: number
        /** 分页参数 每页条数 */ length?: number
        /** 查询关键字 */ keyword?: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: '1',
                    name: '本系统',
                    code: 'system',
                    type: '系统',
                    sort: 1,
                    status: '1',
                    createTime: '2024-01-01 12:00:00',
                    children: [
                        {
                            id: '2',
                            name: '网站配置',
                            code: 'website',
                            type: '系统',
                            sort: 1,
                            status: '1',
                            createTime: '2024-01-01 12:00:00',
                            children: [
                                {
                                    id: '3',
                                    name: '基本设置',
                                    code: 'basic',
                                    type: '系统',
                                    sort: 5,
                                    status: '1',
                                    createTime: '2024-01-01 12:00:00',
                                    children: [
                                        {
                                            id: '4',
                                            name: '网站名称',
                                            code: 'webname',
                                            type: '系统',
                                            sort: 2,
                                            value: '浙江省消防救援总队消防考试平台',
                                            status: '1',
                                            createTime: '2024-01-01 12:00:00',
                                        },
                                        {
                                            id: '5',
                                            name: '网站地址',
                                            code: 'weburl',
                                            type: '系统',
                                            sort: 3,
                                            value: 'http://kspt.zjxt119.com/',
                                            status: '1',
                                            createTime: '2024-01-01 12:00:00',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: '6',
                            name: '其他设置',
                            code: 'other',
                            type: '系统',
                            sort: 11,
                            status: '1',
                            createTime: '2024-01-01 12:00:00',
                            children: [
                                {
                                    id: '7',
                                    name: '错误显示',
                                    code: 'diserror',
                                    type: '系统',
                                    sort: 4,
                                    value: 'Y',
                                    status: '1',
                                    createTime: '2024-01-01 12:00:00',
                                },
                            ],
                        },
                    ],
                },
            ],
            recordsTotal: 7,
        },
    }
}

export const save = async (params?: any) => {
    return {
        code: 200,
        message: 'success',
        data: true,
    }
}

export const detail = async (params?: any) => {
    return {
        code: 200,
        message: 'success',
        data: {
            id: '1',
            name: '本系统',
            code: 'system',
            type: '系统',
            sort: 1,
            status: '1',
            createTime: '2024-01-01 12:00:00',
        },
    }
}
