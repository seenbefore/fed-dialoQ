import { createRandomNumber } from '@/entry/bigscreen/scripts/utils/index'
import { mock, ITestDataConfig } from '@/entry/bigscreen/scripts/utils/service-utils'

/**
 * 接口数据一
 */
export const getModuleResData = async () => {
    const data: ITestDataConfig = {
        obj: {
            key1: createRandomNumber(10000, 2),
            key1_ratio: createRandomNumber(100, 2),
            key2: createRandomNumber(10000, 2),
            key2_ratio: createRandomNumber(100, 2),
            key3: createRandomNumber(10000, 2),
            key4: createRandomNumber(10000, 2),
            key5: createRandomNumber(10000, 2),
        },
        type: 'object',
    }
    const res = await mock(data)
    return res
}

const Dict = {
    module接口数据1: getModuleResData,
}

type DictTypes = keyof typeof Dict

export default class Service {
    static get(name: DictTypes) {
        return Dict[name]
    }
}
