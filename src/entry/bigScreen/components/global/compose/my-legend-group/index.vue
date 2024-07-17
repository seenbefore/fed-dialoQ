<!--
   图例 - group
-->
<template>
    <div class="my-legend-group">
        <div class="item sg-flexbox align-center" v-for="(item, index) in list" :key="index">
            <div class="item-block">
                <div :style="stylesLengend(index)"></div>
            </div>
            <my-text-item class="item-text__wrap" color="#fff" :item="item"></my-text-item>
            <div class="sg-flexbox align-center justify-end per-wrap sg-m-l-10" v-if="item.rateDecimals">
                <my-count-to class="per-wrap--number" :end-val="getEndVal(item)" :decimals="item.rateDecimals" :show-zero="false" />
                <span class="per-wrap--unit">%</span>
            </div>
            <slot name="after" :item="item" :index="index" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { accAdd, accMul } from 'icinfo-util'
import { ILegendGroup } from '../../../../types/index'

@Component({
    name: 'MyLegendGroup',
    components: {},
})
export default class MyLegendGroup extends Vue {
    @Prop({ type: Array, default: () => [] }) list!: ILegendGroup[]
    @Prop({ type: Array, default: () => [] }) colors!: string[]
    /** 图例的宽度 */
    @Prop({ type: Number, default: 16 }) lengendWidth!: any
    /** 图例的高度 */
    @Prop({ type: Number, default: 16 }) lengendHeight!: any
    /** 保留小数位，默认为 4 */
    @Prop({ type: Number, default: 4 }) decimals!: number
    /** 是否自定义百分比 */
    @Prop({ type: Boolean, default: false }) customRate!: boolean
    get total() {
        if (!this.list?.length) return 0
        return this.list.reduce((prev: any, curr: any) => accAdd(prev, curr.number), 0)
    }
    @Watch('list', { deep: true })
    listHandler(val: any) {
        console.log('legend-list :>> ', val)
    }
    created() {}
    mounted() {}
    stylesLengend(index: number) {
        return {
            width: `${this.lengendWidth}px`,
            height: `${this.lengendHeight}px`,
            background: this.colors[index],
        }
    }
    getEndVal(item: any) {
        // console.log('this.customRate :>> ', this.customRate)
        if (!item.number && item.number != 0 && !this.customRate) {
            Promise.reject('【my-legend-group配置项：number字段不存在，customRate字段必须设置为true】')
            return 0
        }
        const value = this.customRate ? item.rate : item.number
        // console.log('value :>> ', value)
        const result = this.customRate ? this.getCustomRate(value) : this.getRate(value)
        return result
    }
    /** 接口返回百分比数值 */
    getCustomRate(val: any) {
        // console.log('custom-val :>> ', val)
        if (!val && val !== 0) {
            Promise.reject('rate-val值为空!')
            return ''
        }
        const num = accMul(val, 100)
        const result = Math.floor(accMul(num, Math.pow(10, this.decimals)))
        return this.accDiv(result, Math.pow(10, this.decimals))
    }
    /** 默认计算百分比 */
    getRate(val: any) {
        console.log('默认计算百分比', val)
        if (!this.total) return ''
        const num = this.accDiv(val, this.total)
        const result = Math.floor(accMul(num, Math.pow(10, this.decimals)))
        return this.accDiv(result, 100)
        // return this.accDiv(result, 100) + '%'
    }
    /**
     * 除法函数，用来得到精确的除法结果<br>
     * javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
     * @param {number} arg1
     * @param {number} arg2
     * @returns {number} arg1除以arg2的精确结果
     * @example
     * accDiv(0.2, 0.3)
     * // => 0.6666666666666666
     */
    accDiv(arg1: number, arg2: number) {
        // todo sharegood-cloud-utils中accDiv方法有点小问题
        let t1, t2, r1, r2

        try {
            t1 = arg1.toString().split('.')[1].length
        } catch (e) {
            //   console.error(e);
            t1 = 0
        }

        try {
            t2 = arg2.toString().split('.')[1].length
        } catch (e) {
            //   console.error(e);
            t2 = 0
        }

        r1 = Number(arg1.toString().replace('.', ''))
        r2 = Number(arg2.toString().replace('.', ''))
        return (r1 / r2) * Math.pow(10, t2 - t1)
    }
}
</script>

<style lang="less" scoped>
.my-legend-group {
    .item {
        color: #fff;
        font-size: 18px;

        .item-block {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            div:first-child {
                flex-shrink: 0;
                margin-right: 10px;
                border-radius: 2px;
            }
        }

        .txt-wrap {
            margin-right: 10px;
            min-width: 150px;
        }

        .per-wrap {
            margin-right: 2px;
            min-width: 66px;
            // color: #37d2ff;
            letter-spacing: 0;
            font-weight: bold;
            font-size: 16px;
            // font-family: Digital_Regular;
            font-family: PingFangSC-Regular;
            line-height: 28px;
        }
    }
}
</style>
