<template>
    <div class="my-layout" :style="style">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MyLayout',
    components: {},
})
export default class MyLayout extends Vue {
    @Prop() style!: any
    // get myClass() {
    //     if (this.style) {
    //         return 'abs'
    //     }
    //     return ''
    // }
}
</script>

<style lang="less" scoped>
.my-layout {
}
</style>
