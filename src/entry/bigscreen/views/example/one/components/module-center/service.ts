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

/**
 * table接口数据
 */
export const getTableList1 = async () => {
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
    return res
}

/**
 * table接口数据 - text-list
 * @param {*} params 接口请求参数
 */
export const getTableList2 = async (params?: any) => {
    const data = {
        obj: { id: 1, name1: '', name2: '' },
        len: 6,
        fieldTranFunc: (v: any, index: number) => {
            return {
                ...v,
                name1: '台州椒江出台《金融风险防范监管与检察监督协同11条》' + index,
                name2: '台州椒江区人民检察院、区金融工作中心联动协作，在全在全在全在全在全在全在全市首创出台《金融风……' + index,
            }
        },
    }
    let res: any = await mock(data)
    return res
}

const Dict = {
    module接口数据1: getModuleResData,
    table接口数据1: getTableList1,
    table接口数据2: getTableList2,
}

type DictTypes = keyof typeof Dict

export default class Service {
    static get(name: DictTypes) {
        return Dict[name]
    }
}
