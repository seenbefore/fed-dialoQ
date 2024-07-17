<!--
   卡片数字 - 组件
-->
<template>
    <div class="my-card-number">
        <div class="card-number__top sg-m-b-8">
            <span class="card-number__top-title" v-if="item.title">
                {{ item.title }}
            </span>
            <span class="card-number__top-unit" v-if="item.unit">
                {{ item.unit }}
            </span>
        </div>
        <div class="card-number__bottom">
            <my-count-to
                v-for="(val, index) in `${item.number}`"
                :key="index"
                :class="['digit-number', `dot-${dotFlex}`, val === '.' && 'is-dot']"
                :end-val="val"
                :decimals="0"
                :show-zero="false"
                :style="bindStyle"
            ></my-count-to>
            <div class="ratio-content sg-m-l-4" v-if="item.ratioItem">
                <my-text-item layout="column" color="#FF5252" font-size="24px" :item="item.ratioItem" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ITextItem } from '../../../../types/index'

type FlexType = 'start' | 'center' | 'end'

interface CardNumber {
    number: number | string
    key: string
    title?: string
    unit?: string
    ratioItem?: ITextItem
    /** 其它属性 */
    [propName: string]: any
}

@Component({
    name: 'MyCardNumber',
    components: {},
})
export default class MyCardNumber extends Vue {
    @Prop({ type: Object, default: () => {} }) item!: CardNumber
    @Prop({ type: String, default: 'start' }) dotFlex!: FlexType
    @Prop({ type: Number, default: 26 }) width!: number
    @Prop({ type: Number, default: 42 }) height!: number
    @Prop({ type: Number, default: 6 }) gutter!: number
    @Prop({ type: String, default: '24px' }) fontSize!: string
    @Prop({ type: String, default: '#00ffcc' }) color!: string
    get bindStyle() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
            color: this.color,
            'font-size': this.fontSize,
            'margin-right': this.gutter + 'px',
        }
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.my-card-number {
    display: flex;
    flex-direction: column;

    .card-number__top {
        display: flex;
        align-items: flex-end;

        .card-number__top-title {
            font-size: 22px;
            line-height: 22px;
        }

        .card-number__top-unit {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
        }
    }

    .card-number__bottom {
        display: flex;
        flex-wrap: nowrap;
    }

    .digit-number {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        justify-content: center;
        padding: 0 3px;
        background-image: url('./assets/bg-digit.svg');
        background-size: 100% 100%;
        font-family: Digital_Regular;

        &.is-dot {
            &.dot-start {
                justify-content: flex-start;
            }

            &.dot-center {
                justify-content: center;
            }

            &.dot-end {
                justify-content: flex-end;
            }
        }

        &:last-child {
            margin-right: 0 !important;
        }
    }

    .ratio-content {
        display: flex;
        align-items: center;

        ::v-deep {
            .my-text-item {
                .text-item--title {
                    color: #00ffff;
                    font-size: 18px;
                    line-height: 18px;
                }

                .text-item__right {
                    display: flex;
                    color: #ff5252;
                    font-size: 24px;
                    font-family: Digital_Regular;
                    line-height: 24px;

                    .text-item--number {
                        font-family: Digital_Regular;
                    }

                    .text-item--unit {
                        margin-left: 6px;
                        color: #ff5252;
                    }
                }
            }
        }
    }
}
</style>
