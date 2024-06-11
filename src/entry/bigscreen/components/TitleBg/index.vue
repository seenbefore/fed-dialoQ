<template>
    <div class="title-bg-class">
        <my-container :left="0" :top="-20">
            <img :src="titleImg" class="title-img-class" />
        </my-container>
        <my-container :left="1542" :top="18">
            <my-date />
        </my-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'ComTitleBg',
    components: {},
})
export default class ComTitleBg extends Vue {
    @Prop({ type: String, default: '' }) titleImg!: any
}
</script>

<style lang="less" scoped>
.title-bg-class {
    .title-img-class {
        width: 1920px;
        height: 107px;
    }
}
</style>
