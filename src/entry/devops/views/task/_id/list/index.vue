<!--  -->
<template>
    <div class="Task_idList">
        <div class="issue-toolbar">
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">任务</el-button>
        </div>
        <div class="issue-table">
            <div class="head">
                <div class="row">
                    <div class="col col-1">
                        <div class="cell">
                            <span>任务名称</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="cell">
                            <span>负责人</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="cell">
                            <span>截止时间</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="inner">
                    <div class="row" v-for="(item, index) in list" :key="index">
                        <div class="col">
                            <div class="cell">
                                <span>实打实老大对对对萨拉丁</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="cell">
                                <span>洒水</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="cell">
                                <span>洒1水</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'

@Component({
    name: 'Task_idList',
    components: {},
})
export default class Task_idList extends Vue {
    list = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    mounted() {}

    handleAdd() {
        console.log(new Date().toLocaleString())
    }
}
</script>

<style lang="less" scoped>
.Task_idList ::v-deep {
    position: absolute;
    margin: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    // @keyframes throttle {
    //     from {
    //         color: red;
    //         pointer-events: none;
    //     }
    //     to {
    //         color: green;
    //         pointer-events: all;
    //     }
    // }

    // button {
    //     animation: throttle 2s step-end forwards;
    // }
    // button:active {
    //     animation: none;
    // }

    .issue-toolbar {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        flex-shrink: 0;
    }
    .issue-table {
        flex: 1;
        height: 100%;

        > .head {
            padding: 0 15px;
            height: 40px;
            display: flex;
            align-items: center;

            .row {
                background: transparent;
                border-color: transparent;
                background-color: #f9fafc;
                font-weight: bold;
            }
        }
        .col {
            max-width: 100px;
            min-width: 100px;

            .cell {
                color: #7c859c;
                padding: 5px;
            }
            &:first-child {
                flex: 1;
                max-width: none;
            }
        }

        .row {
            width: 100%;
            border: 1px solid #e8eaf2;
            height: 40px;
            display: flex;
            position: relative;
            background: #ffffff;
            align-items: center;
            border-radius: 4px;
            margin-bottom: -1px;
        }
        > .body {
            height: calc(100% - 100px);
            overflow-y: auto;
            .inner {
                padding: 0 15px;
            }
            .row {
                &:hover {
                    background: #f7f8fa;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
