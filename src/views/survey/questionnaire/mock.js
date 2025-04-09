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
        name: '/survey/questionnaire/save',
        method: 'post',
        description: '保存问卷',
        onMock() {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/survey/questionnaire/remove',
        method: 'post',
        description: '删除问卷',
        onMock() {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/survey/questionnaire/updateStatus',
        method: 'post',
        description: '更新问卷状态',
        onMock() {
            return mock({
                code: 200,
                message: '操作成功',
            })
        },
    },
]
