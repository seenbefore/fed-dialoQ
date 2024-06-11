<template>
    <div class="app-main">
        <div class="banner">
            <div class="ic-container ic-row">
                <div class="left ic-mr-7">
                    <div class="ic-avatar">
                        <i v-text="model.name.substring(0, 1)"></i>
                    </div>
                </div>
                <div class="right">
                    <div class="title ic-mb-3" v-text="model.name"></div>
                    <div class="note" v-text="model.summary"></div>
                    <div class="action">
                        <el-button type="primary" @click="handleApply">申请</el-button>
                    </div>
                </div>
            </div>
        </div>
        <header class="next-shell-header">
            <div class="next-navigation ic-container">
                <ul class="next-menu">
                    <li class="next-menu-item">
                        <div class="next-menu-item-link active">组件概况</div>
                    </li>
                </ul>
            </div>
        </header>
        <div class="main ic-container">
            <div class="base-box ic-mb-7">
                <div class="headline">基本信息</div>
                <div class="ic-row row-box">
                    <div class="col-box">
                        <span class="label">创建时间</span>
                        <span class="value" v-text="model.createdTime"></span>
                    </div>
                    <div class="col-box">
                        <span class="label">英文名称</span>
                        <span class="value" v-text="model.englishName"></span>
                    </div>

                    <div class="col-box">
                        <span class="label">最新版本号</span>
                        <span class="value" v-text="model.lastVersion"></span>
                    </div>
                    <!-- <div class="col-box">
                        <span class="label">使用要求</span>
                        <span
                            class="value"
                            v-text="model.useRequirementName"
                        ></span>
                    </div> -->
                </div>

                <div class="ic-row row-box">
                    <div class="col-box">
                        <span class="label">一级分类</span>
                        <span class="value" v-text="model.typeOneName"></span>
                    </div>
                    <div class="col-box">
                        <span class="label">业务线</span>
                        <span class="value" v-text="model.businessLineName"></span>
                    </div>
                    <div class="col-box">
                        <span class="label">技术领域</span>
                        <span class="value" v-text="model.technologyTypeName"></span>
                    </div>
                    <!-- <div class="col-box">
                        <span class="label">创建人</span>
                        <span class="value" v-text="model.createdBy"></span>
                    </div> -->
                </div>
            </div>

            <div class="uri-box ic-mb-7" v-if="model.componentInfoUrlList.length">
                <div class="headline">相关链接</div>
                <div class="ic-row row-box" v-for="(item, index) in model.componentInfoUrlList" :key="index">
                    <div class="col-box">
                        <span class="label" v-text="item.urlName"></span>
                        <a class="link" v-text="item.url" target="_blank" :href="item.url"></a>
                    </div>
                </div>
            </div>

            <div class="apply-box ic-mb-7">
                <div class="headline">使用情况</div>
                <sg-data-view :columns="columns" :load="load" ref="tableRef"></sg-data-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { detail, ComponentInfoUrlDto } from '@/entry/library/api/auto/component'
import { list } from '@/entry/library/api/auto/component/use'
import { TableColumn, TableRef } from '@/sharegood-ui'
const API = {
    detail,
    list,
}
@Component({
    name: 'ComponentLibraryDetail',
    components: {},
})
export default class ComponentLibraryDetail extends Vue {
    model = {
        name: '',
        summary: '',
        typeOne: '',
        lastVersion: '',
        englishName: '',
        createdTime: '',
        useRequirement: '',
        componentInfoUrlList: [] as ComponentInfoUrlDto[],
    }
    load = (params: any) => {
        const { id } = this.$route.query
        return list({
            pageNum: 1,
            length: 10,
            componentId: id,
            ...params,
        }).then(res => ({ result: res.data.data, total: res.data.total }))
    }
    columns = [
        {
            label: '序号',
            type: 'index',
        },

        {
            label: '项目名称',
            prop: 'projectName',
        },
        {
            label: '负责人',
            prop: 'techPerson',
            width: '200px',
        },
    ] as TableColumn[]
    @Ref('tableRef')
    tableRef!: TableRef
    async handleApply() {
        try {
            const { id } = this.$route.query
            await this.$modalDialog(() => import('./components/apply-edit-dialog/index.vue'), {
                row: {
                    componentName: this.model.name,
                    componentId: id,
                },
            })
            this.syncApply()
        } catch (err) {}
    }
    async syncData() {
        const { id } = this.$route.query
        const { data } = await API.detail({ componentId: id as string })
        this.model = {
            ...data,
        }
    }
    async syncApply() {
        this.tableRef.onLoad({ page: 1 })
    }
    async created() {
        this.syncData()
    }
}
</script>

<style lang="less" scoped>
.banner {
    background: url(https://img.alicdn.com/imgextra/i4/O1CN017yEuUY1xTrJRtP8Zy_!!6000000006445-2-tps-1600-1676.png) no-repeat 80% 60% / auto 500px rgb(235, 246, 255);
    height: 240px;
    position: relative;
    > .ic-container {
        padding: 40px 40px 0 40px;
        height: 100%;
    }
    .ic-avatar {
        height: 70px;
        width: 70px;
        border-radius: 100%;
        line-height: 70px;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-style: normal;
            width: 100%;
            height: 100%;
            font-size: 24px;
            color: #ffffff;
            border-radius: 100%;
            background-color: #0089ff;
        }
    }
    .right {
        position: relative;
        .title {
            font-size: 24px;
            font-weight: bold;
        }
        .note {
            color: var(--gray);
        }
        .action {
            position: absolute;
            bottom: 40px;
            left: 0;
        }
    }
}

.next-shell-header {
    color: #000;
    height: 52px;
    background: #fff;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
    padding: 0 16px;
    display: block;

    .next-navigation {
        padding: 0 40px;

        .next-menu-item-link {
            font-size: 16px;
        }
    }
}

.main {
    padding: 40px;

    .row-box {
        display: flex;

        margin-bottom: 12px;
    }
    .col-box {
        margin-right: 30px;
        flex: 1;
        font-size: 14px;
        &:last-child {
            margin-right: 10px;
        }
    }
    .label {
        color: var(--gray);
        display: inline-block;
        margin-right: 10px;
        text-align: right;
    }
    .value {
        font-weight: bold;
    }
    .link {
        font-weight: bold;
        cursor: pointer;
        color: #0089ff;
    }

    .headline {
        position: relative;
        margin-left: 12px;
        color: #333;
        font-weight: 700;
        font-size: 18px;
        line-height: 1;
        margin-bottom: 16px;
        &:before {
            position: absolute;
            top: 0;
            left: -12px;
            width: 4px;
            height: 16px;
            background-color: #158dff;
            content: '';
        }
    }
}
</style>
