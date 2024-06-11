import { createRandomNumber } from '@/entry/bigscreen/scripts/utils/index'
import { mock, ITestDataConfig } from '@/entry/bigscreen/scripts/utils/service-utils'

/**
 * 接口数据一
 */
export const getModuleResData = async () => {
    const data: ITestDataConfig = {
        obj: {
            twoData_key1: createRandomNumber(10000),
            twoData_key2: createRandomNumber(10000),
            fourData_key1: createRandomNumber(10000),
            fourData_ratio1: createRandomNumber(100),
            fourData_key2: createRandomNumber(10000),
            fourData_ratio2: createRandomNumber(100),
            sixData_key1: createRandomNumber(10000),
            sixData_key2: createRandomNumber(100),
            sixData_key3: createRandomNumber(100),
            sixData_key4: createRandomNumber(10),
            sixData_key5: createRandomNumber(100),
            sixData_key6: createRandomNumber(10),
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
