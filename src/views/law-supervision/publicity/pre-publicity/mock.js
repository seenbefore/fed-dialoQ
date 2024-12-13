import { mock } from 'mockjs'
import { PublicityStatusEnum, PublicityTypeEnum } from './enum'

export default [
    {
        name: '/law-supervision/publicity/pre-publicity/list',
        method: 'post',
        description: '公示信息列表',
        onMock(opt, query, body) {
            const { page = 1, pageSize = 10 } = body
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': 1,
                            'type|1': Object.values(PublicityTypeEnum),
                            'status|1': Object.values(PublicityStatusEnum),
                            operator: '@cname',
                            updateTime: '@datetime("yyyy-MM-dd HH:mm")',
                            createTime: '@datetime("yyyy-MM-dd HH:mm")',
                            // 设定依据
                            basis: '@cparagraph(1, 3)',
                            // 公示信息选中项
                            'publicityInfo|1-7': ['businessLine', 'area', 'subjectName', 'subjectType', 'address', 'contact', 'basis'],
                            // 所属条线领域
                            businessLine: '@ctitle(3,5)',
                            // 行政区划
                            area: '@city',
                            // 执法主体名称
                            subjectName: '@ctitle(3,10)',
                            // 执法主体类型
                            subjectType: '行政机关',
                            // 地址
                            address: '@county(true)',
                            // 联系方式
                            contact: '@mobile',
                        },
                    ],
                    total: 100,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/law-supervision/publicity/pre-publicity/detail',
        method: 'get',
        description: '公示信息详情',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    'type|1': Object.values(PublicityTypeEnum),
                    'status|1': Object.values(PublicityStatusEnum),
                    operator: '@cname',
                    updateTime: '@datetime("yyyy-MM-dd HH:mm")',
                    createTime: '@datetime("yyyy-MM-dd HH:mm")',
                    // 设定依据
                    basis: '@cparagraph(1, 3)',
                    // 公示信息选中项
                    publicityInfo: ['businessLine', 'area', 'subjectName', 'subjectType', 'address', 'contact', 'basis'],
                    // 公示信息列表数据
                    'publicityList|3': [
                        {
                            // 所属条线领域
                            businessLine: '@ctitle(3,5)',
                            // 行政区划
                            area: '@city',
                            // 执法主体名称
                            subjectName: '@ctitle(3,10)',
                            // 执法主体类型
                            subjectType: '行政机关',
                            // 地址
                            address: '@county(true)',
                            // 联系方式
                            contact: /^1[34578]\d{9}$/,
                            // 设定依据
                            basis: '@cparagraph(1,3)',
                        },
                    ],
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/law-supervision/publicity/pre-publicity/save',
        method: 'post',
        description: '保存公示信息',
        onMock() {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/law-supervision/publicity/pre-publicity/remove',
        method: 'post',
        description: '删除公示信息',
        onMock() {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
]
