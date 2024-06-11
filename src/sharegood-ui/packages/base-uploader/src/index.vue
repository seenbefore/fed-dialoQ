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
        >
            <!-- <slot :slot="slotType" name="inputSlot">
                <el-button type="primary">选取文件</el-button>
            </slot> -->
            <slot slot="default" name="default">
                <template v-if="listType === 'picture-card'">
                    <i class="el-icon-plus"></i>
                </template>
                <template v-else>
                    <el-button type="primary">选取文件</el-button>
                </template>
            </slot>
            <slot slot="tip" name="tip">
                <ex-slot :row="{}" :render="tipSlotRender" v-if="tipSlotRender"></ex-slot>
            </slot>
        </el-upload>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import { ExSlot } from '../../utils/ExSlot'
export default {
    components: {
        ExSlot,
    },
    name: 'SgBaseUploader',
    props: {
        tipSlotRender: {
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
        onlyOne: {
            type: Boolean,
            default: false,
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
                return undefined
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
            action = process.env.VUE_APP_BASEURL_API + action
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
    },
    data() {
        return {}
    },
    created() {},
    methods: {
        async submit() {
            await this.$refs.myRef.submit()
        },
        clearFiles() {
            this.$refs.myRef.clearFiles()
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
            console.log('handleChange', file, fileList)
            this.onInput(fileList)
            this.onChange && this.onChange(file, fileList)
            if (this.onlyOne) {
                if (fileList.length > 1) {
                    fileList.splice(0, 1)
                }
            }
        },
        handlePreview(file) {
            this.onPreview && this.onPreview(file)
        },
        onInput(fileList = []) {
            this.$emit('input', fileList)
        },
    },
    mounted() {},
}
</script>
