declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

// 定义第三方依赖
declare module 'qs/lib/stringify'
// 定义第三方module
declare module '*.md'
declare module 'gm-crypt'
declare module 'jsrsasign'

declare module 'highlight.js/lib/core'
declare module 'highlight.js/lib/languages/css'
declare module 'highlight.js/lib/languages/javascript'
declare module 'highlight.js/lib/languages/typescript'
declare module 'highlight.js/lib/languages/xml'
declare module 'highlight.js/lib/languages/json'
declare module 'highlight.js/lib/languages/java'
declare module 'highlight.js/lib/languages/bash'
declare module 'pdfh5'
declare module 'jspdf'
declare module 'iframe-resizer/js/iframeResizer'
declare module 'vue-count-to'

interface Window {
    ace: any
}
