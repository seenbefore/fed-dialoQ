module.exports = {
    mode: process.env.VUE_APP_ENV === 'fat1' ? 'hash' : 'history',
    key: 'bigScreen',
    title: '大屏',
    keywords: '',
    description: '大屏',
    filename: 'index.html',
    template: 'public/index.html',
}
