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
                    questionStats: [
                        {
                            questionId: '1',
                            questionTitle: '您的性别是？',
                            questionType: 'singleChoice',
                            optionStats: [
                                {
                                    optionId: '1',
                                    optionText: '男',
                                    'count|10-60': 30,
                                    'percentage|0-100.1-2': 55.5,
                                },
                                {
                                    optionId: '2',
                                    optionText: '女',
                                    'count|10-60': 40,
                                    'percentage|0-100.1-2': 44.5,
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
                                    'count|10-60': 45,
                                    'percentage|0-100.1-2': 75.0,
                                },
                                {
                                    optionId: '2',
                                    optionText: '运动',
                                    'count|10-60': 30,
                                    'percentage|0-100.1-2': 50.0,
                                },
                                {
                                    optionId: '3',
                                    optionText: '旅游',
                                    'count|10-60': 40,
                                    'percentage|0-100.1-2': 66.7,
                                },
                                {
                                    optionId: '4',
                                    optionText: '音乐',
                                    'count|10-60': 35,
                                    'percentage|0-100.1-2': 58.3,
                                },
                            ],
                        },
                        {
                            questionId: '3',
                            questionTitle: '您对我们的产品有什么建议？',
                            questionType: 'text',
                            'textResponses|5-15': ['@cparagraph(1, 2)'],
                        },
                    ],
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
