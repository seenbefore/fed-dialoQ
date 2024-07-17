import { mobileInit } from './mobileInit'
import Vue from 'vue'

export const zlbInit = (VueInstance: typeof Vue) => {
    return mobileInit(VueInstance)
}
