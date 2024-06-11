import Vue from 'vue'
import 'highlight.js/styles/monokai.css'
//import 'highlight.js/styles/idea.css'
//import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js/lib/core'
import hljs_xml from 'highlight.js/lib/languages/xml'
import hljs_css from 'highlight.js/lib/languages/css'
import hljs_javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('xml', hljs_xml)
hljs.registerLanguage('css', hljs_css)
hljs.registerLanguage('javascript', hljs_javascript)
const highlightHandle = function(el: any) {
    el.classList.add('highlight-box')
    const blocks = el.querySelectorAll('pre >code')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    //_.each(blocks, block => hljs.highlightBlock(block))
}
Vue.directive('highlight', {
    bind: highlightHandle,
    componentUpdated: highlightHandle,
})
