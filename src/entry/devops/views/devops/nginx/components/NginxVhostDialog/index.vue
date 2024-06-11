<template>
    <el-dialog ref="dialog" :title="'一键导入'" visible class="NginxEditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="500px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <div class="sg-mb-3">
                <el-tag :type="getType(index)" v-for="(item, index) in list" :key="index">
                    <span v-text="item.filename"></span>
                    |
                    <span v-text="item.port"></span>
                </el-tag>
            </div>
            <div class="action">
                <el-button type="primary" @click="handleSubmit">确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { NginxConf } from '@/entry/devops/models'

interface FormModel {
    branch?: string
    target?: string
}
@Component({
    name: 'NginxEditDialog',
    components: {},
})
export default class NginxEditDialog extends Vue {
    public $refs!: {
        formRef: FormRef
    }
    private list: NginxConf[] = []
    getType(index: number) {
        const result = ['', 'success', 'info', 'warning', 'danger']
        return result[index % result.length]
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    async handleSubmit() {
        await API.NginxService.vhostImport()
        this.confirm()
    }

    async created() {
        const { data } = await API.NginxService.getVhostList()
        this.list = data
    }
}
</script>

<style lang="less" scoped>
.NginxEditDialog ::v-deep {
    .el-tag {
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .el-dialog__body {
        padding: 10px 20px;
    }
    .branch {
        .el-select {
            width: 250px;
        }
    }
    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        display: block;
        margin-bottom: 10px;
    }
}
</style>
