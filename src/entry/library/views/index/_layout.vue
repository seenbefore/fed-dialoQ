<template>
    <div class="square">
        <MyNav></MyNav>
        <MySecretary></MySecretary>
        <router-view :key="key"></router-view>
        <footer></footer>
    </div>
</template>

<script lang="ts">
import MyNav from '@library/components/my-nav/index.vue'
import MySecretary from '@library/components/my-secretary/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        MyNav,
        MySecretary,
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
