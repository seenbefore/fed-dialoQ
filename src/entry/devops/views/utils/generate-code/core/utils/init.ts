/* 做一些初始化的操作。为了处理ioc的注入顺序。避免在使用的时候实例未注入 */
const context = require.context('../dataStore', true, /DataStore\.ts$/)
context.keys().forEach(context)
