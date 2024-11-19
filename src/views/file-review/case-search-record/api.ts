import { http } from '@/scripts/http'

/** 获取列表 */
export const getList = async (params: any) => {
    return Promise.resolve({
        code: 200,
        data: {
            data: [
                {
                    id: 1,
                    applicant: 'XXX',
                    department: '法制处',
                    phone: '130XXXXXXXX',
                    applyTime: '2022-10-10 12:00',
                    caseType: '行政处罚',
                    caseName: 'XXXXXXXXXXXXX',
                    code: 'XXXXX立字【2022】第XXXXXX号',
                    target: 'XXX等2个',
                    returnDate: '2022-10-08',
                    status: '1',
                    auditTime: '2022-10-10 12:00',
                },
                {
                    id: 2,
                    applicant: 'XXX',
                    department: '办公室',
                    phone: '130XXXXXXXX',
                    applyTime: '2022-10-09 12:00',
                    caseType: '行政检查',
                    caseName: 'XXXXXXXXXXXXX',
                    code: 'XXXXX立字【2022】第XXXXXX号',
                    target: 'XXX',
                    returnDate: '2022-10-08',
                    status: '2',
                    auditTime: '2022-10-10 12:00',
                },
            ],
            recordsTotal: 39,
        },
    })
}
