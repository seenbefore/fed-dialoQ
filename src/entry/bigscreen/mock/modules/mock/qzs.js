const 衢州市 = require('./衢州市.json')
const 衢江区 = require('./衢江区.json')
const 龙游县 = require('./龙游县.json')
const 柯城区 = require('./柯城区.json')
const 开化县 = require('./开化县.json')
const 江山市 = require('./江山市.json')
const 常山县 = require('./常山县.json')

const map = {
    衢州市,
    衢江区,
    龙游县,
    柯城区,
    开化县,
    江山市,
    常山县,
}

export default [
    {
        name: '/mock/qzs',
        method: 'get',
        description: 'mockList',
        onMock(opt, query, body) {
            body = body || {}
            query = query || {}
            const name = query.name

            const payload = {
                code: 0,
                data: null,
            }
            payload.data = map[name] || {}
            return payload
        },
    },
]
