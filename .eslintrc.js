// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring 中文

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:vue/strongly-recommended', // 使用严谨模式 属性转横杠
        '@vue/prettier', // 结合 .prettierrc.js
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],

    /** add your custom rules here
     *  'off' 或 0 - 关闭规则
     *  'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     *  'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        ////////////////
        // 可能的错误  //
        ////////////////
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-unused-vars': 1,
        'no-useless-escape': 0,
        // 禁用 console
        'no-console': 0,
        // 禁用 alert、confirm 和 prompt
        'no-alert': 0,

        //////////////
        // 风格指南  //
        //////////////
        // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': [0, 'always'],

        //////////////
        // 最佳实践 //
        //////////////

        //////////////
        // ES6.相关 //
        //////////////
        // 要求箭头函数的参数使用圆括号
        'arrow-parens': 2,
        // allow async-await
        'generator-star-spacing': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-types': 1,
        '@typescript-eslint/no-var-requires': 0,
        'arrow-parens': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-this-alias': 1,
        '@typescript-eslint/no-inferrable-types': 1,
        '@typescript-eslint/no-extra-semi': 1,
        'prefer-const': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-extra-semi': 0,
        'vue/no-side-effects-in-computed-properties': 1,
        'vue/no-v-text-v-html-on-component': 0,
        'prefer-rest-params': 0,
        'vue/no-unused-vars': 0,
    },
}
