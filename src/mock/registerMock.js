/**
 * @param {Object} myMock
 * @param {Object} modules
 */
export const registerMock = (myMock, modules) => {
    let apis = []
    Object.keys(modules).forEach(key => {
        const target = modules[key]
        if (target.namespaced) {
            Object.keys(target).forEach(key => {
                const apis$ = target[key]
                if (apis$.length) {
                    apis.push(...apis$.map(item => parseAPI(item)))
                }
            })
        } else {
            apis.push(...target.map(item => parseAPI(item)))
        }
    })

    function parseAPI(api) {
        /* eslint-disable*/
        let { url, name, method, onSuccess } = api
        const onMock = api.onMock || onSuccess
        url = url || name
        let reg = url
        const r = /\/\{.*?\}/g
        const hasParams = r.test(url)
        //if (hasParams) {
        url = url.replace(r, '(/.+)')
        reg = `reg:${url}`
        //}
        return {
            method,
            reg,
            onMock,
        }
    }

    apis = apis.sort((a, b) => {
        return b.reg.length - a.reg.length
    })
    console.log('[---mock apis---]', apis)
    for (const api of apis) {
        myMock(api.reg, api.method, api.onMock)
    }
}

export default registerMock
