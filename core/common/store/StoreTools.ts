import { VuexModule } from 'vuex-module-decorators'

type FunctionProperties<T> = { [K in keyof T]: T[K] extends (...args: any) => any ? K : never }[keyof T]

export class StoreTools<T extends VuexModule> extends VuexModule {
    /* store */
    protected getState(key: keyof T): T[keyof T] {
        const state = this.context.state
        return Reflect.get(state, key)
    }

    /* commit */
    protected commit<K extends keyof T>(key: K, ...payload: Parameters<T[K] extends (...args: any) => any ? T[K] : never>): void {
        this.context.commit(key as string, ...payload)
    }

    /* dispatch */
    protected dispatch<K extends keyof T>(key: K, ...payload: Parameters<T[K] extends (...args: any) => any ? T[K] : never>): Promise<ReturnType<T[K] extends (...args: any) => any ? T[K] : never>> {
        return this.context.dispatch(key as string, ...payload)
    }
}
