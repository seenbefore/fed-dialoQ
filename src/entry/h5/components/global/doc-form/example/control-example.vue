<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { CustomControlModel } from '../extends/dataStore/CustomControlModel'

@Component({
    name: 'ControlExample',
})
export default class ControlExample extends CustomControlModel {
    @Prop({ type: String, default: '' })
    public label!: string
}
</script>

<template>
    <div class="control-example__container">
        <van-field autosize type="textarea" class="my-input custom-form-cell" v-model="value" v-bind="$attrs" :label="`${label}__custom`" placeholder="请输入" @input="update"></van-field>
    </div>
</template>

<style scoped lang="less">
.control-example {
    &__container {
        display: flex;
    }

    &__left {
        color: #646566;
    }

    &__right {
        flex: 1;
        text-align: right;
    }
}
</style>
