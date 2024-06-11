<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ElDescriptionsItem from '@/sharegood-ui/packages/base-form-details/components/el-descriptions-item/index'
import ElDescriptions from '@/sharegood-ui/packages/base-form-details/components/el-descriptions/index'

@Component({
    name: 'Preview',
    components: {
        ElDescriptions,
        ElDescriptionsItem,
    },
})
export default class Preview extends Vue {
    public formData: Record<string, any> = {}

    public created(): void {}

    public mounted(): void {}
}
</script>

<template>
    <div class="app-form-details__container reset-app-form-details__container app-descriptions__container">
        <div class="app-form-details__content reset-app-form-details__content">
            <ElDescriptions title="标题-1" column="1">
                <ElDescriptionsItem label="文本内容-2">
                    123
                </ElDescriptionsItem>

                <ElDescriptionsItem row-class-name="description__operations-item">
                    <div class="description__operations description__operations--right">
                        <div class="operations__btn">按钮</div>
                        <div class="operations__btn">按钮2</div>
                    </div>
                </ElDescriptionsItem>
            </ElDescriptions>
        </div>
    </div>
</template>

<style scoped lang="less">
@import '/src/sharegood-ui/packages/base-form-details/assets/app-descriptions.less';
@import '~@/entry/h5/styles/reset/app-form-details-reset.less';
</style>
