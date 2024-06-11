<template>
    <div class="PipelineHistory" style="height:100%">
        <sg-data-view :columns="columns" :load="load" ref="tableRef" :page-action-layout="[]" height="100%"></sg-data-view>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { PipelineLog, Pipeline } from '@/entry/devops/models'
import * as Utils from '@/scripts/utils'
import { renderPipelineStatus } from '../../helper'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'
import { bytesToSize } from 'icinfo-util'
import { clipboard } from '@/scripts/utils'
import { getTargetOptions } from '../helper'

const VUE_APP_BASEURL_API = process.env.VUE_APP_BASEURL_API
@Component({})
export default class PipelineLogHistory extends Vue {
    @Prop({
        default: () => {
            return {}
        },
    })
    meta!: any
    @Prop({
        default: () => {
            return null
        },
    })
    pipeline!: Pipeline
    @Prop() id!: string
    @Prop({
        default: () => {
            return {}
        },
    })
    conditions!: any

    @Watch('conditions', { deep: true })
    watchConditions(val: any) {
        if (val) {
            const tableRef = this.$refs.tableRef as TableRef
            tableRef.onLoad({
                page: 1,
            })
        }
    }
    load: TableLoad = params => {
        const conditions = this.conditions || {}
        return API.PipelineLogService.list({
            conditions: {
                pipelineId: this.id,
                //target: 'prd',
                ...conditions,
            },
            ...params,
        }).then(res => ({ result: res.data.list, total: res.data.total }))
    }

    private columns: TableColumn[] = [
        {
            align: 'left',
            label: '运行记录',
            prop: 'logId',
            render: (h, { row }: { row: PipelineLog }) => {
                return `#${row.logId}`
            },
        },
        {
            label: '构建状态',
            prop: '构建状态',
            align: 'left',
            width: '110px',
            render: (h, { row }: { row: PipelineLog }) => {
                const dom = renderPipelineStatus(h, { row })

                return dom
            },
        },
        {
            align: 'left',
            label: '代码信息',
            prop: 'config',
            width: '160px',
            tooltip: true,
            render: (h, { row }: { row: PipelineLog }) => {
                return row.config?.message
            },
        },
        {
            align: 'left',
            label: '构建信息',
            prop: 'config',
            width: '220px',
            render: (h, { row }: { row: PipelineLog }) => {
                const user$ = row.user$
                const icon$ = h('div', { style: ' position: absolute;right: 5px;top: 3px;line-height: 1;' }, [
                    h(
                        'svg-icon',
                        {
                            props: {
                                icon: 'mt-china',
                            },
                        },
                        '',
                    ),
                ])
                return h('div', [
                    row.target === 'prd' ? icon$ : [],
                    h('div', `${user$?.name} ${row.triggerMessage}`),
                    h(
                        'el-button',
                        {
                            props: {
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.$emit('close')
                                    this.$router.push({
                                        path: `/devops/pipeline-log/${row.id}`,
                                        query: {
                                            _: `#${row.logId}${row.name}`,
                                        },
                                    })
                                },
                            },
                            class: 'sg-link',
                        },
                        `${row.branch} → ${row.target}`,
                    ),
                ])
            },
        },
        {
            width: '130px',
            align: 'left',
            label: '环境',
            prop: 'createAt',
            overflowCount: 2,
            render: (h, { row }: { row: PipelineLog }) => {
                const target_urls = this.pipeline?.target_urls
                let label = ''

                const { target, config } = row
                const options = getTargetOptions({
                    target_urls,
                    triggers: config?.triggers,
                })

                const target$ = options.find(item => item.value === target)

                if (target$) {
                    label = target$.label
                } else {
                    label = target
                }

                return label
            },
        },
        {
            align: 'left',
            label: '持续时间',
            width: '80px',
            render: (h, { row }: { row: PipelineLog }) => {
                if (row.endTime && row.startTime) {
                    return Utils.formatSeconds(row.endTime / 1000 - row.startTime / 1000)
                }
                return ''
            },
        },
        {
            width: '100px',
            align: 'left',
            label: '制品信息',
            prop: '制品信息',
            render: (h, { row }: { row: PipelineLog }) => {
                const { pipelineId: id } = row
                const { target, config } = row
                const distDirZip = config?.distDir?.split('/')[0] + '.zip'
                const { folderName, folderSize } = row.artifact ?? {}
                const url = `http://192.168.1.147/artifact/${target}/${id}/${distDirZip}`
                if (folderName && folderSize) {
                    return [
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => {
                                        const result = clipboard(url)
                                        if (result) {
                                            this.$message.success('下载地址复制成功')
                                        }
                                    },
                                },
                            },
                            `下载${folderName}`,
                        ),
                        h(
                            'div',
                            {
                                attrs: {},
                                // 大于50M 警告
                                style: folderSize > 100 * 1024 * 1024 ? 'color: rgb(255, 97, 71);' : folderSize > 50 * 1024 * 1024 ? 'color: #ffc229;' : '',
                            },
                            `${bytesToSize(folderSize + '')}`,
                        ),
                    ]
                }
                return ''
            },
        },
        {
            width: '50px',
            align: 'left',
            label: '外链',
            prop: 'third_party_scanner_body',
            render: (h, { row }: { row: PipelineLog }) => {
                const result = row?.third_party_scanner_body ?? []
                let count = 0
                result.forEach((item: any) => {
                    count = count + item.data?.length
                })

                return h(
                    'el-tooltip',
                    {
                        props: {
                            //content: content,
                            placement: 'top',
                            //effect: 'light',
                            disabled: !count,
                        },
                    },
                    [
                        h(
                            'div',
                            {
                                class: 'sg-flexbox align-center',
                                slot: 'default',
                            },
                            [
                                h(
                                    'span',
                                    {
                                        style: count ? 'color: #ffc229;' : '',
                                    },
                                    row?.third_party_scanner_body ? `${count}` : '-',
                                ),
                            ],
                        ),
                        h(
                            'div',
                            {
                                class: '',
                                slot: 'content',
                            },
                            JSON.stringify(result),
                        ),
                    ],
                )
            },
        },
        {
            width: '70px',
            align: 'left',
            label: 'JS扫描',
            prop: 'image_scanner_body',
            renderHeader(h: any, { column, $index }: any) {
                return h('div', {}, [
                    h(
                        'el-tooltip',
                        {
                            props: {
                                placement: 'right',
                            },
                            style: {
                                marginLeft: '5px',
                            },
                        },
                        [
                            h(
                                'span',
                                {
                                    slot: 'content', // slot属性
                                    style: {
                                        display: 'inline-block',
                                        maxWidth: '220px',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-all',
                                    },
                                },
                                'js大小超过5M显示异常',
                            ),
                            h(
                                'span',
                                {
                                    class: '',
                                },
                                [
                                    h('span', 'JS'),
                                    h('i', {
                                        class: 'el-icon-question',
                                    }),
                                ],
                            ),
                        ],
                    ),
                ])
            },
            render: (h, { row }: { row: PipelineLog }) => {
                const lastLog$ = row
                if (lastLog$) {
                    const { config, pipelineId, target } = lastLog$
                    const distDir = config?.distDir ?? ''
                    const host = `http://${pipelineId}.${target}.icinfo.co/`
                    if (lastLog$.js_scanner_body && lastLog$.js_scanner_body.error) {
                        let data: any = lastLog$.js_scanner_body.data || []
                        let content = data.map((item: any) => {
                            const filepath = item.filepath
                            const lastIndex = filepath.lastIndexOf(`/${distDir}/`)
                            const uri = filepath.substring(lastIndex).split(`/${distDir}/`)[1]
                            return h('div', {}, [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: host + uri,
                                            target: '_blank',
                                        },
                                        class: 'sg-link',
                                    },
                                    [
                                        h('i', {
                                            class: 'el-icon-link sg-mr-1',
                                        }),
                                        `${item.name} ${item.fileSize}`,
                                    ],
                                ),
                            ])
                        })

                        return h(
                            'el-tooltip',
                            {
                                props: {
                                    //content: content,
                                    placement: 'top',
                                    effect: 'light',
                                },
                            },
                            [
                                h(
                                    'div',
                                    {
                                        class: 'sg-flexbox align-center',
                                        slot: 'default',
                                    },
                                    [
                                        h(
                                            'span',
                                            {
                                                style: 'color: rgb(255, 97, 71);',
                                            },
                                            `${lastLog$.js_scanner_body.error}个异常`,
                                        ),
                                    ],
                                ),
                                h(
                                    'div',
                                    {
                                        class: '',
                                        slot: 'content',
                                    },
                                    content,
                                ),
                            ],
                        )
                    } else {
                        return h(
                            'div',
                            {
                                class: 'sg-flexbox align-center',
                            },
                            [h('span', { style: 'color: #8cc04f;' }, lastLog$.js_scanner_body ? `正常` : '-')],
                        )
                    }
                }
            },
        },
        {
            width: '70px',
            align: 'left',
            label: '图片扫描',
            prop: 'image_scanner_body',
            renderHeader(h: any, { column, $index }: any) {
                return h('div', {}, [
                    h(
                        'el-tooltip',
                        {
                            props: {
                                placement: 'right',
                            },
                            style: {
                                marginLeft: '5px',
                            },
                        },
                        [
                            h(
                                'span',
                                {
                                    slot: 'content', // slot属性
                                    style: {
                                        display: 'inline-block',
                                        maxWidth: '220px',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-all',
                                    },
                                },
                                '图片大小超过1M显示异常',
                            ),
                            h(
                                'span',
                                {
                                    class: '',
                                },
                                [
                                    h('span', '图片'),
                                    h('i', {
                                        class: 'el-icon-question',
                                    }),
                                ],
                            ),
                        ],
                    ),
                ])
            },
            render: (h, { row }: { row: PipelineLog }) => {
                const lastLog$ = row
                if (lastLog$) {
                    const { config, pipelineId, target } = lastLog$
                    const distDir = config?.distDir ?? ''
                    const host = `http://${pipelineId}.${target}.icinfo.co/`
                    if (lastLog$.image_scanner_body && lastLog$.image_scanner_body.error) {
                        let data: any = lastLog$.image_scanner_body.data || []
                        let content = data.map((item: any) => {
                            const filepath = item.filepath
                            const lastIndex = filepath.lastIndexOf(`/${distDir}/`)
                            const uri = filepath.substring(lastIndex).split(`/${distDir}/`)[1]
                            return h('div', {}, [
                                h(
                                    'a',
                                    {
                                        attrs: {
                                            href: host + uri,
                                            target: '_blank',
                                        },
                                        class: 'sg-link',
                                    },
                                    [
                                        h('i', {
                                            class: 'el-icon-link sg-mr-1',
                                        }),
                                        `${item.name} ${item.fileSize}`,
                                    ],
                                ),
                            ])
                        })

                        return h(
                            'el-tooltip',
                            {
                                props: {
                                    //content: content,
                                    placement: 'top',
                                    effect: 'light',
                                },
                            },
                            [
                                h(
                                    'div',
                                    {
                                        class: 'sg-flexbox align-center',
                                        slot: 'default',
                                    },
                                    [
                                        h(
                                            'span',
                                            {
                                                style: 'color: rgb(255, 97, 71);',
                                            },
                                            `${lastLog$.image_scanner_body.error}个异常`,
                                        ),
                                    ],
                                ),
                                h(
                                    'div',
                                    {
                                        class: '',
                                        slot: 'content',
                                    },
                                    content,
                                ),
                            ],
                        )
                    } else {
                        return h(
                            'div',
                            {
                                class: 'sg-flexbox align-center',
                            },
                            [h('span', { style: 'color: #8cc04f;' }, `正常`)],
                        )
                    }
                }
            },
        },
        {
            align: 'left',
            label: '访问地址',
            prop: '访问地址',
            width: '120px',
            render: (h, { row }: { row: PipelineLog }) => {
                const { uat_urls = [], previewUrl } = row
                if (uat_urls.length) {
                    return uat_urls.map(item => {
                        return h(
                            'div',
                            {
                                props: {
                                    type: 'text',
                                },
                            },
                            [
                                h(
                                    'el-tooltip',
                                    {
                                        props: {
                                            disabled: !item.note,
                                            content: item.note || '无',
                                            placement: 'top',
                                        },
                                    },
                                    [
                                        h(
                                            'a',
                                            {
                                                class: 'sg-link',
                                                attrs: {
                                                    title: item.url,
                                                    href: item.url,
                                                    target: '_blank',
                                                },
                                            },
                                            [
                                                h('i', {
                                                    class: 'el-icon-link sg-mr-1',
                                                }),
                                                item.name,
                                            ],
                                        ),
                                    ],
                                ),
                            ],
                        )
                    })
                }
                if (previewUrl) {
                    return h('div', [
                        h(
                            'a',
                            {
                                attrs: {
                                    href: previewUrl,
                                    target: '_blank',
                                },
                                class: 'sg-link',
                            },
                            [
                                h('i', {
                                    class: 'el-icon-link sg-mr-1',
                                }),
                                `预览地址`,
                            ],
                        ),
                    ])
                }
            },
        },

        {
            align: 'left',
            label: '开始时间',
            prop: 'createdAt',
            width: '160px',
            render: (h, { row }: { row: PipelineLog }) => {
                return Utils.dateFormat(row.createdAt, 'YY-MM-DD HH:mm:ss')
            },
        },
        // {
        //     align: 'left',
        //     label: '运行备注',
        //     prop: 'description',
        //     minWidth: '200px',
        // },

        {
            align: 'left',
            label: '操作',
            prop: 'action',
            width: '160px',
            fixed: 'right',
            render: (h, { row }: { row: PipelineLog }) => {
                return [
                    h(
                        'el-button',
                        {
                            props: {
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.$emit('close')
                                    this.$router.push({
                                        path: `/devops/pipeline-log/${row.id}`,
                                        query: {
                                            _: `#${row.logId}${row.name}`,
                                        },
                                    })
                                },
                            },
                            class: ' sg-pl-2 sg-link',
                        },

                        `构建详情`,
                    ),
                    h(
                        'a',
                        {
                            attrs: {
                                href: `${VUE_APP_BASEURL_API}/pipeline-log/raw/${row.pipelineId}/${row.logId}`,
                                target: '_blank',
                            },

                            class: ' sg-link',
                        },
                        `原始日志`,
                    ),
                ]
            },
        },
    ]
    created() {}
    mounted() {
        // todo undefined报错
        // @ts-ignore
        //this.option.series[0].data = []
    }
}
</script>
