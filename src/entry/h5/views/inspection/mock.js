import { mock } from 'mockjs'

export default [
    {
        name: '/inspection/save',
        method: 'post',
        description: '保存现场勘察信息',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
                data: null,
            })
        },
    },
]
