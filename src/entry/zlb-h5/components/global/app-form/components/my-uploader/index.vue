<template>
    <van-field class="my-uploader" :class="{ 'full-row': isFullRow }" v-bind="$attrs">
        <slot slot="label" name="label" v-if="!isFullRow"></slot>
        <template #label v-if="isFullRow">
            <span class="defiend-label">{{ definedLabel || $attrs.label }}</span>
            <span class="max-limit" v-if="maxCount > 0 && maxCount !== Infinity">（{{ myValue.fileList.length }}/{{ maxCount }}）</span>
        </template>
        <template #input>
            <van-uploader
                multiple
                :disabled="disabled"
                v-model="myValue.fileList"
                :accept="accept"
                :max-count="maxCount"
                :max-size="maxSize"
                :before-read="beforeRead"
                :after-read="afterRead"
                @delete="delAttach"
            />
        </template>

        <slot slot="extra" name="extra ">
            <!-- 加载 -->
            <my-loading :showloading="isUploading" :is-wrapper="true" :no-mask="true"></my-loading>
        </slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Toast } from 'vant'
import { isOrNotCompressPic } from '../../service/index'

@Component({
    name: 'MyUploader',
    components: {},
})
export default class MyUploader extends Vue {
    /**当前输入的值 */
    @Prop({ default: () => [] })
    value!: any[]
    /**标题是否自定义独占一行 */
    @Prop({ type: Boolean, default: true })
    isFullRow?: boolean
    /**标题名称 */
    @Prop({ type: String, default: '' })
    definedLabel?: string
    /**接受上传的文件类型 */
    @Prop({ type: String, default: '*' })
    accept!: string
    /**最大上传文件数 */
    @Prop({ type: Number, default: Infinity })
    maxCount?: number
    /**最大单个上传文件大小限制（单位MB）,默认5M */
    @Prop({ type: Number, default: 5 * 1024 * 1024 })
    maxSize?: number
    /**自定义上传方法 */
    @Prop({ type: Function, default: () => Promise.resolve('') })
    httpRequest!: (params: Record<string, any>) => Promise<string>
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    // 已上传成功附件
    public successUploadFiles: any[] = []
    public stackNames: string[] = []
    public isUploading = false

    get myValue() {
        console.log('this.value', this.value)

        if (Array.isArray(this.value)) {
            this.successUploadFiles = []
            this.stackNames = []
            const list: any = this.value
            if (list.length) {
                list.forEach((item: any) => {
                    if (item && item.name) {
                        item.status = 'done'
                        this.stackNames.push(item.name)
                    }
                })
                this.successUploadFiles = list
                return {
                    fileList: list,
                }
            }
        }
        return { fileList: [] }
    }

    mounted() {}

    // 删除文件
    delAttach(file: any, event: any) {
        let newSucFiles: any[] = []
        this.stackNames = []
        this.successUploadFiles.forEach((file1: any) => {
            if (file1.name != file.name) {
                newSucFiles.push(file1)
                this.stackNames.push(file1.name)
            }
        })
        this.successUploadFiles = newSucFiles
        this.myValue.fileList.splice(event.index, 1)
        this.$emit('input', this.successUploadFiles)
    }
    // 上传文件之前的钩子
    beforeRead(files: any) {
        let fileList: any = []
        if (files instanceof Array) {
            fileList = files
        } else {
            fileList.push(files)
        }
        let typeList: any = []
        let nameList: any = []
        let sizeTotal = 0
        fileList.forEach((file: any) => {
            typeList.push(file.type)
            nameList.push(file.name)
            sizeTotal += file.size
        })
        // 文件类型校验结果
        const accepts = this.accept.split('/')
        for (let i = 0; i < typeList.length; i++) {
            const typePass = accepts.some(type => {
                return new RegExp(type).test(typeList[i])
            })
            if (!typePass) {
                Toast(`请上传${this.accept}类型的文件！`)
                return false
            }
        }
        // 重复名称的文件
        // for (let j = 0; j < nameList.length; j++) {
        //     if (this.stackNames.includes(nameList[j])) {
        //         Toast('请不要重复上传相同的文件！')
        //         return false
        //     }
        // }
        // 校验上传文件大小
        if (this.maxSize && this.maxSize < sizeTotal) {
            let limitTip = ''
            const limitSize = this.maxSize / 1024
            if (limitSize < 1024) {
                limitTip = `${limitSize}KB`
            } else if (limitSize / 1024 < 1024) {
                limitTip = `${limitSize / 1024}MB`
            } else if (limitSize / 1024 / 1024 < 1024) {
                limitTip = `${limitSize / 1024 / 1024}GB`
            } else {
                limitTip = `${limitSize / 1024 / 1024 / 1024}TB`
            }
            Toast(`单次上传文件大小不能超过${limitTip}`)
            return false
        }
        return true
    }
    // 校验成功后上传
    afterRead(files: any, idx: number) {
        let fileList: any = []
        if (files instanceof Array) {
            fileList = files
        } else {
            fileList.push(files)
        }
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].status = 'uploading'
            this.isUploading = true
            setTimeout(() => {
                isOrNotCompressPic(fileList[i].file, fileList[i].content, (data: string) => {
                    this.startUpload(data)
                })
            }, 300)
        }
    }

    // 开始上传后台
    startUpload(blobfile: any) {
        let sendFile: any = {
            file: blobfile,
            name: blobfile.name,
            url: '',
            status: 'uploading',
        }
        this.httpRequest(sendFile)
            .then((url: string) => {
                this.successUploadFiles.push({
                    status: 'done',
                    url: url,
                    name: blobfile.name,
                })
                sendFile.url = url
                this.stackNames.push(blobfile.name)
                this.$emit('input', this.successUploadFiles)
                this.isUploading = false
            })
            .catch(() => {
                sendFile.status = 'failed'
                this.isUploading = false
            })
    }
}
</script>

<style lang="less" scoped>
.my-uploader {
    ::v-deep {
        .van-field__label {
            width: 150px;
            max-width: 100%;
        }
        .van-field__value {
            width: 100%;
        }
        .van-uploader__upload,
        .van-uploader__preview-image,
        .van-uploader__file {
            width: 68px;
            height: 68px;
        }
    }
    &.full-row {
        flex-direction: column;
        /deep/.van-field__label {
            width: 100%;
            .max-limit {
                float: right;
                color: #666;
            }
        }
        /deep/ .van-field__value {
            margin-top: 10px;
            .van-field__control--right {
                justify-content: flex-start;
            }
            .van-uploader__preview {
                margin: 0 8px 8px 0;
            }
        }
    }
}
</style>
