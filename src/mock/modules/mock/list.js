import { mock } from 'mockjs'
export default [
    {
        name: '/mock/list',
        method: 'get',
        description: 'mockList',
        onMock() {
            return mock({
                status: 'success',
                data: [],
            })
        },
    },
]
