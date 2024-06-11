<template>
    <div class="IndexHome">
        <div class="header">
            <van-search v-model="value" placeholder="请输入搜索关键词" />
        </div>
        <div class="banner">
            <van-swipe :autoplay="3000000">
                <van-swipe-item v-for="(image, index) in images" :key="index" :style="`background-image:url(${image})`"></van-swipe-item>
            </van-swipe>
        </div>
        <van-notice-bar left-icon="volume-o" text="注意：页面宽度375px " />
        <van-notice-bar
            left-icon="volume-o"
            text="线上调试 环境变量设置
VUE_APP_ERUDA = true"
        />
        <van-notice-bar left-icon="volume-o" text="路由meta.keepAlive = true 则页面缓存" />
        <van-notice-bar left-icon="volume-o" text="基础类BasePage放公共的方法 比如回退、分享等" />
        <div class="main">
            <van-grid>
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
            </van-grid>
        </div>

        <div class="section">
            <van-button type="primary">主要按钮</van-button>
            <van-button type="info">信息按钮</van-button>
            <van-button type="default">默认按钮</van-button>
            <van-button type="warning">警告按钮</van-button>
            <van-button type="danger">危险按钮</van-button>
        </div>
        <span>Index</span>
        <p class="link-a">
            <router-link to="/demo/a">跳转a</router-link>
        </p>
        <p class="link-a">
            <router-link to="/demo/online-view">预览pdf</router-link>
        </p>
        <p class="link-a">
            <router-link to="/demo/fill-in-form">表单填写</router-link>
        </p>
        <p class="link-a">
            <router-link to="/demo/scroll-list">滚动列表</router-link>
        </p>
        <div class="box-container">
            <div class="banner"></div>
            <div class="box inputBox">
                <div>
                    <div class="box-item">
                        <label class="label">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
                        <span></span>
                        <input type="text" placeholder="信息保密，仅用于生成保单" maxlength="20" class="input" />
                    </div>
                    <div class="box-item">
                        <label class="label">身份证</label>
                        <input type="text" placeholder="信息保密，仅用于生成保单" maxlength="18" class="input" />
                    </div>
                    <div class="box-item">
                        <label class="label">手机号</label>
                        <input type="tel" placeholder="您的信息将被严格保密" disabled="disabled" class="input" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BasePage } from '@/entry/h5/mixins'
@Component({
    name: 'IndexHome',
    components: {},
})
export default class IndexHome extends BasePage {
    value = ''
    images = ['https://img01.yzcdn.cn/vant/apple-1.jpg', 'https://img01.yzcdn.cn/vant/apple-2.jpg']
    mounted() {}
}
</script>

<style lang="less" scoped>
.IndexHome {
    background-color: #fff;
    .banner {
        width: 375px;
        height: 200px;
        background: red;
    }
    .link-a {
        padding: 10px;
        margin: 0;
        border-bottom: 1px solid #ddd;
        a {
            color: #1989fa;
        }
    }
    ::v-deep {
        .van-swipe {
            height: 100%;
        }
        .van-swipe-item {
            width: 100%;
            height: 100%;

            background-size: cover;
        }
    }
}
.box-container {
    .banner {
        height: 400px;
        width: 375px;
        background: url(https://cdns.bountech.com/marketfront/insurancecdn/img/header.a8bf259c.png) no-repeat;
        background-size: 100%;
    }
}
.box {
    padding: 20px;
    margin: 15px 10px;
    margin-top: -80px;
    font-size: 16px;
    border-radius: 15px;
    background-color: #fff;
    -webkit-box-shadow: 0 1px 10px 0 rgba(200, 133, 85, 0.24);
    box-shadow: 0 1px 10px 0 rgba(200, 133, 85, 0.24);
}
.box .box-item {
    margin: 0 3% 12px;
    width: 94%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 24px;
    background-color: #f2f2f2;
}

.box .box-item .input,
.box .box-item .label {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
}

.box .box-item .label {
    width: 90px;
    text-align: center;
}

.box .box-item .input {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 0;
    outline: none;
    background-color: unset;
}

.box .box-item .input-width {
    width: 120px;
}
</style>
