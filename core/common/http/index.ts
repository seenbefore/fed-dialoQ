import { createBaseHttp, IConfig, ICallBack } from './baseHttp'
import { ExAxiosInstance } from 'icinfo-request'

/* desktop http */
export function createBaseDesktopHttp(config?: IConfig): ExAxiosInstance
export function createBaseDesktopHttp(callback: ICallBack): ExAxiosInstance
export function createBaseDesktopHttp(config: IConfig, callback: ICallBack): ExAxiosInstance
export function createBaseDesktopHttp(configOrCallBack?: IConfig | ICallBack, callback?: ICallBack): ExAxiosInstance {
    return createBaseHttp(configOrCallBack as IConfig | ICallBack, callback as ICallBack)
}

/* mobile http */
export function createBaseMobileHttp(config?: IConfig): ExAxiosInstance
export function createBaseMobileHttp(callback: ICallBack): ExAxiosInstance
export function createBaseMobileHttp(config: IConfig, callback: ICallBack): ExAxiosInstance
export function createBaseMobileHttp(configOrCallBack?: IConfig | ICallBack, callback?: ICallBack): ExAxiosInstance {
    return createBaseHttp(configOrCallBack as IConfig | ICallBack, callback as ICallBack)
}
