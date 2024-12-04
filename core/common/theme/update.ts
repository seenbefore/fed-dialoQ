import { getDefinedThemeValue, IDefinedThemeKey, IDefinedThemeValue, MixColorEnum, mixGenerateDefined, mixVariables } from './definedTheme'
import { nextTick } from './nextTick'

const generateStyleId = '__theme-chalk__auto-generate'

const colorToRgb = (color: string): Array<number> => {
    function extractRgbValues(rgbString: string): Array<number> {
        const result = rgbString.match(/\d+/g)
        return result ? result.map(Number) : []
    }
    if (color.startsWith('rgb')) {
        return extractRgbValues(color)
    }

    color = color.replace(/^#/, '')

    if (color.length === 3) {
        color = color
            .split('')
            .map(char => char + char)
            .join('')
    }

    const r = parseInt(color.slice(0, 2), 16)
    const g = parseInt(color.slice(2, 4), 16)
    const b = parseInt(color.slice(4, 6), 16)

    // Return the result as an array of rgb values
    return [r, g, b]
}

const mix = (color1: any, color2: any, weight: number): string => {
    if (typeof color1 === 'string' && color1.startsWith('#')) {
        color1 = colorToRgb(color1)
    }

    if (typeof color2 === 'string' && color2.startsWith('#')) {
        color2 = colorToRgb(color2)
    }

    const r = Math.round(color1[0] * (1 - weight) + color2[0] * weight)
    const g = Math.round(color1[1] * (1 - weight) + color2[1] * weight)
    const b = Math.round(color1[2] * (1 - weight) + color2[2] * weight)

    return `rgb(${r}, ${g}, ${b})`
}

const getOriginStyle = (): Record<string, string> => {
    let styles = document.querySelector<HTMLStyleElement>(`#${generateStyleId}`)
    if (!styles) {
        styles = document.createElement('style')
        styles.id = generateStyleId
        document.head.appendChild(styles)
    }
    /* 取出值 */
    const content = styles.innerHTML
    if (content) {
        const reg = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
        const cssVariables = {}

        let match
        while ((match = reg.exec(content)) !== null) {
            const key = match[1].trim()
            const value = match[2].trim()
            Reflect.set(cssVariables, key, value)
        }
        return cssVariables
    }
    return {}
}

const getRootCssVariables = (): Obj => {
    const variables: Obj = {}
    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                // Check if the rule is a style rule and targets :root
                if (Reflect.get(rule, 'selectorText') === ':root') {
                    const styles = Reflect.get(rule, 'style')
                    for (const property of styles) {
                        if (property.startsWith('--')) {
                            variables[property] = getComputedStyle(document.documentElement)
                                .getPropertyValue(property)
                                .trim()
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Unable to access stylesheet due to CORS restrictions:', sheet.href)
        }
    }
    return variables
}

const setGenerateVariablesToStyle = (varStyles: Obj): void => {
    if (!varStyles || Object.keys(varStyles).length === 0 || typeof varStyles !== 'object') {
        return
    }
    const variables = getOriginStyle()
    Object.assign(variables, varStyles)

    const styles = document.querySelector<HTMLStyleElement>(`#${generateStyleId}`)
    if (styles) {
        styles.innerHTML = `
        :root {
            ${Object.entries(variables)
                .map(([key, value]) => {
                    const _key = key.startsWith('--') ? key : `--${key}`
                    return `${_key}: ${value};`
                })
                .join('\n')}
        }`
    }
}

export const registryMixColor = (colorNameOrColorName?: string | Array<string>) => {
    const colorNames = colorNameOrColorName ? (Array.isArray(colorNameOrColorName) ? colorNameOrColorName : [colorNameOrColorName]) : mixVariables

    const run = (colorName: string) => {
        const rootCssVariables = getRootCssVariables()
        const parseColorName = `${colorName.startsWith('--') ? '' : '--'}${colorName}`
        const colorValue = Reflect.get(rootCssVariables, parseColorName)
        if (!colorValue) {
            return
        }
        const generateVariables: Obj = {}

        const generate = (mixColor: string, prefix: MixColorEnum) => {
            const mixColorValue = Reflect.get(mixGenerateDefined, parseColorName)
            const currentMixColor = Reflect.get(mixColorValue, prefix) as Set<number>
            for (let i = 0; i <= 10; ++i) {
                if (currentMixColor.has(i)) {
                    Reflect.set(generateVariables, `${parseColorName}-mix-${prefix}-${i}`, mix(colorValue, mixColor, i / 10))
                }
                if (currentMixColor.has(-i)) {
                    Reflect.set(generateVariables, `${parseColorName}-mix-${prefix}-${i}-reverse`, mix(mixColor, colorValue, i / 10))
                }
            }
        }
        generate('#ffffff', MixColorEnum.WHITE)
        generate('#000000', MixColorEnum.BLACK)

        setGenerateVariablesToStyle(generateVariables)
    }
    colorNames.forEach(run)
}

export const updateThemeVariables = (variables: Partial<IDefinedThemeValue> & Obj) => {
    setGenerateVariablesToStyle(variables)
    nextTick(() => {
        registryMixColor()
    })
}

export const updateTheme = (theme: IDefinedThemeKey): void => {
    if (!theme) {
        return
    }
    const themeVariables = getDefinedThemeValue(theme)
    if (themeVariables) {
        updateThemeVariables(themeVariables)
    }
}
