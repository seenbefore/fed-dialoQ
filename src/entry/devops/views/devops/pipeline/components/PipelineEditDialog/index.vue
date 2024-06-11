<template>
    <el-dialog ref="dialog" class="PipelineEditDialog" :close-on-click-modal="false" title="应用信息" width="900px" :fullscreen="true" v-bind="$attrs" :visible="true" @close="cancel">
        <div class="body sg-flexbox">
            <div class="side">
                <el-menu @select="handleSelect" :default-active="activeMenu" class="el-menu-vertical-demo">
                    <el-menu-item index="form">
                        <i class="el-icon-menu"></i>
                        <span slot="title">基本信息</span>
                    </el-menu-item>
                    <el-menu-item index="member">
                        <i class="el-icon-menu"></i>
                        <span slot="title">成员管理</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="main sg-flex-1">
                <component :is="currentComponent.name" v-bind="currentComponent.attrs"></component>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'

interface FormModel {
    branch?: string
    target?: string
}
@Component({
    components: {},
})
export default class PreDeployDialog extends Vue {
    @Prop({ type: String }) title!: string
    @Prop({ type: Boolean }) visible!: boolean
    @Prop({ type: Object }) meta: any

    private activeMenu = 'form'
    get currentComponent() {
        if (this.activeMenu === 'form') {
            return {
                name: () => import('../PipelineForm/index.vue'),
                attrs: {},
            }
        } else if (this.activeMenu === 'member') {
            return {
                name: () => import('../PipelineMember/index.vue'),
                attrs: {},
            }
        }
        return {}
    }
    public $refs!: {
        formRef: FormRef
    }

    handleSelect(index: any, indexPath: any) {
        console.log(index, indexPath)
        this.activeMenu = index
    }
    handleOpen(key: any, keyPath: any) {
        console.log(key, keyPath)
    }
    handleClose(key: any, keyPath: any) {
        console.log(key, keyPath)
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }

    // handleSubmit() {
    //     const ref = this.$refs.formRef
    //     const row = this.formModel
    //     ref.validate(async valid => {
    //         if (valid) {
    //             console.log(row)
    //             const appId = this.meta.id
    //             const res = await API.AppService.build({ appId, ...row })

    //             this.$redirect({
    //                 path: `/devops/app-log/${appId}/${res.data}`,
    //             })
    //         }
    //     })
    // }
}
</script>

<style lang="less" scoped>
.PipelineEditDialog ::v-deep {
    .side {
        width: 180px;

        .el-menu {
            height: 100%;
        }
        height: calc(100vh - 50px);
    }
    .main {
        height: calc(100vh - 50px);
        overflow-y: auto;
    }
    .el-dialog__header {
        border-bottom: solid 1px #e6e6e6;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
    }
    .el-dialog__body {
        padding: 0;
        height: calc(100vh - 50px);
    }
}
</style>
