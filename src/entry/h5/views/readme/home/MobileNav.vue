<template>
    <van-collapse v-model="active" :border="false" class="mobile-nav">
        <van-collapse-item class="mobile-nav__item" :title="group.groupName" :name="group.groupName">
            <van-icon :name="group.icon" slot="right-icon" class="mobile-nav__icon" />
            <template v-for="(navItem, index) in group.list">
                <van-cell v-if="!navItem.disabled" :key="index" :to="navItem.path" :title="navItem.title" is-link />
            </template>
        </van-collapse-item>
    </van-collapse>
</template>

<script>
export default {
    props: {
        base: {
            type: String,
            default: '',
        },
        group: {
            type: Object,
            default: () => ({}),
        },
        activeKeys: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            active: this.activeKeys,
        }
    },
}
</script>

<style lang="less">
.mobile-nav {
    &__item {
        margin-bottom: 16px;
    }

    &__icon {
        font-size: 24px;

        img {
            width: 100%;
        }
    }

    .van-collapse-item__content {
        padding: 0;
    }

    .van-collapse-item__title {
        font-size: 16px;
        font-weight: 500;
        line-height: 40px;
        align-items: center;
        border-radius: 2px;
    }
}
</style>
