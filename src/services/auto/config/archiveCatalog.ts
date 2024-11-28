import { Dictionary as DictionaryFront } from '../_dict'
/**
 * @file API：/config/archiveCatalog
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：查询卷宗目录列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getCatalogList(data?: {
/** 正/副卷(1:正卷,2:副卷) */ volumeType?: string, 
/** 条线编码 */ territoryCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<CatalogTreeVO[]>>({
        url: "/config/archiveCatalog/getCatalogList",
        type: "POST",
        data,
        ...options
    })
}

/** 枚举 - 正副卷 */
export enum Zfj {
    /** 正卷 */
    ZJ = '1',
    /** 副卷 */
    FJ = '2',
}
/** 枚举对象 - 正副卷 */
export const ZfjObj = { 
    [Zfj.ZJ]: { label: '正卷', value: Zfj.ZJ },
    [Zfj.FJ]: { label: '副卷', value: Zfj.FJ },
}



export const Dict = new DictionaryFront({
    /**枚举数组 - 正副卷 */
    Zfj: {
        options: [
            { label: '正卷', value: Zfj.ZJ },
            { label: '副卷', value: Zfj.FJ },
        ]
    },
})

export interface ErrorInfo {

    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string

}

export interface Result<T> {

    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

export interface DocumentEvidenceVO {

    /**
     * 文书证据编码
     */
    documentEvidenceCode: string

    /**
     * 文书证据名称
     */
    documentEvidenceName: string

}

export interface CatalogTreeVO {

    /**
     * 排序号
     */
    sortNo: string

    /**
     * 文书证据列表
     */
    item: DocumentEvidenceVO[]

    /**
     * 编码
     */
    code: string

    /**
     * 标题
     */
    title: string

}

