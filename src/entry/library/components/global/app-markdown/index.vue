<template>
    <div class="my-md">
        <div v-html="myValue" v-if="myValue" v-highlight class="markdown-body element-doc"></div>
    </div>
</template>

<script lang="ts">
//import 'github-markdown-css/github-markdown.css'
import { Component, Vue, Prop } from 'vue-property-decorator'
/* eslint-disable */
const md = require('markdown-it')()
@Component({
    name: 'AppMarkdown',
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
}
</script>

<style lang="less" scoped></style>
