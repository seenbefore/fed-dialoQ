<template>
    <div class="sg-page AdminDashboard">
        <div class="sg-card app">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">便捷入口</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body">
                <div class="feature-list">
                    <div class=" AppCard--Outer" v-for="(row, index) in featureList" :key="index">
                        <AppCard
                            @click.native="redirect(row, false)"
                            :row="row"
                            :id="row.id"
                            :show-content="false"
                            v-bind="{
                                footer: false,
                            }"
                            style="height: auto;"
                        ></AppCard>
                    </div>
                </div>
            </div>
        </div>

        <div class="sg-card shortcut">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">常用站点</span>
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

        <div class="sg-card app">
            <div class="sg-card-header">
                <div class="sg-flex-1">
                    <span class="sg-card-title">常用文档</span>
                </div>
                <div></div>
            </div>
            <div class="sg-card-body">
                <div class="doc-list">
                    <div class="col-4 AppCard--Outer" v-for="(row, index) in docList" :key="index">
                        <AppCard
                            @click.native="redirect(row)"
                            :row="row"
                            :id="row.id"
                            v-bind="{
                                footer: false,
                            }"
                            style="height: 100px"
                        ></AppCard>
                    </div>
                </div>
                <!-- <div
                    class="my-building sg-p-4 sg-flexbox align-center justify-center"
                >
                    <img
                        src="@/assets/images/admin/building.png"
                        alt=""
                        width="400px"
                    />
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AppCard from '@/entry/devops/components/app-card/index.vue'
@Component({
    name: 'AdminDashboard',
    components: {
        AppCard,
    },
})
export default class AdminDashboard extends Vue {
    featureList = [
        {
            name: '发布单',
            uri: '/admin/product/release',
        },
        {
            name: '产品管理',
            uri: '/admin/product/list',
        },
    ]
    shortcutList = [
        {
            url: 'https://cangjie.icinfo.cn/',
            title: '仓颉',
            icon: '仓',
        },
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
            url: 'http://fed-component-library.uat.icinfo.co',
            title: '组件货架',
            icon: '组',
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
        {
            url: 'http://vgl.icinfo.fat1.icinfo.co/',
            title: 'Echarts案例',
            icon: 'E',
        },
        {
            url: 'https://www.hebaiwan.cn/',
            title: '人民币大写转换',
            icon: '',
        },
        {
            url: 'https://libowen.com/tool/ico/',
            title: 'ico在线转换',
            icon: '',
        },
        {
            url: 'https://compressjpeg.com/zh/',
            title: '图片压缩',
            icon: '',
        },
        {
            url: 'https://svgtopng.com/zh/',
            title: 'SVG转PNG',
            icon: '',
        },
        {
            url: ' https://png2jpg.com/zh/',
            title: 'PNG转JPG',
            icon: '',
        },
        {
            url: '  https://www.bejson.com/',
            title: 'JSON格式化',
            icon: '',
        },

        {
            url: 'https://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5',
            title: 'DataV地图选择器',
            icon: '',
        },
    ]

    docList = [
        {
            name: '入职指南',
            uri: 'http://192.168.1.147:3001/admin/post/f1514220-ce71-4fb8-b930-39417b490cdc',
            text: '新人入职当天指南',
        },
        {
            name: '前端开发手册',
            uri: 'http://192.168.1.147:3001/admin/post/5faffbf0-3bc3-4061-8709-d031fe9342e4',
            text: '研发流程、项目规范、绩效考核等',
        },

        {
            name: 'UI规范',
            uri: 'https://www.figma.com/file/zvOapYwfL1Y9t0MZTTbruq/G%E7%AB%AF%E4%BD%93%E9%AA%8C%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83_PC?type=design&node-id=48-1835&mode=design',
            text: 'UI后台的一些规范样式',
        },
        {
            name: '前端多项目模板',
            uri: `http://192.168.1.147:3001/admin/post/4479903c-a1b7-47f6-a867-96089b893deb`,
            text: 'vue-template-admin',
        },
        {
            name: '前端API请求插件',
            uri: `http://192.168.1.147:3001/admin/post/d3336742-055f-45c3-ae6a-4a778c831753`,
            text: 'icinfo-request',
        },
        {
            name: '前端API工具类插件',
            uri: `http://192.168.1.147:3001/admin/post/324dac00-0d02-42b3-9cf3-e54251e51208`,
            text: 'icinfo-util',
        },
        {
            name: '前端API自动化插件',
            uri: `http://192.168.1.147:3001/admin/post/6c72ea0a-bd7e-4220-b40d-8b548562198a`,
            text: 'icinfo-api-generator',
        },
    ]
    redirect(row: any, _blank = true) {
        const uri = row.uri
        //this.$router.push(uri)
        if (uri.indexOf('http') > -1) {
            window.open(uri, '_blank')
        } else {
            const { href } = this.$router.resolve({
                path: uri,
            })
            if (_blank) {
                window.open(href, '_blank')
            } else {
                this.$router.push(uri)
            }
        }
    }
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
    ::v-deep {
        .sg-card-body {
            padding: 12px 12px;
        }
        .sg-card-header {
            min-height: 36px;
        }
    }

    > .shortcut {
        .shortcut-list {
            display: flex;
            flex-wrap: wrap;
        }
        .shortcut-item {
            width: 110px;
            margin: 5px;
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

    .doc-list {
        display: grid;
        grid-template-columns: repeat(4, minmax(0px, 1fr));
        justify-content: space-between;
        grid-gap: 15px;
    }
    .feature-list {
        display: grid;
        grid-template-columns: repeat(6, minmax(0px, 1fr));
        justify-content: space-between;
        grid-gap: 15px;
    }
}
</style>
