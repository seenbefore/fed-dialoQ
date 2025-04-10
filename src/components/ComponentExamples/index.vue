<!-- 非单例公共组件需要在 @/components/ComponentExamples 目录中写示例 -->

<script>
import _ from 'lodash'
import Vue from 'vue'

// 全局注册 v-highlight 指令，方便所有 example 组件
import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js/lib/core'
import hljs_xml from 'highlight.js/lib/languages/xml'
import hljs_css from 'highlight.js/lib/languages/css'
import hljs_javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('xml', hljs_xml)
hljs.registerLanguage('css', hljs_css)
hljs.registerLanguage('javascript', hljs_javascript)
const highlightHandle = function(el) {
    // el.classList.add('highlight-box')
    // const blocks = el.querySelectorAll('pre >code')
    // _.each(blocks, block => hljs.highlightBlock(block))
    el.classList.add('highlight-box')
    const blocks = el.querySelectorAll('pre >code')
    Array.prototype.forEach.call(blocks, hljs.highlightElement)
}
Vue.directive('highlight', {
    bind: highlightHandle,
    componentUpdated: highlightHandle,
})

// 全量导入组件库，方便所有 example 组件 (使用 CommonJS 方式可绕过 babel 的按需引入插件)
//require('element-ui/lib/theme-chalk/index.css')
//Vue.use(require('element-ui'))

const README_src = require('!file-loader?name=docs-dev/[name].[ext]!@/../docs/README.html')
const axios使用规范_src = require('!file-loader?name=docs-dev/[name].[ext]!@/../docs/axios使用规范.html')
const 环境变量使用规范_src = require('!file-loader?name=docs-dev/[name].[ext]!@/../docs/环境变量使用规范.html')
const requireCtx = require.context(
    '../ComponentExamples',
    true, // 不解析子文件夹
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 文件名使用 PascalCase 命名法
)

const requireCtxRaw = require.context(
    '!raw-loader!../ComponentExamples',
    true, // 同上
    /[/\\][A-Z][a-zA-Z0-9]+\.vue$/, // 同上
)

const getModules = ctx => {
    const modules = {}
    ctx.keys().forEach(fileName => {
        const name = fileName
            .split(/[/\\]+/)
            .pop()
            .replace(/\.\w+$/, '')
        const m = ctx(fileName)
        modules[name] = m && m.__esModule ? m.default : m
    })
    return modules
}
const comps = getModules(requireCtx)
const compsRaw = getModules(requireCtxRaw)

export default {
    name: 'ComponentExamples',
    components: { ...comps },
    data() {
        return {
            README_src,
            axios使用规范_src,
            环境变量使用规范_src,
            compNames: Object.keys(comps),
            compsRaw,
            uid: `id${Date.now()}${_.uniqueId()}`,
        }
    },
    computed: {
        currLinkName() {
            const hashVal = decodeURIComponent(this.$route.hash.slice(1))
            const hit = ['axios使用规范', '环境变量使用规范', ...this.compNames].includes(hashVal)
            return hit ? hashVal : 'README'
        },
        currLinkIsComp() {
            return this.compNames.includes(this.currLinkName)
        },
    },
    created() {
        if (this.$route.hash.slice(1) !== this.currLinkName) {
            this.$router.replace({
                ...this.$route,
                hash: `#${this.currLinkName}`,
            })
        }
    },
    mounted() {
        document.documentElement.classList.add('ComponentExamples')
        this.$once('hook:beforeDestroy', () => {
            document.documentElement.classList.remove('ComponentExamples')
            delete Vue.options.directives.highlight
        })
        this.targetScrollIntoView()
    },
    beforeRouteUpdate(to, from, next) {
        next()
        !this.isRouteChangeFromMouseEnter_ && this.targetScrollIntoView()
    },
    beforeRouteLeave(to, from, next) {
        next(false)
        const { href } = this.$router.resolve(to.fullPath)
        window.open(href)
    },
    methods: {
        showCode(compName) {
            const key = `${compName}_popoverInited`
            if (!this.compsRaw[key]) {
                this.$set(this.compsRaw, key, true)
            }
        },
        iframeOnLoad(event) {
            const doc = event.currentTarget.contentDocument
            const bodyId = doc.body.id ? doc.body.id : (doc.body.id = this.uid)
            const div = doc.createElement('div')
            div.innerHTML = `
        <a id="gotoTop_${bodyId}" href="#${bodyId}">↑</a>
        <style>
          #gotoTop_${bodyId} {
            position: fixed;
            z-index: 999999999;
            bottom: 8%;
            right: 30px;
            width: 40px;
            height: 40px;
            line-height: 36px;
            text-align: center;
            font-weight: bold;
            font-size: 24px;
            color: #fff;
            background: rgba(0,0,0, 0.2)
          }
          #gotoTop_${bodyId}:hover {
            background: rgba(0,0,0, 0.3)
          }
        </style>
      `
            doc.body.appendChild(div)
        },
        targetScrollIntoView() {
            if (this.currLinkIsComp) {
                const id = `${this.currLinkName}_target_${this.uid}`
                const target = document.getElementById(id)
                target && target.scrollIntoView()
            }
        },
        mouseEnterComp(compName) {
            if (compName === this.currLinkName) return
            clearTimeout(this.mouseEnterCompTimer)
            this.mouseEnterCompTimer = setTimeout(() => {
                this.isRouteChangeFromMouseEnter_ = true
                this.$router.replace({ ...this.$route, hash: `#${compName}` })
                this.isRouteChangeFromMouseEnter_ = false
            }, 300)
        },
    },
}
</script>

<template>
    <el-container :class="$style.box">
        <el-aside :class="$style.aside" width="220px">
            <div :class="$style.link_group">
                <a :class="$style.link" target="_blank" href="https://v2.cn.vuejs.org/">vue 官网</a>
                <a :class="$style.link" target="_blank" href="https://router.vuejs.org/zh/api/">vue-router 官网</a>
                <a :class="$style.link" target="_blank" href="https://vuex.vuejs.org/zh/api/">vuex 官网</a>
                <!-- @PC.element-ui -->
                <a :class="$style.link" target="_blank" href="https://element.eleme.cn/#/zh-CN/component/table">element-ui 官网</a>
                <!-- @H5.vant -->
                <a :class="$style.link" target="_blank" href="https://youzan.github.io/vant/#/zh-CN/">vant 官网</a>
            </div>
            <div :class="$style.link_group">
                <router-link :class="$style.link" :to="{ ...$route, hash: '#README' }">README</router-link>
                <router-link :class="$style.link" :to="{ ...$route, hash: '#axios使用规范' }">axios使用规范</router-link>
                <router-link :class="$style.link" :to="{ ...$route, hash: '#环境变量使用规范' }">环境变量使用规范</router-link>
            </div>
            <div :class="$style.link_group">
                <router-link v-for="compName in compNames" :key="compName" :class="$style.link" :to="{ ...$route, hash: `#${compName}` }">&lt;{{ compName }}&gt;</router-link>
            </div>
        </el-aside>
        <el-main :class="$style.main">
            <iframe v-if="currLinkName === 'README'" :class="$style.iframe" :src="README_src" @load="iframeOnLoad"></iframe>
            <iframe v-else-if="currLinkName === 'axios使用规范'" :class="$style.iframe" :src="axios使用规范_src" @load="iframeOnLoad"></iframe>
            <iframe v-else-if="currLinkName === '环境变量使用规范'" :class="$style.iframe" :src="环境变量使用规范_src" @load="iframeOnLoad"></iframe>
            <template v-else-if="currLinkIsComp">
                <div v-for="(compName, i) in compNames" :key="compName">
                    <div :id="`${compName}_target_${uid}`" @mouseenter="mouseEnterComp(compName)">
                        <h2>
                            <el-popover placement="right" trigger="hover" @show="showCode(compName)">
                                <i class="el-icon-view" style="color: #666; font-size: 20px" slot="reference" />
                                <div :class="$style.highlight_box" v-if="!!compsRaw[`${compName}_popoverInited`]" v-highlight>
                                    <pre><code class="xml">{{ compsRaw[compName] }}</code></pre>
                                </div>
                            </el-popover>
                            &lt;{{ compName }}&gt;
                            <el-tooltip placement="right">
                                <i class="el-icon-aim" style="color: #ccc; font-size: 20px" />
                                <template slot="content">
                                    可通过 vue-devtools 中的 Open in editor 快速定位至源文件
                                    <div
                                        :style="{
                                            marginTop: '10px',
                                            opacity: 0.5,
                                        }"
                                    >
                                        mac 设置参考：
                                        <a style="color: inherit" target="_blank" href="https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line">
                                            https://code.visualstudio.com/docs/setup/mac
                                        </a>
                                    </div>
                                </template>
                            </el-tooltip>
                        </h2>
                        <div style="padding-left: 30px">
                            <component :is="compName"></component>
                        </div>
                    </div>
                    <hr v-if="i < compNames.length - 1" style="margin: 40px 0; opacity: 0.3" />
                </div>
            </template>
        </el-main>
    </el-container>
</template>

<style lang="less" module>
:global {
    html.ComponentExamples {
        // prettier-ignore
        font-size: 16PX !important;
        body {
            overflow: hidden !important;
            height: 0 !important;
            .highlight-box {
                overflow: auto;
                pre {
                    margin: 0;
                    min-width: 100%;
                    width: max-content;
                }
            }
        }
    }
}
.box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
}
.aside {
    padding: 10px 0;
    border-right: 1px solid #e5e5e5;
}
.main {
    position: relative;
}
.link_group {
    margin: 12px 0;
}
.link {
    display: block;
    margin-bottom: 1px;
    padding: 5px 5px 5px 15px;
    font-weight: bold;
    font-size: 14px;
    &:hover {
        background: rgba(#000, 0.03);
    }
    &:global(.router-link-active) {
        background: rgba(#000, 0.05);
    }
}
.iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
.highlight_box {
    overflow: auto;
    max-width: calc(100vw - 66px);
    max-height: calc(100vh - 66px);
    font-size: 14px;
    > pre {
        margin: 0;
        > code {
            overflow: visible;
            padding: 20px;
        }
    }
}
</style>
