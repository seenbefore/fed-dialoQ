<!--
    text - view
-->
<template>
    <div class="my-text-item">
        <slot name="before" />
        <div :class="['text-item__content', layout === 'column' && 'is-vertical', `is-${flexType}`]">
            <div class="text-item--title" v-html="copyItem.title"></div>
            <div class="text-item__right">
                <my-count-to
                    class="text-item--number"
                    :style="style"
                    :end-val="copyItem.number"
                    :decimals="copyItem.decimals"
                    :show-zero="false"
                    v-bind="$attrs"
                    v-if="copyItem.number || copyItem.number == 0"
                />
                <span class="text-item--unit">{{ copyItem.unit }}</span>
            </div>
        </div>
        <slot name="after" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITextItem } from '../../../../types/index'
import { MY_TEXT_ITEM } from '../../config'

@Component({
    name: 'MyTextItem',
    components: {},
})
export default class MyTextItem extends Vue {
    /** 布局，默认水平 */
    @Prop({ default: () => 'row' }) layout!: 'column' | 'row'
    /** 弹性合布局类型 */
    @Prop({ default: () => 'start' }) flexType!: 'start' | 'center' | 'end'
    /** item配置项 */
    @Prop({ default: () => ({}) }) item!: ITextItem
    /** 数字颜色 */
    @Prop({ default: () => '#00FFFF' }) color!: string
    /** 数字字体大小 */
    @Prop({ default: () => '30px' }) fontSize!: string
    /** 数字样式 */
    @Prop({ default: () => {} }) numberStyle!: Record<string, any>
    /** 接口返回的数据对象 */
    @Prop({ default: () => {} }) resData!: Record<string, any>
    get style() {
        const obj = {
            ...this.numberStyle,
            color: this.color || MY_TEXT_ITEM.color,
            'font-size': this.fontSize || MY_TEXT_ITEM.fontSize,
            'line-height': this.fontSize || MY_TEXT_ITEM.fontSize,
        }
        return obj
    }
    get copyItem() {
        // console.log('【my-text-item】:item', this.item)
        // console.warn('【my-text-item】:resData', this.resData)
        // todo 没有传递接口数据
        if (!this.resData) return { ...this.item }
        const { key = '', number } = this.item
        // todo 没有number字段
        if (number === null || number === undefined) {
            return { ...this.item }
        }
        if (!this.isObject(this.resData)) {
            Promise.reject(`注意:组件my-text-item的resData属性必须为对象!!!`)
            return { ...this.item }
        }
        // todo 根据接口传的数据对number进行处理
        return { ...this.item, number: this.resData?.[key] ?? '--' }
    }
    created() {}
    mounted() {}
    isObject(val: any) {
        return Object.prototype.toString.call(val) === `[object Object]`
    }
}
</script>

<style lang="less" scoped>
.my-text-item {
    display: flex;
    align-items: center;
    color: #fff;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 24px;

    .text-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .is-start {
        align-items: center;
        justify-content: flex-start;
    }

    .is-center {
        align-items: center;
        justify-content: center;
    }

    .is-end {
        align-items: center;
        justify-content: flex-end;
    }

    .is-vertical {
        flex-direction: column;

        &.is-start {
            align-items: flex-start;
        }

        &.is-center {
            align-items: center;
        }

        &.is-end {
            align-items: flex-end;
        }

        .text-item--number {
            margin: 0 4px 0 0;
        }
        .text-item--title {
            margin-bottom: 4px;
        }
    }

    .text-item__right {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    // .text-item--title {
    //     line-height: 24px;
    // }

    .text-item--number {
        margin: 0 4px 0 6px;
        letter-spacing: 1px;
        font-weight: bold;
        font-size: 30px;
        // font-family: Digital_Regular;
        font-family: DINAlternate-Bold;
    }

    .text-item--unit {
        margin-left: 4px;
        color: rgba(255, 255, 255, 0.7);
    }
}
</style>
