<!-- 忘记密码 -->
<template>
    <div class="ForgetPassword">
        <el-dialog title="找回账号/密码" :visible="true" width="30%" :show-close="false">
            <el-input ref="inputName" v-model="model.name" placeholder="请输入您的姓名" @keyup.enter.native="handleSubmit"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmit" :disabled="!model.name">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { UserService } from '@/entry/devops/api'
@Component({
    name: 'ForgetPassword',
    components: {},
})
export default class ForgetPassword extends Vue {
    model = {
        name: '',
    }
    mounted() {
        this.$nextTick(() => {
            const inputName = this.$refs.inputName as any
            inputName.$el.querySelector('input').focus()
        })
    }
    async handleSubmit() {
        await UserService.findPassword({
            name: this.model.name,
        })
        this.$message.success('密码已发送至您的邮箱')
        window.history.go(-1)
    }
}
</script>

<style lang="less" scoped>
.ForgetPassword ::v-deep {
}
</style>
