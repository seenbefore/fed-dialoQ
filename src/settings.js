module.exports = {
    // 路由模式 history hash
    mode: 'history',
    // 项目标识 用于vuex 本地存储
    key: 'src',
    // index.html SEO title
    title: 'dialoQ',
    // index.html SEO keywords
    keywords: '',
    // index.html SEO description
    description: '',
    filename: 'index.html',
    // 打包模板
    template: 'public/index.html',
    // 是否禁用此应用 npm run new不显示
    disabled: false,
    // store/settings.ts配合使用
    settings: {
        // 鉴权名称
        TokenName: 'authorization',
        // 是否使用面包屑
        breadcrumb: false,
        // 内容区是否作为第三方页面 隐藏头部和左侧菜单
        isThirdParty: false,
        // 后台标题 选用
        title: '系统名称',
        // 是否使用标签页
        tagsView: true,
        // 后台板式 两种 layout-vertical layout-common
        layout: 'layout-common',
        // 是否使用水印
        watermark: false,
    },
    user: {
        // 设置一级菜单为顶部菜单
        mode: 1,
    },
    theme: {
        name: 'default',
        variables: {
            '--color-primary': '#005ff5',
            '--color-success': '#6DD400',
            '--color-warning': '#FF7D00',
            '--color-danger': '#F53F3F',
            '--color-info': '#666666',
        },
    },
}
