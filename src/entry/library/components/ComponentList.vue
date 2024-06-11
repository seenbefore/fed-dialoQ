<template>
    <div class="sg-flex-1 app-content-list">
        <div class="app-content-header sg-flexbox align-center">
            <div class="main-title">
                <h5 class="i-con-h-a">
                    项目
                    <span class="text-muted fs-13 v-1 ml-1">(379)</span>
                </h5>
            </div>
            <div class="sg-flex-1"></div>
            <div style="margin-right: 12px">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <el-switch v-model="value1" active-text="所有" inactive-text="我的"></el-switch>
        </div>
        <div class="app-content-body">
            <div class="mw-row">
                <div class="mw-col list-animation-leftIn">
                    <div class="macwk-app border white cursor-pointer">
                        <div class="macwk-app__header--icon"></div>
                        <div class="macwk-app__body">项目</div>
                        <div class="macwk-app__extend sg-flexbox">
                            最近一次提交
                        </div>
                        <div class="macwk-app__footer">操作</div>
                    </div>
                </div>
                <div class="mw-col list-animation-leftIn" :class="`delay-${index}`" v-for="(item, index) in list" :key="index">
                    <div href="javascript:void(0)" target="_self" class="macwk-app border white cursor-pointer">
                        <div class="macwk-app__header--icon"></div>
                        <div class="macwk-app__body">
                            <h5 class="macwk-app__body--title">
                                <span v-text="item.title || '-'" class="btn"></span>
                                <span></span>
                            </h5>
                            <p class="macwk-app__body--info">
                                <span v-text="item.description || '-'"></span>
                            </p>
                        </div>
                        <div class="macwk-app__extend sg-flexbox">
                            <div class="macwk-app__extend--status">
                                <i class="icon-download2"></i>
                                <span v-text="item.lastCommit ? item.lastCommit.branch : ''"></span>
                                <span>-></span>
                                <span v-text="item.lastCommit ? item.lastCommit.target : ''"></span>
                            </div>
                            <div class="macwk-app__extend--author">
                                <i class="icon-download2"></i>
                                <span>马金慧</span>
                            </div>
                            <div class="macwk-app__extend--date">
                                <i class="icon-download2"></i>
                                <span>01-08</span>
                            </div>
                        </div>
                        <div class="macwk-app__footer">
                            <el-button type="primary" size="mini">发布</el-button>
                            <el-button type="" size="mini">配置</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-content-footer">
            <el-pagination class="w-full" layout="prev, pager, next" :total="100" :pager-count="5"></el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'DeployComponentsList',
    components: {},
})
export default class DeployComponentsList extends Vue {
    input3 = ''
    value1 = 1
    list = [
        {
            title: 'vvvvvvvvvsssss',
            description: '设计啊肯德',
            owner: {
                name: 'sas',
            },
            date: '撒娇扩大接口的',
            lastCommit: {
                target: 'fat1',
                branch: 'devada-fear-v-1121-mjh',
            },
        },
        {
            title: 'vvvvvvvvvsssss2',
            description: '设计啊肯德基卡大口径奥德赛dsd',
            owner: {
                name: 'sas',
            },
            date: '撒娇扩大接口的',
            lastCommit: {
                target: 'fat1',
                branch: 'dev',
            },
        },
        {
            title: 'vvvvvvvvvsssss322',
            description: '设计啊肯德基卡大口径奥德赛',
            owner: {
                name: 'sas',
            },
            date: '撒娇扩大接口的',
            lastCommit: {
                target: 'fat1',
                branch: 'dev',
            },
        },
        {},
        {},
    ]
    // created() {}
    // mounted() {}
}
</script>

<style lang="less" scoped>
.i-con-h-a {
    font-size: 20px;
    margin: 0;
}
.main-title {
    margin-right: 1rem;
}
.main-title h5 {
    margin-bottom: 0;
}

.macwk-app {
    position: relative;
    width: 100%;
    border-radius: 5px;
    padding: 25px 25px 20px;
    display: block;
    overflow: hidden;
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out, translateY 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        color: inherit;
    }
}
.macwk-app {
    display: flex;
    align-content: center;
    border-radius: 0;
    margin-bottom: -2px;
    align-items: center;
    border-width: 0 !important;
    background-color: transparent;
    background-image: linear-gradient(#fff, hsla(0, 0%, 100%, 0.7));
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.06);

    .macwk-app__extend--status {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 7px;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__extend--author {
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 7px;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__extend--date {
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__body {
        width: 220px;
        margin-right: 10px;
    }
    .macwk-app__extend {
        flex: 1;
    }
    .macwk-app__footer {
        width: 130px;
    }
}
.macwk-app.active,
.macwk-app:hover {
    transform: translateY(-1px);
    background-color: transparent;
    border-top-style: solid !important;
    background-image: linear-gradient(#fff, hsla(0, 0%, 100%, 0.5) 30%, #fff);
    box-shadow: 0 0 26px rgba(0, 61, 131, 0.1);
    z-index: 1;
}
.macwk-app {
    padding: 15px 25px 16px;
}
.macwk-app__body--title {
    font-size: 18px;
    margin: 0;
}
.macwk-app__body--info {
    font-size: 15px;
    opacity: 0.5;
    margin: 0;
}

.app-content-footer {
    padding: 20px 0;
    display: flex;
    justify-content: center;
}
.app-content-header {
    margin-bottom: 7px;
}
</style>
