import { http } from '@/scripts/http'

/** 获取列表 */
export const getList = async (params: any) => {
    return Promise.resolve({
        code: 200,
        data: {
            data: [
                {
                    id: 1,
                    caseType: '行政处罚',
                    caseName: 'XXXXXXXXXXXXX',
                    code: 'XXXXX立字【2022】第XXXXXX号',
                    target: 'XXX等2个',
                    returnDate: '2022-10-11',
                    returnNo: 'XXXXX立字【2022】第XXXXXX号',
                    status: '0',
                    updateTime: '2022-10-10 12:00',
                },
                {
                    id: 2,
                    caseType: '行政检查',
                    caseName: 'XXXXXXXXXXXXX',
                    code: 'XXXXX立字【2022】第XXXXXX号',
                    target: 'XXX',
                    returnDate: '2022-10-10',
                    returnNo: 'XXXXX立字【2022】第XXXXXX号',
                    status: '1',
                    updateTime: '2022-10-10 12:00',
                },
            ],
            recordsTotal: 39,
        },
    })
}
