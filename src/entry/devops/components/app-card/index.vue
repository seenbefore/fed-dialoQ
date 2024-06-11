<template>
    <div class="AppCard" :style="style">
        <!-- 一行：icon 名字 -->
        <template v-if="layout === 'simple'">
            <div class="AppCard--CardTop">
                <div class="AppCard--Logo">
                    <i class="appList-icon iconfont icon-caigou" :style="logoStyle">
                        <span v-if="!row.icon" v-text="firstName"></span>
                    </i>
                </div>
                <span class="AppCard--CardTitle"><span v-text="row.name"></span></span>
            </div>
        </template>
        <!-- 头 内容 尾 -->
        <template v-else>
            <div class="AppCard--CardTop">
                <div class="AppCard--Logo">
                    <i class="appList-icon iconfont icon-caigou" :style="logoStyle">
                        <span v-if="!row.icon" v-text="firstName"></span>
                    </i>
                </div>
                <span class="AppCard--CardTitle"><span v-text="row.name"></span></span>
            </div>
            <div class="AppCard--CardContent" v-if="showContent">
                <slot name="content">
                    <div v-text="row.text" class="AppCard--CardText"></div>
                </slot>
            </div>

            <div class="AppCard--CardFooter" v-if="footer">
                <slot name="footer">
                    <div class="AppCard--card-status-group">
                        <!-- <div
                            class="AppCard--CardSonLine"
                            v-text="row.tag"
                            v-if="row.tag"
                        ></div> -->
                    </div>
                    <div>
                        <!-- <el-dropdown>
                            <span class="el-dropdown-link">
                                <i class="el-icon-more-outline"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->
                        <!-- <el-tooltip
                            class="item"
                            effect="dark"
                            content="设置"
                            placement="top-start"
                        >
                            
                        </el-tooltip> -->
                        <el-button type="text" size="mini" @click.stop="emit('edit')" icon="el-icon-edit">
                            编辑
                            <!-- <i class="next-icon el-icon-setting"></i> -->
                        </el-button>
                        <!-- <i class="next-icon el-icon-link"></i> -->
                    </div>
                </slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'AppCard',
    components: {},
})
export default class AppCard extends Vue {
    @Prop() row!: any
    @Prop({ default: '' }) layout!: string
    @Prop({ default: false }) footer!: boolean
    @Prop({ default: false }) preview!: boolean
    @Prop({ default: true }) showContent!: boolean

    // public redirect() {
    //     if (this.preview) {
    //         this.$emit('click', this.row)
    //     } else {
    //         window.open(this.row.wiki)
    //     }
    // }
    get firstName() {
        return this.row.firstName || this.row.name.slice(0, 1)
    }
    get logoStyle() {
        const result: any = []
        if (this.row.icon) {
            result.push(`background-image: url(${this.row.icon});`)
        }
        if (this.row.bg) {
            result.push(`background-color: ${this.row.bg};`)
        }
        return result.join('')
    }
    get style() {
        const result: any = []
        if (this.layout === 'simple') {
            result.push(`height: auto;`)
        }
        return result.join('')
    }
    emit(val: any) {
        this.$emit(val)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.AppCard--Outer {
    &:nth-child(10n + 1) .AppCard--Logo i {
        background-color: rgb(0, 137, 255);
    }
    &:nth-child(10n + 2) .AppCard--Logo i {
        background-color: rgb(0, 184, 83);
    }
    &:nth-child(10n + 3) .AppCard--Logo i {
        background-color: rgb(255, 162, 0);
    }
    &:nth-child(10n + 4) .AppCard--Logo i {
        background-color: rgb(255, 115, 87);
    }
    &:nth-child(10n + 5) .AppCard--Logo i {
        background-color: rgb(92, 114, 255);
    }
    &:nth-child(10n + 6) .AppCard--Logo i {
        background-color: rgb(133, 199, 0);
    }
    &:nth-child(10n + 7) .AppCard--Logo i {
        background-color: rgb(255, 107, 122);
    }
    &:nth-child(10n + 8) .AppCard--Logo i {
        background-color: rgb(143, 102, 255);
    }
    &:nth-child(10n + 9) .AppCard--Logo i {
        background-color: rgb(20, 169, 255);
    }
}
.AppCard {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #fff;
    cursor: pointer;

    flex-direction: column;
    border: 1px solid #f1f2f3;
    border-radius: 6px;
    height: 176px;
    padding: 16px;
    overflow: hidden;
    box-sizing: border-box;

    justify-content: space-between;

    &:hover {
        border: 1px solid #0089ff;
    }

    .AppCard--CardTop {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        font-size: 16px;
        color: #171a1d;
        line-height: 28px;

        align-items: center;
    }
    .AppCard--Logo {
        height: 40px;
        width: 40px;
        border-radius: 6px;
        line-height: 40px;
        text-align: center;
        margin-right: 10px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-style: normal;
            background-color: rgb(0, 184, 83);
            width: 40px;
            height: 40px;
            font-size: 24px;
            color: rgb(255, 255, 255);
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            //background: url(https://fed81.coding.net/static/project_icon/scenery-version-2-6.svg);
            background-size: cover;
        }
    }

    .AppCard--CardTitle {
        overflow: hidden;
        width: 80%;
        height: 28px;
        line-height: 28px;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 500;
    }
    .AppCard--CardText {
        font-size: 14px;
        color: #747677;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        height: 52px;
        line-height: 18px;
    }
    .AppCard--CardFooter {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    .AppCard--card-status-group {
        flex: 1;
        overflow: hidden;
    }
    .AppCard--ellipsis {
        color: #878f95;
        height: 32px;
        width: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 6px;
        &:hover {
            background-color: #f1f2f3;
        }
    }
    .AppCard--ellipsis-icon {
        width: 32px;
    }
    .AppCard--CardSonLine {
        display: inline-block;
        vertical-align: top;
        background: rgba(0, 176, 66, 0.12);
        border-radius: 4px;
        color: #00b042;
        padding: 0 8px;
        margin-right: 8px;
        height: 24px;
        line-height: 24px;
        text-align: center;
    }
    .AppCard--CardSOffline {
        display: inline-block;
        vertical-align: top;
        background: rgba(255, 146, 0, 0.12);
        border-radius: 4px;
        color: #ff9200;
        padding: 0 8px;
        margin-right: 8px;
        height: 24px;
        line-height: 24px;
        text-align: center;
    }
    .AppCard--CopyDialogContentTip {
        color: #ff5219;
        width: 95%;
    }
}
</style>
