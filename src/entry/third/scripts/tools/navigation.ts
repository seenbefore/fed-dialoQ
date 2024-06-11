interface paramsConfig {
    url: string
    keyword?: string
    isNew?: boolean
}

export const go = (params: paramsConfig) => {
    const { url, keyword, isNew } = params
    // window.open(`${base}${url}`)

    window.parent.postMessage(
        {
            type: 'gotoPage',
            pagePath: url,
            originPath: '/SYMBOLSYMBOLSYMBOL/homePage/index',
            keyword,
            isNew,
        },
        '*',
    )
}

export const open = (params: paramsConfig) => {}
