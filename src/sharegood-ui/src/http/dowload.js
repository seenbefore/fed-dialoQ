// 下载
const download = function(params = {}, config = {}) {
    const method = config.method || 'post'
    const body = {
        ...params,
    }
    if (method === 'post') {
        config['data'] = body
    } else {
        config['params'] = body
    }
    config = {
        ...config,
        responseType: 'arraybuffer', // blob
    }

    return this.request(config).then(response => {
        if (response.headers) {
            let filename = response.headers['x-suggested-filename']

            if (!filename) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                const matches = filenameRegex.exec(response.headers['content-disposition'])
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '')
                }
            }

            if (filename) {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('target', '_blank')
                link.setAttribute('download', decodeURIComponent(filename))
                link.click()
                window.URL.revokeObjectURL(url)

                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        } else {
            return response
        }
    })
}
export default download
