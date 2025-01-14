import { mock } from 'mockjs'
import { CaseTypeEnum, PriorityEnum, ExecuteStatusEnum } from './enum'

export default [
    {
        name: '/test/case/list',
        method: 'post',
        description: '测试用例列表',
        onMock(opt, query, body) {
            let { page = 1, pageNum = 1, pageSize, length } = body
            page = pageNum || 1
            pageSize = length || 10
            const names = ['批量导入对象', '批量新增标签', '顶部详情', '标注监管标签', '标注地址定位', '标注管辖人员', '标注备注信息', '标注工作单位', '标注特种设备', '场地场所']
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            'name|1': names,
                            'type|1': Object.values(CaseTypeEnum),
                            'priority|1': Object.values(PriorityEnum),
                            'status|1': Object.values(ExecuteStatusEnum),
                            precondition: '@cparagraph(1, 3)',
                            steps: '@cparagraph(2, 5)',
                            expectedResult: '@cparagraph(1, 3)',
                            remark: '@cparagraph(1, 2)',
                            lastExecuteTime: '@datetime',
                            createBy: '@cname',
                            createTime: '@datetime',
                        },
                    ],
                    recordsTotal: 198,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/test/case/save',
        method: 'post',
        description: '保存测试用例',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/test/case/remove',
        method: 'get',
        description: '删除测试用例',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/test/case/removeBatch',
        method: 'post',
        description: '批量删除测试用例',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/test/case/detail',
        method: 'get',
        description: '测试用例详情',
        onMock(opt, query, body) {
            const names = ['批量导入对象', '批量新增标签', '顶部详情', '标注监管标签', '标注地址定位', '标注管辖人员', '标注备注信息', '标注工作单位', '标注特种设备', '场地场所']
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    'name|1': names,
                    'type|1': Object.values(CaseTypeEnum),
                    'priority|1': Object.values(PriorityEnum),
                    'status|1': Object.values(ExecuteStatusEnum),
                    precondition: '@cparagraph(1, 3)',
                    steps: '@cparagraph(2, 5)',
                    expectedResult: '@cparagraph(1, 3)',
                    remark: '@cparagraph(1, 2)',
                    lastExecuteTime: '@datetime',
                    createBy: '@cname',
                    createTime: '@datetime',
                },
                message: '请求成功',
            })
        },
    },
]
