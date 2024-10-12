import PageLoading from '@/components/pageLoading/index'
import { ExAxiosRequestConfig } from 'icinfo-request'

export const useLoading = async <T, R>(request: (data?: T, options?: ExAxiosRequestConfig) => Promise<R>, data?: T, options?: ExAxiosRequestConfig): Promise<R> => {
    PageLoading.show()
    try {
        return await request(data, options)
    } catch (e) {
        return Promise.reject(e)
    } finally {
        PageLoading.hide()
    }
}
