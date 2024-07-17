const postcss = require('postcss')

/**
 * 通过postcss的插件将所有字体都替换为动态变量。16px => var(--font-size-16, 16px)
 */
module.exports = postcss.plugin('postcss-replaceFontSize', opts => {
    return root => {
        root.walkDecls((decl, i) => {
            const prop = decl.prop
            const value = decl.value
            /* 处理字体大小 */
            if (prop === 'font-size' && value) {
                if (value.endsWith('px')) {
                    const originValue = value.replace('px', '')?.trim?.() ?? ''
                    if (originValue) {
                        decl.value = `var(--font-size-${originValue}, ${originValue}px);`
                    }
                }
            }
        })
    }
})
