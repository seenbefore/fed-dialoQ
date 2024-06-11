import { mock } from 'mockjs'
const now = +new Date()
export default [
    {
        name: '/pipeline/update',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
            })
        },
    },
    {
        name: '/pipeline/update/member',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
            })
        },
    },
    {
        name: '/user/findAll',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                'data|10': [
                    {
                        'id|+1': 1,
                        appId: '@name',
                        name: '@name',
                        nickName: '@cname',
                    },
                ],
                message: '请求提示',
            })
        },
    },
    {
        name: '/user/list',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            let { page = 1, pageSize, length } = body
            page = page || 1
            pageSize = pageSize || length || 10
            return mock({
                code: 0,
                data: {
                    [`list|${pageSize}`]: [
                        {
                            id: '@name',
                            name: '@cname',
                            username: '@name',
                        },
                    ],
                    total: 198,
                },
                message: '请求提示',
            })
        },
    },
    {
        name: '/app-log/get',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            const { count = 0 } = body
            const status = ['start', 'update', 'install', 'build', 'deploy', 'end']
            return mock({
                code: 0,
                message: '请求提示',
                data: {
                    step: status[count],
                    status: 'success',
                    target: 'fat1',
                    branch: 'dev',
                    createAt: now,
                    startTime: now,
                    endTime: +new Date(),
                    name: '@name',
                    nickName: '@cname',
                    log$: `#! STAGE feature-1.0.1-entDetail-myl → fat1 | http://fed-template-360-homesite.fat1.icinfo.co/

                    #! STEP 更新项目
                    [97m> git fetch origin --prune[0m
                    
                    [97m> git checkout --force --detach 5c3b2c446b8febed7f234e40c31bb536b90d1a26[0m
                    Previous HEAD position was 0c95f80... Merge branch 'feature-1.0.0-myl' into 'develop'
                    HEAD is now at 5c3b2c4... feat: 企业详情页面新增三色率
                    
                    
                    #! STEPEND 0.84`,
                },
            })
        },
    },
    {
        name: '/app/build',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
                'data|1-10': 1,
            })
        },
    },
    {
        name: '/app/branch/list',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
                data: ['dev', 'master'],
            })
        },
    },
    {
        name: '/app/unfollow',
        method: 'post',
        description: '取关',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
            })
        },
    },
    {
        name: '/app/follow',
        method: 'post',
        description: '关注',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                message: '请求提示',
            })
        },
    },
    {
        name: '/app/get',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            /* eslint-disable*/

            return mock({
                code: 0,
                data: {
                    id: '@name',
                    name: '@name',
                    'follows|1': ['majinhui', 'aaa'],
                    type: 'web',
                    subType: 'pc',
                    createAt: '@date',
                    updateAt: +new Date() - 1 * 24 * 60 * 60 * 1000,
                },
                message: '请求提示',
            })
        },
    },
    {
        name: '/app/list',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            /* eslint-disable*/
            let { page = 1, pageSize, length } = body
            page = page || 1
            pageSize = pageSize || length || 10
            return mock({
                code: 0,
                data: {
                    [`list|${pageSize}`]: [
                        {
                            id: '@name',
                            name: '@name',
                            appId: 'ss',
                            'collectUserIds|1': ['majinhui', 'aaa'],
                            createdAt: '@date',
                            updatedAt: +new Date() - 1 * 24 * 60 * 60 * 1000,
                            '$lastLog|1': [
                                {
                                    id: '@name',
                                    'logId|+1': 1,
                                    target: 'fat1',
                                    branch: 'dev',
                                    createdAt: '@date',
                                    triggerMessage: '手动触发',
                                    startTime:
                                        +new Date() - 1 * 24 * 60 * 60 * 1000,
                                    endTime:
                                        +new Date() -
                                        0.34 * 24 * 40 * 60 * 1000,
                                    'status|1': [
                                        'success',
                                        'error',
                                        'pending',
                                        '',
                                    ],
                                    user$: {
                                        name: '@cname',
                                    },
                                },
                                null,
                            ],
                        },
                    ],
                    total: 198,
                },
                message: '请求提示',
            })
        },
    },
    {
        name: '/app-log/list',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            /* eslint-disable*/
            let { page = 1, pageSize, length } = body
            page = page || 1
            pageSize = pageSize || length || 10
            return mock({
                code: 0,
                data: {
                    [`list|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            appId: '@name',
                            $app: {
                                id: '@name',
                                name: '@name',
                            },
                            $user: {
                                name: '@cname',
                            },
                            lastCommit: `fix: element树穿梭框初版sakdakdl撒了；登录；爱的打了打大大；大`,
                            target: 'fat1',
                            branch: 'dev',
                            createAt: +new Date() - 1 * 24 * 60 * 60 * 1000,
                            startTime: +new Date() - 1 * 24 * 60 * 60 * 1000,
                            endTime: +new Date() - 0.34 * 24 * 40 * 60 * 1000,
                            name: '@name',
                            nickName: '@cname',
                            'status|1': ['success', 'error', 'pending'],
                        },
                    ],
                    total: 198,
                },
                message: '请求提示',
            })
        },
    },
]
