import { mock } from 'mockjs'

const generateQuestionOptions = type => {
    if (type === 'judge') {
        return JSON.stringify([
            { code: 'A', content: '正确' },
            { code: 'B', content: '错误' },
        ])
    }
    return JSON.stringify([
        { code: 'A', content: '建立健全本单位安全生产责任制' },
        { code: 'B', content: '组织制定本单位安全生产规章制度' },
        { code: 'C', content: '保证本单位安全生产投入的有效实施' },
        { code: 'D', content: '直接组织事故应急救援' },
    ])
}

export default [
    {
        name: '/exam/manage/getQuestionStudyList',
        method: 'get',
        description: '获取题目学习列表',
        onMock(opt, query) {
            return mock({
                code: 200,
                message: '请求成功',
                'data|1-3': [
                    {
                        'subCategoryCode|+1': ['A001', 'B001', 'C001'],
                        'subCategoryName|+1': ['安全生产基础知识', '消防安全知识', '应急救援知识'],
                        'multipleChoiceQuestions|2-4': [
                            {
                                'id|+1': 1000,
                                questionContent: '@csentence(20, 50)',
                                questionOptions: function() {
                                    return generateQuestionOptions('multiple')
                                },
                                correctAnswer: function() {
                                    return ['A', 'B', 'C'][mock('@integer(0,2)')]
                                },
                            },
                        ],
                        'singleChoiceQuestions|2-4': [
                            {
                                'id|+1': 2000,
                                questionContent: '@csentence(20, 50)',
                                questionOptions: function() {
                                    return generateQuestionOptions('single')
                                },
                                correctAnswer: function() {
                                    return ['A', 'B', 'C', 'D'][mock('@integer(0,3)')]
                                },
                            },
                        ],
                        'judgeQuestions|2-4': [
                            {
                                'id|+1': 3000,
                                questionContent: '@csentence(20, 50)',
                                questionOptions: function() {
                                    return generateQuestionOptions('judge')
                                },
                                correctAnswer: function() {
                                    return ['A', 'B'][mock('@integer(0,1)')]
                                },
                            },
                        ],
                    },
                ],
            })
        },
    },
]
