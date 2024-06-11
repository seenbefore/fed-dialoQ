export const getData = (params: any) => {
    console.log('params', params)
    const { pageNum = 1, pageSize = 10, categoryName = '默认品类', noData = false, error = false } = params
    return new Promise((resolve: any, reject: any) => {
        const listData: any[] = []
        const start = (pageNum - 1) * pageSize
        for (let idx = start; idx < start + pageSize; idx++) {
            // console.log(idx)
            listData.push({
                id: idx + 1,
                name: categoryName,
                age: 18,
                address: '北京市',
                createTime: '2020-01-01 12:00:00',
                updateTime: '2020-01-01 12:00:00',
            })
        }
        setTimeout(() => {
            if (error) {
                reject(new Error('请求失败'))
            } else if (noData) {
                resolve({
                    total: 0,
                    data: [],
                })
            } else {
                resolve({
                    total: 30,
                    data: listData,
                })
            }
        }, 200)
    })
}
