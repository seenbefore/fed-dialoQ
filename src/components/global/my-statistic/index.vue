<template>
    <div class="my-statistic">
        <div class="head">
            <span class="title" v-text="title"></span>
        </div>
        <div class="con">
            <span class="prefix">
                <slot name="prefix"></slot>
            </span>
            <span class="number">
                <slot name="formatter">{{ value$ }}</slot>
            </span>
            <span class="suffix">
                <slot name="suffix"></slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
//import 'github-markdown-css/github-markdown.css'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'MyStatistic',
    components: {},
})
export default class MyStatistic extends Vue {
    @Prop() value!: number
    @Prop() title!: string
    get value$() {
        return this.value
    }
    // @Watch('value')
    // myValue(val: any) {
    //     console.log(11, val)
    // }

    created() {}
    mounted() {}
}
</script>

<style lang="less">
.my-statistic {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    text-align: center;
    .head {
        margin-bottom: 4px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
    }
    .con {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: inline-block;
            margin: 0;
            line-height: 100%;
        }
        .number {
            font-size: 20px;
            padding: 0 4px;
        }
    }
}
</style>
