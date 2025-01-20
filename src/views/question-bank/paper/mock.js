import { mock } from 'mockjs'

const questionOptions = [
    {
        code: 'A',
        content: '建立健全本单位安全生产责任制',
    },
    {
        code: 'B',
        content: '组织制定本单位安全生产规章制度',
    },
    {
        code: 'C',
        content: '保证本单位安全生产投入的有效实施',
    },
    {
        code: 'D',
        content: '直接组织事故应急救援',
    },
]

export default [
    {
        name: '/exam/question/getExamPaperPageList',
        method: 'post',
        description: '获取考卷分页列表',
        onMock(opt, query, body) {
            let { pageNum = 1, length = 10 } = body
            return mock({
                code: 200,
                message: '请求成功',
                data: {
                    'data|10': [
                        {
                            'id|+1': 1,
                            paperName: '@ctitle(5,10)',
                            paperDesc: '@cparagraph(1)',
                            'totalQuestions|50-100': 1,
                            'multipleChoiceCount|10-20': 1,
                            'singleChoiceCount|20-30': 1,
                            'judgeCount|10-20': 1,
                            creatorId: '@id',
                            creatorName: '@cname',
                            updateTime: '@datetime',
                            remark: '@cparagraph(1)',
                            'totalScore|100': 1,
                            'passScore|60': 1,
                            'duration|60-120': 1,
                            paperTypeCode: '@string("number", 4)',
                            paperTypeName: '@ctitle(4)',
                            createTime: '@datetime',
                            'singleChoiceScore|2': 1,
                            'multipleChoiceScore|3': 1,
                            'judgeScore|1': 1,
                            startTime: '@datetime',
                            endTime: '@datetime',
                            'status|1': ['0', '1'],
                        },
                    ],
                    recordsTotal: 100,
                },
            })
        },
    },
    {
        name: '/exam/question/editExamPaper',
        method: 'post',
        description: '更新考卷',
        onMock(opt, query, body) {
            return {
                code: 200,
                message: '更新成功',
            }
        },
    },
    {
        name: '/exam/question/getExamPaperPreview',
        method: 'get',
        description: '获取试卷预览详情',
        onMock(opt, query) {
            return mock({
                code: 200,
                message: '请求成功',
                data: {
                    'id|+1': 1,
                    paperName: '安全生产知识考试',
                    paperDesc: '本次考试主要考察安全生产相关知识，请认真作答。',
                    totalQuestions: 15,
                    multipleChoiceCount: 5,
                    singleChoiceCount: 5,
                    judgeCount: 5,
                    totalScore: 100,
                    passScore: 60,
                    duration: 60,
                    paperTypeCode: 'SAFETY',
                    paperTypeName: '安全考试',
                    startTime: '2024-01-01 00:00:00',
                    endTime: '2024-12-31 23:59:59',
                    singleChoiceScore: 4,
                    multipleChoiceScore: 8,
                    judgeScore: 8,
                    'singleChoiceQuestions|5': [
                        {
                            'id|+1': 1,
                            questionContent: '@csentence(20, 50)',
                            questionOptions: JSON.stringify(questionOptions),
                            'correctAnswer|1': ['A', 'B', 'C', 'D'],
                        },
                    ],
                    'multipleChoiceQuestions|5': [
                        {
                            'id|+1': 100,
                            questionContent: '@csentence(20, 50)',
                            questionOptions: JSON.stringify(questionOptions),
                            'correctAnswer|1': ['A,B', 'B,C', 'C,D', 'A,B,C', 'B,C,D'],
                        },
                    ],
                    'judgeQuestions|5': [
                        {
                            'id|+1': 200,
                            questionContent: '@csentence(20, 50)',
                            questionOptions: '',
                            'correctAnswer|1': ['0', '1'],
                        },
                    ],
                },
            })
        },
    },
]
