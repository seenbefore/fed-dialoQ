import { mock } from 'mockjs'

export default [
    {
        name: '/exam/manage/saveExamUser',
        method: 'post',
        description: '保存考试用户信息',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
                data: null,
            })
        },
    },
]
