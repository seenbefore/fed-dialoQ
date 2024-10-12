<script lang="ts">
import CustomBreadcrumb from '@/components/custom-breadcrumb/index.vue'
import { settingsStore } from '@/store/useStore'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'FormWrapper',
    components: { CustomBreadcrumb },
    inheritAttrs: true,
})
export default class FormWrapper extends Vue {
    @Prop({ type: String, default: '/' })
    public separator!: string

    @Prop({ type: Array, default: () => [] })
    public breadcrumbs!: Array<ICustomBreadcrumbItem | string>

    @Prop({ type: Function })
    public back!: () => void

    @Prop({ type: String })
    public backPath!: string

    public get isThirdParty() {
        return settingsStore.isThirdParty
    }

    public get noMargin() {
        return settingsStore.noMargin
    }
}
</script>

<template>
    <div class="sg-page form-wrapper__container" :class="isThirdParty && noMargin ? 'no-margin__container' : ''">
        <div class="form-wrapper__header">
            <CustomBreadcrumb :separator="separator" :breadcrumbs="breadcrumbs" :back-path="backPath" :back="back"></CustomBreadcrumb>
        </div>
        <div class="form-wrapper__body">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" class="form-wrapper__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.form-wrapper {
    &__container {
        height: 100%;
        /* 覆盖sg-page的样式 */
        display: flex !important;
        flex-direction: column;
        overflow: hidden;
        /* 覆盖sg-page的样式 */
        padding: 0 !important;
    }

    &__body {
        flex: 1;
        overflow: auto;
        padding: 12px 20px;
    }

    &__footer {
        padding-bottom: 16px;
    }
}

.no-margin__container {
    .form-wrapper__header {
        .enforce-breadcrumb__container {
            padding: 0;
        }
    }

    .form-wrapper__body {
        padding: 16px 0;
    }
}
</style>
