import { CreateElement } from 'vue'
export function renderPipelineStatus(h: CreateElement, { row }: { row: any }) {
    let dom: any = []
    if (row.status === 'success') {
        dom = [
            h('svg-icon', {
                props: {
                    icon: 'mt-success',
                },
                style: 'width:16px;height:16px;margin-right:3px;',
            }),
            h(
                'a',
                {
                    style: 'color:#8cc04f;',
                    attrs: {
                        target: '_blank',
                        href: `${process.env.VUE_APP_BASEURL_API}/pipeline-log/raw/${row.pipelineId}/${row.logId}`,
                    },
                },
                '构建成功',
            ),
        ]
    } else if (row.status === 'error') {
        dom = [
            h(
                'el-tooltip',
                {
                    props: {},
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
                        row.errors,
                    ),
                    h(
                        'div',
                        {
                            class: 'sg-flexbox align-center',
                        },
                        [
                            h('svg-icon', {
                                props: {
                                    icon: 'mt-error',
                                },
                                style: 'width:16px;height:16px;margin-right:3px;',
                            }),
                            h(
                                'a',
                                {
                                    style: 'color:#ff6147;',
                                    attrs: {
                                        target: '_blank',
                                        href: `${process.env.VUE_APP_BASEURL_API}/pipeline-log/raw/${row.pipelineId}/${row.logId}`,
                                    },
                                },
                                '构建失败',
                            ),
                        ],
                    ),
                ],
            ),
        ]
    } else if (row.status === 'abort') {
        dom = [
            h('svg-icon', {
                props: {
                    icon: 'mt-warning',
                },
                style: 'width:20px;height:20px;margin-right:5px;',
            }),
            h(
                'a',
                {
                    style: 'color:#ffc229;',
                    attrs: {
                        target: '_blank',
                        href: `${process.env.VUE_APP_BASEURL_API}/pipeline-log/raw/${row.pipelineId}/${row.logId}`,
                    },
                    class: 'sg-link',
                },
                `构建终止`,
            ),
        ]
    } else if (row.status === 'pending') {
        dom = [
            h('svg-icon', {
                props: {
                    icon: 'mt-loading',
                },
                class: 'spin animation',
                style: 'width:20px;height:20px;margin-right:5px;',
            }),
            h('span', { style: '', class: '' }, '排队中'),
        ]
    } else if (row.status === 'doing') {
        dom = [
            h('svg-icon', {
                props: {
                    icon: 'mt-loading',
                },
                class: 'spin animation',
                style: 'width:20px;height:20px;margin-right:5px;',
            }),
            h(
                'a',
                {
                    attrs: {
                        target: '_blank',
                        href: `${process.env.VUE_APP_BASEURL_API}/pipeline-log/raw/${row.pipelineId}/${row.logId}`,
                    },
                    class: 'sg-link',
                },
                `构建中`,
            ),
            //h('span', { style: '', class: '' }, '构建中'),
        ]
    }

    return h(
        'div',
        {
            class: 'sg-flexbox align-center',
        },
        dom,
    )
}
