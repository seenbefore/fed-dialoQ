import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'

/**
 * 获取案卷配置列表
 */
export const list = async (params?: any) => {
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: 1,
                    businessLine: '行政许可',
                    caseType: '行政处罚',
                    caseName: '食品经营许可',
                    volumeType: '正卷',
                    directory: '正卷60件',
                    createTime: '2024-01-01 12:00:00',
                    updateTime: '2024-01-02 12:00:00',
                },
                {
                    id: 2,
                    businessLine: '行政处罚',
                    caseType: '许可备案',
                    caseName: '食品生产许可',
                    volumeType: '副卷',
                    directory: '副卷16件',
                    createTime: '2024-01-03 12:00:00',
                    updateTime: '2024-01-04 12:00:00',
                },
            ],
            recordsTotal: 2,
        },
    }
}
