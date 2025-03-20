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
    {
        label: '活动报名',
        uri: '/activity/signup?id=100002',
        icon: 'calendar-o',
    },
]
