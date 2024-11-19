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
                    caseScope: '处罚卷宗',
                    caseName: '行政处罚案件卷宗',
                    isMain: '正卷、副卷',
                    allNumber: 'QZH',
                    catalogNumber: 'MLH',
                    caseNumber: 'AJH',
                    updateTime: 'XXXX-XX-XX XX:XX',
                },
            ],
            recordsTotal: 39,
        },
    })
}

/** 保存 */
export const save = async (params: any) => {
    return Promise.resolve({
        code: 200,
        message: '保存成功',
    })
}
