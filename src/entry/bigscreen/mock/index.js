import createMock from '@/mock/createMock'
import registerMock from '@/mock/registerMock'
const myMock = createMock('')
// 自定义的mock 数据
import myMockData from './modules'
console.log(myMockData)
const modules = {
    ...myMockData,
}

registerMock(myMock, modules)
