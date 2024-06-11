<template>
    <div class="sg-page page-devops-pipeline-id sg-p-0 column">
        <div class="sg-flexbox align-center sg-mb-3 header">
            <div class="sg-flex-1 sg-flexbox align-center">
                <div class="nav-back-button sg-mr-7" @click="goBack">
                    <svg-icon icon="mt-back"></svg-icon>
                    <span class="sg-card-title1 sg-link" v-text="pipelineName"></span>
                </div>

                <div class="sg-mr-7" style="background-color:#dadfe6;height:16px;width:2px;"></div>
                <el-tabs v-model="type">
                    <el-tab-pane label="构建配置" name="settings"></el-tab-pane>
                    <el-tab-pane label="构建历史" name="history"></el-tab-pane>
                    <!-- <el-tab-pane label="成员管理" name="member"></el-tab-pane>
                    <el-tab-pane
                        label="通知提醒"
                        name="notification"
                    ></el-tab-pane> -->
                    <el-tab-pane label="版本日志" name="changelog"></el-tab-pane>
                </el-tabs>
            </div>
            <el-button type="primary" @click="run" class="sg-ml-3" icon="el-icon-video-play">立即构建</el-button>
        </div>
        <div class="pipeline-main">
            <component :is="currentComponent.name" v-bind="currentComponent.attrs"></component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { tagsViewStore } from '@/entry/devops/store/useStore'
@Component({
    name: 'DevopsPipelineId',
    components: {},
})
export default class DevopsPipelineId extends Vue {
    @Prop() private id!: string
    type = 'settings'
    pipelineName = ''
    goBack() {
        tagsViewStore.goBack({
            fullPath: this.$route.fullPath,
            $router: this.$router,
        })
    }

    get currentComponent() {
        if (this.type === 'changelog') {
            return {
                name: () => import('../components/PipelineChangelog/index.vue'),
                attrs: {
                    id: this.id,
                    isEdit: true,
                },
            }
        }
        if (this.type === 'notification') {
            return {
                name: () => import('../components/PipelineNotification/index.vue'),
                attrs: {
                    id: this.id,
                },
            }
        }
        if (this.type === 'history') {
            return {
                name: () => import('../components/PipelineHistory/index.vue'),
                attrs: {
                    id: this.id,
                    height: 'auto',
                },
            }
        }
        if (this.type === 'member') {
            return {
                name: () => import('../components/PipelineMember/index.vue'),
                attrs: {
                    id: this.id,
                },
            }
        }
        return {
            name: () => import('../components/PipelineForm/index.vue'),
            attrs: {
                meta: {
                    id: this.id,
                },
                isEdit: true,
            },
        }
    }
    // 构建
    run() {
        const id = this.id
        this.$modalDialog(() => import(/* webpackChunkName: "PreDeployDialog" */ '../components/PreDeployDialog/index.vue'), {
            meta: {
                id,
            },
        })
    }
    async created() {
        try {
            const { data } = await API.PipelineService.get({
                id: this.id,
            })
            this.pipelineName = data.name
        } catch (error) {}
    }
    mounted() {
        const type: any = this.$route.query.type
        if (type) {
            this.type = type
        }
    }
}
</script>

<style lang="less" scoped>
.page-devops-pipeline-id ::v-deep {
    .el-tabs__header {
        margin: 0;
    }
    .el-tabs__nav-wrap::after {
        display: none;
    }
    .el-tabs__item {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
    }

    .header {
        border-bottom: solid 1px #e6e6e6;
        padding: 0 20px;
    }
    .pipeline-main {
        padding: 0px 12px;
        height: calc(100% - 60px);
        overflow-y: auto;
    }
}
</style>
