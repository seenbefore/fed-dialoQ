import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 获取考试列表
 */
export const getExamList = async (params?: any, options?: ExAxiosRequestConfig) => {
    // 模拟数据
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: '20',
                    title: '公共营养师20年考题',
                    startTime: '2024-08-28 11:00',
                    endTime: '2024-11-15 13:54',
                    isFree: true,
                },
                {
                    id: '21',
                    title: '公共营养师21年考题',
                    startTime: '2024-08-28 11:00',
                    endTime: '2024-11-15 13:54',
                    isFree: true,
                },
                {
                    id: '22',
                    title: '公共营养师22年考题',
                    startTime: '2024-08-28 11:00',
                    endTime: '2024-11-15 13:54',
                    isFree: true,
                },
            ],
            total: 3,
        },
    }
}
