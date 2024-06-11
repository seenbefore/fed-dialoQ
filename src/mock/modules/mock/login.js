import { mock } from 'mockjs'
export default [
    {
        name: '/mock/login',
        method: 'post',
        description: 'mockLogin',
        onMock(opt, query, body) {
            const { username, password } = body
            if (!username || !password) {
                return mock({
                    code: -1,
                    message: '账号或者密码有误',
                })
            }
            return mock({
                code: 0,
                data: {
                    username,
                    token: '123456',
                    updateTime: '@date("yyyy-MM-dd")',
                    realName: '@name',
                    lastLoginTime: '@date("yyyy-MM-dd")',
                    mobilePhone: '@string(number,11)',
                    createTime: '@date("yyyy-MM-dd")',
                },
                message: '请求提示',
            })
        },
    },
]
