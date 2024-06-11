<!--  -->
<template>
    <ReadmeDemo class="sg-page Readme" v-bind="$route.params"></ReadmeDemo>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import ReadmeDemo from '@/components/ReadmeDemo/index.vue'

@Component({
    name: 'Readme',
    components: {
        ReadmeDemo,
    },
})
export default class Readme extends Vue {}
</script>

<style lang="less" scoped></style>
