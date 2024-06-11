<template>
    <div class=""></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'MyTitle',
    components: {},
})
export default class MyTitle extends Vue {
    @Prop() value!: string
    @Watch('value', { immediate: true })
    watchValue(val: any) {
        if (val) {
            document.title = this.value
        }
    }
}
</script>

<style lang="less"></style>
