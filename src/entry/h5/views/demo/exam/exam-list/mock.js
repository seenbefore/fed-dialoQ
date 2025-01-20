import { mock } from 'mockjs'
const roles = ['系统管理员', '平台管理员', '数据统计人员', '信息录入人员', '普通人员']
export default [
    {
        name: '/exam/question/getExamPaperPageList',
        method: 'post',
        description: '考试列表',
        onMock(opt, query, body) {
            let { pageNum = 1, length = 10 } = body
            return mock({
                code: 200,
                data: {
                    total: 198,
                    pages: Math.ceil(198 / length),
                    data: mock({
                        [`data|${length}`]: [
                            {
                                'id|+1': pageNum * length + 1,
                                paperName: '2024年安全法规培训知识测评',
                                paperDesc: '安全法规培训知识测评',
                                totalQuestions: '@integer(20, 100)',
                                'multipleChoiceCount|1-20': 1,
                                'singleChoiceCount|1-20': 1,
                                'judgeCount|1-20': 1,
                                creatorId: '@id',
                                creatorName: '@cname',
                                updateTime: '@datetime',
                                remark: '@cparagraph(1)',
                                'totalScore|60-100': 1,
                                'passScore|60-80': 1,
                                'duration|60-120': 1,
                                paperTypeCode: 'SAFETY',
                                createTime: '@datetime',
                                'singleChoiceScore|2-5': 1,
                                'multipleChoiceScore|3-6': 1,
                                'judgeScore|1-3': 1,
                                paperTypeName: '安全考试',
                                startTime: '@datetime',
                                endTime: '@datetime',
                                'status|1': ['not_start', 'in_progress', 'finished'],
                            },
                        ],
                    }).data,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/user/detail',
        method: 'get',
        description: '用户详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: 1,
                    name: 'admin',
                    nickName: '管理员',
                    status: 1,
                    role: '系统管理员',
                    isAdmin: 1,
                },
            })
        },
    },
    {
        name: '/user/remove',
        method: 'get',
        description: '删除用户',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/user/save',
        method: 'post',
        description: '保存用户',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
]
