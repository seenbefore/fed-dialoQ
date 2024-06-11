<script lang="ts">
import PublicList from '@zlb-h5/components/share/public-list.vue'
import { TableModel } from '@zlb-h5/mixins/TableModel'
import { appStore } from '@zlb-h5/store/useStore'
import { Toast } from 'vant'
import { Component, Vue } from 'vue-property-decorator'

/* 使用 TableModel 和 PublicList 结合的一个列表上拉刷新下拉加载案例 */
@Component({
    name: 'Index',
    components: {
        PublicList,
    },
})
export default class Index extends Vue {
    public tableModel = new TableModel<number>()

    public data: Array<any> = [1]

    public get module() {
        return appStore.appSysInfo.uiStyle
    }

    /* 获取数据 */
    public fetchData() {
        const loading = Toast.loading('加载中...')
        setTimeout(() => {
            this.tableModel.total = 100
            this.tableModel.push(new Array(10).fill(1).reduce((pre: Array<number>, _) => pre.concat(Math.ceil(Math.random() * 10)), []))
            loading.close()
        }, 500)
    }

    public updateModule(uiStyle: 'elder' | 'normal') {
        this.$store.commit('app/updateAppSysInfo', { uiStyle })
    }

    public created() {
        this.tableModel.onLoad(this.fetchData, true)
        this.tableModel.load()
    }
}
</script>

<template>
    <div class="index-list__container base__container wh100p">
        <van-button type="primary" @click="updateModule(module === 'elder' ? 'normal' : 'elder')">切换{{ module === 'elder' ? '标准版' : '老年版' }}</van-button>
        <br />
        <div class="font-13">13</div>
        <div class="font-14">14</div>
        <div class="font-15">15</div>
        <div class="font-16">16</div>
        <public-list :table-model="tableModel">
            <div class="index-list__item" v-for="item in tableModel.tableData" :key="item">{{ item }}</div>
        </public-list>
    </div>
</template>

<style scoped lang="less">
@import '../../assets/less/var.less';

.font-13 {
    font-size: 13px;
}

.font-14 {
    font-size: 14px;
}

.font-15 {
    font-size: 15px;
}

.font-16 {
    font-size: 16px;
}

.index-list {
    &__container {
        background-color: #fff;
        overflow: auto;
    }

    &__item {
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
    }
}
</style>
