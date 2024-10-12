<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'IconButton',
})
export default class IconButton extends Vue {
    @Prop({ type: String })
    public icon!: string
}
</script>

<template>
    <el-button class="icon-button__btn base__el-button" v-bind="$attrs" v-on="$listeners" icon="">
        <SvgIcon v-if="icon" class="icon-button__icon" :icon="icon"></SvgIcon>
        <slot></slot>
    </el-button>
</template>

<style scoped lang="less">
.icon-button {
    &__icon {
        margin-right: 5px;
    }
}
</style>
