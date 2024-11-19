<template>
    <div class="upload-control">
        <el-upload
            :disabled="disabled"
            :list-type="listType"
            :action="action"
            :file-list="fileList"
            :limit="limit"
            :accept="accept"
            :multiple="limit > 1"
            :http-request="httpRequest"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
        >
            <el-button v-if="listType === 'text'" size="small" type="primary">点击上传</el-button>
            <i v-else class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
                <!-- 只能上传jpg/png文件，且不超过500kb -->
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img v-displace="dialogImageUrl" width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { customDeepClone } from '../../util'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
    name: 'UploadControl',
    components: {},
})
export default class UploadControl extends Vue {
    @Prop({ type: Array, default: () => [] })
    value!: { name: string; url: string }[]
    @Prop({ type: String, default: '' })
    action!: string
    /**文件列表的类型 */
    // @Prop({ type: String, default: 'picture-card' })
    // listType!: 'text' | 'picture-card'
    /**自定义上传方法 */
    @Prop({ type: Function, default: () => Promise.resolve('') })
    httpRequest!: (params: Record<string, any>) => string
    /**最大允许上传个数 */
    @Prop({ type: Number, default: Infinity })
    limit!: number
    /**文件大小限制 */
    @Prop({ type: Number, default: Infinity })
    limitSize!: number
    /**接受上传的文件类型 */
    @Prop({ type: String, default: '' })
    accept!: string
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    dialogImageUrl = ''
    dialogVisible = false
    fileList: any[] = []
    beforeUploadSuccess = true

    @Watch('value')
    watchValue(newV: any[]) {
        if (JSON.stringify(this.fileListValue) === JSON.stringify(this.value)) return
        this.fileList = customDeepClone(newV)
    }
    get fileListValue() {
        return this.fileList
            .filter(({ status }: any) => status === 'success' || !status)
            .map(item => {
                return {
                    name: item.name,
                    url: item?.response || item.url,
                }
            })
    }
    get listType() {
        return this.accept === 'image/*' ? 'picture-card' : 'text'
    }
    handleRemove(file: any, fileList: any[]) {
        this.fileList = fileList
        // 做个标记拦截，防止背beforeUpload方法中拦截删除时，触发更新事件
        if (this.beforeUploadSuccess) {
            this.updateValue()
        }
        this.beforeUploadSuccess = true
    }
    handleChange(file: any, fileList: any[]) {
        this.fileList = fileList
    }
    handleExceed(files: any, fileList: any[]) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件`)
    }
    handlePictureCardPreview(file: any) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
    }
    handleSuccess() {
        this.updateValue()
    }
    beforeUpload(file: File) {
        console.log('beforeUpload', file)
        const accepts = this.accept.split(',')
        // 类型符合
        const typePass = accepts.some(type => new RegExp(type).test(file.type))
        if (!typePass) {
            this.$message.error(`上传附件类型必须为${this.accept}!`)
        }
        // 大小符合
        const sizePass = file.size / 1024 / 1024 < this.limitSize
        if (!sizePass) {
            this.$message.error(`上传附件大小不能超过 ${this.limitSize}M!`)
        }
        this.beforeUploadSuccess = sizePass && typePass
        return this.beforeUploadSuccess
    }
    updateValue() {
        this.$emit('input', customDeepClone(this.fileListValue))
    }

    // validateForm() { }
}
</script>
<style lang="less" scoped>
.upload-control {
    font-family: initial;
}
</style>
