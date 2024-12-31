import ConfirmDialog from '@/components/confirmDialog/index.vue'
import Vue from 'vue'

export enum ConfirmResultEnum {
    CANCEL = 'cancel',
    CONFIRM = 'confirm',
}

export interface IUseConfirm {
    message: string | JSX.Element | (() => JSX.Element)
    title?: string | JSX.Element
    titleIcon?: any
    titleIconClass?: string
    titleIconStyle?: string
    closeOnClickModal?: boolean
    lockScroll?: boolean
    beforeClose?: (done: () => void) => void
    width?: string
    closeOnPressEscape?: boolean
    footerCancelText?: string
    footerConfirmText?: string
    showNoRemind?: boolean
    noRemindText?: string
    onNoRemindChange?: (checked: boolean) => void
    render?: (h: any) => JSX.Element
}

const defaultOptions: Omit<IUseConfirm, 'message'> = {
    title: '提示',
    titleIcon: 'el-icon-warning',
    titleIconClass: 'el-icon-warning',
    titleIconStyle: 'color: var(--color-warning)',
    closeOnClickModal: false,
    width: '390px',
    closeOnPressEscape: true,
    footerCancelText: '取消',
    footerConfirmText: '确认',
    lockScroll: true,
}

const isIUserConfirm = (value: unknown): value is IUseConfirm => {
    return typeof value === 'object' && (value as Obj).message
}

const getOptions = (userOptions: string | JSX.Element | IUseConfirm) => {
    return !isIUserConfirm(userOptions) ? { message: userOptions, ...defaultOptions } : Object.assign({}, defaultOptions, userOptions)
}

export const useConfirm = (userOptions: string | JSX.Element | IUseConfirm) => {
    return new Promise((resolve, reject) => {
        const options = getOptions(userOptions)
        const DialogConstructor = Vue.extend(ConfirmDialog)
        const instance = new DialogConstructor({
            propsData: {
                options,
            },
        })

        instance.$on(ConfirmResultEnum.CONFIRM, () => {
            instance.$destroy()
            resolve(void 0)
        })

        instance.$on(ConfirmResultEnum.CANCEL, () => {
            instance.$destroy()
            reject()
        })

        instance.$mount()
    })
}

const baseUseIconConfirm = (userOptions: string | JSX.Element | IUseConfirm, icon: string) => {
    const options = getOptions(userOptions)
    options.titleIcon = require(`./assets/confirm-${icon}.svg`)
    return useConfirm(options)
}

/**
 * 带info图标的弹框
 * @param userOptions
 */
export const useInfoConfirm = (userOptions: string | JSX.Element | IUseConfirm) => baseUseIconConfirm(userOptions, 'info')

/**
 * 带error图标的弹框
 * @param userOptions
 */
export const useErrorConfirm = (userOptions: string | JSX.Element | IUseConfirm) => baseUseIconConfirm(userOptions, 'error')

/**
 * 带success图标的弹框
 * @param userOptions
 */
export const useSuccessConfirm = (userOptions: string | JSX.Element | IUseConfirm) => baseUseIconConfirm(userOptions, 'success')

/**
 * 带warning图标的弹框
 * @param userOptions
 */
export const useWarningConfirm = (userOptions: string | JSX.Element | IUseConfirm) => baseUseIconConfirm(userOptions, 'warning')

export const useNoRemindConfirm = (options: IUseConfirm | string) => {
    const defaultOptions = {
        showNoRemind: true,
        noRemindText: '不再提醒',
        closeOnClickModal: false,
        closeOnPressEscape: true,
        lockScroll: true,
        titleIcon: 'el-icon-warning',
        titleIconStyle: 'color: var(--color-warning)',
    }

    const finalOptions = typeof options === 'string' ? { ...defaultOptions, message: options } : { ...defaultOptions, ...options }

    return useConfirm(finalOptions)
}
