<template>
    <div class="square">
        <MyNav></MyNav>

        <router-view :key="key"></router-view>
        <footer></footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyNav from '@/entry/library/components/my-nav/index.vue'

@Component({
    components: {
        MyNav,
    },
})
export default class Index extends Vue {
    get key() {
        const meta = this.$route.meta || {}
        const { fullPath, path, name } = this.$route
        console.log(`key`, path, name)

        if (['Community'].includes(name!)) {
            return name
        } else {
            return fullPath
        }
    }
}
</script>

<style lang="less">
.base-info-actions {
    display: flex;
}
</style>
