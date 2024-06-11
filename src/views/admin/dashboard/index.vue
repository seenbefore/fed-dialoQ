<template>
    <div class="sg-page AdminDashboard">
        <div class="sg-card shortcut">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">快捷访问</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body">
                <section class="shortcut-list">
                    <a class="shortcut-item" :href="item.url" target="_blank" v-for="(item, index) in shortcutList" :key="index">
                        <div class="shortcut-icon">
                            <div v-text="item.icon"></div>
                        </div>
                        <div class="shortcut-title">
                            <!-- 不准确 待优化 -->
                            <template v-if="item.title.length > 8">
                                <el-tooltip class="item" effect="dark" :content="item.title">
                                    <span v-text="item.title"></span>
                                </el-tooltip>
                            </template>
                            <template v-else>
                                <span v-text="item.title"></span>
                            </template>
                        </div>
                    </a>
                </section>
            </div>
        </div>

        <!-- <div class="sg-card shortcut">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">快捷访问</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body">
                <section class="shortcut-list">
                    <a
                        class="shortcut-item"
                        :href="item.url"
                        target="_blank"
                        v-for="(item, index) in toolList"
                        :key="index"
                    >
                        <div class="shortcut-icon">
                            <div v-text="item.icon"></div>
                        </div>
                        <div class="shortcut-title">
                         
                            <template v-if="item.title.length > 8">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="item.title"
                                >
                                    <span v-text="item.title"></span>
                                </el-tooltip>
                            </template>
                            <template v-else>
                                <span v-text="item.title"></span>
                            </template>
                        </div>
                    </a>
                </section>
            </div>
        </div> -->

        <div class="sg-card app">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">应用列表</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body">
                <div class="my-building sg-p-4 sg-flexbox align-center justify-center">
                    <img src="@/assets/images/admin/building.png" alt="" width="400px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'AdminDashboard',
    components: {},
})
export default class AdminDashboard extends Vue {
    shortcutList = [
        {
            url: 'http://gitlab.icinfo.co/',
            title: 'gitlab代码仓管',
            icon: '码',
        },
        {
            url: 'http://192.168.1.191/secure/Dashboard.jspa',
            title: 'Jira缺陷管理',
            icon: '缺',
        },
        {
            url: 'http://192.168.1.191/secure/Dashboard.jspa',
            title: 'wiki文档中心',
            icon: '文',
        },
        {
            url: 'https://mail.icinfo.com.cn/extmail/cgi/index.cgi',
            title: 'mail邮件中心',
            icon: '邮',
        },
        {
            url: 'http://192.168.1.196:81/',
            title: 'KingStar项目管理',
            icon: '项',
        },
        {
            url: 'https://www.italent.cn/portal/iTalentHome',
            title: 'iTalent人事管理',
            icon: '人',
        },
        {
            url: 'http://sharegood-element-ui.fat1.icinfo.co/',
            title: '前端小书房',
            icon: '书',
        },
        {
            url: 'http://pub.fed.icinfo.co/',
            title: 'old蜻蜓发布',
            icon: '蜓',
        },
    ]
    toolList = [
        {
            url: 'https://www.hebaiwan.cn/',
            title: '人民币大写转换',
            icon: '币',
        },
    ]
    mounted() {}
}
</script>

<style lang="less" scoped>
.AdminDashboard {
    background-color: transparent !important;
    padding: 0 !important;
    // width: 100% !important;
    // height: 100% !important;
    // margin: 0 !important;

    > .shortcut {
        .shortcut-list {
            display: flex;
            flex-wrap: wrap;
        }
        .shortcut-item {
            width: 100px;
            margin: 7px;
            display: flex;
            cursor: pointer;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            &:nth-child(4n + 1) {
                .shortcut-icon {
                    background: linear-gradient(144.31deg, #13bbfb 0%, #0885f5 94.04%);
                }
            }
            &:nth-child(4n + 2) {
                .shortcut-icon {
                    background: linear-gradient(122.59deg, #33d3bf 0%, #17a88b 100%);
                }
            }
            &:nth-child(4n + 3) {
                .shortcut-icon {
                    background: linear-gradient(149.53deg, #60d8f1 7.94%, #10b2d4 85.32%);
                }
            }
            &:nth-child(4n + 4) {
                .shortcut-icon {
                    background: linear-gradient(145.56deg, #f69110 -5.93%, #ff7322 93.92%);
                }
            }
        }
        .shortcut-icon {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 20px;
            font-weight: bolder;
            line-height: 1;
        }
        .shortcut-title {
            > span {
                font-size: 14px;
                color: #747677;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                line-height: 30px;
            }
        }
    }
}
</style>
