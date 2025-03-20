import { mock } from 'mockjs'

const activities = ['徒步活动', '马拉松', '登山活动', '骑行活动', '瑜伽课程', '篮球比赛']
const locations = ['西湖景区', '千岛湖', '径山寺', '富春江', '武林广场', '钱塘江边']
const descriptions = ['一起来感受大自然的美好！', '挑战自我，超越极限！', '探索未知，享受乐趣！', '锻炼身体，结交朋友！', '放松身心，修身养性！']

// 固定场景数据
const FIXED_ACTIVITIES = {
    // 报名截止的活动
    '100001': {
        id: '100001',
        title: '2024年春季徒步活动',
        posterUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        startTime: '2024-04-15 09:00',
        endTime: '2024-04-15 17:00',
        location: '杭州西湖景区',
        description: `
            <h3>活动介绍</h3>
            <p>春暖花开，让我们一起徒步西湖，感受大自然的美好！</p>
            <h3>活动安排</h3>
            <p>09:00 集合签到</p>
            <p>09:30 开始徒步</p>
            <p>12:00 午餐休息</p>
            <p>13:30 继续徒步</p>
            <p>16:30 活动结束</p>
            <h3>注意事项</h3>
            <p>1. 请穿着舒适的运动装备</p>
            <p>2. 自备水和补给</p>
            <p>3. 注意防晒和安全</p>
        `,
        fee: 50,
        signupEndTime: '2024-04-14 18:00',
        quota: 100,
        remainingQuota: 0,
        signupStatus: 2, // 已截止
    },
    // 正在报名的活动
    '100002': {
        id: '100002',
        title: '2024年夏季篮球联赛',
        posterUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        startTime: '2024-07-15 14:00',
        endTime: '2024-07-30 18:00',
        location: '武林广场体育馆',
        description: `
            <h3>活动介绍</h3>
            <p>激情夏日，以球会友，一起来感受篮球的魅力！</p>
            <h3>赛事安排</h3>
            <p>7月15日-7月20日 小组赛</p>
            <p>7月21日-7月25日 淘汰赛</p>
            <p>7月26日-7月28日 半决赛</p>
            <p>7月30日 总决赛</p>
            <h3>参赛要求</h3>
            <p>1. 每队人数10-12人</p>
            <p>2. 参赛年龄18-45岁</p>
            <p>3. 需要提供体检报告</p>
        `,
        fee: 200,
        signupEndTime: '2024-07-10 18:00',
        quota: 120,
        remainingQuota: 80,
        signupStatus: 1, // 报名中
    },
}

export default [
    {
        name: '/activity/detail',
        method: 'post',
        description: '获取活动详情',
        onMock(opt, query, body) {
            // 如果是固定场景的活动ID，返回固定数据
            const { activityId } = body
            console.log('activityId', activityId)
            if (FIXED_ACTIVITIES[activityId]) {
                return {
                    code: 200,
                    data: FIXED_ACTIVITIES[activityId],
                    message: '请求成功',
                }
            }

            // 其他ID返回随机数据
            return mock({
                code: 200,
                data: {
                    id: '@string("number", 6)',
                    title: `2024年春季@pick(${JSON.stringify(activities)})`,
                    'posterUrl|1': ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'],
                    startTime: '@datetime("yyyy-MM-dd HH:mm")',
                    endTime: '@datetime("yyyy-MM-dd HH:mm")',
                    'location|1': locations,
                    description: function() {
                        const desc = mock('@pick(' + JSON.stringify(descriptions) + ')')
                        return `
                            <h3>活动介绍</h3>
                            <p>${desc}</p>
                            <h3>活动安排</h3>
                            <p>@time("HH:mm") 集合签到</p>
                            <p>@time("HH:mm") 开始活动</p>
                            <p>@time("HH:mm") 午餐休息</p>
                            <p>@time("HH:mm") 继续活动</p>
                            <p>@time("HH:mm") 活动结束</p>
                            <h3>注意事项</h3>
                            <p>1. 请穿着舒适的运动装备</p>
                            <p>2. 自备水和补给</p>
                            <p>3. 注意防晒和安全</p>
                        `
                    },
                    'fee|50-200': 1,
                    signupEndTime: '@datetime("yyyy-MM-dd HH:mm")',
                    'quota|80-150': 1,
                    'remainingQuota|20-50': 1,
                    'signupStatus|0-3': 0,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/activity/signup',
        method: 'post',
        description: '提交报名信息',
        onMock(opt, query, body) {
            const data = body
            // 检查是否是已截止的活动
            if (data.activityId === '100001') {
                return {
                    code: 400,
                    message: '该活动已截止报名',
                    data: null,
                }
            }

            if (!data.activityId || !data.name || !data.mobile || !data.idCard || !data.age || !data.gender || !data.emergencyContact || !data.emergencyPhone) {
                return {
                    code: 400,
                    message: '请填写完整信息',
                    data: null,
                }
            }
            return {
                code: 200,
                message: '@pick(["报名成功", "提交成功"])',
                data: null,
            }
        },
    },
    {
        name: '/activity/signup-status',
        method: 'post',
        description: '获取报名状态',
        onMock(opt, query, body) {
            const { activityId } = body
            if (!activityId) {
                return {
                    code: 400,
                    message: '活动ID不能为空',
                    data: null,
                }
            }

            // 返回固定场景的状态
            if (FIXED_ACTIVITIES[activityId]) {
                const activity = FIXED_ACTIVITIES[activityId]
                return {
                    code: 200,
                    data: {
                        status: activity.signupStatus,
                        remainingQuota: activity.remainingQuota,
                    },
                    message: '请求成功',
                }
            }

            return {
                code: 200,
                data: {
                    'status|0-3': 0,
                    'remainingQuota|0-50': 1,
                },
                message: '请求成功',
            }
        },
    },
]
