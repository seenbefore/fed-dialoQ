<!-- home -->
<template>
    <div class="page-box list-box">
        <van-tabs v-model="active">
            <van-tab title="标签 1">
                <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">全局过滤器</van-divider>
                <p class="mt30 mb30 fz18">
                    <span class="fz13">手机号中间四位隐藏：</span>
                    {{ '13717135460' | hidePhone }}
                </p>
                <p class="mt30 mb30 fz18">
                    <span class="fz13">金额千分位分隔：</span>
                    {{ 6857653210 | thousands }}
                </p>

                <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">防抖节流函数</van-divider>
                <van-row class="ta-c" type="flex" justify="center">
                    <van-col span="12">
                        <van-button type="info" size="small" @click="debounceFn('wxy')">函数防抖</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button type="info" size="small" @click="throttleFn">函数节流</van-button>
                    </van-col>
                </van-row>

                <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">页面跳转/ajax请求/session操作</van-divider>
                <!-- layout 布局 -->
                <van-row class="mt20" gutter="20">
                    <van-col span="8">
                        <van-button type="info" size="small" @click="goAbout">去关于我页面</van-button>
                    </van-col>
                    <van-col span="8">
                        <van-button type="info" size="small" @click="loginBtn">登录请求</van-button>
                    </van-col>
                    <van-col span="8">
                        <van-button type="info" size="small" @click="sessionBtn">session操作</van-button>
                    </van-col>
                </van-row>
            </van-tab>
            <van-tab title="标签 2">
                <van-cell icon="success" v-for="item in list" :key="item" :title="item" />
            </van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">
                444
            </van-tab>
            <van-tab title="标签 5">内容 5</van-tab>
            <van-tab title="标签 6">内容 6</van-tab>
            <van-tab title="标签 7">内容 7</van-tab>
            <van-tab title="标签 8">内容 8</van-tab>
        </van-tabs>
    </div>
</template>

<script>
//import { Debounce, Throttle } from 'icinfo-util'
import { debounce, throttle } from 'lodash'
export default {
    data() {
        return {
            active: 0,
            list: [
                'Vue-cli4',
                '配置多环境变量',
                'VantUI 组件按需加载',
                'Sass 全局样式',
                'Webpack 4',
                'Vuex 状态管理',
                'Axios 封装及接口管理',
                'Vue-router',
                'Webpack 4 vue.config.js 基础配置',
                '配置 proxy 跨域',
                '配置 alias 别名',
                '配置 打包分析',
                '配置 externals 引入 cdn 资源',
                '去掉 console.log',
                'splitChunks 单独打包第三方模块',
                '添加 IE 兼容',
                'Eslint+Pettier 统一开发规范',
            ],
        }
    },
    mounted() {},
    methods: {
        goAbout() {
            //this.$router.push('/about')
        },
        // 登录
        loginBtn() {
            let data = {
                userName: 'admin',
                password: 123456,
            }
        },
        sessionBtn() {
            this.$toast('session 存储成功')
        },
        // 按钮防抖
        debounceFn: debounce(function(val) {
            // this.queryUsers() 执行函数
            this.$toast.success('函数防抖...')
            console.log(val)
        }, 1000),
        // 按钮节流
        throttleFn: throttle(function(val) {
            // this.queryUsers() 执行函数
            this.$toast.success('函数节流...')
            console.log(val)
        }, 2000),
    },
}
</script>
<style lang="less" scope>
.list-box {
    padding: 0;
    background: #fff;
    box-sizing: border-box;
    .van-tabs {
        .van-tabs__content {
            padding: 10px;
        }
    }
}
</style>
