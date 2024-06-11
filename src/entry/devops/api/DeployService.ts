import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '../scripts/http'
import { Result, Page } from '../models'

export interface DeployBuildInstance {
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
export interface DeployInstance {
    id: string
    configs?: any

    owners?: string[]
    builds?: []
    branches?: string[]
    releaseId?: number
    lastCommit?: any
    lastBuild?: DeployBuildInstance
}

export class DeployService {
    /**
     * 返回构建任务的构建列表
     * @param {DeployBuildListData} data 请求参数
     * @param {Object} options 请求配置
     * @return {Promise} 请求结果
     */
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<DeployInstance[]>>>({
            url: '/deploy/list',
            method: 'POST',
            data,
            ...options,
        })
    }
}
