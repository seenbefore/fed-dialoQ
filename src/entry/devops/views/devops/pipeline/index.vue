<template>
    <div class="sg-page page-devops-pipeline sg-p-0 column">
        <section class="sg-card sg-flexbox column sg-flex-1 ">
            <div class="sg-card-body sg-flexbox column sg-flex-1 ">
                <div class="sg-flexbox align-center sg-mb-3">
                    <el-tabs v-model="type$" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="all"></el-tab-pane>
                        <!-- <el-tab-pane label="我参与的" name="my"></el-tab-pane> -->
                        <el-tab-pane label="我关注的" name="star"></el-tab-pane>
                    </el-tabs>
                    <div class="sg-flex-1 sg-text-right">
                        <el-input v-model="name" placeholder="中文模糊查询应用名称、英文模糊查询应用名" style="width:400px;" clearable @clear="handleSearch" @keyup.enter.native="handleSearch">
                            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-button
                            class="sg-ml-3"
                            type=""
                            icon="el-icon-plus"
                            @click="
                                $go({
                                    path: '/devops/pipeline/create',
                                })
                            "
                        >
                            创建流水线
                        </el-button>
                    </div>
                </div>
                <!-- <div class="sg-mb-3">
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        :disabled="isDisabled"
                        @click="handleBatchDelete"
                        >批量删除</el-button
                    >
                </div> -->
                <sg-data-view id="table" @selection-change="handleSelectionChange" :columns="columns" :load="load" height="100%" ref="tableRef"></sg-data-view>
            </div>
        </section>

        <PipelineHistoryDrawer
            v-if="PipelineHistoryDrawer.visible"
            :visible.sync="PipelineHistoryDrawer.visible"
            :title="PipelineHistoryDrawer.title"
            :id="PipelineHistoryDrawer.id"
            :pipeline="PipelineHistoryDrawer.pipeline"
        ></PipelineHistoryDrawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { Pipeline } from '@/entry/devops/models'
import PipelineHistoryDrawer from './components/PipelineHistoryDrawer/index.vue'
import * as Utils from '@/scripts/utils'
import _ from 'lodash'
import { renderPipelineStatus } from './helper'
import { MyMixins } from '@/entry/devops/mixins'
import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'
import { bytesToSize } from 'icinfo-util'
import { http } from '@/entry/devops/scripts/http'
import { clipboard } from '@/scripts/utils'
import { appStore } from '@/entry/devops/store/useStore'
import { getTargetOptions } from './components/helper'

@Component({
    name: 'DevopsPipeline',
    components: {
        PipelineHistoryDrawer,
    },
})
export default class DevopsPipeline extends MyMixins {
    public $refs!: {
        formRef: FormRef
        tableRef: TableRef
    }
    // 应用类型
    private type$ = 'all'
    // 搜索名称
    private name = ''
    PipelineHistoryDrawer = {
        visible: false,
        id: '',
        title: '',
        pipeline: null,
    } as any
    // 勾选的数据
    selection: Pipeline[] = []
    timer: any
    // 重新激活后再次轮训请求
    activated() {
        const name = appStore.devops.name
        this.name = name

        try {
            this.$refs.tableRef.onLoad({}, { loading: false, scrollTop: false })
        } catch (err) {}
    }

    // 切换到其他页面后关闭定时器
    deactivated() {
        appStore.setDevopsName('')
        clearTimeout(this.timer)
    }

    async load(params: any) {
        clearTimeout(this.timer)

        try {
            const { data } = await API.PipelineService.list({
                ...params,
                conditions: {
                    type$: this.type$,
                    name: this.name,
                },
            })
            this.timer = setTimeout(() => {
                // 有可能会跳转到其他页面而报错
                try {
                    this.$refs.tableRef.onLoad({}, { loading: false, scrollTop: false })
                } catch (err) {}
            }, 2000)
            return { result: data.list, total: data.total }
        } catch (err) {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                try {
                    this.$refs.tableRef.onLoad({}, { loading: false, scrollTop: false })
                } catch (err) {}
            }, 5000)
        }
    }
    private columns: TableColumn[] = [
        // {
        //     type: 'selection',
        //     prop: 'index',
        // },
        {
            align: 'left',
            label: '应用名称',
            prop: 'name',
            width: '200px',
            fixed: 'left',
            //overflowCount: 2,
            //showOverflowTooltip: true,
            render: (h, { row }: { row: Pipeline }) => {
                const url = row.config?.http_url_to_repo || 'javascript:void(0)'
                const icon$ = h(
                    'div',
                    {
                        class: 'git-icon',
                        on: {
                            click: () => {
                                window.open(url)
                            },
                        },
                    },
                    [
                        h(
                            'svg-icon',
                            {
                                props: {
                                    icon: 'mt-git',
                                },
                            },
                            '',
                        ),
                    ],
                )
                return [
                    h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                href: 'javascript:void(0)',
                            },
                            props: {
                                size: 'mini',
                                type: 'text',
                            },
                            on: {
                                click: (e: Event) => {
                                    e.stopPropagation()
                                    this.$router.push({
                                        path: `/devops/pipeline/${row.id}`,
                                        query: {
                                            //type: 'settings',
                                            _: row.name,
                                        },
                                    })
                                },
                            },
                        },
                        [h('div', row.id), h('div', `${row.name}`)],
                    ),
                    icon$,
                ]
            },
        },
        {
            align: 'left',
            label: '线上版本',
            prop: 'version',
            width: '80px',
            fixed: 'left',
            render: (h, { row }: { row: Pipeline }) => {
                if (row.version) {
                    return [
                        h(
                            'a',
                            {
                                class: 'sg-link',
                                attrs: {
                                    href: 'javascript:void(0)',
                                },
                                props: {
                                    size: 'mini',
                                    type: 'text',
                                },
                                on: {
                                    click: async () => {
                                        await this.$modalDialog(() => import('./ChangeLogDialog/index.vue'), {
                                            id: row.id,
                                        })
                                    },
                                },
                            },
                            [row.version],
                        ),
                    ]
                }
                return ''
            },
        },

        {
            label: '构建状态',
            prop: 'status',
            align: 'left',
            width: '110px',
            render: (h, { row }: { row: Pipeline }) => {
                const lastLog = row.lastLog$
                if (lastLog) {
                    return renderPipelineStatus(h, { row: lastLog })
                }
                return [
                    h(
                        'span',
                        {
                            props: {
                                type: 'text',
                            },
                        },
                        '-',
                    ),
                ]
            },
        },
        {
            align: 'left',
            label: '构建信息',
            prop: '构建信息',
            minWidth: '180px',
            render: (h, { row }: { row: Pipeline }) => {
                if (row.lastLog$) {
                    const row$ = row.lastLog$
                    const user$ = row$.user$
                    let triggerMessage = row$.triggerMessage?.indexOf('自动') > -1 ? '自动' : '手动'

                    const icon$ = h('div', { style: ' position: absolute;right: 5px;top: 3px;line-height: 1;' }, [
                        h(
                            'svg-icon',
                            {
                                props: {
                                    icon: 'mt-china',
                                },
                            },
                            '🇨🇳',
                        ),
                    ])
                    return h('div', {}, [
                        row$.target === 'prd' ? icon$ : [],

                        h(
                            'router-link',
                            {
                                props: {
                                    to: {
                                        path: `/devops/pipeline-log/${row$.id}`,
                                        query: {
                                            _: `#${row$.logId}${row$.name}`,
                                        },
                                    },
                                },
                                class: 'sg-link',
                            },
                            [h('div', `#${row$.logId} ${user$?.name} ${triggerMessage}`), h('div', `${row$.branch} → ${row$.target}`)],
                        ),
                    ])
                }

                return ''
            },
        },
        {
            width: '130px',
            align: 'left',
            label: '环境',
            prop: 'createAt',
            overflowCount: 2,
            render: (h, { row }: { row: Pipeline }) => {
                const target_urls = row.target_urls
                let label = ''
                if (row.lastLog$) {
                    const { target, config } = row.lastLog$
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
                }
            },
        },
        {
            width: '80px',
            align: 'left',
            label: '持续时间',
            prop: 'createAt',
            render: (h, { row }: { row: Pipeline }) => {
                if (row.lastLog$) {
                    const log = row.lastLog$
                    if (log.endTime && log.startTime) {
                        return Utils.formatSeconds(log.endTime / 1000 - log.startTime / 1000)
                    }
                }
            },
        },
        {
            label: '访问地址',
            prop: '访问地址',
            align: 'left',
            width: '170px',
            render: (h, { row }: { row: Pipeline }) => {
                if (row.lastLog$) {
                    const { uat_urls = [], previewUrl } = row.lastLog$
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
                                    item.note
                                        ? h(
                                              'el-tooltip',
                                              {
                                                  props: {
                                                      content: item.note,
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
                                          )
                                        : h(
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
                }
            },
        },
        {
            width: '100px',
            align: 'left',
            label: '制品信息',
            prop: '制品信息',
            overflowCount: 2,
            showOverflowTooltip: true,
            render: (h, { row }: { row: Pipeline }) => {
                const { id } = row
                const { target, config } = row.lastLog$ || {}
                const distDirZip = config?.distDir?.split('/')[0] + '.zip'
                const url = `http://192.168.1.147/artifact/${target}/${id}/${distDirZip}`
                const { folderName, folderSize } = row.lastLog$?.artifact ?? {}
                if (folderName && folderSize) {
                    return [
                        h(
                            'div',
                            {
                                attrs: {},
                            },
                            [
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
                                    `${folderName}`,
                                ),
                                // h(
                                //     'el-button',
                                //     {
                                //         props: {
                                //             type: 'text',
                                //         },
                                //         on: {
                                //             click: async () => {
                                //                 const api = process.env.VUE_APP_BASEURL_API

                                //                 try {
                                //                     await http.$downloadFile({
                                //                         url: `/download/artifact?id=${id}&target=${row.lastLog$?.target}`,
                                //                         baseURL: '/@API',
                                //                         exShowLoading: true,
                                //                     })
                                //                 } catch (error) {
                                //                     console.log(11, error)
                                //                 } finally {
                                //                 }
                                //             },
                                //         },
                                //     },
                                //     `下载 ${folderName}`,
                                // ),
                            ],
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
        // {
        //     width: '120px',
        //     align: 'left',
        //     label: '制品地址',
        //     prop: '制品地址',
        //     render: (h, { row }: { row: Pipeline }) => {
        //         const { id } = row
        //         const { target, config } = row.lastLog$ || {}
        //         const distDirZip = config?.distDir?.split('/')[0] + '.zip'
        //         const url = `http://192.168.1.147/artifact/${target}/${id}/${distDirZip}`
        //         const { folderName } = row.lastLog$?.artifact ?? {}
        //         if (!folderName) {
        //             return []
        //         }
        //         return h(
        //             'a',
        //             {
        //                 class: 'sg-link',
        //                 props: {
        //                     type: 'text',
        //                 },
        //                 on: {
        //                     click: () => {
        //                         const result = clipboard(url)
        //                         if (result) {
        //                             this.$message.success('复制成功')
        //                         }
        //                     },
        //                 },
        //             },
        //             `点击复制`,
        //         )
        //     },
        // },
        {
            width: '80px',
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
            render: (h, { row }: { row: Pipeline }) => {
                const lastLog$ = row.lastLog$
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
                                            `${lastLog$.image_scanner_body.error}异常`,
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
                            [h('span', { style: 'color: #8cc04f;' }, lastLog$.image_scanner_body ? `正常` : '-')],
                        )
                    }
                }
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
            render: (h, { row }: { row: Pipeline }) => {
                const lastLog$ = row.lastLog$
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
                                            `${lastLog$.js_scanner_body.error}异常`,
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
            width: '50px',
            align: 'left',
            label: '外链',
            prop: 'third_party_scanner_body',
            render: (h, { row }: { row: Pipeline }) => {
                const result = row.lastLog$?.third_party_scanner_body ?? []
                let count = 0
                result.forEach((item: any) => {
                    count = count + item.data?.length
                })
                let content = result.map((item: any, index: number) => {
                    const { filename = '', data = [] } = item
                    const list = data.map((val: any, i: number) => {
                        return h('div', {}, `${index + 1}.${i + 1}、${val}`)
                    })
                    return h('div', { style: 'margin-bottom:7px;' }, [h('div', {}, `${index + 1}、${filename}`), h('div', {}, list)])
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
                                    row.lastLog$?.third_party_scanner_body ? `${count}` : '-',
                                ),
                            ],
                        ),
                        h(
                            'div',
                            {
                                slot: 'content',
                            },
                            content,
                        ),
                    ],
                )
            },
        },

        {
            label: '执行人',
            prop: '执行人',
            align: 'left',
            width: '80px',
            render: (h, { row }: { row: Pipeline }) => {
                const lastLog = row.lastLog$
                if (lastLog) {
                    const name = lastLog.user$ ? lastLog.user$.name : lastLog.userId
                    return [
                        h(
                            'span',
                            {
                                props: {
                                    type: 'text',
                                },
                            },
                            name,
                        ),
                    ]
                }
                return [
                    h(
                        'span',
                        {
                            props: {
                                type: 'text',
                            },
                        },
                        '-',
                    ),
                ]
            },
        },

        {
            width: '170px',
            align: 'left',
            label: '最新运行开始时间',
            prop: 'createAt',
            // sortable: 'custom',
            // 'sort-orders': ['ascending', 'descending'],
            render: (h, { row }: { row: Pipeline }) => {
                if (row.lastLog$ && row.lastLog$.createdAt) {
                    return Utils.dateFormat(row.lastLog$.createdAt, 'YYYY-MM-DD HH:mm:ss')
                } else {
                    return '-'
                }
            },
        },
        {
            width: '80px',
            align: 'left',
            label: '创建人',
            prop: 'createAt',
            // sortable: 'custom',
            // 'sort-orders': ['ascending', 'descending'],
            render: (h, { row }: { row: Pipeline }) => {
                if (row.createdUser$) {
                    return row.createdUser$.name
                }
                return ''
            },
        },

        {
            width: '170px',
            align: 'left',
            label: '创建时间',
            prop: 'createAt',
            // sortable: 'custom',
            // 'sort-orders': ['ascending', 'descending'],
            render: (h, { row }: { row: Pipeline }) => {
                return Utils.dateFormat(row.createdAt, 'YYYY-MM-DD HH:mm:ss')
            },
        },

        {
            align: 'center',
            label: '操作',
            prop: 'table-action',
            width: '170px',
            fixed: 'right',
            render: (h, { row }: { row: Pipeline }) => {
                const collectUserIds = row.collectUserIds || []
                const isCollected = row.isCollected$!
                const config = row.config || {}
                const url = config.http_url_to_repo || 'javascript:void(0)'

                return [
                    h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                href: 'javascript:void(0)',
                            },
                            props: {
                                size: 'mini',
                                type: 'text',
                            },
                            on: {
                                click: () => {
                                    this.run(row)
                                },
                            },
                        },
                        '发布',
                    ),

                    h(
                        'a',
                        {
                            attrs: {
                                href: 'javascript:void(0)',
                            },
                            on: {
                                click: () => {
                                    this.PipelineHistoryDrawer.id = row.id
                                    this.PipelineHistoryDrawer.title = row.name
                                    this.PipelineHistoryDrawer.pipeline = {
                                        ...row,
                                    }
                                    this.PipelineHistoryDrawer.visible = true
                                },
                            },
                            props: {
                                size: 'mini',
                                type: 'text',
                            },

                            class: 'sg-link',
                        },
                        '历史',
                    ),

                    h(
                        'a',
                        {
                            class: 'sg-link',
                            attrs: {
                                href: 'javascript:void(0)',
                            },
                            style: isCollected ? 'color: #ffc229' : '',
                            on: {
                                click: () => {
                                    this.handleToggleFollow(isCollected, row)
                                },
                            },
                        },
                        [isCollected ? '取关' : '关注'],
                    ),

                    h(
                        'el-popover',
                        {
                            props: {
                                trigger: 'click',
                                width: 100,
                            },
                        },
                        [
                            h(
                                'div',
                                {
                                    class: 'page-devops-pipeline__more-actions',
                                },
                                [
                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                                icon: 'el-icon-link',
                                            },
                                            on: {
                                                click: async () => {
                                                    window.open(url)
                                                },
                                            },
                                        },
                                        '源码',
                                    ),

                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                                icon: 'el-icon-edit',
                                            },
                                            on: {
                                                click: () => {
                                                    this.$modalDialog(() => import(/* webpackChunkName: "PipelineUatUrlsDialog" */ './components/PipelineUatUrlsDialog/index.vue'), {
                                                        id: row.id,
                                                        name: row.name,
                                                    })
                                                        .then(async () => {
                                                            //this.handleSearch()
                                                        })
                                                        .catch((err: any) => {
                                                            console.log(err)
                                                        })
                                                },
                                            },
                                        },
                                        '访问地址',
                                    ),

                                    h(
                                        'el-button',
                                        {
                                            props: {
                                                type: 'text',
                                                icon: 'el-icon-edit',
                                            },
                                            on: {
                                                click: () => {
                                                    this.$modalDialog(() => import(/* webpackChunkName: "PipelineTargetCustomEdit" */ './components/PipelineTargetCustomEdit/index.vue'), {
                                                        id: row.id,
                                                        name: row.name,
                                                    })
                                                        .then(async () => {
                                                            //this.handleSearch()
                                                        })
                                                        .catch((err: any) => {
                                                            console.log(err)
                                                        })
                                                },
                                            },
                                        },
                                        '自定义环境',
                                    ),

                                    h(
                                        'el-button',
                                        {
                                            class: 'sg-error-color',
                                            props: {
                                                type: 'text',
                                                icon: 'el-icon-delete',
                                            },
                                            on: {
                                                click: () => {
                                                    this.handleDelete(row)
                                                },
                                            },
                                        },
                                        '删除',
                                    ),
                                ],
                            ),

                            h(
                                'a',
                                {
                                    class: 'sg-link',
                                    attrs: {
                                        href: 'javascript:void(0)',
                                    },
                                    style: 'margin-left: 10px',
                                    slot: 'reference',
                                },
                                '更多',
                            ),
                        ],
                    ),
                ]
            },
        },
    ]
    get isDisabled() {
        return !this.selection.length
    }
    // 批量删除
    handleBatchDelete() {
        console.log(this.$refs.tableRef)
        const id = this.selection.map(item => item.id)
        this.$confirm('确认删除吗').then(async () => {
            await API.PipelineService.remove(
                {
                    id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        target: '#table',
                        text: '删除中',
                    },
                },
            )
            const table: any = this.$refs.tableRef.$refs.table
            table.clearSelection()
            this.$refs.tableRef.onLoad()
        })
    }
    // 单独删除
    handleDelete(row: Pipeline) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await API.PipelineService.remove(
                {
                    id,
                },
                {
                    exShowLoading: true,
                    exShowLoadingOption: {
                        target: '#table',
                        text: '删除中',
                    },
                },
            )
            const table: any = this.$refs.tableRef.$refs.table
            table.clearSelection()
            this.$refs.tableRef.onLoad()
        })
    }

    // 基本信息
    handlePreEdit(row: Pipeline) {
        this.$modalDialog(() => import(/* webpackChunkName: "PipelineEditDialog" */ './components/PipelineEditDialog/index.vue'), { content: '我是弹窗1的内容' })
            .then(() => {})
            .catch((err: any) => {
                console.log(err)
            })
    }
    // 勾线
    handleSelectionChange(rows: any) {
        console.log(1, rows)
        this.selection = [...rows]
    }
    handleClick() {
        this.name = ''
        this.$refs.tableRef.onLoad({
            page: 1,
        })
    }
    handleSearch() {
        this.$refs.tableRef.onLoad({
            page: 1,
        })
    }

    changeSort(val: any) {
        console.log(val)
        const { prop, order } = val
        const orderBy: any = {}
        orderBy[prop] = order
        this.$refs.tableRef.onLoad({
            page: 1,
            sortBy: prop,
            sortValue: order,
        })
    }
    // 是否关注
    async handleToggleFollow(isFollow: boolean, row: Pipeline) {
        row.loading$ = true
        // 取消关注
        if (isFollow) {
            const { data } = await API.PipelineService.uncollect(
                {
                    id: row.id,
                },
                {
                    exShowLoading: false,
                },
            )
            row.isCollected$ = false
        } else {
            const { data } = await API.PipelineService.collect(
                {
                    id: row.id,
                },
                {
                    exShowLoading: false,
                },
            )
            row.isCollected$ = true
        }
        row.loading$ = false
    }

    // 构建
    run(row: Pipeline) {
        const id = row.id
        this.$modalDialog(() => import(/* webpackChunkName: "PreDeployDialog" */ './components/PreDeployDialog/index.vue'), {
            redirect: false,
            title: row.name,
            meta: {
                id,
            },
        }).then(() => {
            this.$refs.tableRef.onLoad()
        })
    }
}
</script>

<style lang="less" scoped>
.page-devops-pipeline ::v-deep {
    .sg-card-body {
        padding-left: 10px;
        padding-right: 10px;
    }
    .git-icon {
        position: absolute;
        right: 5px;
        top: 3px;
        line-height: 1;
        cursor: pointer;
        width: 12px;
        height: 12px;

        // background: url('~@/assets/images/git.png') no-repeat;
        // background-size: cover;
    }
    .el-table {
        .el-table__row td:nth-child(1) {
            .svg-icon-mt-git {
                opacity: 0;
            }
            &:hover {
                .svg-icon-mt-git {
                    opacity: 1;
                }
            }
        }
    }
    .el-table .el-table__row .cell {
        text-overflow: clip;
    }
    .el-tabs__header {
        margin: 0;
    }
    .el-tabs__nav-wrap::after {
        display: none;
    }
    .table-action {
        .el-button {
            padding: 7px 7px;
        }
        .btn {
            font-size: 20px;
            cursor: pointer;
            margin: 0 8px;
        }
    }

    .xx {
        flex: 1;
        height: 100%;
        overflow: auto;
    }
}
</style>
<style lang="less">
.page-devops-pipeline__more-actions {
    > .el-button {
        width: 100%;
        text-align: left;
        margin: 1px 0;
        padding: 8px 0px;
    }
}
</style>
