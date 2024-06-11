<template>
    <el-drawer class="PipelineHistoryDrawer" :visible.sync="myVisible" :direction="direction" :append-to-body="true" size="100%" :modal-append-to-body="false" :close-on-press-escape="true">
        <div slot="title">
            <span class="headline">
                <span>构建记录-</span>
                <span v-text="title" class="sg-mr-5 title"></span>
            </span>

            <!-- <el-checkbox v-model="conditions.target" class="sg-ml-3" true-label="prd" false-label="">是否线上</el-checkbox> -->
            <el-select v-model="conditions.target" placeholder="请选择环境" class="sg-ml-3" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" @click="handleRun" class="sg-ml-3">立即构建</el-button>
            <el-button type="text" @click="gotoSettingsView" class="sg-ml-3">去设置</el-button>
        </div>
        <div class="body">
            <PipelineHistory :id="id" :pipeline="pipeline" @close="onClose" :conditions="conditions"></PipelineHistory>
        </div>
    </el-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PipelineHistory from '../PipelineHistory/index.vue'
import { PipelineLog, Pipeline } from '@/entry/devops/models'
import { getTargetOptions } from '@/entry/devops/views/devops/pipeline/components/helper'
import { PipelineService } from '@/entry/devops/api'

@Component({
    name: 'PipelineProjectDialog',
    components: {
        PipelineHistory,
    },
})
export default class PipelineProjectDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ type: Boolean }) visible!: boolean
    @Prop({
        default: () => {
            return null
        },
    })
    pipeline!: Pipeline
    direction = 'rtl'
    conditions = {
        target: '',
    }

    get myVisible() {
        return this.visible
    }
    set myVisible(val) {
        this.$emit('update:visible', val)
    }
    close() {
        this.myVisible = false
    }
    onClose() {
        //this.close()
    }
    gotoSettingsView() {
        //this.close()
        this.$router.push({
            path: `/devops/pipeline/${this.id}`,
            query: {
                //type: 'settings',
                _: this.title,
            },
        })
    }
    async handleRun() {
        const result = await this.$modalDialog(() => import(/* webpackChunkName: "PreDeployDialog" */ '../PreDeployDialog/index.vue'), {
            title: this.title,
            meta: {
                id: this.id,
            },
        })
        if (result) {
            this.close()
        }
    }
    // 环境列表
    options = []
    async mounted() {
        const id = this.id
        const { data } = await PipelineService.get({ id })
        const { target_urls, config } = data
        const triggers = config?.triggers
        const options = getTargetOptions({
            target_urls,
            triggers,
        })
        this.$set(this, 'options', options)
    }
}
</script>

<style lang="less" scoped>
.PipelineHistoryDrawer {
    .body {
        height: calc(100% - 5px);
        padding: 15px;
        padding-bottom: 5px;
    }
    .title {
        display: inline-block;
        // min-width: 220px;
    }
}

.PipelineHistoryDrawer ::v-deep {
    .headline {
        font-size: 16px;
        font-weight: bold;
    }
    .el-drawer__header {
        margin-bottom: 0px;
    }
    .el-drawer__body {
        height: calc(100% - 50px);
        // background: yellow;
    }
    .PipelineHistory {
        height: 100%;
        overflow-y: auto;
    }
}
</style>
