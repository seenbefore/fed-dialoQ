<template>
    <el-drawer class="app-preivew-drawer" :visible.sync="myVisible" :direction="direction" :append-to-body="true" size="100%">
        <div slot="title">详情</div>
        <div class="body">
            <div class="inner">
                <div class="side">
                    <div class="info">
                        <div class="name" v-text="row.name">sasd</div>
                        <div class="text" v-html="row.text">
                            撒大大大所大大撒大adasdad敖德萨大大大所大大大
                        </div>
                    </div>

                    <div class="extra">
                        <div style="margin-bottom: 10px" v-if="row.git">
                            <el-button type="" @click="redirect(row.git)">仓库地址</el-button>
                        </div>
                        <div v-if="row.preview" style="margin-bottom: 10px">
                            <el-button type="primary" @click="redirect(row.preview)">预览地址</el-button>
                        </div>
                        <div v-if="row.wiki">
                            <el-button type="success" @click="redirect(row.wiki)">文档地址</el-button>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <el-carousel indicator-position="outside" height="420px" v-if="row.covers && row.covers.length">
                        <el-carousel-item v-for="(item, index) in row.covers" :key="index">
                            <div class="cover" :style="`background-image:url(${item})`"></div>
                        </el-carousel-item>
                    </el-carousel>
                    <iframe :src="row.uri" frameborder="0" v-if="row.uri" style="width: 100%; height: 100%"></iframe>
                    <div class="content-inner" v-if="row.content" v-html="row.content"></div>
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'AppPreview',
    components: {},
})
export default class PipelineProjectDialog extends Vue {
    @Prop({ type: Object }) row: any
    @Prop({ type: Boolean }) visible!: boolean
    direction = 'btt'

    get myVisible() {
        return this.visible
    }
    set myVisible(val) {
        this.$emit('update:visible', val)
    }
    close() {
        this.myVisible = false
    }

    redirect(uri: string) {
        window.open(uri)
    }
}
</script>

<style lang="less" scoped>
.el-carousel__item .cover {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
}

.app-preivew-drawer {
    .body {
        height: calc(100% - 30px);
        padding: 15px;
        margin: 15px;
        background-color: #fff;
        .inner {
            display: flex;
            padding: 10px;
            height: calc(100% - 20px);
            .side {
                width: 210px;
                height: 100%;
                padding-right: 20px;
                border-right: 1px solid #eee;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
                .name {
                    font-family: PingFangSC-Medium;
                    font-size: 20px;
                    color: #171a1d;
                    line-height: 30px;
                    margin-right: 15px;
                }
                .text {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #a2a3a5;
                    line-height: 21px;
                    margin-top: 3px;
                    -webkit-line-clamp: 5 !important;
                }
                .extra {
                    text-align: center;
                }
            }
            .content {
                flex: 1;
                padding-left: 20px;
                padding-top: 20px;
            }
        }
    }
}

.app-preivew-drawer ::v-deep {
    .el-drawer__header {
        margin-bottom: 15px;
    }
    .el-drawer__body {
        height: calc(100% - 50px);
        background-color: #ddd;
    }
}
</style>
