import { mock } from 'mockjs'

export default [
    {
        name: '/user/login',
        method: 'post',
        description: '用户登录',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    token: '@guid',
                    userInfo: {
                        id: '@id',
                        username: '@word(5, 10)',
                        realName: '@cname',
                        mobile: /^1[3-9]\d{9}$/,
                        avatar: '@image("200x200")',
                    },
                },
                message: '登录成功',
            })
        },
    },
    {
        name: '/user/captcha',
        method: 'get',
        description: '获取验证码',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: '@string("0123456789", 4)',
                message: '获取成功',
            })
        },
    },
]
