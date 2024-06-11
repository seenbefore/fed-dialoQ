<!--  -->
<template>
    <div class="" style="padding-left:2px;padding-top:10px;">
        <div class="mw-timeline mw-timeline--justified">
            <div class="mw-timeline__items" v-for="(item, index) in list" :key="index">
                <div class="mw-timeline__item mw-timeline__item--left">
                    <div class="mw-timeline__item-circle"></div>
                    <div class="mw-timeline__item-time">
                        {{ item.examineTime || '-' }}
                    </div>
                    <div class="mw-timeline__item-content">
                        <div class="mw-timeline__item-title">
                            {{ item.processNodes }}
                        </div>
                        <div class="mw-timeline__item-body">
                            {{ item.examineUserName }}
                            <span class="my-process-tag" :class="item.dealStatus$.class" v-if="item.dealStatus$">{{ item.dealStatus$.label }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormRef, FormRow } from '@/sharegood-ui'
import { getApprovalLogList, ApprovalLogVo } from '@/entry/third/services/auto/workExamine'
import { Dict } from '@/entry/third/dict'

interface FormModel {
    name?: string
}
@Component({
    name: 'FlowDialog',
    components: {},
})
export default class FlowDialog extends Vue {
    formModel = {}
    list: ApprovalLogVo[] = []

    async created() {
        const { data } = await getApprovalLogList({ instanceId: this.instanceId })
        this.list = [...data].map(item => {
            return {
                ...item,
                dealStatus$: Dict.getOption('dealStatus', item.dealStatus),
            }
        })
    }

    @Prop({ type: String }) instanceId!: string
}
</script>

<style lang="less" scoped>
.my-process-tag {
    padding: 0 8px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    display: inline-block;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;

    &.success {
        background: #70c067;
    }
    &.info {
        background: #868686;
    }
    &.danger {
        background: #f56a6a;
    }
    &.warning {
        background: #faad14;
    }
}
</style>
