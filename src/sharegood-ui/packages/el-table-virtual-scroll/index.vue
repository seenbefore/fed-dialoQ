<script>
import VirtualScroll from 'el-table-virtual-scroll' // https://xiaocheng555.github.io/el-table-virtual-scroll/

export default {
    name: 'VirtualScroll',
    extends: VirtualScroll,
    methods: {
        cellFixedStyle({ column }, isHeader = false) {
            if (!column.vfixed) return {}
            return VirtualScroll.methods.cellFixedStyle.call(this, { column }, isHeader)
        },
        initData() {
            VirtualScroll.methods.initData.call(this)
            /** fix: 修复表头列较少时，有时会间隔空白的问题 start */
            const unwatch = this.$watch(
                () => this.elTable.$refs.tableHeader.columns,
                async val => {
                    this.doHeaderLayout()
                },
                { deep: true },
            )
            this.unWatchs.push(unwatch)
            /** fix: 修复表头列较少时，有时会间隔空白的问题 end */
        },
    },
}
</script>
