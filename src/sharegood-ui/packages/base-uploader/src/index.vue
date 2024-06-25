<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-upload
            class="sg-upload"
            ref="myRef"
            :name="name"
            :file-list="value"
            :list-type="listType"
            v-bind="exAttrs"
            :on-success="handleSuccess"
            :on-change="handleChange"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-progress="handleProgress"
            :on-remove="handleRemove"
            :before-upload="onBeforeUpload"
            :on-exceed="handlExceed"
        >
            <!-- <slot :slot="slotType" name="inputSlot">
                <el-button type="primary">选取文件</el-button>
            </slot> -->
            <slot slot="default" name="default">
                <div @click="nactiveClick" style="height: 100%">
                    <template v-if="exAttrs.drag">
                        <div class="drag-tempalte" @drop.prevent="onDrag">
                            <ex-slot :row="{}" :render="dragTemplateRender"></ex-slot>
                        </div>
                    </template>
                    <template v-else-if="listType === 'picture-card'">
                        <i class="el-icon-plus"></i>
                    </template>
                    <template v-else>
                        <el-button type="primary" :loading="singleUploading" :disabled="disabledUpload">{{ uploadBtnText }}</el-button>
                    </template>
                </div>
            </slot>
            <slot slot="tip" name="tip">
                <ex-slot :row="{}" :render="tipSlotRender" v-if="tipSlotRender"></ex-slot>
            </slot>
            <slot slot="file" slot-scope="{ file }" v-if="listType === 'text'">
                <div class="el-upload-list__item-container">
                    <a class="el-upload-list__item-name" @click="handlePreview(file)">
                        <i class="el-icon-document"></i>
                        <ellipsis-tooltip :value="file.name"></ellipsis-tooltip>
                    </a>
                    <label class="el-upload-list__item-status-label">
                        <i :class="{ 'el-icon-upload-success': true, 'el-icon-circle-check': listType === 'text' }"></i>
                    </label>
                    <div class="opera-box" v-if="!exAttrs.disabled">
                        <i class="el-icon-download" v-if="downloadRequest" @click="downloadFile(file)"></i>
                        <i class="el-icon-close" v-if="allowDelete" @click="removeFile(file)"></i>
                    </div>
                    <el-progress v-if="file.status === 'uploading'" :type="'line'" :stroke-width="2" :percentage="parsePercentage(file.percentage)"></el-progress>
                </div>
            </slot>
            <slot slot="file" slot-scope="{ file }" v-else>
                <base-image class="el-upload-list__item-thumbnail" v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1" :src="previewRequest(file)" />
                <a class="el-upload-list__item-name" @click="handleClick(file)">
                    <i class="el-icon-document"></i>
                    {{ file.name }}
                </a>
                <label class="el-upload-list__item-status-label">
                    <i
                        :class="{
                            'el-icon-upload-success': true,
                            'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1,
                        }"
                    ></i>
                </label>
                <i class="el-icon-close" v-if="!disabled" @click="removeFile(file)"></i>
                <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
                <el-progress
                    v-if="file.status === 'uploading'"
                    :type="listType === 'picture-card' ? 'circle' : 'line'"
                    :stroke-width="listType === 'picture-card' ? 6 : 2"
                    :percentage="parsePercentage(file.percentage)"
                ></el-progress>
                <span class="el-upload-list__item-actions" v-if="listType === 'picture-card'">
                    <span class="el-upload-list__item-preview" v-if="onPreview && listType === 'picture-card'" @click="onPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled && allowDelete" class="el-upload-list__item-delete" @click="removeFile(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </slot>
        </el-upload>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import EllipsisTooltip from '../../ellipsis-tooltip/index.vue'
import { ExSlot } from '../../utils/ExSlot'
import BaseImage from './base-image'
export default {
    components: {
        ExSlot,
        EllipsisTooltip,
        BaseImage,
    },
    name: 'SgBaseUploader',
    props: {
        tipSlotRender: {
            type: [Function, String],
            default: null,
        },
        dragSlotRender: {
            type: [Function, String],
            default: null,
        },
        name: {
            type: String,
            default: 'file',
        },
        label: {
            type: String,
            default: '',
        },
        value: {
            type: Array,
            default() {
                return []
            },
        },
        // picture-card
        listType: {
            type: String,
            default() {
                // 空字符串时成功图标显示有问题
                return 'text'
            },
        },
        listeners: {
            type: Object,
            default() {
                return {}
            },
        },
        slotType: {
            type: String,
            default: 'trigger',
        },
        onSuccess: {
            type: Function,
            default() {},
        },
        onChange: {
            type: Function,
            default() {},
        },
        onPreview: {
            type: Function,
            default() {},
        },
        onRemove: {
            type: Function,
            default() {},
        },
        onError: {
            type: Function,
            default() {},
        },
        /**单个上传文件大小 单位：MB */
        singleMaxSize: {
            type: Number,
            default: Infinity,
        },
        /**下载请求 */
        downloadRequest: {
            type: Function,
            default: null,
        },
        /**预览请求 */
        previewRequest: {
            type: Function,
            default: file => file.url,
        },
        /**选择文件之前 */
        onChooseBefore: {
            type: Function,
            default() {},
        },
        uploadBtnText: {
            type: String,
            default: '上传文件',
        },
        /**单文件覆盖上传 */
        singleFileCover: {
            type: Boolean,
            default: false,
        },
        /**允许删除 */
        allowDelete: {
            type: Boolean,
            default: true,
        },
    },
    //mixins: [formMixins],
    watch: {
        value(val) {
            // = val
            //this.handleChange && this.handleChange(this.currentValue)
        },
    },
    computed: {
        exAttrs() {
            const globalConfig = this.$ShareGood || {}
            const config = globalConfig.uploader || {}
            const attrs = this.$attrs || {}
            let { action, ...rest } = attrs
            action = process.env.VUE_APP_BASEURL_API + action ?? ''
            const defaults = {
                'auto-upload': true,
                //limit: 1,
            }

            const result = {
                ...defaults,
                ...config,
                ...rest,
                action,
            }

            return result
        },
        /**禁止上传 */
        disabledUpload() {
            if (!this.exAttrs.limit || this.singleFileCover) return false
            return this.value.length >= parseFloat(this.exAttrs.limit)
        },
        /**单文件上传中 */
        singleUploading() {
            if (!this.singleFileCover) return false
            return this.value?.[0]?.status === 'uploading'
        },
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {
        dragTemplateRender() {
            const dragTempalte = [<i class="el-icon-plus"></i>, <div class="el-upload__text">点击或将文件拖到这里上传</div>, <div class="el-upload__accept"></div>]
            return this.dragSlotRender?.(dragTempalte) || dragTempalte
        },
        async submit() {
            await this.$refs.myRef.submit()
        },
        clearFiles() {
            this.$refs.myRef.clearFiles()
            this.onInput([])
        },
        handleSuccess(response, file, fileList) {
            console.log('handleSuccess', file, fileList)
            file.url = file.response
            this.onInput(fileList)
            this.onSuccess({ response, file, fileList }, this.$refs.myRef)
        },
        handleError(err, file, fileList) {
            this.onError && this.onError(err, file, fileList)
        },
        handleRemove(file, fileList) {
            console.log('handleRemove', file, fileList)
            this.onInput(fileList)
            this.onRemove && this.onRemove(file, fileList)
        },
        handleProgress(event, file, fileList) {
            this.onProgress && this.onProgress(event, file, fileList)
        },
        handleChange(file, fileList) {
            if (this.singleFileCover && fileList.length > 1 && file.status === 'ready') {
                fileList = fileList.filter(item => item.status === 'ready')
            }
            console.log('handleChange', file, fileList)
            this.onInput(fileList)
            this.onChange && this.onChange(file, fileList)
        },
        handlePreview(file) {
            this.onPreview && this.onPreview(file)
        },
        onInput(fileList = []) {
            this.$emit('input', fileList)
        },
        onBeforeUpload(file) {
            /**校验文件类型 */
            const fileType = file?.name?.slice(file?.name?.lastIndexOf('.'))
            const accept = this.$attrs?.accept?.split(',') ?? []
            const allAccept = accept.concat(accept.map(item => item.toUpperCase()))
            if (accept.length > 0 && !allAccept.includes(fileType)) {
                this.$message.error(`文件类型必须是${accept.join('、')}中的一种`)
                return false
            }
            /**当前文件大小 */
            const size = file.size / 1024 / 1024
            if (this.singleMaxSize < size) {
                this.$message.error(`单个文件大小不能超过${this.singleMaxSize}MB`)
                return false
            }
        },
        async handlExceed(files, fileList) {
            const limit = this.exAttrs?.limit
            this.$message.warning(`最大可上传 ${limit} 个文件`)
        },
        parsePercentage(val) {
            return parseInt(val, 10)
        },
        removeFile(file) {
            this.$refs.myRef.handleRemove(file)
        },
        downloadFile(file) {
            this.downloadRequest?.(file)
        },
        /**有上传中的文件 */
        hasUploadingFile() {
            return this.$attrs?.['auto-upload'] !== false && this.value.some(item => (item?.status || 'success') !== 'success')
        },
        async nactiveClick(ev) {
            if (ev.isTrusted) {
                ev.stopPropagation()
                const pass = (await this.onChooseBefore?.()) ?? true
                if (pass) {
                    ev.target.click()
                }
            }
        },
        async onDrag(ev) {
            const files = Array.from(ev.dataTransfer.files)
            ev.stopPropagation()
            const pass = (await this.onChooseBefore?.()) ?? true
            if (pass) {
                const uploader = this.$refs.myRef
                const uploadDragger = uploader.$children[0].$children[0]
                uploadDragger.onDrop({
                    dataTransfer: { files },
                })
            }
        },
        generateValidate() {
            return [
                {
                    validator: async (rule, value, callback) => {
                        callback(this.hasUploadingFile() ? '文件正在上传中' : undefined)
                    },
                },
            ]
        },
    },
}
</script>
<style lang="less" scoped>
::v-deep {
    .el-upload-dragger {
        height: 120px;
    }
    .drag-tempalte {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100%;
        border: 1px dashed #dddddd;
        border-radius: 4px;
        background: #f5f5f5;
        .el-icon-plus {
            color: #112a45;
            font-weight: bold;
        }
        .el-upload__text {
            color: #1d2129;
        }
        .el-upload__accept {
            color: var(--color-black);
            font-size: 12px;
            line-height: 18px;
        }
    }
    .el-upload {
        vertical-align: top;
    }
    .el-upload-list {
        width: 360px;
    }
    .el-upload-list__item:has(.el-upload-list__item-container) {
        padding: 0 12px 0 14px;
        height: 32px;
        border-radius: 2px;
        background: #f7f8fa;
        &:first-child {
            margin-top: 8px;
        }
        .el-upload-list__item-container {
            display: flex;
            overflow: hidden;
            width: 100%;
            height: 100%;
            .el-upload-list__item-name {
                display: flex;
                align-items: center;
                flex: 1;
                color: #1d2129;
                .ellipsis-tooltip {
                    width: calc(100% - 30px);
                }
            }
            .el-upload-list__item-status-label {
                top: 4px;
                right: 14px;
            }
            .el-icon-close {
                top: 9px;
                right: 14px;
            }
            .el-progress {
                top: 22px;
                left: 0;
                .el-progress__text {
                    padding-right: 12px;
                    color: #158dff;
                    font-weight: 600;
                }
            }
            .el-icon-close,
            .el-icon-document {
                display: inline-block;
                flex-shrink: 0;
                width: 12px;
                height: 14px;
                background: url('../../../assets/images/file.svg') no-repeat;
                background-size: 100% 100%;
                &:before {
                    display: none;
                }
            }
            .opera-box {
                position: absolute;
                top: 9px;
                right: 14px;
                display: none;
                .el-icon-close,
                .el-icon-download {
                    position: static;
                    font-weight: bold;
                    opacity: 1;
                    cursor: pointer;
                }
                i + i {
                    margin-left: 16px;
                }
            }
            .el-icon-close {
                background-image: url('../../../assets/images/delete.svg');
            }
        }
        &:hover {
            .el-upload-list__item-container {
                .opera-box {
                    display: flex;
                }
            }
        }
    }
    .el-upload--picture-card,
    .el-upload-list--picture-card .el-upload-list__item {
        width: 80px;
        height: 80px;
    }
    .el-upload--picture-card {
        line-height: 87px;
    }
    .el-upload-list--picture-card {
        line-height: initial;
    }
}
</style>
