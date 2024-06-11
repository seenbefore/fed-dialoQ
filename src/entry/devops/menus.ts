import { UserMenu } from '@/@types/menu'
const host = `${location.origin}${process.env.BASE_URL}`
export const LocalMenu: UserMenu[] = [
    {
        label: '我的工作台',
        icon: 'el-icon-document',
        uri: '/我的工作台',
        children: [
            {
                icon: 'el-icon-document',
                label: '工作台',
                uri: '/admin/dashboard',
            },
            {
                icon: 'el-icon-document',
                label: '文心一言',
                uri: 'https://yiyan.baidu.com/?from=baidu_pc_index',
            },
            {
                icon: 'el-icon-document',
                label: '图表集合',
                uri: '/admin/chart/card',
            },
            {
                icon: 'el-icon-document',
                label: '工具',
                children: [
                    {
                        icon: 'el-icon-link',
                        label: '代码生成',
                        uri: '/utils/generate-code',
                    },
                    {
                        icon: 'el-icon-link',
                        label: '浙里办调试二维码',
                        uri: '/utils/zlb-qr-code',
                    },
                    {
                        icon: 'el-icon-document',
                        label: 'JSON格式化',
                        uri: 'https://www.bejson.com/',
                    },
                    {
                        icon: 'el-icon-document',
                        label: '印记中文',
                        uri: 'https://docschina.org/',
                    },
                ],
            },

            // {
            //     label: '接口文档',
            //     icon: 'el-icon-document',
            //     uri: 'http://192.168.1.147:3000/apidoc/index.html',
            // },
        ],
    },
    {
        label: '产品管理',
        icon: 'el-icon-document',
        uri: '/产品管理',
        children: [
            {
                label: '产品列表',
                uri: '/admin/product/list',
            },
            {
                label: '我的产品',
                uri: '/admin/product/my',
            },
            {
                label: 'UI走查明细',
                uri: '/admin/ui_review',
            },
            {
                label: 'UI走查-人员统计',
                uri: '/admin/ui_review/stat',
            },
            {
                label: 'UI走查-产品统计',
                uri: '/admin/product/ui_review/product_stat',
            },
            {
                label: '提测单',
                uri: '/admin/product/testing',
            },
            {
                label: '发布单',
                uri: '/admin/product/release',
            },
        ],
    },
    {
        label: 'CI/CD',
        icon: 'el-icon-document',
        uri: '/CICD',
        children: [
            {
                label: '流水线',
                uri: '/devops/pipeline',
            },
            {
                label: '业务分工',
                uri: '/devops/app',
            },
            {
                label: '制品管理',
                uri: '/devops/artifact',
            },
            {
                label: '应用模板',
                uri: '/devops/project-template',
            },

            {
                label: 'nginx管理',
                uri: '/devops/nginx',
            },
            {
                label: '应用统计',
                uri: '/devops/pipeline/stat',
            },
            {
                label: '流水线日志',
                uri: '/devops/pipeline-log/list',
            },
        ],
    },
    {
        label: '知识库',
        icon: 'el-icon-document',
        uri: '/知识库',
        children: [
            {
                label: '文章集合',
                uri: '/admin/article/list',
            },
            {
                label: '组件集合',
                uri: '/admin/article/component',
            },
            {
                label: '文章统计',
                uri: '/admin/article/stat',
            },
        ],
    },
    {
        label: '代码走查',
        icon: 'el-icon-document',
        uri: '/代码走查',
        children: [
            {
                label: '走查明细',
                uri: '/admin/codereview',
            },

            {
                label: '走查统计',
                uri: '/admin/codereview/stat',
            },
        ],
    },
    {
        label: '系统管理',
        icon: 'el-icon-document',
        uri: '/系统管理',
        children: [
            {
                label: '用户管理',
                uri: '/devops/user',
            },
            {
                label: '用户组',
                uri: '/admin/system/user_group',
            },
            {
                label: '字典管理',
                uri: '/admin/system/dict',
            },
            {
                label: '岗位管理',
                uri: '/admin/system/user_post',
            },
        ],
    },

    {
        label: '辅助文档',
        icon: 'el-icon-document',
        uri: '/辅助文档',
        children: [
            {
                label: '新增案例指南',
                icon: 'el-icon-document',
                uri: '/readme/index',
            },
            {
                label: '内置图标',
                icon: 'el-icon-document',
                uri: `${host}readme/SvgIcon?external=1`,
            },
            {
                label: '页面',
                icon: 'el-icon-document',
                uri: '/页面',
                children: [
                    {
                        label: 'tab列表',
                        uri: `${host}readme/TabPage?external=1`,
                    },
                    {
                        label: '基础列表',
                        uri: `${host}readme/BaseListPage?external=1`,
                    },
                ],
            },
            {
                label: '组件',
                icon: 'el-icon-document',
                uri: '/组件',
                children: [
                    {
                        label: '表单 sg-base-form',

                        uri: `${host}readme/SgBaseForm?external=1`,
                    },
                    {
                        label: '表格 sg-data-view',
                        uri: `${host}readme/SgDataView?external=1`,
                    },
                    {
                        label: '编辑器',
                        uri: `${host}admin/comp/editor?external=1`,
                    },
                    {
                        label: '轮播表',
                        uri: `${host}admin/feat/scroll-board?external=1`,
                    },
                    {
                        label: '打印',
                        uri: `${host}admin/feat/print?external=1`,
                    },
                    {
                        label: '水印',
                        uri: `${host}readme/WaterMark/1?external=1`,
                    },
                    {
                        label: '全屏',
                        uri: `${host}readme/FullScreen/1?external=1`,
                    },
                    {
                        label: '行内输入框',
                        uri: `${host}admin/feat/inlineInput?external=1`,
                    },
                    {
                        label: '可编辑表格',
                        uri: `${host}admin/feat/tableForm?external=1`,
                    },
                    {
                        label: '区域机构树',
                        uri: `${host}admin/feat/regionOrgTree?external=1`,
                    },
                    {
                        label: '图片预览',
                        uri: `${host}readme/ImagePreview?external=1`,
                    },
                    {
                        label: '生成PDF(分页不截断)',
                        uri: `${host}admin/comp/pdf?external=1`,
                    },
                    {
                        label: '文件组预览',
                        uri: `${host}comp/file-group-preview?external=1`,
                    },
                    {
                        label: 'h5滚动加载列表',
                        uri: `${host}readme/H5MyList?external=1`,
                    },
                    {
                        label: '移动端预览',
                        uri: `${host}readme/PhonePreview?external=1`,
                    },
                ],
            },
            {
                label: '基础库',
                icon: 'el-icon-document',
                uri: '/其他',
                children: [
                    {
                        label: '请求库 icinfo-request',
                        uri: 'http://192.168.1.147:3001/admin/admin/plugin/icinfo-request?class=p10',
                    },
                    {
                        label: '工具库 icinfo-util',
                        uri: 'http://192.168.1.147:3001/admin/admin/plugin/icinfo-util?class=p10',
                    },
                    {
                        label: 'API生成器 icinfo-api-generator',
                        uri: 'http://192.168.1.147:3001/admin/admin/plugin/icinfo-api-generator?class=p10',
                    },
                ],
            },
            {
                label: '学习',
                icon: 'el-icon-document',
                uri: '/学习',
                children: [
                    {
                        label: '前端入职指南',
                        uri: 'http://192.168.1.147:3001/admin/post/5faffbf0-3bc3-4061-8709-d031fe9342e4?class=p10&external=1',
                    },

                    {
                        label: '前端绩效考核细则',
                        uri: 'http://192.168.1.147:3001/admin/post/1479f9df-0b6d-4c53-9b2b-5833225976a8?class=p10&external=1',
                    },
                    {
                        label: 'TypeScript最佳实践',
                        uri: 'http://192.168.1.147:3001/admin/post/5754a537-ebbd-4d7a-89d3-4c63c5e0ba3d?class=p10&external=1',
                    },
                    {
                        label: 'CRUD项目实战',
                        uri: 'http://192.168.1.147:3001/admin/post/5ac6f6ce-adf0-42e1-a1a4-bb1792de45b0?class=p10&external=1',
                    },
                    {
                        label: 'JSX学习',
                        uri: 'http://192.168.1.147:3001/admin/post/af393bd1-1082-421f-bf76-11086ddbe51f?class=p10&external=1',
                    },
                    {
                        label: '项目模板 vue-template-admin',
                        uri: 'http://192.168.1.147:3001/admin/post/4479903c-a1b7-47f6-a867-96089b893deb?class=p10&external=1',
                    },
                    {
                        label: 'UI规范',
                        uri: 'https://www.figma.com/file/zvOapYwfL1Y9t0MZTTbruq/G%E7%AB%AF%E4%BD%93%E9%AA%8C%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=48%3A1835&external=1',
                    },
                ],
            },
            {
                label: '蜻蜓云效API文档',
                icon: 'el-icon-document',
                uri: 'http://192.168.1.147:3000/apidoc/index.html?external=1',
            },
            {
                label: '蜻蜓云效使用文档',
                icon: 'el-icon-document',
                uri: 'http://192.168.1.147:3001/admin/post/8d248660-85ec-4eaf-b3c3-7a59ce4b3f29?external=1',
            },
        ],
    },
]
