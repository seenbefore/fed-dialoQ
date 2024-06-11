<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    components: {},
})
export default class App extends Vue {
    async created() {
        //await Todo.getAllTodoItems()
        // 接收其他应用的消息，如果是退出则主动操作退出
    }
}
</script>
<style lang="less"></style>
