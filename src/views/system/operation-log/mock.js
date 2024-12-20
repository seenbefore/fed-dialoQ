import { mock } from 'mockjs'
import moment from 'moment'

export default [
    {
        name: '/system/operation-log/list',
        method: 'post',
        description: '操作日志列表',
        onMock(opt, query, body) {
            let { page = 1, pageSize = 10 } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            operator: '@cname',
                            'operationType|1': ['LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT'],
                            description: '@sentence(3, 6)',
                            'module|1': ['USER', 'ROLE', 'MENU', 'DICT', 'DEPT'],
                            'status|1': ['1', '0'],
                            ip: '@ip',
                            operationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                            requestUrl: '/api/system/user/save',
                            requestMethod: 'POST',
                            requestParams: '{"id":1,"name":"admin"}',
                            responseResult: '{"code":200,"message":"success"}',
                            errorMessage: '@sentence(3, 6)',
                        },
                    ],
                    total: 100,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/system/operation-log/detail',
        method: 'get',
        description: '操作日志详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    operator: '@cname',
                    'operationType|1': ['LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT'],
                    description: '@sentence(3, 6)',
                    'module|1': ['USER', 'ROLE', 'MENU', 'DICT', 'DEPT'],
                    'status|1': ['1', '0'],
                    ip: '@ip',
                    operationTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                    requestUrl: '/api/system/user/save',
                    requestMethod: 'POST',
                    requestParams: '{"id":1,"name":"admin"}',
                    responseResult: '{"code":200,"message":"success"}',
                    errorMessage: '@sentence(3, 6)',
                },
                message: '请求成功',
            })
        },
    },
]
