import { mock } from 'mockjs'

export default [
    {
        name: '/mock/exam/question/getExamPaperPageList',
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
        description: '预览考卷',
        onMock(opt, query) {
            const { id } = query
            return mock({
                code: 200,
                message: '请求成功',
                data: {
                    id,
                    paperName: '@ctitle(5,10)',
                    paperDesc: '@cparagraph(1)',
                    'totalQuestions|50-100': 1,
                    'multipleChoiceCount|10-20': 1,
                    'singleChoiceCount|20-30': 1,
                    'judgeCount|10-20': 1,
                    'totalScore|100': 1,
                    'passScore|60': 1,
                    'duration|60-120': 1,
                    paperTypeCode: '@string("number", 4)',
                    paperTypeName: '@ctitle(4)',
                    'singleChoiceScore|2': 1,
                    'multipleChoiceScore|3': 1,
                    'judgeScore|1': 1,
                    startTime: '@datetime',
                    endTime: '@datetime',
                    'singleChoiceQuestions|20-30': [
                        {
                            id: '@id',
                            questionContent: '@cparagraph(1)',
                            questionOptions: '@cparagraph(1)',
                            correctAnswer: '@character("A-D")',
                        },
                    ],
                    'multipleChoiceQuestions|10-20': [
                        {
                            id: '@id',
                            questionContent: '@cparagraph(1)',
                            questionOptions: '@cparagraph(1)',
                            correctAnswer: '@character("A-D")',
                        },
                    ],
                    'judgeQuestions|10-20': [
                        {
                            id: '@id',
                            questionContent: '@cparagraph(1)',
                            questionOptions: '@cparagraph(1)',
                            correctAnswer: '@character("A-B")',
                        },
                    ],
                },
            })
        },
    },
]
