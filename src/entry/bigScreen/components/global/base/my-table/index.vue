<!--
   表格组件
-->
<template>
    <div class="data-view">
        <el-table :data="tableData" style="width: 100%" :border="false">
            <el-table-column v-if="hasFlag" type="index" label="序号" width="60px"></el-table-column>
            <el-table-column v-for="(v, i) of columns" :key="i" :prop="v.props" :label="v.label" :min-width="v.width">
                <!-- <template slot-scope="scope">
                    <el-tooltip
                        popper-class="sg-table-tooltip"
                        effect="dark"
                        :disabled="
                            disabledTooltipSet[
                                `${scope.column.property}-${scope.$index}`
                            ]
                        "
                        :content="
                            scope.row[scope.column.property] ||
                                (scope.row[scope.column.property] === 0
                                    ? '0'
                                    : defaultValue)
                        "
                        placement="top-end"
                    >
                        <div
                            class="sg-table-txt-cut sg-ellipsis"
                            v-init-tooltip="scope"
                        >
                            <span>
                                {{
                                    scope.row[scope.column.property] ||
                                        (scope.row[scope.column.property] === 0
                                            ? '0'
                                            : defaultValue)
                                }}
                            </span>
                        </div>
                    </el-tooltip>
                </template> -->
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
const initTooltip = (() => {
    function handler(el: any, binding: any, vnode: any, oldVnode: any) {
        const vm = vnode.context
        console.log('vm', vm)
        const index = binding.value.$index
        const field = binding.value.column.property
        const boxHeight = el.offsetHeight
        const textHeight = el.querySelector('span').offsetHeight
        vm.$set(vm.disabledTooltipSet, `${field}-${index}`, !(textHeight > boxHeight))
    }
    return { inserted: handler, update: handler }
})()
export interface pageConfig {
    pageNum?: number | string
    pageSize?: number | string
    total?: number | string
}

Vue.directive('initToolTip', initTooltip)
@Component({
    name: 'MyTable',
    components: {},
})
export default class MyCardBox extends Vue {
    /** card - list */
    @Prop({ default: () => [] }) tableData!: []
    /** 是否需要序号 */
    @Prop({ default: () => true }) hasFlag!: false
    @Prop({
        default: () => {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
            }
        },
    })
    page!: pageConfig[]
    @Prop({ default: () => [] }) columns!: []
    public disabledTooltipSet: any = {} // 禁用tooltip标识集合

    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.data-view {
    /deep/ .el-table {
        //         background: rgba(42,77,136,0.60);
        // border: 1.5px solid rgba(73,131,245,0.3);
        td {
            color: rgba(255, 255, 255, 0.7);
            font-size: 18px;
        }
        th {
            color: rgba(255, 255, 255, 0.8);
            font-size: 18px;
        }
        &::before {
            background-color: #1a3674;
        }
        td,
        th.is-leaf {
            border-bottom-color: #284f9e;
        }
        th,
        tr:nth-of-type(2n) {
            background-color: #1a3674;
            td {
                background-color: #1a3674;
            }
        }
        tr:nth-of-type(2n + 1) {
            background-color: #04154d;
            td {
                background-color: #04154d;
            }
        }
    }
}
</style>
