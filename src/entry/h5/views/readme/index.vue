<!-- 文档 -->
<template>
    <div class="sg-page Readme">
        <DemoList></DemoList>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DemoList from './components/DemoList.vue'
@Component({
    name: 'Readme',
    components: {
        DemoList,
    },
})
export default class Readme extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.Readme ::v-deep {
}
</style>
