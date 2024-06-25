import { ExAxiosRequestConfig } from 'icinfo-request'
// 全局处理一些特殊数据
export const exData = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        // do something
    },
})

export default exData
