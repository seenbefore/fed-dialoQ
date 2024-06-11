<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
    name: 'MyPoolList',
    components: {
        vueSeamlessScroll,
    },
    props: {
        width: {
            type: [String, Number],
            default: '',
        },
        height: {
            type: [String, Number],
            default: '100px',
        },
        border: {
            type: Boolean,
            default: true,
        },
        thead: {
            type: Boolean,
            default: true,
        },
        data: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array,
            default: () => [],
        },
        config: {
            type: Object,
            default: () => ({
                step: 0.2, // 数值越大速度滚动越快
            }),
        },
        rowBgOdd: {
            type: String,
            default: 'rgba(32,162,255,0.15)',
        },
        rowBgEven: {
            type: String,
            default: '',
        },
    },
    created() {},
    mounted() {},
    computed: {
        classCom() {
            const classes = []
            if (this.border) {
                classes.push('my-pool-list-border')
            }
            return classes
        },
        stylesCom() {
            return {
                width: this.width,
            }
        },
        stylePoolList() {
            return {
                width: this.width,
                height: this.height,
            }
        },
        styleHead() {
            const { thead } = this.config
            if (!thead) return {}
            return thead
        },
        listData() {
            return this.data.map((item, index) => {
                return {
                    ...item,
                    $id: Math.ceil(Math.random() * 100000000),
                    $index: index + 1,
                }
            })
        },
        listColumns() {
            return this.columns.map(item => {
                const { type, align = '', noWrap } = item
                let width = item.width
                if (type === 'index') {
                    width = width || '100px'
                }
                const $styles = {
                    textAlign: align || 'left',
                    width,
                }
                const $class = []
                if (noWrap) {
                    $class.push('cell-nowrap')
                }
                return {
                    ...item,
                    $width: width,
                    $styles,
                    $class,
                }
            })
        },
        classOption() {
            return {
                ...this.config,
            }
        },
    },
    data() {
        return {}
    },
    methods: {
        getRowStyle(row, index) {
            // console.log(index)
            const styles = {}
            if (index % 2) {
                styles.backgroundColor = this.rowBgOdd
            } else {
                styles.backgroundColor = this.rowBgEven
            }
            return styles
        },
    },
    render(h) {
        // col配置
        const tempColgroup = (
            <colgroup>
                {this.listColumns.map(itmCln => {
                    return <col width={itmCln.$width} style={{ width: itmCln.$width }} />
                })}
            </colgroup>
        )
        return (
            <div style={this.stylesCom} class={['my-pool-list-class', ...this.classCom]}>
                {this.thead ? (
                    <table class="mplc-table" border="0" cellspacing="0">
                        {tempColgroup}
                        <thead style={this.styleHead} class="mpls-thead">
                            <tr>
                                {this.listColumns.map(itmCln => {
                                    return (
                                        <th key={itmCln.prop}>
                                            <div class="table-cell-class" style={itmCln.$styles}>
                                                {itmCln.label}
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                    </table>
                ) : (
                    ''
                )}
                <vueSeamlessScroll data={this.listData} class-option={this.classOption} style={this.stylePoolList} class="seamless-scroll">
                    <table class="mplc-table" border="0" cellspacing="0">
                        {tempColgroup}
                        <tbody>
                            {this.listData.map((item, index) => {
                                return (
                                    <tr style={this.getRowStyle(item, index)}>
                                        {this.listColumns.map(itmCln => {
                                            return (
                                                <td>
                                                    <div style={itmCln.$styles} class={['table-cell-class', ...itmCln.$class]}>
                                                        {itmCln.type === 'slot'
                                                            ? this.$scopedSlots[itmCln.slotName]({
                                                                  row: item,
                                                              })
                                                            : itmCln.render
                                                            ? itmCln.render(h, {
                                                                  row: item,
                                                                  index,
                                                              })
                                                            : itmCln.type === 'index'
                                                            ? item.$index
                                                            : item[itmCln.prop]}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </vueSeamlessScroll>
            </div>
        )
    },
}
</script>

<style lang="less" scoped>
.my-pool-list-class {
    .mplc-table {
        overflow: hidden;
        width: 100%;
        font-size: 14px;
        tr,
        th,
        td {
            overflow: hidden;
            margin: 0;
            padding: 0;
            line-height: normal;
        }
        th {
            font-weight: 400;
        }
        td {
            color: rgba(255, 255, 255, 0.8);
        }
        .table-cell-class {
            padding: 10px 20px;
        }
        .mpls-thead {
            height: 40px;
            background: rgba(32, 162, 255, 0.4);
        }
        .cell-nowrap {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .seamless-scroll {
        overflow: hidden;
        width: 100%;
    }
}
.my-pool-list-border {
    border: 1px solid rgba(1, 194, 255, 0.2);
}
</style>
