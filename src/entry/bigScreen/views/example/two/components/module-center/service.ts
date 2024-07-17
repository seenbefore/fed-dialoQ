import { createRandomNumber } from '@bigScreen/scripts/utils'
import { ITestDataConfig, mock } from '@bigScreen/scripts/utils/service-utils'

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

/**
 * table接口数据
 */
export const getTableList = async () => {
    const data: ITestDataConfig = {
        obj: {
            id: 1,
            key1: '',
            key2: '',
            key3: '',
            key4: '',
        },
        randomKeys: ['key2', 'key3', 'key4'],
        len: 20,
        randomMax: 10000,
        fieldTranFunc: (v: any, index: number) => ({
            ...v,
            key1: '机构' + index,
        }),
    }
    let res: any = await mock(data)
    return {
        ...res,
        total: res.data?.length || 0,
    }
}

const Dict = {
    module接口数据1: getModuleResData,
    table接口数据: getTableList,
}

type DictTypes = keyof typeof Dict

export default class Service {
    static get(name: DictTypes) {
        return Dict[name]
    }
}
