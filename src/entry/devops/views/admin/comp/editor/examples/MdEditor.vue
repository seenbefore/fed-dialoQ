<template>
    <div class="">
        <a class="sg-link" href="https://blog.csdn.net/cnds123321/article/details/109112408" target="_blank">API参考地址</a>
        <mavon-editor v-model="content"></mavon-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class MavonEditorDemo extends Vue {
    content = '# title'

    mounted() {}
}
</script>

<style lang="less" scoped></style>
