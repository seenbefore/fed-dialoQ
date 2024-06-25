<template>
    <div id="new-caibao" class="new-caibao-front  " :class="{ 'new-caibao-hided': hide }">
        <div class="top-img-container ">
            <img class="top-img-close" @click="show(false)" src="./assets/close.png" alt="关闭" :style="hide ? 'display: none;' : 'display: block;'" />
            <div class="top-img-box " @click="show(true)">
                <img class="top-img" ref="logo" src="./assets/logo.png" alt="" :class="{ 'caibao-hide': hide, 'caibao-show': !hide }" />
            </div>
        </div>
        <div class="assist-list-container" :class="{ 'assist-menu-hide': hide }">
            <!-- <div class="assist-list-item">
                <img class="assist-list-item-img" src="https://sitecdn.zcycdn.com/f2e-assets/66273baf-61be-4d46-9614-a65124203ad5.png" alt="顶部图片" />
                <div class="sub-assist-list-container">
                    <div class="sub-assist-list-item" data-link="https://service.zcygov.cn/#/feedbacks" data-type="1">
                        <div class="sub-assist-list-item-img-box">
                            <i class="sub-assist-list-item-img caibao-iconfont icon-yijianfankui el-icon-edit"></i>
                        </div>
                        <div class="sub-assist-list-item-text-box">
                            <div class="sub-assist-list-item-title">意见反馈</div>
                            <div class="sub-assist-list-item-desc">建议与需求反馈 全程跟进</div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <div class="assist-list-item">
                <img class="assist-list-item-img" src="https://sitecdn.zcycdn.com/f2e-assets/40e0c720-6669-4c3d-bfe0-2983ffb54881.gif" alt="顶部图片" />
                <div class="sub-assist-list-container">
                    <div class="sub-assist-list-item" data-utm-click="d1006" data-link="https://e-learning.zcygov.cn/live/center" data-type="1">
                        <div class="sub-assist-list-item-img-box">
                            <i class="sub-assist-list-item-img caibao-iconfont icon-caiyun-live"></i>
                        </div>
                        <div class="sub-assist-list-item-text-box">
                            <div class="sub-assist-list-item-title">直播平台</div>
                            <div class="sub-assist-list-item-desc">培训答疑零距离 快速通道</div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="assist-list-item">
                <img class="assist-list-item-img" src="./assets/qrcode.png" alt="顶部图片" />
                <div class="sub-img-text-list-container">
                    <div class="sub-img-text-list-item" data-condition="0">
                        <img class="sub-img-text-list-item-img" src="./assets/majinhui.jpg" alt="图片" />
                        <div class="sub-img-text-list-item-name">打开企微 扫码咨询</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="new-caibao-return-top">
            <div class="new-caibao-js-return-top">
                <img src="https://sitecdn.zcycdn.com/f2e-assets/bfef889c-5588-45ef-97a7-fd92dc01d3ca.png" alt="返回顶部" />
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MySecretary extends Vue {
    private hide = true
    private timerId: any

    show(action: boolean) {
        this.hide = !action
    }
    peeping() {}
    beforeDestroy() {
        if (this.timerId) {
            clearInterval(this.timerId)
        }
    }
}
</script>

<style scoped lang="less">
#new-caibao {
    position: fixed;
    bottom: 180px;
    right: 15px;
    z-index: 999;
}
#new-caibao.new-caibao-hidden {
    display: none;
}
#new-caibao.new-caibao-hided {
    right: -48px;
    &:hover {
        .top-img {
            right: -38px !important;
        }
    }
}
#new-caibao.new-caibao-hided .top-img {
    -webkit-transform: translateX(-63px) rotate(-30deg) !important;
    -ms-transform: translateX(-63px) rotate(-30deg) !important;
    transform: translateX(-63px) rotate(-30deg) !important;
}
#new-caibao.new-caibao-back .assist-list-container {
    background: #4988ff;
}
#new-caibao.new-caibao-back .assist-list-container .assist-list-item {
    background: #4988ff;
}
#new-caibao.new-caibao-back .assist-list-container .assist-list-item:hover {
    background: #115dea;
}
#new-caibao.new-caibao-back .assist-list-container .assist-list-item .sub-img-text-list-container,
#new-caibao.new-caibao-back .assist-list-container .assist-list-item .sub-assist-list-container {
    border: 1px solid #c8daff;
}
#new-caibao.new-caibao-back .new-caibao-message {
    background: #4988ff;
}
#new-caibao.new-caibao-back .new-caibao-message .new-caibao-message-header .content {
    color: #fff;
}
#new-caibao .top-img-container {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#new-caibao .top-img-container.draggable {
    cursor: move;
}
#new-caibao .top-img-container .top-img-close {
    position: absolute;
    right: 0;
    top: -15px;
    height: 12px;
    width: 12px;
    cursor: pointer;
}
#new-caibao .top-img-container .top-img-box {
    width: 48px;
    height: 48px;
}
#new-caibao .top-img-container .top-img-box .top-img {
    position: relative;
    top: 10px;
    display: block;
    width: 40px;
    height: 48px;
    z-index: -1;
    margin: 0 auto;
    -webkit-app-region: no-drag;
}
#new-caibao .top-img-container .top-img-box.top-img-box-hide {
    visibility: hidden;
    height: 0;
}
#new-caibao .assist-list-container {
    -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
}
#new-caibao .assist-list-container .assist-list-item {
    width: 48px;
    height: 48px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    position: relative;
    cursor: pointer;
}
#new-caibao .assist-list-container .assist-list-item:hover {
    background: #f7f7f7;
}
#new-caibao .assist-list-container .assist-list-item:hover .sub-assist-list-container,
#new-caibao .assist-list-container .assist-list-item:hover .sub-img-text-list-container {
    display: block;
}
#new-caibao .assist-list-container .assist-list-item .assist-list-item-img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: #fff;
    width: 220px;
    -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 50%;
    left: -10px;
    -webkit-transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
    display: none;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 10px;
    height: 100%;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item {
    height: 58px;
    padding: 9px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    display: block;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-img-box {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 9px;
    top: 9px;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-img-box .sub-assist-list-item-img {
    color: #4a4a4a;
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-text-box {
    width: 150px;
    height: 40px;
    position: absolute;
    right: 9px;
    top: 9px;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-text-box .sub-assist-list-item-title,
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-text-box .sub-assist-list-item-desc {
    height: 20px;
    line-height: 20px;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-text-box .sub-assist-list-item-title {
    color: #4a4a4a;
    font-size: 14px;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item .sub-assist-list-item-text-box .sub-assist-list-item-desc {
    color: #9b9ea0;
    font-size: 12px;
}
#new-caibao .assist-list-container .assist-list-item .sub-assist-list-container .sub-assist-list-item:hover * {
    color: #197aff !important;
}
#new-caibao .assist-list-container .assist-list-item .sub-img-text-list-container {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: -10px;
    -webkit-transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
    padding: 12px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    font-size: 0;
    white-space: nowrap;
    display: none;
}
#new-caibao .assist-list-container .assist-list-item .sub-img-text-list-container::before {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 10px;
    height: 100%;
}
#new-caibao .assist-list-container .assist-list-item .sub-img-text-list-container .sub-img-text-list-item {
    width: 156px;
    display: inline-block;
    vertical-align: top;
}
#new-caibao .assist-list-container .assist-list-item .sub-img-text-list-container .sub-img-text-list-item .sub-img-text-list-item-img {
    width: 118px;
    height: 118px;
    display: block;
    margin: 0 auto;
}
#new-caibao .assist-list-container .assist-list-item .sub-img-text-list-container .sub-img-text-list-item .sub-img-text-list-item-name {
    width: 118px;
    margin: 4px auto 0;
    white-space: pre-wrap;
    text-align: center;
    font-size: 14px;
    color: #4a4a4a;
}
#new-caibao .new-caibao-message {
    position: absolute;
    bottom: -64px;
    right: 0;
    z-index: 99999;
    -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    -webkit-border-radius: 48px;
    border-radius: 48px;
    cursor: pointer;
    display: none;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    background-color: #fff;
}
#new-caibao .new-caibao-message.new-caibao-message-hidden {
    display: none !important;
}
#new-caibao .new-caibao-message .new-caibao-message-header {
    position: relative;
    height: 100%;
    width: 48px;
    overflow: hidden;
    padding: 12px;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#new-caibao .new-caibao-message .new-caibao-message-header .img {
    height: 24px;
    width: 24px;
    vertical-align: middle;
}
#new-caibao .new-caibao-message .new-caibao-message-header .content {
    position: absolute;
    font-size: 14px;
    color: #197aff;
    left: 48px;
    top: 14px;
    display: inline-block;
    width: 56px;
}
#new-caibao .new-caibao-message .new-caibao-message-header:hover {
    width: 116px;
}
#new-caibao .new-caibao-message .small-circle {
    width: 10px;
    height: 10px;
    top: 5px;
    right: 0px;
    background: #ff594b;
    position: absolute;
    -webkit-border-radius: 20px;
    border-radius: 20px;
}
#new-caibao .new-caibao-message .circle {
    width: 20px;
    height: 20px;
    line-height: 20px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    background: #ff594b;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: -3px;
    right: -4px;
    color: #fff;
}
#new-caibao .new-caibao-return-top {
    display: none;
    position: absolute;
    bottom: -160px;
    -webkit-box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
    cursor: pointer;
    background: #fff;
}
#new-caibao .new-caibao-return-top:hover {
    background: #f7f7f7;
}
#new-caibao .new-caibao-return-top .new-caibao-js-return-top {
    width: 48px;
    height: 48px;
    position: relative;
}
#new-caibao .new-caibao-return-top .new-caibao-js-return-top img {
    width: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.caibao-hide {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: caibaoAnimationHide;
    animation-name: caibaoAnimationHide;
    -webkit-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
}
.caibao-show {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: caibaoAnimationShow;
    animation-name: caibaoAnimationShow;
    &.caibao-hide-mouseover {
        right: 0 !important;
    }
}
.caibao-hide-mouseover {
    right: -38px !important;
}
@-webkit-keyframes caibaoAnimationShow {
    0% {
        right: -38px;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
        top: 10px;
    }
    40% {
        right: 0px;
        top: -15px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    90% {
        right: 0px;
        top: -3px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 0px;
    }
    100% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
}
@keyframes caibaoAnimationShow {
    0% {
        right: -38px;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
        top: 10px;
    }
    40% {
        right: 0px;
        top: -15px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    90% {
        right: 0px;
        top: -3px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 0px;
    }
    100% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
}
@-webkit-keyframes caibaoAnimationHide {
    0% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
    40% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
    100% {
        right: -42px;
        top: 20px;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
    }
}
@keyframes caibaoAnimationHide {
    0% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
    40% {
        right: 0px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        top: 2px;
    }
    100% {
        right: -42px;
        top: 20px;
        -webkit-transform: rotate(-30deg);
        transform: rotate(-30deg);
    }
}
.caibao-hide-fast {
    right: -42px;
    -webkit-transform: rotate(-30deg);
    -ms-transform: rotate(-30deg);
    transform: rotate(-30deg);
}
.assist-menu-hide {
    opacity: 0;
    -webkit-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
}
.assist-menu-show {
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
}
.assist-menu-hide-fast {
    opacity: 0;
}
</style>
