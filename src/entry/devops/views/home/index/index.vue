<template>
    <div class="next-container HomeIndex">
        <div class="sg-card shortcut">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">快捷访问</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HomeIndex',
    components: {},
})
export default class HomeIndex extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped>
.HomeIndex {
    padding: 20px 0;
}
</style>
