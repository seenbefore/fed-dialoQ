<template>
    <div class="MobileNotFound">
        <div class="content">
            <div class="icon">
                <img src="./assets/404@2x.png" alt="" />
            </div>
            <div class="subtitle">
                您访问的页面不存在，回到
                <router-link to="/" class="link">首页</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'MobileNotFound',
    components: {},
})
export default class MobileNotFound extends Vue {}
</script>

<style lang="less" scoped>
.MobileNotFound {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    .content {
        width: 80%;
        margin: 0 auto;
    }
    .icon {
        img {
            width: 100%;
        }
        margin-bottom: 30px;
    }
    .subtitle {
        font-size: 16px;
        color: #666;
        text-align: center;
    }
    .link {
        color: var(--color-primary);
    }
}
</style>
