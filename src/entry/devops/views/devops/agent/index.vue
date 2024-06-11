<template>
    <div class="sg-page page-devops-agent sg-p-0">
        <div class="header-box">
            <div>
                <span class="title">远程主机</span>
            </div>
        </div>
        <div class="content-box">
            <div class="list-box sg-mt-4">
                <div class="list-header-box sg-mb-2">
                    <span class="title">nginx vhost</span>
                </div>
                <div class="list-content-box"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import _ from 'lodash'
interface FormModel {
    target?: string
}
@Component({
    name: 'DevopsAgent',
    components: {},
})
export default class DevopsAgent extends Vue {}
</script>

<style lang="less" scoped>
.header-box {
    height: 48px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 24px;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: #39424f;
    }
}
.content-box {
    padding: 0 24px;
    height: calc(100% - 48px);
    overflow-y: auto;
}

.list-content-box {
    background: #fff;
    border: 1px solid #dadfe6;
}
</style>
