import { createRandomNumber } from '@/entry/bigscreen/scripts/utils/index'
import { mock, ITestDataConfig } from '@/entry/bigscreen/scripts/utils/service-utils'

/**
 * echarts-single-bar
 */
export const getSingleBarData = async () => {
    const data = {
        obj: {
            id: 1,
            name: '0',
            val1: '',
            val2: '',
        },
        randomKeys: ['val1', 'val2'],
        len: 6,
        fieldTranFunc: (v: any, index: number) => ({
            ...v,
            name: index + 1 + '月',
        }),
    }
    let res: any = await mock(data)
    return res
}

const Dict = {
    echarts_single_bar: getSingleBarData,
}

type DictTypes = keyof typeof Dict

export default class Service {
    static get(name: DictTypes) {
        return Dict[name]
    }
}
