import { mock } from 'mockjs'
import { ArticleStatusEnum } from './enum'

const categories = ['新闻', '公告', '活动', '帮助']
const tags = ['重要', '置顶', '热门', '推荐']

export default [
    {
        name: '/content/article/list',
        method: 'post',
        description: '文章列表',
        onMock(opt, query, body) {
            const { page = 1, pageSize = 10 } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            title: '@ctitle(10, 30)',
                            'category|1': categories,
                            author: '@cname',
                            'readCount|0-1000': 100,
                            'status|1': Object.values(ArticleStatusEnum),
                            createTime: '@datetime',
                            updateTime: '@datetime',
                        },
                    ],
                    recordsTotal: 100,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/content/article/detail',
        method: 'get',
        description: '文章详情',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    title: '@ctitle(10, 30)',
                    'category|1': categories,
                    author: '@cname',
                    'readCount|0-1000': 100,
                    'status|1': Object.values(ArticleStatusEnum),
                    createTime: '@datetime',
                    updateTime: '@datetime',
                    coverImage: '@image("200x100")',
                    summary: '@cparagraph(1, 2)',
                    content: '@cparagraph(10, 20)',
                    'tags|1-3': tags,
                    'isTop|1': [true, false],
                    publishTime: '@datetime',
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/content/article/save',
        method: 'post',
        description: '保存文章',
        onMock() {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/content/article/remove',
        method: 'post',
        description: '��除文章',
        onMock() {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/content/article/updateStatus',
        method: 'post',
        description: '更新文章状态',
        onMock() {
            return mock({
                code: 200,
                message: '操作成功',
            })
        },
    },
]
