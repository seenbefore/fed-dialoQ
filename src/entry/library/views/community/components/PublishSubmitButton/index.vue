<template>
    <!-- 发布 -->
    <div
        class="UploadIcon__StyledUploadIcon-sc-1u0zvrd-0  upload-icon-container PublishButton"
        v-bind="$attrs"
        v-on="$listeners"
        @click="handleClick"
        :style="myLoading ? 'opacity:0.5;cursor: not-allowed;' : ''"
    >
        <template v-if="myLoading">
            <div class="loading-box">
                <i class="el-icon-loading"></i>
            </div>
        </template>
        <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon upload-icon" viewBox="0 0 28 24">
                <path
                    d="M14 12.703l5.397 5.09-1.8 1.699-2.325-2.194V24h-2.544v-6.704l-2.325 2.196-1.8-1.698L14 12.704zM14 0c4.52 0 8.324 3.196 8.845 7.433 3.266.84 5.426 3.767 5.128 6.948-.298 3.182-2.969 5.706-6.34 5.993L21.63 18c.004-3.927-3.327-7.132-7.488-7.206-4.161-.074-7.618 3.012-7.77 6.936l-.005.27v2.374c-3.372-.287-6.042-2.81-6.34-5.992-.299-3.182 1.86-6.109 5.127-6.95C5.675 3.197 9.479 0 14 0z"
                    fill="#FFF"
                    fill-rule="nonzero"
                ></path>
            </svg>
        </template>

        <span v-for="(item, index) in textList" :key="index">{{ item }}</span>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { userStore } from '@/entry/library/store/useStore'

@Component({
    name: 'PublishSubmitButton',
    components: {},
})
export default class PublishSubmitButton extends Vue {
    @Prop({ default: '确认发布' }) text!: string
    @Prop({ default: false }) loading!: boolean
    get textList() {
        return this.text.split('')
    }
    get myLoading() {
        return this.loading
    }
    mounted() {}
    handleClick() {
        if (this.myLoading) {
            console.log(`正在发布`)
            return
        }

        this.$emit('submit')
    }
}
</script>
<style lang="less" scoped>
.PublishButton {
    .loading-box {
        width: 28px;
        height: 24px;
        margin-bottom: 16px;
        text-align: center;
    }
    display: flex;
    position: fixed;
    right: 15px;
    top: calc(50% - 103px);
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    overflow: hidden;
    width: 54px;
    height: 157px;
    background: rgb(22, 132, 252);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 6px -4px, rgba(22, 132, 252, 0.37) 0px 6px 16px;
    padding: 15px 0px;
    border-radius: 27px;
    transition: height 0.2s ease 0s, top 0.2s ease 0s;
    cursor: pointer;
    z-index: 2000;

    &:hover,
    &:active {
        background: rgb(17, 105, 201);
    }

    .upload-icon {
        flex-shrink: 0;
        width: 28px;
        height: auto;
        display: block;
        margin-bottom: 16px;
    }
}
</style>
