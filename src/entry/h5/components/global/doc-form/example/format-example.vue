<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { CustomFormatModel } from '../extends/dataStore/CustomFormatModel'

@Component({
    name: 'FormatExample',
})
export default class FormatExample extends CustomFormatModel {
    @Prop({ type: String, default: '' })
    public label!: string

    public data = {
        v1: '1',
        v2: '2',
    }

    /*
     * $attrs 的属性都是从 app-form 中传递过来的
     * @See: @h5/components/global/app-form/index.vue
     *  */
    public get required() {
        // return !!this.$attrs.required
        return true
    }

    public validate(): Promise<void> {
        if (!this.data.v1 || !this.data.v2) {
            return Promise.reject()
        }
        return Promise.resolve()
    }
}
</script>

<template>
    <div class="format-example__container">
        <div class="format-example__right">
            <div>
                <van-field
                    autosize
                    type="textarea"
                    :rules="[{ required, message: `${label}为必填项` }]"
                    class="my-input custom-form-cell"
                    :required="required"
                    v-model="data.v1"
                    :label="`${label}__custom`"
                    placeholder="请输入"
                ></van-field>
            </div>

            <div>
                <van-field
                    autosize
                    type="textarea"
                    :rules="[{ required, message: `${label}为必填项` }]"
                    class="my-input custom-form-cell"
                    :required="required"
                    v-model="data.v2"
                    :label="`${label}__custom`"
                    placeholder="请输入"
                ></van-field>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.format-example {
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
