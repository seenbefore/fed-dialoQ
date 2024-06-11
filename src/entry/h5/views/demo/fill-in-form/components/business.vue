<template>
    <div class="business-comp">
        <van-field
            class="tree-selecter"
            type="textarea"
            row="1"
            autosize
            readonly
            :placeholder="placeholder"
            :right-icon="'arrow'"
            :value="myValue"
            v-bind="$attrs"
            @click="openSelecterPopup"
        ></van-field>

        <van-popup class="popup-selecter" v-model="showPopup" position="bottom">
            <div class="popup-main">活动事项---自定义的内容</div>
            <div class="popup-footer">
                <van-button type="default" @click="handlePopup('cancel')">取消</van-button>
                <van-button type="primary" @click="handlePopup('confirm')">确定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'BusinessComp',
    components: {},
})
export default class BusinessComp extends Vue {
    /**当前值 */
    @Prop({ default: '' }) value!: string
    @Prop({ default: '请选择' }) placeholder?: string

    /** 弹窗显示 */
    public showPopup = false

    get myValue() {
        return this.value
    }

    // 弹出处罚事项选择框
    openSelecterPopup() {
        this.showPopup = true
    }
    // 操作弹出框
    handlePopup(type: string) {
        this.showPopup = false
        if (type === 'confirm') {
            this.$emit('change', '这是demo数据')
        }
    }
}
</script>

<style lang="less" scoped>
.business-comp {
    ::v-deep {
        .van-cell--required::before {
            left: -8px;
        }
        .van-cell::after {
            bottom: -10px;
        }
        .van-field__control--right {
            height: 25px !important;
        }
        .popup-selecter {
            height: 100%;
            padding: 30px 20px;
        }
        .popup-main {
            height: calc(100% - 50px);
            margin-bottom: 8px;
            padding: 10px;
            border: 1px dashed #ccc;
        }
        .popup-footer {
            text-align: center;
        }
        .van-button {
            width: 120px;
            height: 35px;
            margin: 0 20px;
        }
    }
}
</style>
