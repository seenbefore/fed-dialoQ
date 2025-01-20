import { mock } from 'mockjs'

export default [
    {
        name: '/exam/manage/getExamPaperQuestion',
        method: 'get',
        description: '获取考试题目数据',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '请求成功',
                data: {
                    id: query.id,
                    paperDesc: '2024年安全生产知识考试',
                    totalQuestions: 30,
                    multipleChoiceCount: 10,
                    singleChoiceCount: 15,
                    judgeCount: 5,
                    totalScore: 100,
                    passScore: 60,
                    duration: 60,
                    paperTypeCode: 'SAFETY',
                    paperName: '2024年安全生产知识考试A卷',
                    singleChoiceScore: 2,
                    multipleChoiceScore: 4,
                    judgeScore: 2,
                    paperTypeName: '安全考试',
                    startTime: '2024-03-20 09:00:00',
                    endTime: '2024-03-20 10:00:00',
                    'singleChoiceQuestions|15': [
                        {
                            'id|+1': 1,
                            questionContent: '@cparagraph(1)',
                            questionOptions: JSON.stringify([
                                { code: 'A', content: '@csentence' },
                                { code: 'B', content: '@csentence' },
                                { code: 'C', content: '@csentence' },
                                { code: 'D', content: '@csentence' },
                            ]),
                        },
                    ],
                    'multipleChoiceQuestions|10': [
                        {
                            'id|+1': 16,
                            questionContent: '@cparagraph(1)',
                            questionOptions: JSON.stringify([
                                { code: 'A', content: '@csentence' },
                                { code: 'B', content: '@csentence' },
                                { code: 'C', content: '@csentence' },
                                { code: 'D', content: '@csentence' },
                            ]),
                        },
                    ],
                    'judgeQuestions|5': [
                        {
                            'id|+1': 26,
                            questionContent: '@cparagraph(1)',
                            questionOptions: JSON.stringify([
                                { code: 'A', content: '正确' },
                                { code: 'B', content: '错误' },
                            ]),
                        },
                    ],
                },
            })
        },
    },
    {
        name: '/exam/manage/submitExam',
        method: 'post',
        description: '提交考试',
        onMock(opt, query, body) {
            const { duration } = body
            const score = mock('@integer(0, 100)')
            const isPassed = score >= 60 ? '1' : '0'

            return mock({
                code: 200,
                message: '提交成功',
                data: {
                    duration,
                    score,
                    isPassed,
                    examStatus: isPassed === '1' ? 'PASS' : 'FAIL',
                    remark: isPassed === '1' ? '考试通过' : '考试未通过',
                    userName: '@cname',
                    totalAnswered: '@integer(20, 30)',
                    userId: '@id',
                    paperId: body.paperId,
                    isCompleted: '1',
                    remainingTime: 0,
                },
            })
        },
    },
]
