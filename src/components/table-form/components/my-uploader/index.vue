<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import BaseUploader from '@/sharegood-ui/packages/base-uploader/src/index.vue'
import { CreateElement } from 'vue'
import BaseForm from '../base-form/index.vue'
// import { downloadFile } from '@/entry/pc/scripts/utils'
import { FileProp } from '../../types'
@Component({
    name: 'MyUploader',
    components: {},
    extends: BaseUploader,
})
export default class MyUploader extends BaseForm {
    loading = false

    fileList: FileProp[] = this.column.prop ? this.row[this.column.prop] : []

    $ShareGood!: any

    /**初始化值 */
    initValue() {
        const defaultValue: any[] = []
        const value = this.row[this.column.prop]
        this.$emit('input', value ?? defaultValue)
    }

    @Watch('fileList')
    watchFileList(newV: File[]) {
        this.$emit('input', newV)
    }

    onRemove(file: FileProp, fileList: FileProp[]) {
        this.fileList = fileList
    }
    handleExceed() {
        this.$message.warning(`仅限上传 ${this.column.attrs.limit} 个文件`)
    }

    get exAttrs() {
        const globalConfig = this.$ShareGood || {}
        const config = globalConfig.uploader || {}
        const attrs = this.column.attrs || {}
        let { action, ...rest } = attrs
        action = process.env.VUE_APP_BASEURL_API + action
        const defaults = {
            'auto-upload': true,
            'on-remove': this.onRemove,
            'on-exceed': this.handleExceed,
        }
        const result = {
            ...defaults,
            ...config,
            'http-request': this.handleUpload,
            ...rest,
            action,
        }
        return result
    }

    async handleUpload(file: FileProp) {
        this.loading = true
        const formData = new FormData()
        const { name } = file.file
        formData.append('file', file.file)
        // const { data } = await this.$http
        //     .$uploadFile({
        //         url: this.column.attrs?.action ?? '/sysCommon/uploadFile',
        //         method: 'post',
        //         data: formData,
        //     })
        //     .finally(() => {
        //         this.loading = false
        //     })
        // this.fileList.push({
        //     name,
        //     url: data?.filePath,
        // })
        this.$message.success('上传成功！')
    }

    render(h: CreateElement) {
        let component = []
        if (this.operaType === 'readonly') {
            component = this.fileList?.length
                ? this.fileList.map((file: any) =>
                      h(
                          'el-link',
                          {
                              props: {
                                  type: 'primary',
                                  underline: false,
                              },
                              on: {
                                  click: () => {
                                      //   downloadFile(file.name, file.url)
                                  },
                              },
                          },
                          file.name,
                      ),
                  )
                : [h('span', this.myDefaultValue(this.column))]
        } else {
            component = [(BaseUploader as any).render.bind(this)(h)]
        }

        return h(
            'div',
            {
                style: { minHeight: '24px' },
                directives: [
                    {
                        name: 'loading',
                        value: this.loading,
                    },
                ],
            },
            component,
        )
    }
}
</script>

<style lang="less" scoped>
.sg-upload {
    .el-button {
        padding: 0 15px;
        line-height: 30px;
        background: #fff;
        border: 1px solid #0797f3;
        color: #0797f3;
        border-radius: 15px;
    }
}
</style>
