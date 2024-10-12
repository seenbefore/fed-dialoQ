<script lang="ts">
import { settingsStore } from '@/store/useStore'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'TableWrapper',
})
export default class TableWrapper extends Vue {
    public get hasMiddle() {
        return !!this.$slots.middle
    }

    public get isThirdParty() {
        return settingsStore.isThirdParty
    }

    public get noMargin() {
        return settingsStore.noMargin
    }
}
</script>

<template>
    <div class="table-wrapper__container sg-page sg-p-0 icinfo-ai" :class="isThirdParty && noMargin ? 'no-margin__container' : ''">
        <div class="table-wrapper__content">
            <div :class="['table-wrapper__search', hasMiddle && 'table-wrapper__search--middle']">
                <slot name="search"></slot>
            </div>
            <div :class="hasMiddle && 'table-wrapper__middle'">
                <slot name="middle"></slot>
            </div>
            <div class="table-wrapper__table">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.table-wrapper {
    &__content {
        padding: 16px 20px;
    }

    &__search {
        margin-bottom: 8px;
    }

    &__search--middle {
        margin-bottom: 4px;
    }

    &__middle {
        margin-bottom: 4px;
    }
}

.no-margin__container {
    .table-wrapper__content {
        padding: 0;
    }
}
</style>
