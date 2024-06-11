<template>
    <div class="sg-page page-devops-pipeline-log-id sg-p-0" :class="currentModel.status" v-loading="loading">
        <div class="sg-card-header">
            <div class=" sg-flexbox  align-center">
                <div class="nav-back-button" @click="$router.go(-1)">
                    <svg-icon icon="mt-back"></svg-icon>
                    <span class="log-title sg-link">#{{ currentModel.logId }}</span>
                </div>

                <!-- <router-link
                    class="sg-link sg-ml-3"
                    :to="`/devops/pipeline/${currentModel.id}`"
                    v-text="currentModel.id"
                ></router-link> -->
                <span class="sg-ml-3" v-text="currentModel.message" style="color:red;"></span>
                <span class="sg-ml-3  sg-flexbox align-center global-status" v-if="currentModel.status" :class="currentModel.status">
                    <template v-if="currentModel.status === 'success'">
                        <svg-icon icon="mt-success" style="width:20px;height:20px;margin-right:5px;"></svg-icon>
                        <span>运行成功</span>
                    </template>
                    <template v-else-if="currentModel.status === 'pending'">
                        <svg-icon icon="mt-loading" class="animation spin" style="width:20px;height:20px;margin-right:5px;"></svg-icon>
                        <span>排队中</span>
                    </template>
                    <template v-else-if="currentModel.status === 'doing'">
                        <svg-icon icon="mt-loading" class="animation spin" style="width:20px;height:20px;margin-right:5px;"></svg-icon>
                        <span>运行中</span>
                    </template>
                    <template v-else-if="currentModel.status === 'error'">
                        <svg-icon icon="mt-error" style="width:20px;height:20px;margin-right:5px;"></svg-icon>
                        <span>运行失败</span>
                    </template>
                    <template v-else>
                        <svg-icon icon="mt-warning" style="width:20px;height:20px;margin-right:5px;"></svg-icon>
                        <span>运行终止</span>
                    </template>
                </span>
            </div>
            <div class="sg-flex-1"></div>
            <div>
                <el-button type="warning" icon="el-icon-remove" @click="cancel" v-if="isRuning">取消</el-button>
                <el-button type="primary" icon="el-icon-video-play" @click="run">运行</el-button>
            </div>
        </div>

        <div class="sg-card-body sg-py-3 ">
            <!-- <div class="code">
                <pre v-html="log"></pre>
            </div> -->
            <!-- 基础信息 -->
            <section class="side sg-mb-5">
                <sg-base-form :fields="fields" v-model="currentModel" label-width="70px"></sg-base-form>
            </section>
            <!-- 构建信息 -->
            <section class="main">
                <div class="sg-mb-2 sg-flexbox align-center">
                    <div class="sg-flex-1 " style="font-weight:bold;font-size:16px;">
                        构建信息
                    </div>
                    <a :href="`${VUE_APP_BASEURL_API}/pipeline-log/raw/${currentModel.pipelineId}/${currentModel.logId}`" target="_blank" class="sg-link">查看原始日志</a>
                </div>

                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item :name="item.name" v-for="(item, index) in currentModel.steps$" :key="index">
                        <template slot="title">
                            <div class="sg-flexbox headline align-center">
                                <div class="status" :class="item.status">
                                    <template v-if="item.status === 'success'">
                                        <svg-icon icon="mt-success2"></svg-icon>
                                    </template>
                                    <template v-else-if="item.status === 'doing'">
                                        <svg-icon icon="mt-loading2" class="animation spin"></svg-icon>
                                    </template>
                                    <template v-else-if="item.status === 'abort'">
                                        <svg-icon icon="mt-warning2"></svg-icon>
                                    </template>
                                    <template v-else-if="item.status === 'error'">
                                        <svg-icon icon="mt-error2"></svg-icon>
                                    </template>
                                    <template v-else>
                                        <svg-icon icon="mt-pending2"></svg-icon>
                                    </template>
                                </div>
                                <div class="title">{{ item.title }}</div>
                                <div class="time">{{ item.diff }}</div>
                            </div>
                        </template>
                        <div class="log">
                            <template v-if="item.list.length">
                                <pre class="wrap" v-html="item.list.join('')"></pre>
                            </template>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div class="sg-pt-1 sg-pb-1">
                    <span class="sg-ml-3" v-text="currentModel.errors" style="color:red;"></span>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import * as API from '@/entry/devops/api/index'
import { PipelineLog, PipelineStep } from '@/entry/devops/models'
import { bytesToSize } from 'icinfo-util'
import Polling from '@/scripts/utils/polling'
import * as $utils from '@/scripts/utils'
import { http } from '@/entry/devops/scripts/http'
import { formatCommands } from '@/entry/devops/utils'
import { getTargetOptions } from '@/entry/devops/views/devops/pipeline/components/helper'

const VUE_APP_BASEURL_API = process.env.VUE_APP_BASEURL_API
interface CurrentModel {
    steps$: PipelineStep[]
    [prop: string]: any
}
@Component({
    name: 'DevopsPipelineLogId',
    components: {},
})
export default class DevopsPipelineLogId extends Vue {
    @Prop() id!: string
    VUE_APP_BASEURL_API = VUE_APP_BASEURL_API
    loading = false
    // 轮训获取任务状态
    private polling!: Polling
    // 当前构建步骤
    private activeName = ''
    private steps: any = []
    private type = 'current'
    private timer: any
    private currentModel: CurrentModel = {
        id: '',
        message: '',
        steps$: [],
        url: '',
        description: '',
        errors: '',
        startTime: '',
        endTime: '',
        logId: '',
        status: '',
        pipelineId: '',
        triggerMessage: '',
        branch: '',
        target: '',
        createdAt: '',
        diff: '',
    }
    pipelineId = ''
    pipeline: any = {}
    @Watch('pipelineId', { immediate: true })
    async watch_pipelineId(val: any) {
        if (val) {
            const { data } = await API.PipelineService.get({
                id: val,
            })
            this.$set(this, 'pipeline', data)
        }
    }

    private FormView: any = {}
    private fields: FormRow[] = [
        // 基本信息
        {
            columns: [
                {
                    class: 'info',
                    span: 12,
                    label: '计划名称',
                    tag: 'slot',
                    name: '计划名称',
                    render: (h, { row }: { row: PipelineLog }) => {
                        return h(
                            'router-link',
                            {
                                props: {
                                    to: {
                                        path: `/devops/pipeline/${row.pipelineId}`,
                                        query: {
                                            _: row.name,
                                        },
                                    },
                                },
                                class: 'sg-link',
                            },
                            row.name,
                        )
                    },
                },
                {
                    class: 'info',
                    span: 6,
                    label: '构建信息',
                    tag: 'slot',
                    name: 'triggerMessage',
                    render: (h, { row }: { row: PipelineLog }) => {
                        return h('span', {}, row.user$?.name + '-' + row.triggerMessage)
                    },
                },
                {
                    class: 'info',
                    span: 6,
                    label: '开始时间',
                    tag: 'text',
                    name: 'createdAt',
                },

                {
                    class: 'info',
                    span: 12,
                    label: '制品信息',
                    tag: 'slot',
                    name: '制品信息',
                    render: (h, { row }: { row: PipelineLog }) => {
                        const artifact = row.artifact || {}
                        const name = artifact.name
                        const size = artifact.size + ''
                        const url = artifact.url
                        const folderSize = artifact.folderSize
                        const folderName = artifact.folderName
                        const result: any = []

                        if (size && name) {
                            result.push(
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: url,
                                            target: '_blank',
                                        },
                                        class: 'sg-link sg-mr-3',
                                    },
                                    `${name} ${bytesToSize(size)}`,
                                ),
                            )
                        }
                        if (folderName && folderSize) {
                            result.push(
                                h(
                                    'span',
                                    {
                                        attrs: {},
                                        class: 'sg-mr-3',
                                    },
                                    `${folderName} ${bytesToSize(folderSize + '')}`,
                                ),
                            )
                        }

                        return result
                    },
                },
                {
                    class: 'info',
                    span: 6,
                    label: '持续时间',
                    tag: 'text',
                    name: 'diff',
                },
                {
                    class: 'info',
                    span: 6,
                    label: '构建信息',
                    tag: 'slot',
                    name: 'branch',
                    render: (h, { row }: { row: PipelineLog }) => {
                        return h('span', {}, row.branch + ' → ' + row.target)
                    },
                },
                {
                    class: 'info',
                    span: 24,
                    label: '构建环境',
                    tag: 'slot',
                    name: '构建环境',
                    render: (h, { row }: { row: PipelineLog }) => {
                        let label = ''
                        const target = row.target
                        const target_urls = this.pipeline?.target_urls
                        const options = getTargetOptions({
                            target_urls,
                            triggers: row.config?.triggers,
                        })

                        const target$ = options.find(item => item.value === target)

                        if (target$) {
                            label = target$.label
                        } else {
                            label = target
                        }
                        return h('span', {}, label)
                    },
                },
                {
                    class: 'info',
                    span: 24,
                    label: '访问地址',
                    tag: 'slot',
                    render: (h, { row }: { row: PipelineLog }) => {
                        const { uat_urls = [] } = row

                        return uat_urls.map(item => {
                            return h(
                                'a',
                                {
                                    // props: {
                                    //     to: `${row.url}`,
                                    // },
                                    attrs: {
                                        href: `${item.url}`,
                                        target: '_blank',
                                    },
                                    class: 'sg-link',
                                },
                                item.name,
                            )
                        })
                    },
                },

                {
                    class: 'info',
                    span: 24,
                    label: '运行描述',
                    tag: 'text',
                    name: 'releaseTitle',
                    ifRender(model) {
                        return model['releaseTitle']
                    },
                },
                {
                    class: 'info info2',
                    span: 24,
                    label: '安装命令',
                    tag: 'slot',
                    render: (h, { row }: { row: PipelineLog }) => {
                        const installCommands = row.config?.installCommands || []

                        return installCommands.map(item => {
                            return h(
                                'span',
                                {
                                    // props: {
                                    //     to: `${row.url}`,
                                    // },
                                    class: 'sg-mr-2',
                                },
                                item,
                            )
                        })
                    },
                },
                {
                    class: 'info',
                    span: 24,
                    label: '构建命令',
                    tag: 'slot',
                    render: (h, { row }: { row: PipelineLog }) => {
                        const buildCommands = row.config?.buildCommands || []

                        const el = buildCommands.map((item: any) => {
                            return h(
                                'span',
                                {
                                    class: 'sg-link sg-mr-2',
                                },
                                formatCommands(item, row.config || {}),
                            )
                        })
                        return h(
                            'el-tooltip',
                            {
                                props: {
                                    //content: content,
                                    placement: 'top',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        class: '',
                                        slot: 'default',
                                    },
                                    el,
                                ),
                                h(
                                    'div',
                                    {
                                        slot: 'content',
                                    },
                                    buildCommands.join(' '),
                                ),
                            ],
                        )
                    },
                },
                {
                    class: 'info ',
                    span: 24,
                    label: '部署命令',
                    tag: 'slot',
                    render: (h, { row }: { row: PipelineLog }) => {
                        const deployCommands = row.config?.deployCommands || []
                        const el = deployCommands.map(item => {
                            return h(
                                'span',
                                {
                                    class: 'sg-link sg-mr-2',
                                },
                                formatCommands(item, row.config || {}),
                            )
                        })

                        return h(
                            'el-tooltip',
                            {
                                props: {
                                    //content: content,
                                    placement: 'top',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        class: '',
                                        slot: 'default',
                                    },
                                    el,
                                ),
                                h(
                                    'div',
                                    {
                                        slot: 'content',
                                    },
                                    deployCommands.join(' '),
                                ),
                            ],
                        )
                    },
                },
                {
                    class: 'info',
                    span: 24,
                    label: '详细配置',
                    tag: 'slot',
                    render: (h, { row }: { row: PipelineLog }) => {
                        return h(
                            'el-tooltip',
                            {
                                props: {
                                    //content: content,
                                    placement: 'top',
                                },
                            },
                            [
                                h(
                                    'span',
                                    {
                                        class: 'sg-link',
                                        slot: 'default',
                                    },
                                    `点击查看`,
                                ),
                                h(
                                    'div',
                                    {
                                        slot: 'content',
                                    },
                                    JSON.stringify(row.config),
                                ),
                            ],
                        )
                    },
                },
            ],
        },
    ]

    // 是否运行中
    get isRuning() {
        return this.currentModel.status === 'doing' || this.currentModel.status === 'pending'
    }
    // 更新构建信息
    updateInfo(row: PipelineLog, log: any = '') {
        const { createdAt, steps$ = [], ...rest } = row

        steps$.forEach((item: any) => {
            const { endTime, startTime, content } = item
            if (endTime) {
                item.diff = $utils.formatSeconds(endTime / 1000 - startTime / 1000)
            }
            if (content) {
                item.content = content
                    .replace(/(?:\r\n?|\n).*\u001b\[0K/g, '')
                    .replace(/^.*\u001b\[0J/gm, '')
                    .replace(/\u001b\[\d*D/gm, '\n')
                //item.content = content.replace(/\r/gi, '<br>')
            }
            item.list = []
            return item
        })
        try {
            this.renderLog(log, steps$)
        } catch (error) {
            console.error(error)
        }

        Object.assign(this.currentModel, {
            createdAt: $utils.dateFormat(new Date(createdAt), 'YYYY-MM-DD HH:mm:ss'),
            steps$,
            ...rest,
        })
    }
    // 任务是否已结束
    doNext(status: any): boolean {
        if (status === 'success' || status === 'error' || status === 'abort') {
            return false
        }
        return true
    }
    // 轮询请求日志状态
    async tick() {
        try {
            const res = await API.PipelineLogService.get({
                id: this.id,
            })
            const logId = res.data.logId
            const pipelineId = res.data.pipelineId
            this.pipelineId = pipelineId
            const { status } = res.data
            let log = ''
            if (status != 'pending') {
                try {
                    const { data } = await http.get(`pipeline-log/raw/${pipelineId}/${logId}`, {
                        exNoErrorMassage: true,
                    })
                    log = data
                } catch (error) {}
            }

            this.updateInfo(res.data, log)
            if (status === 'error' || status === 'abort') {
                this.stop(status)
            }
            // 如果任务已结束则
            return this.doNext(status)
        } catch (err) {
            console.log('轮询', err)
            this.currentModel.status = 'error'
            // 终止
            return false
        }
    }
    // 取消构建
    async cancel() {
        const { id } = this.currentModel
        this.stop('abort')
        this.currentModel.status = 'abort'
        await API.PipelineLogService.cancel({
            id,
        })
        await this.tick()
    }
    // 停止轮训并修改构建状态
    stop(status?: string) {
        const { steps$ = [] } = this.currentModel

        steps$.forEach(item => {
            if (item.status === 'doing') {
                if (status) {
                    item.status = status
                } else {
                    item.status = 'pending'
                }
            }
        })
        this.polling && this.polling.stop && this.polling.stop()
        this.stopTimer()
    }
    startTimer() {
        const { startTime } = this.currentModel

        this.timer = setInterval(() => {
            const now = new Date().valueOf()

            this.currentModel.diff = $utils.formatSeconds(now / 1000 - startTime / 1000)
            //console.log(1, now, startTime, this.currentModel.diff)
        }, 1000)
    }
    stopTimer() {
        clearInterval(this.timer)
        this.timer = null
    }
    // 构建
    run() {
        const id = this.currentModel.pipelineId
        this.$modalDialog(() => import(/* webpackChunkName: "PreDeployDialog" */ '../../pipeline/components/PreDeployDialog/index.vue'), {
            meta: {
                id,
            },
        })
    }
    // TODO 代码来源老蜻蜓 有待优化
    renderLog(log: any, steps: PipelineStep[] = []) {
        log = log
            .replace(/(?:\r\n?|\n).*\u001b\[0K/g, '')
            .replace(/^.*\u001b\[0J/gm, '')
            .replace(/\u001b\[\d*D/gm, '\n')

        let stageError
        let stepIndex = -1
        let stepError

        let step: any
        for (var pos = 0; pos < log.length; ) {
            var prefixLength = log.startsWith('\n#! ', pos) ? 4 : log.startsWith('#! ', pos) ? 3 : log.startsWith('\n\n#! ', pos) ? 5 : 0
            if (prefixLength) {
                var start = pos + prefixLength
                var end = log.indexOf('\n', start)
                if (end < 0) end = log.length
                if (log.startsWith('STEP ', start)) {
                    var line = log.substring(start + 'STEP '.length, end)
                    // console.log(11111111111, line)

                    step = steps.find(item => item.title === line)
                    pos = end + 1
                    stepError = false
                    stepIndex++
                    continue
                }
                if (log.startsWith('STEPEND ', start)) {
                    var line = log.substring(start + 'STEPEND '.length, end)
                    pos = end + 1

                    var time = +line
                    if (time) {
                        const time$ = time > 60 ? Math.floor(time / 60) + 'min' + Math.floor(time % 60) + 's' : time >= 1 ? Math.floor(time) + 's' : Math.floor(time * 1000) + 'ms'
                        // console.log(time$)
                    }
                    continue
                }
                if (log.startsWith('STEPERROR ', start)) {
                    var line = log.substring(start + 'STEPERROR '.length, end)
                    pos = end + 1
                    stageError = stepError = true

                    continue
                }
                if (log.startsWith('STAGE ', start)) {
                    var line = log.substring(start + 'STAGE '.length, end)
                    pos = end + 1

                    var parts = line.split(' | ', 2)
                    if (parts.length > 1) {
                        console.log(2, parts[1])
                    } else {
                    }

                    stageError = false
                    continue
                }
            }
            var left = pos
            var right = pos
            while (pos < log.length) {
                var code = log.charCodeAt(pos)
                if (code === 0x001b && log.charCodeAt(pos + 1) === 91) {
                    pos += 2
                    do {
                        var dights = ''
                        for (; pos < log.length && log.charCodeAt(pos) >= 48 && log.charCodeAt(pos) < 58; pos++) {
                            dights += log.charAt(pos)
                        }
                    } while (log.charCodeAt(pos++) === 59)
                    break
                }
                if (code === 8) {
                    do {
                        pos++
                        right--
                    } while (log.charCodeAt(pos) === 8)
                    break
                }
                pos++
                right++
                if (code === 13) {
                    if (log.charCodeAt(pos) === 10) {
                        pos++
                        right++
                    }
                    break
                }
                if (code === 10) {
                    break
                }
            }
            if (left < right) {
                var data = log.substring(left, right).replace(/\r$/, '\n')
                if (step && step.list.length < 150) {
                    step.list.push(data)
                }
            }
        }
    }
    async mounted() {
        try {
            this.loading = true
            const doNext = await this.tick()
            // 如果没结束则开始持续请求
            if (doNext) {
                this.polling = new Polling(this.tick.bind(this))
                this.polling
                    .tick()
                    .then(() => {
                        this.stopTimer()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                this.startTimer()
                this.$once('hook:beforeDestroy', () => {
                    this.stop()
                    this.stopTimer()
                })
            } else {
                const { startTime, endTime } = this.currentModel
                this.currentModel.diff = $utils.formatSeconds(endTime / 1000 - startTime / 1000)
            }
        } catch (err) {
        } finally {
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
pre.wrap {
    word-break: break-word;
    white-space: pre-wrap;
}
.page-devops-pipeline-log-id ::v-deep {
    .el-collapse-item__content {
        padding-bottom: 0;
    }
    .global-status {
        font-size: 14px;

        &.success {
            color: #8cc04f;
        }
        &.error {
            color: #f5222d;
        }
        &.doing {
            color: #208fee;
        }
        &.abort {
            color: rgb(255, 194, 41);
        }
        &.pending {
            color: #999;
        }
    }
    .headline {
        width: 100%;
    }
    .title {
        font-size: 14px;
        margin-left: 10px;

        flex: 1;
    }
    .status {
        width: 50px;
        height: 100%;
        text-align: center;

        .svg-icon {
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }
        &.success {
            background-color: rgb(58, 194, 125);
            color: #fff;
        }
        &.abort {
            background-color: rgb(255, 194, 41);
            color: #fff;
        }
        &.pending {
            background-color: rgb(195, 202, 213);
            color: #fff;
        }
        &.error {
            background-color: rgb(255, 96, 70);
            color: #fff;
        }
        &.doing {
            background-color: #208fee;
            color: #fff;
            i {
                animation: spin 1s linear infinite;
            }
        }
    }

    .info {
        .el-form-item {
            margin-bottom: 0px;
        }
        .el-form-item__label {
            color: #8c8c8c;
        }
    }
    .log {
        padding: 10px;
        color: #f5f5f5;
        font-size: 12px;
        white-space: pre-wrap;
        background-color: #333;
    }
    .el-form-item__content,
    .el-form-item__label {
        line-height: 24px !important;
    }
}
</style>
