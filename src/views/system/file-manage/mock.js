import { mock } from 'mockjs'

const fileTypes = ['doc', 'image', 'video', 'audio', 'other']
const fileExtensions = {
    doc: ['docx', 'xlsx', 'pdf', 'txt'],
    image: ['jpg', 'png', 'gif'],
    video: ['mp4', 'avi', 'mov'],
    audio: ['mp3', 'wav', 'aac'],
    other: ['zip', 'rar', '7z'],
}

export default [
    {
        name: '/file/list',
        method: 'post',
        description: '文件列表',
        onMock(opt, query, body) {
            let { page = 1, pageSize = 10, type = 'all', keyword = '' } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            name() {
                                const currentType = type === 'all' ? '@pick(' + JSON.stringify(fileTypes) + ')' : type
                                const extensions = fileExtensions[mock(currentType)] || fileExtensions.other
                                const extension = mock('@pick(' + JSON.stringify(extensions) + ')')
                                return mock('@ctitle') + '.' + extension
                            },
                            type() {
                                return type === 'all' ? mock('@pick(' + JSON.stringify(fileTypes) + ')') : type
                            },
                            url: '@url',
                            'size|1-100.1-2': 1,
                            updateTime: '@datetime',
                        },
                    ],
                    recordsTotal: 198,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/file/remove',
        method: 'get',
        description: '删除文件',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/file/removeBatch',
        method: 'post',
        description: '批量删除文件',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '批量删除成功',
            })
        },
    },
    {
        name: '/file/download',
        method: 'get',
        description: '下载文件',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '下载成功',
            })
        },
    },
    {
        name: '/file/preview',
        method: 'get',
        description: '预览文件',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '预览成功',
            })
        },
    },
]
