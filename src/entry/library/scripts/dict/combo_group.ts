export const ComboGroupDict = {
    communityState: [
        {
            label: '已完成',
            value: 'done',
            parent: '',
        },
        {
            label: '建设中',
            value: 'doing',
            parent: '',
        },
    ],
    // 一级分类
    plabel: [
        {
            label: '组件',
            value: '组件',
            parent: '',
        },
        {
            label: '控件',
            value: '控件',
            parent: '',
        },
        {
            label: '连接器',
            value: '连接器',
            parent: '',
        },
        {
            label: '标准规范',
            value: '标准规范',
            parent: '',
        },
    ],
    // 二级分类
    clabel: [
        {
            label: '公共',
            value: '公共',
            parent: '组件',
        },
        {
            label: '业务',
            value: '业务',
            parent: '组件',
        },
        {
            label: '支撑',
            value: '支撑',
            parent: '组件',
        },

        {
            label: 'Web后台',
            value: 'Web后台',
            parent: '控件',
        },
        {
            label: '可视化大屏',
            value: '可视化大屏',
            parent: '控件',
        },
        {
            label: 'App移动端',
            value: 'App移动端',
            parent: '控件',
        },
        {
            label: 'Web门户',
            value: 'Web门户',
            parent: '控件',
        },
        {
            label: '其他',
            value: '其他',
            parent: '控件',
        },

        {
            label: '设计',
            value: '设计',
            parent: '标准规范',
        },
        {
            label: '前端',
            value: '前端',
            parent: '标准规范',
        },
        {
            label: '后端',
            value: '后端',
            parent: '标准规范',
        },
        {
            label: '数据',
            value: '数据',
            parent: '标准规范',
        },
    ],
    // 三级分类
    slabel: [
        {
            label: '测试',
            value: '测试',
            parent: '测试',
            default: false,
        },
        // {
        //     label: '表格',
        //     value: '交互类-Web后台-表格',
        //     parent: 'Web后台',
        // },
        // {
        //     label: '树选择',
        //     value: '交互类-Web后台-树选择',
        //     parent: 'Web后台',
        //     default: true,
        // },
        // {
        //     label: '其他',
        //     value: '交互类-Web后台-其他',
        //     parent: 'Web后台',
        // },
        // {
        //     label: '地图',
        //     value: '交互类-可视化大屏-地图',
        //     parent: '可视化大屏',
        //     default: true,
        // },
        // {
        //     label: '其他',
        //     value: '交互类-可视化大屏-其他',
        //     parent: '可视化大屏',
        // },
    ],
}
