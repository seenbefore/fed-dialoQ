import createMock from '@/mock/createMock'
import registerMock from '@/mock/registerMock'
const myMock = createMock(process.env.VUE_APP_BASEURL_API)
// 自定义的mock 数据
import customMockData from './custom'
// 自动生成的mock json
//import autoMockData from './auto'
const modules = {
    //...autoMockData,
    ...customMockData,
}

registerMock(myMock, modules)
