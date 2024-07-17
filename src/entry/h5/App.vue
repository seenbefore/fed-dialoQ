<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { useConsole } from '@@core/common/hooks/useConsole'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class App extends Vue {
    public created() {
        const { init } = useConsole()
        init()
    }
}
</script>
