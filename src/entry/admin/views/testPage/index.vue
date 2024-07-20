<script lang="ts">
import { appStore, settingsStore, tagsViewStore, userStore } from '@admin/store/useStore'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'TestPage',
})
export default class TestPage extends Vue {
    public get store() {
        return {
            appStore,
            settingsStore,
            tagsViewStore,
            userStore,
        }
    }
}
</script>

<template>
    <div class="sg-page">
        这是一个test页面
        <div>
            <p>appStore</p>
            <p>{{ store.appStore.sidebar }}</p>
        </div>
        <div>
            <p>settingsStore</p>
            <p>{{ store.settingsStore.theme }}</p>
        </div>
        <div>
            <p>tagsViewStore</p>
            <p>{{ store.tagsViewStore.cachedViews }}</p>
        </div>
        <div>
            <p>userStore</p>
            <p>{{ store.userStore.info }}</p>
            <p>token: {{ store.userStore.token }}</p>
        </div>
    </div>
</template>

<style scoped lang="less"></style>
