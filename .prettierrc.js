/* 官网：https://prettier.io/docs/en/options.html */

module.exports = {
    semi: false, // 尽可能不要分号
    singleQuote: true, // 尽可能使用单引号
    trailingComma: 'all', // 尽可能使用尾随逗号，参考：http://es6.ruanyifeng.com/#docs/style#对象
    endOfLine: 'lf',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'ignore',
    // 属性换行问题
    printWidth: 200,
    bracketSameLine: true,
}
