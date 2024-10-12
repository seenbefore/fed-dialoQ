import { DialogPropsType } from '@/components/functionalDialog/dialogPropsType'
import { VueClass } from 'vue-class-component/lib/declarations'
import Vue, { Component } from 'vue'

type AsyncFunction = JSX.Element | (() => Promise<{ readonly default: any }>) | VueClass<any> | Component

export enum FunctionalDialogEventEnum {
    CONFIRM = 'confirm',
    CANCEL = 'cancel',
}

export interface IUseFunctionalDialog extends Omit<DialogPropsType, 'title'> {
    showCancelBtn?: boolean
    cancelBtnText?: string
    showConfirmBtn?: boolean
    confirmBtnText?: string
    /* 传递给子组件的参数 */
    options?: Record<string, any>
    /* title 可以设置tsx */
    title?: string | JSX.Element
    beforeClose: (done: () => void, type: FunctionalDialogEventEnum, ...args: any) => void
}

const loadComponent = (Component: any): Promise<VueClass<any>> => {
    if (typeof Component === 'function') {
        return new Promise(resolve => {
            Component().then((resp: any) => {
                resolve(resp.default)
            })
        })
    }
    return Promise.resolve(Component)
}

export const useFunctionalDialog = <T = any>(children: AsyncFunction, options?: Partial<IUseFunctionalDialog>): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        const FunctionalDialog = await loadComponent(() => import('./index.vue'))
        const ChildrenComponent = await loadComponent(children)

        /* 默认参数 */
        const defaultOptions: Partial<IUseFunctionalDialog> = {
            cancelBtnText: '取消',
            confirmBtnText: '确认',
            closeOnClickModal: false,
            showConfirmBtn: true,
            showCancelBtn: true,
        }

        const parseOptions = Object.assign(defaultOptions, options || {})

        const Instance = Vue.extend(FunctionalDialog)
        let vm = new Instance({
            propsData: {
                options: {
                    __childrenComponent__: ChildrenComponent,
                    ...parseOptions,
                },
            },
        })
        vm.$mount()

        /* 处理下参数，如果是数组，并且长度只有1，则默认取第一个，否则取全部 */
        const parseArgs = (args: any) => (Array.isArray(args) && args.length === 1 ? args[0] : args)

        const unMount = () => {
            vm.$off(FunctionalDialogEventEnum.CONFIRM)
            vm.$off(FunctionalDialogEventEnum.CANCEL)
            vm.$destroy()
            /* @ts-ignore */
            vm = null
        }

        vm.$on(FunctionalDialogEventEnum.CONFIRM, ([args]: any) => {
            resolve(parseArgs(args))
            unMount()
        })

        vm.$on(FunctionalDialogEventEnum.CANCEL, ([args]: any) => {
            reject(parseArgs(args))
            unMount()
        })
    })
}
