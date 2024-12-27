// 移动端菜单
export const LocalMenu = [
    {
        label: '登录',
        uri: '/login',
    },
    {
        label: '考试',
        uri: '/exam',
        children: [
            {
                label: '考试列表',
                uri: '/exam/list',
            },
        ],
    },
]
