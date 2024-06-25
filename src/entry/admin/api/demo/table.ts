export interface Result<T> {
    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T
}

export interface List {
    result: any
    toatl: number
    [prop: string]: any
}

/**
 * @description: Get sample list value
 */

export const demoListApi = async (params: any) => {
    const { page = 1, pageSize = 10 } = params
    const result = Array.from({ length: 10 }).map((item, index) => {
        let id = (page - 1) * pageSize + 1 + index
        let address = `张家界都开了sad雷克萨六点多卡死了达萨罗都开了sad卡萨劳动快乐大萨达卡萨丁撒库,sajkdsa啥课大萨达拉撒书看的拉卡德拉达克撒库拉大螺丝刀大扣篮大赛打开了大萨拉大的肯定是拉开大，大萨达大大大啦`
        let addressLen = address.length
        let lastIndex = Math.ceil(Math.random() * (addressLen - 20) + 10)
        return {
            id,
            name: `张三${id}`,
            address: address.substring(0, lastIndex),
            beginTime: new Date().valueOf() - 7 * 24 * 60 * 60 * 1000,
            endTime: new Date().valueOf(),
            hasChildren: id % 2 === 0 ? true : false,
            children: [
                {
                    id: id + 1000,
                    name: `李师${id + 1000}`,
                    address: address.substring(0, lastIndex),
                    beginTime: new Date().valueOf() - 2 * 2 * 20 * 10 * 1000,
                    endTime: new Date().valueOf() - 1 * 4 * 40 * 30 * 1000,
                },
            ],
        }
    })
    return {
        total: 66,
        result,
    }
}
