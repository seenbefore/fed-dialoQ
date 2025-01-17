import { mock } from 'mockjs'

export default [
    {
        name: '/question-bank/list',
        method: 'post',
        description: '题库列表',
        onMock(opt, query, body) {
            let { page = 1, pageNum = 1, pageSize, length } = body
            page = pageNum || 1
            pageSize = length || 10
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            title: '@csentence(10, 50)',
                            'option1|1': ['@csentence(5, 20)'],
                            'option2|1': ['@csentence(5, 20)'],
                            'option3|1': ['@csentence(5, 20)'],
                            'option4|1': ['@csentence(5, 20)'],
                            option5: '',
                            option6: '',
                            text: null,
                            'answer|1': ['A', 'B', 'C', 'D'],
                            'type|1': ['0', '1', '2'],
                            type_name: null,
                            is_del: '0',
                            del_time: null,
                            posttime: '@datetime',
                            case_flag: '0',
                            caseid: '0',
                            kind: '2',
                            category: '2',
                            className: null,
                            kind_name: '2024年全省协助执法文员考试',
                            'case_name|1': ['法律法规', '行政处罚', '行政许可', '行政检查', '行政强制'],
                            types: "where is_del='0' ",
                        },
                    ],
                    recordsTotal: 198,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/question-bank/save',
        method: 'post',
        description: '保存题目',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/question-bank/delete',
        method: 'post',
        description: '删除题目',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/question-bank/detail',
        method: 'get',
        description: '题目详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    title: '@csentence(10, 50)',
                    option1: '@csentence(5, 20)',
                    option2: '@csentence(5, 20)',
                    option3: '@csentence(5, 20)',
                    option4: '@csentence(5, 20)',
                    option5: '',
                    option6: '',
                    text: null,
                    answer: 'A',
                    type: '0',
                    type_name: null,
                    is_del: '0',
                    del_time: null,
                    posttime: '@datetime',
                    case_flag: '0',
                    caseid: '0',
                    kind: '1',
                    className: null,
                    kind_name: '2024年全省协助执法文员考试',
                    case_name: '法律法规',
                    types: "where is_del='0' ",
                    category: '2',
                },
                message: '请求成功',
            })
        },
    },
]
