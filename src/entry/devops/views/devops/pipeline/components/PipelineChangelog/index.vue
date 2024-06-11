<template>
    <div class="PipelineChangelog">
        <div class="sg-mb-3">
            <a :href="gitUrl + '/-/tags/'" class="sg-link" target="_blank">{{ gitUrl + '/-/tags/' }}</a>
        </div>

        <template v-if="list.length">
            <div class="mw-timeline mw-timeline--justified">
                <div class="mw-timeline__items" v-for="(item, index) in list" :key="index">
                    <div class="mw-timeline__marker"></div>
                    <div class="mw-timeline__item mw-timeline__item--left">
                        <div class="mw-timeline__item-circle">
                            <div class="kt-bg-danger"></div>
                        </div>
                        <div class="mw-timeline__item-time text-primary">
                            {{ item.createdAt$ }}
                            <span class="sg-ml-3 sg-link">{{ item.user$ ? item.user$.name : item.userId }}</span>
                        </div>
                        <div class="mw-timeline__item-content hover-shadow-5">
                            <div class="mw-timeline__item-title">
                                {{ item.releaseTitle }}
                            </div>
                            <div class="mw-timeline__item-body">
                                <div class="soft-markdown-content">
                                    <MyMd :value="item.releaseContent"></MyMd>
                                </div>
                                <div>
                                    <a :href="item.tagUrl" class="sg-link" target="_blank" v-if="item.tagUrl">{{ item.tagUrl }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <Empty :tip="''"></Empty>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { PipelineLog } from '@/entry/devops/models'
import * as $utils from '@/scripts/utils'
import Empty from '@/entry/devops/components/empty/index.vue'
import { formatDate } from '@/scripts/utils/time'

@Component({
    components: {
        Empty,
    },
})
export default class PipelineChangelog extends Vue {
    /**
     * 流水线id
     */
    @Prop() id!: string
    gitUrl = ''
    private list: PipelineLog[] = []
    async created() {
        const id = this.id
        const res = await API.PipelineService.get({
            id,
        })
        const pipeline = res.data || {}
        const resposity = pipeline.config?.resposity || ''
        this.gitUrl = resposity
            .replace(':', '/')
            .replace('git@', 'http://')
            .replace('.git', '')
        const { data } = await API.PipelineLogService.list({
            pageSize: 100,
            conditions: {
                pipelineId: id,
                status: 'success',
                target: 'prd',
            },
        })
        this.list = data.list.map(item => {
            let { createdAt } = item

            item.createdAt$ = $utils.dateFormat(new Date(createdAt), 'YYYY-MM-DD HH:mm:ss')

            return item
        })
    }

    mounted() {}
}
</script>
<style lang="less" scoped>
.PipelineChangelog {
    position: relative;
}
.hover-shadow-5:hover,
.shadow-5 {
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.06);
}
.kt-bg-danger {
    background-color: #ff4954;
}
.mw-timeline {
    position: relative;
    width: 100%;
    z-index: 2;
}

.mw-timeline:after {
    content: '';
    position: absolute;
    width: 5px;
    top: 0;
    margin-top: 0.1rem;
    bottom: 3rem;
    left: 50%;
    margin-left: -2.5px;
    background-color: #e6eaf5;
}

.mw-timeline.mw-timeline--center {
    margin: 0 auto;
}

.mw-timeline .mw-timeline__items {
    padding-bottom: 6rem;
    position: relative;
}

.mw-timeline .mw-timeline__items .soft-markdown-content p {
    font-size: 14px;
}

.mw-timeline .mw-timeline__items .soft-markdown-content ol {
    list-style: decimal;
}

.mw-timeline .mw-timeline__items .soft-markdown-content ul {
    list-style: circle;
}

.mw-timeline .mw-timeline__items .soft-markdown-content ol,
.mw-timeline .mw-timeline__items .soft-markdown-content ul {
    padding-left: 30px;
}

.mw-timeline .mw-timeline__items .mw-timeline__marker {
    width: 20px;
    height: 5px;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    background-color: #e6eaf5;
}

.mw-timeline .mw-timeline__items .mw-timeline__item {
    position: relative;
    margin-left: 0;
    width: 50%;
    min-height: 3rem;
}

.mw-timeline .mw-timeline__items .mw-timeline__item p {
    color: #979b9e;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-arrow {
    color: #f7f8fc;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-circle {
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-circle > div {
    border-radius: 50%;
    width: 6px;
    height: 6px;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-time {
    position: absolute;
    display: inline-block;
    margin-top: -2.14rem;
    font-weight: 700;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-time > span {
    padding-left: 5px;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-content {
    position: relative;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid hsla(210, 8%, 51%, 0.09);
    background-color: #fff;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-content .mw-timeline__item-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(25, 137, 250, 1);
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-content .mw-timeline__item-actions,
.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-content .mw-timeline__item-title + .mw-timeline__item-body {
    margin-top: 1rem;
}

.mw-timeline .mw-timeline__items .mw-timeline__item .mw-timeline__item-content .mw-timeline__item-desc {
    color: #74788d;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--left {
    left: 0;
    padding-right: 2.85rem;
    position: relative;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--left .mw-timeline__item-circle {
    right: -10px;
    top: 20px;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--left .mw-timeline__item-time {
    right: 3.8rem;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--left:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 15px;
    left: 100%;
    margin-left: -3rem;
    border: 17px solid transparent;
    border-left: 10px solid #f7f8fc;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--right {
    left: 50%;
    padding-left: 2.86rem;
    top: -3.5rem;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--right .mw-timeline__item-circle {
    top: 20px;
    left: -10px;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--right .mw-timeline__item-time {
    left: 3.57rem;
}

.mw-timeline .mw-timeline__items .mw-timeline__item.mw-timeline__item--right:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 15px;
    right: 100%;
    margin-right: -3rem;
    border: 17px solid transparent;
    border-right: 10px solid #f7f8fc;
}

.mw-timeline.mw-timeline--justified:after {
    left: 0;
    bottom: 0;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items {
    position: static;
    margin-bottom: 0px;
    padding: 10px 0;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__marker {
    left: 0;
    top: 0;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item {
    width: 100%;
    top: 0 !important;
    left: 0 !important;
    margin-top: 30px !important;
    padding-left: 2.25rem;
    padding-right: 0;
    position: relative;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item:after,
.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 20px;
    left: 0;
    margin-left: 9px;
    border: 17px solid transparent;
    border-right: 13px solid #fff;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item:before {
    border-right: 13px solid #9d9d9d;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item .mw-timeline__item-time {
    position: absolute;

    margin-top: -2.14rem;
    right: 100%;
    left: 2.8rem;
    min-width: 250px;
}

.mw-timeline.mw-timeline--justified .mw-timeline__items .mw-timeline__item .mw-timeline__item-circle {
    left: -10px;
    top: 26px;
}
</style>
