<template>
    <el-dialog class="icinfo-ai ApplyDialog" title="申请查看" :visible="true" width="500px" @close="cancel">
        <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="申请原因" prop="reason">
                <el-input v-model="formData.reason" type="textarea" :rows="4" placeholder="请输入申请查看卷宗的原因" maxlength="100" show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component({
    name: 'ApplyDialog',
    components: {},
})
export default class ApplyDialog extends Vue {
    @Ref('form') form!: any

    formData = {
        reason: '',
    }

    rules = {
        reason: [{ required: true, message: '请输入申请查看卷宗的原因', trigger: 'blur' }],
    }

    async confirm() {
        try {
            await this.form.validate()
            this.$options.confirm?.(this.formData)
        } catch (error) {
            console.error(error)
        }
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style lang="less" scoped>
.ApplyDialog ::v-deep {
    .el-dialog__body {
        padding: 15px 20px;
    }
}
</style>
