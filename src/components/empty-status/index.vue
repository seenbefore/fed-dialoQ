<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'EmptyStatus',
})
export default class EmptyStatus extends Vue {
    @Prop({ type: String, default: '' })
    public text!: string
}
</script>

<template>
    <div class="empty-status__container flex-center">
        <div class="empty-status__content flex-center">
            <img class="empty-status__empty-img" src="../../assets/images/empty.svg" alt="空" />
            <span class="empty-status__empty-text">
                {{ text }}
                <slot></slot>
            </span>
        </div>
    </div>
</template>

<style scoped lang="less">
.empty-status {
    &__container {
        width: 100%;
        height: 100%;
        min-height: 260px;
    }

    &__empty-img {
        width: 64px;
        height: 64px;
    }

    &__empty-text {
        color: var(--color-text-secondary);
        font-family: 'PingFang SC';
        font-size: 14px;
        font-weight: 400;
    }
}
</style>
