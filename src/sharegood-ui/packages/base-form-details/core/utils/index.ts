import { isFunction } from 'lodash'

export * from './RenderSlot'

export const runBooleanOrFunction = (value?: boolean | (() => boolean)): boolean => {
    return value ? (isFunction(value) ? value() : value) : false
}
