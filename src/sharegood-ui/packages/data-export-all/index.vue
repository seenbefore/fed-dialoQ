<template>
    <span class="sg-data-export">
        <a ref="link"></a>
        <el-button class="sg-data-export-button sg-data-export__button" type="primary" @click="onExportAll" v-bind="$attrs" :loading="showLoading">
            <slot :scope="this">{{ label }}</slot>
        </el-button>
        <section class="export-loading" v-if="showLoading">
            <div class="progress-bar">
                <div class="bar" :style="{ width: `${percent}%` }" />
            </div>
            <div class="export-text">
                <span>导出中{{ percent }}%...</span>
                <el-link :underline="false" type="danger" @click="stopExport">取消导出</el-link>
            </div>
        </section>
    </span>
</template>

<script>
import RenderExport from '../../src/utils/renderExport'
export default {
    name: 'SgDataExportAll',
    props: {
        // 导出文件名称
        name: {
            type: String,
            default: 'data',
        },
        // 按钮文案
        label: {
            type: String,
            default: '导出全部',
        },
        // 数据列配置
        columns: {
            type: Array,
            default: () => [],
        },
        /* 支持导出的最大数量，默认100000 */
        maxNum: {
            type: Number,
            default: 100000,
        },
        /* 每次轮询的条数，默认100 */
        splitReqNum: {
            type: Number,
            default: 100,
        },
        /* 默认值 */
        defaultValue: {
            type: String,
            default: '',
        },
        load: {
            type: Function,
            default: () => {},
        },
        /* 并发请求数量 */
        concurrencyRequestsNum: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            showLoading: false,
            stop: false,
            percent: 0,
        }
    },
    methods: {
        /* 停止导出 */
        stopExport() {
            this.stop = true
        },
        /* 开始导出 */
        async onExportAll() {
            this.showLoading = true
            try {
                const rs = await this.getList()
                if (!rs?.length) {
                    console.warn('[没有数据]')
                    this.showLoading = false
                    this.stop = false
                    this.percent = 0
                    return
                }
                new RenderExport(this.columns, {
                    defaultValue: this.defaultValue,
                }).downloadExl(rs, this.name)
                this.$message.success('导出成功')
            } catch (err) {
                this.$message.error('导出失败')
                console.error('导出失败：' + err)
            }
            this.showLoading = false
            this.percent = 0
        },

        /* 请求所有数据，并格式化 */
        async getList() {
            this.$message.info('开始导出')
            const { total } = await this.load({
                pageNum: 1,
                pageSize: 1,
                start: 0,
            })
            if (total > this.maxNum) {
                this.$message.warning('超过最大导出量！')
                return null
            }
            let reqList = []
            const totalPage = Math.ceil(total / this.splitReqNum)
            for (let i = 1; i <= totalPage; i++) {
                reqList.push(() => {
                    return new Promise(async (resolve, reject) => {
                        const { result } = await this.load({
                            pageNum: i,
                            pageSize: this.splitReqNum,
                            start: (i - 1) * this.splitReqNum,
                        })
                        resolve(result)
                    })
                })
            }
            let result = await this.createRequest(reqList)
            return result
        },

        /* 进行并发控制请求数量一直保持在concurrencyRequestsNum个 */
        createRequest(tasks = []) {
            let results = []
            let running = 0 // 当前运行个数
            let resultsLength = tasks.length // 用来判断最后的是否全部成功
            return new Promise((resolve, reject) => {
                const next = () => {
                    while (running < this.concurrencyRequestsNum && tasks.length && !this.stop) {
                        running++
                        let task = tasks.shift()
                        task()
                            .then(result => {
                                results.push(result)
                            })
                            .finally(() => {
                                running--
                                const percent = Math.floor((results.length / resultsLength) * 100)
                                this.percent = percent >= 99 ? 99 : percent
                                next()
                            })
                    }
                    if (this.stop) {
                        resolve([])
                    }
                    if (results.length === resultsLength) {
                        // 全部执行结束
                        resolve(results.flat())
                    }
                }
                next()
            })
        },
    },
}
</script>

<style lang="less">
.sg-data-export {
    .export-loading {
        position: fixed;
        z-index: 999;
        width: 190px;
        height: 37px;
        right: 20px;
        bottom: 20px;
        background: #ffffff;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
        border-radius: 100px;
        padding: 6px 10px;
        box-sizing: border-box;

        .progress-bar {
            height: 10px;
            background: #f2f3f5;
            border-radius: 100px;
            margin-bottom: 2px;
            padding: 2px;
            .bar {
                height: 6px;
                background: #30d737;
                border-radius: 100px;
                transition: all 0.5s;
            }
        }
        .export-text {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > span {
                color: #158dff;
                line-height: 15px !important;
                font-size: 12px;
            }
            .el-link {
                span {
                    font-size: 12px;
                    color: #f56c6c;
                    line-height: 15px !important;
                }
            }
        }
    }
}
</style>
