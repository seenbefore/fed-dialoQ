interface ErrorInfo {
    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string
}

interface Result<T> {
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

interface PageResponse<T> {
    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 错误提示信息
     */
    error?: string

    /**
     * 总记录数
     */
    recordsTotal: string
}

interface IPagination {
    pageNum: number
    length: number
}

interface IUseLoadList<T> {
    result: Array<T>
    total: number
}

/**
 * 分页查询数据
 * @param pageParams 分页参数
 * @param queryModel 除分页的参数
 * @param request 请求的接口
 */
export const useLoadList = async <U extends Obj, T extends Obj = Obj>(
    pageParams: { pageNum: number; length?: number },
    queryModel: T,
    request: (params: T & IPagination) => Promise<Result<PageResponse<U>>>,
): Promise<IUseLoadList<U>> => {
    const { pageNum = 1, length = 10 } = pageParams
    const {
        data: { data: result, recordsTotal, recordsFiltered },
    } = (await request({ pageNum, length, ...queryModel })) as any

    const total = +(recordsTotal ?? recordsFiltered)

    return {
        result,
        total: isNaN(total) ? 0 : total,
    }
}

export const mockRequest = async <U extends Obj, T extends Obj = Obj>(params: T & IPagination): Promise<Result<PageResponse<U>>> => {
    const data = Array.from({ length: params.length }, (_, i) => {
        return ({ index: i + (params.pageNum - 1) * params.length } as unknown) as U
    })
    return {
        data: {
            data,
            error: '',
            recordsTotal: '0',
        },
        code: 200,
        message: 'ok',
        errors: [],
    }
}
