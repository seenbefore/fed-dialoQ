import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface RoomVO {
    /** ID */
    id: string
    /** 区域 */
    area: string
    /** 考场名称 */
    name: string
    /** 监考老师 */
    teachers: string
    /** 开始时间 */
    startTime: string
    /** 结束时间 */
    endTime: string
    /** 考试名称 */
    examName: string
}

export interface StudentVO {
    /** ID */
    id: string
    /** 考生姓名 */
    name: string
    /** 考生编号 */
    code: string
    /** 所属单位 */
    department: string
    /** 联系电话 */
    phone: string
}

/**
 * 获取考场列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(
    data?: {
        /** 监考老师/考场名称 */ keyword?: string
        /** 选择日期 */ date?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<RoomVO[]>>>({
        url: '/exam/room/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 编辑考场
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 区域 */ area?: string
        /** 考场名称 */ name?: string
        /** 监考老师 */ teachers?: string
        /** 开始时间 */ startTime?: string
        /** 结束时间 */ endTime?: string
        /** 考试名称 */ examName?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/exam/room/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除考场
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/exam/room/remove',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 获取考场学生列表
 */
export function getStudentList(
    data?: {
        /** 考场ID */ roomId: string
        /** 关键字 */ keyword?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<StudentVO[]>>>({
        url: '/exam/room/student/list',
        method: 'post',
        data,
        ...options,
    })
}
