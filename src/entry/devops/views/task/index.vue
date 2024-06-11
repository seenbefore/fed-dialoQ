<!-- 任务清单 -->
<template>
    <div class="task-container">
        <div class="head"></div>
        <div class="side">
            <div class="inner">
                <div class="head">
                    <!-- <div class="title">任务清单</div> -->
                    <div class="search sg-flexbox align-center">
                        <el-input v-model="model.keywords" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                    </div>
                </div>
                <div class="body">
                    <div class="list">
                        <router-link to="/task/11/list" class="item active">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                        <router-link to="/task/22/list" class="item ">
                            <div class="abbr" style="background-color: rgb(234, 72, 72);"><div class="txt">吃</div></div>
                            <div class="title"><div class="txt">吃吃吃上课的啦打开了打撒科利达萨达读书卡老大</div></div>
                            <div class="action">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="pg"
                                    data-icon="more"
                                    class="svg-inline--fa fa-more fa-w-16 jss20592 more "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g class="fa-group">
                                        <path class="fa-secondary" fill="currentColor" d=""></path>
                                        <path
                                            class="fa-primary"
                                            fill="currentColor"
                                            d="M240.2,512c0,66.3-53.8,120.1-120.1,120.1C53.8,632.1,0,578.3,0,512c0-66.3,53.8-120.1,120.1-120.1 C186.4,391.9,240.2,445.7,240.2,512z M512,391.9c-66.3,0-120.1,53.8-120.1,120.1c0,66.3,53.8,120.1,120.1,120.1 c66.3,0,120.1-53.8,120.1-120.1C632.1,445.7,578.3,391.9,512,391.9z M903.9,391.9c-66.3,0-120.1,53.8-120.1,120.1 c0,66.3,53.8,120.1,120.1,120.1c66.3,0,120.1-53.8,120.1-120.1C1024,445.7,970.2,391.9,903.9,391.9z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="foot">
                    <el-button type="text" icon="el-icon-plus">新建任务清单</el-button>
                </div>
            </div>
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
@Component({
    name: 'Task',
    components: {},
})
export default class Task extends Vue {
    model: any = {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.task-container ::v-deep {
    background-color: #f9fafc;
    display: flex;
    height: 100vh;
    svg:not(:root).svg-inline--fa {
        overflow: visible;
    }
    .svg-inline--fa.fa-w-16 {
        width: 1em;
    }
    .svg-inline--fa {
        display: inline-block;
        font-size: inherit;
        height: 1em;
        overflow: visible;
        vertical-align: -0.125em;
    }
    > .head {
        width: 100%;
        height: 56px;
        z-index: 1199;
        box-shadow: none;
        border-bottom: 1px solid #e8eaf2;
        color: rgba(0, 0, 0, 0.87);
        background-color: #ffffff;
        top: 0;
        left: auto;
        right: 0;
        position: absolute;
    }
    .side {
        position: absolute;
        left: 0;
        top: 56px;
        .inner {
            position: relative;
            width: 300px;
            height: calc(100vh - 56px);
            overflow: auto;
            background: #fff;
            border-right: 1px solid #e8eaf2;

            .head {
                padding: 0 20px;
                display: flex;
                height: 60px;
                align-items: center;
                .title {
                    color: #212433;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                    padding: 12px;
                }
                .search {
                    width: 100%;
                    input {
                        background-color: #f9fafc;
                        border: none;
                    }
                }
            }
            .body {
                position: relative;
                height: calc(100% - 60px - 52px);
                overflow: auto;

                .item {
                    color: #212433;
                    cursor: pointer;
                    height: 32px;
                    padding-right: 24px;
                    display: flex;
                    align-items: center;
                    padding-left: 24px;
                    .abbr {
                        height: 16px;
                        min-width: 16px;
                        border-radius: 4px;
                        .txt {
                            color: #fff;
                            font-size: 12px;
                            text-align: center;
                            line-height: 16px;
                            user-select: none;
                            text-transform: capitalize;
                        }
                    }
                    .title {
                        overflow: hidden;
                        padding-left: 8px;
                        flex-grow: 1;
                        .txt {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    .action {
                        font-size: 16px;
                        color: #7c859c;
                        svg {
                            opacity: 0;
                        }
                    }
                    &:hover {
                        background: #f9fafc;
                        .action {
                            svg {
                                opacity: 1;
                                color: var(--system-primary-color);
                            }
                        }
                    }
                    &.active {
                        background: #edf2fe;
                        color: var(--system-primary-color);
                    }
                }
            }
            .foot {
                width: 100%;
                height: 52px;
                left: 0;
                bottom: 0;
                padding: 0px 16px;
                z-index: 1202;
                position: absolute;
                background: #ffffff;
                border-top: 1px solid #e8eaf2;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .main {
        position: absolute;
        left: 300px;
        top: 56px;
        bottom: 0;
        right: 0;
    }
}
</style>
