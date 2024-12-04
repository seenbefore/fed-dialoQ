export interface IDefinedThemeValue {
    /* 主题主要颜色 */
    '--color-primary': string
    /* success颜色 */
    '--color-success': string
    /* warning颜色 */
    '--color-warning': string
    /* danger颜色 */
    '--color-danger': string
    /* info颜色 */
    '--color-info': string
}

export enum MixColorEnum {
    WHITE = 'white',
    BLACK = 'black',
}

export const mixVariables = ['--color-primary', '--color-success', '--color-warning', '--color-danger', '--color-info']

export const definedTheme = {
    /* 大综合 */
    gci: {
        '--color-primary': '#158DFF',
        '--color-success': '#6DD400',
        '--color-warning': '#FF7D00',
        '--color-danger': '#F4333C',
        '--color-info': '#666666',
    },
    /* 温州 */
    wz: {
        '--color-primary': '#3F88F7',
        '--color-success': '#59AE00',
        '--color-warning': '#FF6600',
        '--color-danger': '#FF7070',
        '--color-info': '#666666',
    },
} as const

export type IDefinedThemeKey = keyof typeof definedTheme

export const definedThemeKeys = Object.keys(definedTheme) as Array<IDefinedThemeKey>

export const getDefinedThemeValue = (key: IDefinedThemeKey): UndefinedAble<IDefinedThemeValue> => {
    return Reflect.get(definedTheme, key)
}

/* 用于优化生成的mix变量 */
export const mixGenerateDefined: Record<keyof IDefinedThemeValue, Record<MixColorEnum, Set<number>>> = {
    '--color-primary': {
        white: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -5, -8, -10]),
        black: new Set([1]),
    },
    '--color-success': {
        white: new Set([1, 2, 4, 8, 9, -1, -2, -5, -10]),
        black: new Set([1]),
    },
    '--color-warning': {
        white: new Set([2, 4, 8, 9, -1, -2, -5, -10]),
        black: new Set([1]),
    },
    '--color-danger': {
        white: new Set([2, 4, 8, 9, -1, -2, -5, -10]),
        black: new Set([1]),
    },
    '--color-info': {
        white: new Set([2, 4, 8, 9, -1, -2, -5, -10]),
        black: new Set([-1, 1]),
    },
}
