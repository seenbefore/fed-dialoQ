<script>
import TableColumn from '../data-view/re-el-table-column.vue'
import { VirtualColumn } from 'el-table-virtual-scroll'

export default {
    name: 'VirtualColumn',
    components: { ElTableColumn: TableColumn },
    extends: VirtualColumn,
    mounted() {
        this.$children[0].$on('update:vfixed', newV => {
            this.updateGetClassNameFlag = Math.random()
        })
    },
    data() {
        return {
            updateGetClassNameFlag: 0,
        }
    },
    computed: {
        getClassName() {
            console.log(this.updateGetClassNameFlag)
            const classnames = []
            const classname = this.$attrs['class-name'] || this.$attrs.className
            classname && classnames.push(classname)
            this.isTree && classnames.push('el-table__row--level')
            let vfixed = this.$children[0]?.columnConfig?.vfixed ?? this.$attrs.vfixed //this.myFixed
            if (vfixed === true || vfixed === '') vfixed = 'left'
            if (vfixed) classnames.push('virtual-column__fixed-' + vfixed)
            return classnames.join(' ')
        },
    },
}
</script>
