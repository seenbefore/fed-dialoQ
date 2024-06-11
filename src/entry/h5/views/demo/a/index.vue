<template>
    <div class="sg-page DemoA">
        <span>DemoA</span>

        <van-empty description="描述文字" />
        11
        <van-empty description="描述文字" />

        22
        <van-empty description="描述文字" />
        <router-link to="/demo/b">URL 跳转</router-link>
        <van-empty description="描述文字" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'DemoA',
    components: {},
})
export default class DemoA extends Vue {
    mounted() {
        console.log('aaaaa')
    }
}
</script>

<style lang="less" scoped></style>
