<template>
    <div class="my-md element-doc">
        <div v-html="myValue" v-if="myValue" v-highlight class="markdown-body"></div>
        <div v-highlight>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
//import 'github-markdown-css/github-markdown.css'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
const md = require('markdown-it')()
import '@/components/directives/highlight'
@Component({
    name: 'MyMd',
    components: {},
})
export default class MyMd extends Vue {
    @Prop() value!: string
    // @Watch('value')
    // myValue(val: any) {
    //     console.log(11, val)
    // }
    get myValue() {
        if (this.value) {
            return md.render(this.value)
        }

        return ''
    }
    created() {}
    mounted() {
        this.$once('hook:beforeDestroy', () => {
            //delete Vue.options.directives.highlight
        })
    }
}
</script>

<style lang="less" scoped></style>
