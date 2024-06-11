import _Vue, { Component, AsyncComponent } from 'vue'

export type modalDialog = (Component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>, props?: Record<string, any>) => Promise<any>
export declare function initModalDialog(options?: any): modalDialog
export declare function install(Vue: typeof _Vue, options?: Record<string, any>): void
declare const _default: {
    // initModalDialog: typeof initModalDialog
    install: typeof install
}
export default _default
