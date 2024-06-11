<template>
    <div class="markdown-article" ref="box">
        <div class="markdown-article__content" v-highlight :class="showCatalog ? 'showCatalog' : ''">
            <slot></slot>
        </div>
        <div class="markdown-article__catalog" v-if="showCatalog">
            <div class="markdown-article__catalog-wrap">
                <SideCatalog class="markdown-article__catalog-content" v-bind="$attrs"></SideCatalog>
            </div>
        </div>
        <ScrollTop></ScrollTop>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SideCatalog from '@/components/SideCatalog/index.vue'
//import { clipboard } from '@/scripts/utils'
import Clipboard from 'clipboard'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import ScrollTop from '@/components/ScrollTop/index.vue'
import '@/styles/markdown.less'
@Component({
    name: 'MarkdownArticle',
    components: {
        SideCatalog,
        ScrollTop,
    },
})
export default class MarkdownArticle extends Vue {
    @Prop({ default: true }) showCatalog!: boolean
    // 滚动的容器ID #id
    // @Prop({ required: true }) container!: string
    // @Prop({ required: true }) container!: string
    mounted() {
        setTimeout(() => {
            document.querySelectorAll('pre code').forEach((block, index) => {
                block.insertAdjacentHTML('beforebegin', `<a class='btn${index} copy'  href='javascript:void(0)'>复制内容</a>`)
                new Clipboard(`.btn${index}`, {
                    text: function(button) {
                        button.textContent = '复制成功'
                        setTimeout(() => {
                            button.textContent = '复制内容'
                        }, 1000)

                        // 获取父级元素
                        const parentElement: any = button.parentElement
                        // 获取父级元素下class为code的元素
                        const codeElement = parentElement.querySelector('code')
                        // 获取文本内容
                        const text = codeElement.textContent
                        console.log(text)
                        return text
                    },
                })
            })

            // a标签打开新页面
            const box$ = this.$refs.box as HTMLElement

            box$?.addEventListener(
                'click',
                (e: Event) => {
                    const target = e.target as HTMLElement

                    // a标签打开新的页面
                    if (target.nodeName.toLowerCase() === 'a') {
                        const uri = target.getAttribute('href') || ''
                        console.log(uri)

                        if (uri?.indexOf('http') > -1) {
                            e.preventDefault()
                            window.open(uri)
                        }
                    }
                    // 图片预览
                    if (target.nodeName.toLowerCase() === 'img') {
                        const uri = target.getAttribute('src') || ''
                        console.log(uri)
                        useImagePreview(uri)
                    }
                },
                false,
            )
        }, 100)
    }
}
</script>

<style lang="less" scoped>
.markdown-article__content {
    // width: calc(100% - 250px);
    // padding-left: 10px;
    &.showCatalog {
        width: calc(100% - 250px);
        padding-left: 10px;
    }
}
.markdown-article__catalog {
    width: 250px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #fff;
    overflow-y: auto;
}
.markdown-article__catalog-wrap {
    position: fixed;
    width: 250px;
    height: 70%;
    overflow-y: auto;
}
.markdown-article {
    position: relative;
    padding-bottom: 15px;
}
</style>
