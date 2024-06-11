<template>
    <div class="sg-page DemoAa">
        <span>DemoAa 是</span>
        <el-button type="primary" @click="go">返回</el-button>
        <el-button type="primary" @click="$router.push('/demo/bb')">bb</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'DemoAa',
    components: {},
})
export default class DemoAa extends Vue {
    go() {
        //this.$router.go(-1)
        history.go(-1)
    }
    mounted() {
        console.log(1212, this)
        console.log(window)
        try {
            if (window == window.parent) {
                console.log(111)
            } else {
                console.log(222)
            }
        } catch (error) {
            console.log(3333)
        }
    }
}
</script>

<style lang="less" scoped></style>
