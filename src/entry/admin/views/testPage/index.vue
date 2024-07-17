<script lang="ts">
import { userStore } from '@admin/store/useStore'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'TestPage',
})
export default class TestPage extends Vue {
    public get store() {
        return userStore
    }
}
</script>

<template>
    <div class="sg-page">这是一个test页面--{{ store.info }}</div>
</template>

<style scoped lang="less"></style>
