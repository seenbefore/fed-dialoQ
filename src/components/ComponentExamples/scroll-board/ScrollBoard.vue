<template>
    <div class="sg-page AdminFeatScrollBoard">
        <span>轮播表</span>
        <ScrollBoard :config="config" style="width:500px;height:200px;background-color:#1a3674;" @click="handleClick" @scroll="handleScroll"></ScrollBoard>
    </div>
</template>

<script lang="ts">
import { CreateElement } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import ScrollBoard from '@/components/ScrollBoard/index.vue'

const rankImgs = ['icon-rank1.png', 'icon-rank2.png', 'icon-rank3.png']

@Component({
    name: 'AdminFeatScrollBoard',
    components: {
        ScrollBoard,
    },
})
export default class AdminFeatScrollBoard extends Vue {
    config = {
        headerBGC: 'rgba(0, 84, 255, 0.3)',
        oddRowBGC: '#1a3674',
        evenRowBGC: '#04154d',
        header: ['排名', '所属行业', '申请金额', '占比'],
        columnWidth: [50, 200, 110, 110],
        rowNum: 5,
        align: ['center'],
        colRender: [this.renderIndex],
        data: [
            // [
            //     1,
            //     '行1列1在《X，想《zxzmmxmx,,,zxz下载最新怎么写名字',
            //     '行1列2',
            //     '行1列3',
            // ],
            // [2, '行2列1', '行2列2', '行2列3'],
            // [3, '行3列1', '行3列2', '行3列3'],
            // [4, '行4列1', '行4列2', '行4列3'],
            // [5, '行5列1', '行5列2', '行5列3'],
            // [6, '行6列1', '行6列2', '行6列3'],
            // [7, '行7列1', '行7列2', '行7列3'],
            // [8, '行8列1', '行8列2', '行8列3'],
            // [9, '行9列1', '行9列2', '行9列3'],
            // [10, '行10列1', '行10列2', '行10列3'],
        ] as any,
    }
    handleClick({ row, ceil, rowIndex, columnIndex }: any) {
        console.log(row, ceil, rowIndex, columnIndex)
    }
    renderIndex(h: CreateElement, { row, index }: any = {}) {
        // 获取第一列数据 index 为行索引
        const val = row[0]
        if (val <= 3) {
            return h(
                'div',
                {
                    attrs: {
                        class: 'table-rank-div',
                    },
                },
                [
                    h('img', {
                        attrs: {
                            src: require(`./assets/${rankImgs[index]}`),
                            class: 'table-rank-img',
                        },
                    }),
                ],
            )
        } else {
            return val
        }
    }
    // 滚动的时候触发 返回当前行数据
    handleScroll(row: any, index: any) {
        //console.log(index, JSON.stringify(row))
    }
    mounted() {
        this.config.data = [
            [1, '行1列1在《X，想《zxzmmxmx,,,zxz下载最新怎么写名字', '行1列2', '行1列3'],
            [2, '行2列1', '行2列2', '行2列3'],
            [3, '行3列1', '行3列2', '行3列3'],
            [4, '行4列1', '行4列2', '行4列3'],
            [5, '行5列1', '行5列2', '行5列3'],
            [6, '行6列1', '行6列2', '行6列3'],
            [7, '行7列1', '行7列2', '行7列3'],
            [8, '行8列1', '行8列2', '行8列3'],
            [9, '行9列1', '行9列2', '行9列3'],
            [10, '行10列1', '行10列2', '行10列3'],
        ]
    }
}
</script>

<style lang="less" scoped>
.AdminFeatScrollBoard {
    ::v-deep {
        .table-rank-div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .table-rank-img {
            width: 20px;
        }
    }
}
</style>
