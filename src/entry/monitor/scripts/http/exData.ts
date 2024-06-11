import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
// 全局处理一些特殊数据
export const exData = Object.freeze({
    //onBefore(config: ExAxiosRequestConfig) {},
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (isResolve) {
            // 将分页总数转为数字
            // if (Object.prototype.hasOwnProperty.call(resOrErr, 'data')) {
            //     resOrErr.result = resOrErr.data
            // }
            // if (Object.prototype.hasOwnProperty.call(resOrErr, 'total')) {
            //     resOrErr.total = +resOrErr.total
            // }
        }
    },
})

export default exData
