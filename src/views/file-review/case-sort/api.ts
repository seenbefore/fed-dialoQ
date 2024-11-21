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
                    archiveUrl: 'F9CD5B1ADBF7C71517B382D0B453B86291701AC89DFDEE0F525D832CD7570272EA157EDA015993CA8A07EE86A25D33B17AEDFDEC71034B16A61D06D29D394CB23AD7D5760E8CE911737D242FE7F9726D',
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
                    archiveUrl: 'F9CD5B1ADBF7C71517B382D0B453B8620E03D89B5D3630643C344C3E38240FF23F307BC6B1454EE6E40C7F0F4E9125777F9DC0567875101BD8F15857698ECA723AD7D5760E8CE911737D242FE7F9726D',
                },
            ],
            recordsTotal: 39,
        },
    })
}
