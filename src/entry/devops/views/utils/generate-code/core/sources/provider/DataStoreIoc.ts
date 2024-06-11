import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'

type Constructor<T = any> = new (...args: any[]) => T

export class DataStoreIoc {
    private static _instanceMap: Map<GenerateTypeEnum, Constructor> = new Map()

    public static reject(key: GenerateTypeEnum, ctor: Constructor): void {
        this._instanceMap.set(key, ctor)
    }

    public static resolve<T>(key: GenerateTypeEnum): T {
        const Ctor = this._instanceMap.get(key)
        if (Ctor) {
            return new Ctor() as T
        }
        throw new Error(`${key} 对应的DataStore在ioc容器中没有注册，请先通过InjectableDataStore装饰器在ioc容器中注册！`)
    }
}

/**
 * 将实例注入到ioc中
 * @param key
 * @constructor
 */
export const InjectableDataStore = (key: GenerateTypeEnum): ClassDecorator => {
    return target => {
        DataStoreIoc.reject(key, (target as unknown) as Constructor)
    }
}
