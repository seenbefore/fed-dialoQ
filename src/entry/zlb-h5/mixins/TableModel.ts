import EventBus, { IEventBusOptions } from '@/scripts/utils/EventBus'

interface IPagination {
    pageNum: number
    length: number
}

export class TableModel<T = any> {
    private _eventBus = new EventBus()

    public tableData: Array<T> = []

    /* 分页参数 */
    public pagination: IPagination = {
        pageNum: 1,
        length: 10,
    }

    public pullLoading = false

    public listLoading = false

    public finished = false

    public total: string | number = '0'

    /* 数据分发 */
    private emitLoad() {
        this._eventBus.$emit('load', this.pagination)
    }

    /* 重置 */
    public reset() {
        this.finished = false
        this.listLoading = true
        this.tableData = []
        this.pagination.pageNum = 1
        this.pagination.length = 10
        this.emitLoad()
    }

    /* 加载数据 */
    public load() {
        if (!this.finished) {
            this.pagination.pageNum++
        }
        this.emitLoad()
    }

    public push(data: Array<T>): void {
        const originLength = this.tableData.length
        this.tableData.push(...data)
        const total = typeof this.total === 'string' ? parseFloat(this.total) : this.total
        if (originLength + data.length >= total) {
            this.finished = true
        }
        this.pullLoading = false
        this.listLoading = false
    }

    /* 数据监听 */
    public onLoad(callBack: (params: IPagination) => Promise<void> | void, immediateCallback?: boolean, options?: Partial<IEventBusOptions>) {
        if (immediateCallback) {
            callBack(this.pagination)
        }
        this._eventBus.$on('load', callBack, options)
    }

    /* 销毁监听，期望在页面销毁的时候掉用 */
    public offEvent() {
        this._eventBus.$off('load')
    }
}
