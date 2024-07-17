<template>
    <div class="my-map-statis">
        <div class="mms-title">
            <span class="mms-label">{{ label }}</span>
            <span>：</span>
        </div>
        <div class="mms-value">{{ value }}</div>
        <div class="mms-unit">{{ unit }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MyMapStatis',
    components: {},
})
export default class MyMapStatis extends Vue {
    @Prop({ type: String, default: '' }) label!: any
    @Prop({ type: [String, Number], default: '' }) value!: any
    @Prop({ type: String, default: '' }) unit!: any
}
</script>

<style lang="less" scoped>
.my-map-statis {
    display: flex;
    align-items: center;
    margin: 10px 0;
    color: #fff;
    font-size: 14px;
    line-height: 1;
    .mms-title {
        .mms-label {
        }
    }
    .mms-value {
        color: #29e8ff;
        font-family: DS-Digital;
    }
    .mms-unit {
        margin-left: 4px;
    }
}
</style>
