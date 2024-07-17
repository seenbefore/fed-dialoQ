import { BaseApiHook } from './baseHooks/BaseApiHook'
import { BaseConsoleHook } from './baseHooks/BaseConsoleHook'
import { BaseDataHook } from './baseHooks/BaseDataHook'
import { BaseDesktopLoadingHook } from './baseHooks/BaseDesktopLoadingHook'
import { BaseShowDesktopErrorMessageHook } from './baseHooks/BaseShowDesktopErrorMessageHook'
import { BaseMobileLoadingHook } from './baseHooks/BaseMobileLoadingHook'
import { BaseShowMobileErrorMessageHook } from './baseHooks/BaseShowMobileErrorMessageHook'

export const defineHooks = {
    BaseApiHook,
    BaseConsoleHook,
    BaseDataHook,
    BaseDesktopLoadingHook,
    BaseShowDesktopErrorMessageHook,
    BaseMobileLoadingHook,
    BaseShowMobileErrorMessageHook,
}

export type IDefineHooks = keyof typeof defineHooks
