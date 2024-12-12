import createMock from '@@core/common/mock/createMock'
import registerMock from '@@core/common/mock/registerMock'
const myMock = createMock(process.env.VUE_APP_BASEURL_API)
// 自定义的mock 数据
const files = require.context('@/views', true, /mock\.js$/)
const mockData = {}

files.keys().forEach(key => {
    mockData[key] = files(key).default || files(key)
})

registerMock(myMock, mockData)
