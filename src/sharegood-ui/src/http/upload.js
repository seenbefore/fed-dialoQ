const upload = function(params = {}, config = {}) {
    const { file, ...rest } = params
    const url = config.url
    const form = new FormData()
    // 文件对象
    //form.append('file', file)
    Object.keys(rest).forEach(key => {
        form.append(key, params[key])
    })

    return this.request({
        method: 'post',
        url: url,
        data: form,
        headers: { 'content-type': 'multipart/form-data' },
        ...config,
    })
}
export default upload
