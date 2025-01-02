import WaterMark from './WaterMark.vue'
import Vue from 'vue'

export interface IUseWatermark {
    /** 水印内容 */
    content: string | string[]
    /** z-index 层级 */
    zIndex?: number
    /** 旋转角度 */
    rotate?: number
    /** 宽度 */
    width?: number | string
    /** 高度 */
    height?: number | string
    /** 图片源 */
    image?: string
    /** 字体相关配置 */
    font?: {
        fontSize?: number
        fontFamily?: string
        fontStyle?: string
        fontWeight?: string
        color?: string
    }
    /** 是否顺时针旋转 */
    clockwise?: boolean
    /** 透明度 */
    opacity?: number
    /** 根元素类名 */
    rootClassName?: string
    /** 间隙 */
    gap?: [number, number]
    /** 偏移量 */
    offset?: [number, number]
}

const defaultOptions: Omit<IUseWatermark, 'content'> = {
    zIndex: 9999,
    rotate: -30,
    width: 400,
    height: 200,
    image: '',
    font: {
        fontSize: 24,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'rgba(0, 0, 0, 0.08)',
    },
    clockwise: true,
    opacity: 1,
    rootClassName: '',
    gap: [80, 80],
    offset: [0, 0],
}

const getOptions = (userOptions: string | string[] | IUseWatermark): IUseWatermark => {
    if (typeof userOptions === 'string') {
        return { content: userOptions, ...defaultOptions }
    }
    if (Array.isArray(userOptions)) {
        return { content: userOptions, ...defaultOptions }
    }
    return { ...defaultOptions, ...userOptions }
}

export const useWatermark = (userOptions: string | string[] | IUseWatermark) => {
    const options = getOptions(userOptions)
    const WatermarkConstructor = Vue.extend(WaterMark)
    const instance = new WatermarkConstructor({
        propsData: options,
    })

    const div = document.createElement('div')
    document.body.appendChild(div)
    instance.$mount(div)

    const destroy = () => {
        instance.$destroy()
        if (instance.$el && instance.$el.parentNode) {
            instance.$el.parentNode.removeChild(instance.$el)
        }
    }

    return {
        destroy,
        update: (newOptions: string | string[] | IUseWatermark) => {
            const newOpts = getOptions(newOptions)
            Object.assign(instance.$props, newOpts)
        },
    }
}

/**
 * 创建简单水印
 * @param content 水印内容
 */
export const useSimpleWatermark = (content: string | string[]) => useWatermark(content)

/**
 * 创建图片水印
 * @param image 图片地址
 */
export const useImageWatermark = (image: string) =>
    useWatermark({
        content: '',
        image,
    })

/**
 * 创建暗色水印
 * @param content 水印内容
 */
export const useDarkWatermark = (content: string | string[]) =>
    useWatermark({
        content,
        font: {
            fontSize: 16,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: 'rgba(0, 0, 0, 0.3)',
        },
    })

/**
 * 创建浅色水印
 * @param content 水印内容
 */
export const useLightWatermark = (content: string | string[]) =>
    useWatermark({
        content,
        font: {
            fontSize: 16,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: 'rgba(255, 255, 255, 0.15)',
        },
    })
