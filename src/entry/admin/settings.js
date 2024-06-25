module.exports = {
    mode: 'history',
    key: 'admin',
    title: '后台管理系统',
    keywords: '后台管理系统',
    description: '',
    filename: 'index.html',
    //template: 'public/index.html',
    settings: {
        breadcrumb: false,
        isThirdParty: false, // 内容区是否作为第三方页面
        title: '后台管理系统',
        tagsView: true,
        layout: 'layout-common', // layout-vertical layout-common
    },
    user: {
        // 设置一级菜单为顶部菜单
        mode: 1,
    },
}
