import { mock } from 'mockjs'
import { QuestionnaireStatusEnum } from './enum'

export default [
    {
        name: '/survey/questionnaire/list',
        method: 'post',
        description: '问卷列表',
        onMock(opt, query, body) {
            const { page = 1, pageSize = 10 } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            title: '@ctitle(5, 20)',
                            'responseCount|0-1000': 100,
                            'status|1': Object.values(QuestionnaireStatusEnum),
                            createTime: '@datetime',
                            updateTime: '@datetime',
                            description: '@cparagraph(1, 2)',
                            'isAnonymous|1': [true, false],
                            publishTime: '@datetime',
                            endTime: '@datetime',
                        },
                    ],
                    total: 100,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/survey/questionnaire/detail',
        method: 'get',
        description: '问卷详情',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    title: '@ctitle(5, 20)',
                    'responseCount|0-1000': 100,
                    'status|1': Object.values(QuestionnaireStatusEnum),
                    createTime: '@datetime',
                    updateTime: '@datetime',
                    description: '@cparagraph(1, 2)',
                    content: JSON.stringify({
                        questions: [
                            {
                                id: '1',
                                type: 'singleChoice',
                                title: '您的性别是？',
                                options: [
                                    { id: '1', text: '男' },
                                    { id: '2', text: '女' },
                                ],
                                required: true,
                            },
                            {
                                id: '2',
                                type: 'multipleChoice',
                                title: '您平时喜欢哪些活动？',
                                options: [
                                    { id: '1', text: '阅读' },
                                    { id: '2', text: '运动' },
                                    { id: '3', text: '旅游' },
                                    { id: '4', text: '音乐' },
                                ],
                                required: true,
                            },
                            {
                                id: '3',
                                type: 'text',
                                title: '您对我们的产品有什么建议？',
                                required: false,
                            },
                        ],
                    }),
                    'isAnonymous|1': [true, false],
                    publishTime: '@datetime',
                    endTime: '@datetime',
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/survey/response/list',
        method: 'post',
        description: '答卷列表',
        onMock(opt, query, body) {
            const { page = 1, pageSize = 10 } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            questionnaireId: body.questionnaireId || '@id',
                            questionnaireTitle: '@ctitle(5, 20)',
                            content: JSON.stringify({
                                answers: [
                                    { questionId: '1', answer: '2' }, // 女
                                    { questionId: '2', answer: ['1', '3'] }, // 阅读、旅游
                                    { questionId: '3', answer: '@cparagraph(1, 3)' },
                                ],
                            }),
                            submitTime: '@datetime',
                            submitter: '@cname',
                            submitterId: '@id',
                            'duration|60-3600': 120,
                        },
                    ],
                    total: 100,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/survey/response/detail',
        method: 'get',
        description: '答卷详情',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    questionnaireId: '@id',
                    questionnaireTitle: '@ctitle(5, 20)',
                    content: JSON.stringify({
                        answers: [
                            { questionId: '1', answer: '2' }, // 女
                            { questionId: '2', answer: ['1', '3'] }, // 阅读、旅游
                            { questionId: '3', answer: '@cparagraph(1, 3)' },
                        ],
                    }),
                    submitTime: '@datetime',
                    submitter: '@cname',
                    submitterId: '@id',
                    'duration|60-3600': 120,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/survey/statistics/questionnaire',
        method: 'get',
        description: '问卷统计数据',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: {
                    questionnaireId: query.questionnaireId,
                    questionnaireTitle: '@ctitle(5, 20)',
                    'totalResponses|50-500': 100,
                    'completionRate|60-100.1-2': 85.5,
                    'averageDuration|120-600': 300,
                    dailyResponses: function() {
                        const result = []
                        for (let i = 6; i >= 0; i--) {
                            const date = new Date()
                            date.setDate(date.getDate() - i)
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).padStart(2, '0')
                            const day = String(date.getDate()).padStart(2, '0')
                            const dateStr = `${year}-${month}-${day}`
                            result.push({
                                date: dateStr,
                                count: Math.floor(Math.random() * 50) + 1, // 1-50的随机数
                            })
                        }
                        return result
                    },
                    questionStats: function() {
                        // 固定生成三种类型的题目统计
                        return [
                            {
                                questionId: '1',
                                questionTitle: '您的性别是？',
                                questionType: 'singleChoice',
                                optionStats: [
                                    {
                                        optionId: '1',
                                        optionText: '男',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 70.5,
                                    },
                                    {
                                        optionId: '2',
                                        optionText: '女',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 29.5,
                                    },
                                ],
                            },
                            {
                                questionId: '2',
                                questionTitle: '您平时喜欢哪些活动？',
                                questionType: 'multipleChoice',
                                optionStats: [
                                    {
                                        optionId: '1',
                                        optionText: '阅读',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 75.0,
                                    },
                                    {
                                        optionId: '2',
                                        optionText: '运动',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 50.0,
                                    },
                                    {
                                        optionId: '3',
                                        optionText: '旅游',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 66.7,
                                    },
                                    {
                                        optionId: '4',
                                        optionText: '音乐',
                                        count: Math.floor(Math.random() * 100) + 1,
                                        percentage: 58.3,
                                    },
                                ],
                            },
                            {
                                questionId: '3',
                                questionTitle: '您对我们的产品有什么建议？',
                                questionType: 'text',
                                textResponses: ['产品很好用，希望增加更多功能', '界面设计可以更美观一些', '希望能提供更多的定制选项', '客户服务很棒，非常满意', '希望价格能更亲民一些'],
                            },
                        ]
                    },
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/survey/response/export',
        method: 'get',
        description: '导出答卷数据',
        onMock() {
            // 模拟返回blob数据
            const blob = new Blob(['模拟的Excel导出数据'], { type: 'application/vnd.ms-excel' })
            return blob
        },
    },
]
