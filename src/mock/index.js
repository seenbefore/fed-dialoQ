import createMock from '@/mock/createMock'
import registerMock from '@/mock/registerMock'
const myMock = createMock(process.env.VUE_APP_BASEURL_API)
// 自定义的mock 数据
import myMockData from './modules'
// 自动生成的mock json
import autoMockData from './auto'
import customMockData from './data'
const modules = {
    ...autoMockData,
    ...myMockData,
    ...customMockData,
}

registerMock(myMock, modules)
