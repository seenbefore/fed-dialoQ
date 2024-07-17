import { desktopInit } from './desktopInit'
import Vue from 'vue'

export const bigScreenInit = (VueInstance: typeof Vue) => {
    const { bootstrap } = desktopInit(VueInstance)

    return {
        bootstrap,
    }
}
