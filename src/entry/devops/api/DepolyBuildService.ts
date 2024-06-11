import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '../scripts/http'
import { Result, Page } from '../models'

interface LogResponse {
    status: string
    result: string
}
interface LogBody {
    id: string
    buildId: string
}
interface CancelBody {
    id: string
    buildId: string
}
export interface DeployBuildResponse {
    id: number
    branch: string
    createTime: number
    startTime: number
    endTime: number
    target: string
    status: string
    commit: string
    message: string
    user: {
        id: string
        name: string
        email: string
    }
}
export class DepolyBuildService {
    /**
     * 返回构建任务的构建列表
     * @param {DeployBuildListData} data 请求参数
     * @param {Object} options 请求配置
     * @return {Promise} 请求结果
     */
    static run(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/deploy/build/run',
            method: 'POST',
            data,
            ...options,
        })
    }

    static log(data: LogBody, options?: ExAxiosRequestConfig) {
        return http.request<Result<LogResponse>>({
            url: '/deploy/build/log',
            method: 'POST',
            data,
            ...options,
        })
    }

    static cancel(data: CancelBody, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/deploy/build/cancel',
            method: 'POST',
            data,
            ...options,
        })
    }
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<DeployBuildResponse[]>>({
            url: '/deploy/build/list',
            method: 'POST',
            data,
            ...options,
        })
    }
}
