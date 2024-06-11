<template>
    <PageWrapper class="AdminArticleComponent " :title="''">
        <template #title>
            <el-button
                type=""
                icon="el-icon-plus"
                @click="
                    $push({
                        path: '/admin/article/edit',
                        query: {
                            _: '新增组件',
                            row: JSON.stringify({
                                book_name: '组件',
                                type: 'url',
                            }),
                        },
                    })
                "
            >
                新增组件
            </el-button>
        </template>
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="onLoad" @reset="onLoad"></sg-base-form>
        <section class="content-box">
            <section class="content-box_card" v-if="dataList.length">
                <div class="content-box_card_item" v-for="(row, index) in dataList" :key="index">
                    <div class="cardTopBox">
                        <a class="link" :href="row.type === 'url' ? row.url : `/post/${row.uuid}`" target="_blank">
                            <div :style="`background-image:url(${row.cover});width:100%;height:100%;`"></div>
                            <!-- <img :src="row.cover" alt="" v-if="row.cover" /> -->
                        </a>
                    </div>
                    <div class="cardTitleBox">
                        <a class="link " :href="`/post/${row.uuid}`" target="_blank">
                            <span class="text" v-text="row.title"></span>
                        </a>
                    </div>
                    <div class="cardBottomBox">
                        <div href="javascript:void(0)" class="link">
                            <span class="text" v-text="row.author"></span>
                        </div>
                        <a
                            v-if="user$.username === row.author_id"
                            href="javascript:void(0)"
                            class="sg-link"
                            @click="
                                $push({
                                    path: '/admin/article/edit',
                                    query: {
                                        _: '编辑-' + row.title,
                                        isEdit: '1',
                                        id: row.id,
                                    },
                                })
                            "
                        >
                            编辑
                        </a>
                    </div>
                </div>
            </section>

            <section v-else>
                <div class="emptyWrapper" style="background: rgb(255, 255, 255);">
                    <img src="@/assets/images/admin/list-empty.png" class="emptyImg" width="200" />
                    <span class=" emptyTips">没有找到符合条件的结果</span>
                </div>
            </section>
        </section>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
import { FormColumn, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
import { ArticleService, DictService } from '@/entry/devops/api'

const API = {
    list: ArticleService.list,
    removeOne: ArticleService.removeOne,
}
@Component({
    name: 'AdminArticleComponent',
    components: {},
})
export default class AdminArticleComponent extends MyMixins {
    mounted() {
        this.onLoad()
    }
    dataList = []
    async onLoad() {
        const formRef: any = this.$refs.formRef
        const state = formRef.getState()
        const params = {
            page: 1,
            pageSize: 50,
            conditions: {
                ...state,
            },
        }

        const { data } = await API.list(params)
        this.dataList = data.data.map((item: any) => {
            const { cover_urls } = item
            const cover = cover_urls && cover_urls[0] ? cover_urls[0]['url'] : ''
            return {
                ...item,
                cover,
            }
        })
    }
    formModel = {
        book_name: '组件',
    }
    getFormAttrs = {
        span: 8,
        fields: [
            {
                columns: [
                    {
                        tag: 'input',
                        name: '%title%',
                        itemAttrs: {
                            label: '标题名称',
                        },
                        attrs: {
                            placeholder: '支持模糊查询',
                        },
                    },

                    {
                        tag: 'action',
                        buttons: [
                            {
                                isSubmit: true,
                                type: 'primary',
                                text: '查询',
                                svgIcon: 'icon-search',
                            },
                            {
                                isReset: true,
                                text: '重置',
                                svgIcon: 'icon-reset',
                            },
                        ],
                    },
                ],
            },
        ] as FormColumn[],
    }
}
</script>

<style lang="less" scoped>
.content-box {
    min-width: 800px;
}

.content-box_card {
    position: relative;
    display: grid;
    column-gap: 24px;
    box-sizing: border-box;
    grid-template-columns: repeat(4, 1fr);
}
@media only screen and (min-width: 1440px) {
    .content-box_card {
        position: relative;
        display: grid;
        column-gap: 24px;
        box-sizing: border-box;
        grid-template-columns: repeat(5, 1fr);
    }
}
.content-box_card_item {
    min-width: 120px;
    margin-bottom: 16px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    transition: all 0.2s;
    position: relative;

    // &:nth-child(4n + 1) .cardTopBox {
    //     //background-color: rgb(0, 137, 255);
    //     background-image: linear-gradient(144.31deg, #13bbfb 0%, #0885f5 94.04%);
    // }
    // &:nth-child(4n + 2) .cardTopBox {
    //     background-color: rgb(0, 184, 83);
    // }
    // &:nth-child(4n + 3) .cardTopBox {
    //     background-color: rgb(255, 162, 0);
    // }
    // &:nth-child(4n + 4) .cardTopBox {
    //     background-color: rgb(255, 115, 87);
    // }
    // &:nth-child(10n + 5) .cardTopBox {
    //     background-color: rgb(92, 114, 255);
    // }
    // &:nth-child(10n + 6) .cardTopBox {
    //     background-color: rgb(133, 199, 0);
    // }
    // &:nth-child(10n + 7) .cardTopBox {
    //     background-color: rgb(255, 107, 122);
    // }
    // &:nth-child(10n + 8) .cardTopBox {
    //     background-color: rgb(143, 102, 255);
    // }
    // &:nth-child(10n + 9) .cardTopBox {
    //     background-color: rgb(20, 169, 255);
    // }
    &:hover {
        transform: translateY(-3px);
        border-color: var(--system-primary-color);
    }
}
.cardTopBox {
    width: 100%;
    display: block;
    position: relative;
    overflow: hidden;

    background-color: rgb(237, 237, 237);

    cursor: pointer;

    &::before {
        display: block;
        content: '';
        width: 100%;
        padding-top: 75%;
    }

    .link {
        width: 100%;
        height: 100%;
        position: absolute;
        display: block;
        cursor: pointer;
        left: 0;
        top: 0;
        div {
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }
}
.cardTitleBox {
    padding: 0 4px;
    margin-top: 8px;
    display: flex;
    flex-flow: row;
    flex: initial;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    background-color: #fff;
    .link {
        overflow: hidden;
        flex: 1 1 0%;
    }

    .text {
        transition: all 0s ease 0s;
        color: rgb(34, 34, 34);
        font-size: 16px;
        display: block;
        font-weight: 500;
        cursor: pointer;
        border-radius: 0px;
        white-space: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.cardBottomBox {
    padding: 0 4px;
    margin-top: 4px;
    display: flex;
    flex-flow: row;
    flex: initial;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;

    .link {
        overflow: hidden;
        flex: 1 1 0%;
    }

    .text {
        transition: all 0s ease 0s;
        color: #666;
        font-size: 14px;
        display: block;
        white-space: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.emptyWrapper {
    min-height: 349px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    padding: 40px 0px;
    border-radius: 4px;

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
