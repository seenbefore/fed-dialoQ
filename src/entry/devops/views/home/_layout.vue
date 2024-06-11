<template>
    <div class="next-shell next-shell-light Home">
        <header class="next-shell-header">
            <div class="nav-branding">
                <div class="branding-logo" style="background-image: url(/static/logo.png)"></div>
                <div class="branding-text" v-text="title"></div>
            </div>
            <div class="next-navigation">
                <ul class="next-menu">
                    <li class="next-menu-item">
                        <router-link class="next-menu-item-link" to="/home/index">开始</router-link>
                    </li>
                </ul>
            </div>
            <div class="nav-action">
                <div class="base-info-actions"></div>
                <div class="base-info-custom">
                    <button class="next-btn  simple" @click="goAdmin">
                        工作台
                        <!-- <i class="el-icon-setting" style="font-size: 16px"></i> -->
                    </button>
                    <span class="next-split"></span>
                    <button class="next-btn simple" v-text="userInfo.name || '游客'"></button>
                </div>
            </div>
        </header>
        <div class="next-shell-body">
            <router-view></router-view>
        </div>
        <div class="app-footer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { userStore, settingsStore } from '@/entry/devops/store/useStore'
@Component({
    name: 'Home',
    components: {},
})
export default class Home extends Vue {
    get title() {
        return settingsStore.title
    }
    get userInfo() {
        return userStore.info
    }
    goAdmin() {
        this.$router.push('/devops/pipeline')
    }
}
</script>

<style lang="less"></style>
