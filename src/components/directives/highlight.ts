import Vue from 'vue'
// import 'highlight.js/styles/monokai.css'
// import 'highlight.js/styles/idea.css'
// import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js/lib/core'
import hljs_xml from 'highlight.js/lib/languages/xml'
import hljs_css from 'highlight.js/lib/languages/css'
import hljs_javascript from 'highlight.js/lib/languages/javascript'
import hljs_typescript from 'highlight.js/lib/languages/typescript'
import hljs_json from 'highlight.js/lib/languages/json'
import hljs_bash from 'highlight.js/lib/languages/bash'
import hljs_java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('xml', hljs_xml)
hljs.registerLanguage('css', hljs_css)
hljs.registerLanguage('javascript', hljs_javascript)
hljs.registerLanguage('js', hljs_javascript)
hljs.registerLanguage('ts', hljs_typescript)
hljs.registerLanguage('typescript', hljs_typescript)
hljs.registerLanguage('json', hljs_json)
hljs.registerLanguage('bash', hljs_bash)
hljs.registerLanguage('java', hljs_java)
const highlightHandle = function(el: any) {
    el.classList.add('highlight-box')
    const blocks = el.querySelectorAll('pre >code')
    Array.prototype.forEach.call(blocks, hljs.highlightElement)
}
Vue.directive('highlight', {
    //bind: highlightHandle,
    //componentUpdated: highlightHandle,
    inserted: highlightHandle,
})
