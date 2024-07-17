/**
 * 测试数据配置项
 */
export interface ITestDataConfig {
    /** 对象数据或者数组的基础对象值 */
    obj: any
    /** 请求返回的数据类型 */
    type?: 'array' | 'object'
    /** 请求等待时间 */
    time?: number
    /** 数组长度 */
    len?: number
    /** 随机数key集合 */
    randomKeys?: Array<string>
    /** 自增数key集合 */
    accKeys?: Array<string>
    /** 随机数最大值 */
    randomMax?: number
    /** 对象字段转化函数 - 拦截器 */
    fieldTranFunc?: (v: any, index: number) => any
}

interface IResultData {
    data: any
}

/**
 * @description mock数据
 * @param {*} params.obj 对象数据或者数组的基础对象值
 * @param {String} params.type 请求返回的数据类型
 * @param {Number} params.time 请求等待时间
 * @param {Number} params.len 数组长度
 * @param {Array} params.randomKeys 随机数key集合
 * @param {Array} params.accKeys 自增数key集合
 * @param {Function} params.fieldTranFunc 对象字段转化函数
 */
export const mock = ({ fieldTranFunc, obj, time = 500, type = 'array', len = 10, randomKeys = ['val1', 'val2'], accKeys = ['id'], randomMax = 100 }: ITestDataConfig): Promise<IResultData> => {
    return new Promise((resolve: any, reject: any) => {
        setTimeout(() => {
            const res: IResultData = {
                data: null,
            }
            if (type === 'object') {
                res.data = { ...obj }
            } else {
                res.data = new Array(len).fill(obj).map((item: any, index: number) => {
                    randomKeys.forEach((v: any) => {
                        if (item[v] != undefined) {
                            item[v] = Math.ceil(Math.random() * randomMax)
                        }
                    })
                    accKeys.forEach((v: any) => {
                        item?.[v] && (item[v] = +item[v] + 1)
                    })
                    return {
                        ...item,
                        id: index + 1,
                    }
                })
                if (fieldTranFunc) {
                    res.data = res.data.map((v: any, index: number) => fieldTranFunc(v, index))
                }
            }
            resolve(res)
        }, time)
    })
}
