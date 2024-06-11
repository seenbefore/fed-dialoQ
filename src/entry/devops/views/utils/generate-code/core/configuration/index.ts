import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { assign, set, toPath } from 'lodash'

export interface IConfiguration {
    /* 页面名称 */
    name: string
    /* 生成类型 */
    type: GenerateTypeEnum
    /* 缓存配置 */
    cacheConfig: {
        /* 应用名称 */
        applicationName: string
        /* app基础表单自定义类名 */
        appBaseFormClassName: string
    }
}

export class ConfigurationManage {
    public config: IConfiguration = {
        name: '',
        type: GenerateTypeEnum.APP_FORM_DETAILS,
        cacheConfig: {
            /* 下面的配置是会存储在 */
            applicationName: 'h5',
            appBaseFormClassName: 'app-base-form-reset',
        },
    }

    private readonly cacheConfigKey = 'generateCode_cacheConfig'

    public constructor() {
        const localConfig = this.getCacheConfig()
        if (localConfig) {
            this.updateCacheConfig(localConfig)
        }
    }

    public getCacheConfig(): UndefinedAble<IConfiguration['cacheConfig']> {
        const localConfig = localStorage.getItem(this.cacheConfigKey)
        if (localConfig) {
            return JSON.parse(localConfig)
        }
    }

    public setCacheConfig(config: IConfiguration['cacheConfig']): void {
        localStorage.setItem(this.cacheConfigKey, JSON.stringify(config))
    }

    public updateCacheConfig(config: IConfiguration['cacheConfig']): void {
        assign(this.config.cacheConfig, config)
        this.setCacheConfig(this.config.cacheConfig)
    }

    /* 修改config信息 */
    public updateConfig(config: IConfiguration): void
    public updateConfig(key: string, value: any): void
    public updateConfig(key: Array<string>, value: any): void
    public updateConfig(keyOrConfig: IConfiguration | string | Array<string>, value?: any): void {
        if (typeof keyOrConfig === 'object') {
            if (Array.isArray(keyOrConfig)) {
                set(this.config, toPath(keyOrConfig), value)
            } else {
                assign(this.config, keyOrConfig)
            }
        } else {
            Reflect.set(this.config, keyOrConfig, value)
        }
    }
}
