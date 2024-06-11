<template>
    <PageWrapper class="AdminChartCard column" :title="''">
        <template #title>
            <el-button type="" icon="el-icon-plus" @click="handleCreate">
                新增
            </el-button>
            <el-tag type="primary" class="sg-ml-3">echarts version: 5.3.2</el-tag>
        </template>
        <div class="content-wrapper" v-for="(child, index) in dataList" :key="index">
            <div class="headline">{{ child.title }}</div>
            <div class="main-wrap">
                <div class="main" v-if="child.children.length">
                    <div class="mAiUNbJF gJf_g7BC" v-for="(item, y) in child.children" :key="y">
                        <a class="v3ZnCrMS img" @click="handleEdit(item)" rel="noreferrer">
                            <img class="v3ZnCrMS" :src="item.thumbnail" />
                            <div class="action">
                                <el-button type="danger" size="mini" @click.stop="handleDelete(item)">删除</el-button>
                                <el-button type="" size="mini" @click.stop="handlePreview(item)">预览</el-button>
                            </div>
                        </a>
                        <div class="ou2HPCId">
                            <div class="hK7U7fBA">
                                <div class="R7iRelmI">{{ item.createdUserName }}</div>
                                <div class="__4Kg1M_Gj">
                                    {{ item.updatedAt }}
                                </div>
                            </div>
                            <a class="__5HMCT2l7" @click="handleEdit(item)" rel="noreferrer">{{ item.title }}</a>
                        </div>
                    </div>
                </div>
                <section v-else>
                    <div class="emptyWrapper">
                        <img src="https://cdn.dancf.com/fe-assets/img/741b761023880576e19b25c721cc400d.png" class="emptyImg" width="200" />
                        <span class=" emptyTips">没有找到你要的内容</span>
                    </div>
                </section>
            </div>
        </div>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormColumn, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { ChartCaseService, DictService } from '@/entry/devops/api'
import { dateFormat } from '@/scripts/utils'

const API = {
    list: ChartCaseService.list,
    removeOne: ChartCaseService.remove,
}
@Component({
    name: 'AdminArticleComponent',
    components: {},
})
export default class AdminArticleComponent extends MyMixins {
    parent_ids: any[] = []
    formModel = {
        type: '',
    }
    dataList: any[] = []
    async mounted() {
        await this.syncGroup()
        await this.handleSearch()
    }

    async syncGroup() {
        const data = await DictService.all({
            conditions: {
                parent_id: '图表分类',
            },
        })

        this.parent_ids = [...data]
        return data
    }

    handleDelete(row: any) {
        const id = row.id
        this.$confirm('确认删除吗').then(async () => {
            await ChartCaseService.remove({
                id,
            })
            this.$message.success('删除成功')
            this.handleSearch()
        })
    }
    handleCreate() {
        this.$router.push({
            path: '/admin/chart/edit',
            query: {
                _: '新增图表',
                name: this.$route.name,
            },
        })
    }
    handleEdit(row: any) {
        this.$router.push({
            path: '/admin/chart/edit',
            query: {
                _: '编辑-' + row.title,
                isEdit: '1',
                id: row.id,
                name: this.$route.name,
            },
        })
    }
    /**刷新数据 */
    async handleSearch() {
        const params = {
            page: 1,
            pageSize: 1000,
            conditions: {},
        }

        const { data } = await API.list(params)
        let list = data.data || []
        const parent_ids = this.parent_ids
        list = list.map((item: any) => {
            item.updatedAt = dateFormat(item.updatedAt, 'YYYY-MM-DD HH:mm:ss')
            return item
        })
        this.dataList = parent_ids.map((item: any) => {
            let children: any[] = list.filter((i: any) => i.type === item.label) || []

            const child = {
                title: item.label,
                children,
            }
            return child
        })
    }
    async handlePreview(item: any) {
        const { href } = this.$router.resolve({
            path: `/chart/${item.id}`,
        })
        window.open(href, '_blank')

        // await this.$modalDialog(() => import(/* webpackChunkName: "ChartPreviewDialog" */ '../edit/components/ChartPreviewDialog/index.vue'), {
        //     code: item.code,
        // })
        //     .then(async () => {})
        //     .catch((err: any) => {
        //         console.log(err)
        //     })
    }
}
</script>

<style lang="less" scoped>
::v-deep {
    .sg-card {
        .sg-card-body {
            background: #f7f9fa;
        }
    }
}

.content-wrapper {
    .headline {
        font-weight: 600;
        font-size: 22px;
        line-height: 42px;
        color: #1c1f23;
        margin-bottom: 20px;
        // text-align: center;
        border-bottom: 1px solid #dfe4ed;
    }
    .main {
        display: flex;
        flex-flow: row wrap;

        .gJf_g7BC {
            margin-bottom: 14px;
            margin-right: 14px;

            // &:nth-child(3n) {
            //     margin-right: 0;
            // }
        }
        .mAiUNbJF {
            border-radius: 12px;
            overflow: hidden;
            width: 416px;
            width: 400px;
            display: flex;
            flex-direction: column;

            .img {
                overflow: hidden;
                &:hover {
                    img {
                        transform: scale(1.4);
                    }
                }
            }
            .v3ZnCrMS {
                flex-shrink: 0;
                flex-grow: 0;
                display: block;
                position: relative;
                height: 255px;
                background: #060e33;
                transition: all 0.3s;

                .action {
                    position: absolute;
                    z-index: 11;
                    right: 10px;
                    top: 10px;
                    .el-button {
                        display: none;
                    }
                }
                &:hover {
                    .action {
                        .el-button {
                            display: inline-block;
                        }
                    }
                }

                &:after {
                    content: ' ';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.3);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s ease-in-out;
                }
                &:hover:after {
                    opacity: 1;
                }
                img {
                    width: 100%;
                    height: 100%;

                    object-fit: contain;
                }
            }
            .ou2HPCId {
                flex-shrink: 1;
                flex-grow: 1;
                padding: 10px 14px 14px;
                background-color: #fff;
                .hK7U7fBA {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .R7iRelmI {
                        background-color: #b5babd;
                        border-radius: 4px;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 12px;
                        color: #fff;
                        padding: 2px 4px;
                    }
                    .__4Kg1M_Gj {
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 20px;
                        color: rgba(30, 32, 35, 0.65);
                        margin-left: 4px;
                    }
                }
                .__5HMCT2l7 {
                    display: block;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 24px;
                    color: #1c1f23;
                    margin-top: 6px;
                    transition: color 0.2s ease-in-out;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}

.emptyWrapper {
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    padding: 40px 0px;
    border-radius: 4px;
    img {
        width: 140px;
    }

    .emptyTips {
        transition: all 0s ease 0s;
        color: rgb(85, 85, 85);
        font-size: 16px;
        display: inline-block;
        text-align: center;
        border-radius: 0px;
        margin-top: 20px;
    }
}
</style>
