<!-- 素材广场-上传 -->
<template>
    <div class="CommunityUpload styles__StyledSquareContainer-sc-lnu5de-0 fqFuFi squareContainer" id="web">
        <main class="styles__UploadMainPageStyle-sc-7fwvy-0 jsIedF">
            <div class="formBox_container">
                <sg-base-form ref="formRef" v-bind="formAttrs" v-model="formModel" @submit="handleSearch" v-if="inited"></sg-base-form>
            </div>
            <!-- <div class="styles__StyledFooterSection-sc-1rpks84-0 cIMoJi footer_section">
                <div class="submitBox_of_upload">
                    <el-button type="primary" class="sc-gswNZR bKaSir Button PrimaryCoreButton btnBox_of_upload" @click="submit" :loading="View.loading">
                        {{ action === 'create' ? '确认发布' : '确认修改' }}
                    </el-button>
                </div>
            </div> -->
            <PublishSubmitButton @submit="submit" :text="action === 'create' ? '确认发布' : '确认修改'" :loading="View.loading"></PublishSubmitButton>
        </main>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormRow, FormRef } from '@/sharegood-ui'
import { http } from '@/entry/library/scripts/http'
import { ComboGroupDict } from '@/entry/library/scripts/dict/combo_group'
import * as API from '@/entry/library/services/community'
import { userStore } from '@/entry/library/store/useStore'
import { UserService } from '@/entry/library/services/user'
import PublishSubmitButton from '@/entry/library/views/community/components/PublishSubmitButton/index.vue'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
// markdown编辑器 可选
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const md = require('markdown-it')({ html: true })

const requireDocCtxRaw = require('!raw-loader!@/docs/tpl/component.md').default

Vue.use(mavonEditor)
@Component({
    name: 'CommunityUpload',
    components: {
        PublishSubmitButton,
    },
})
export default class CommunityUpload extends Vue {
    @Prop() redirect!: string
    @Prop() id!: string
    @Prop({ default: 'create' }) action!: 'create' | 'update'
    View = {
        loading: false,
    }
    inited = false
    clabels: any[] = []
    slabels: any[] = []
    async mounted() {
        if (this.action === 'update') {
            await this.syncData()
        }
        this.formAttrs = this.getFormAttrs()
        this.inited = true
    }

    async syncData() {
        const { data } = await API.get({
            id: this.id,
        })

        this.$set(this, 'formModel', {
            ...data,
        })
    }
    formModel: any = {
        owner: this.action === 'create' ? userStore.info?.name : '',
        plabel: this.getInitValue().plabel,
        clabel: this.getInitValue().clabel,
        slabel: '',
    }
    formAttrs: any = {}
    getInitValue() {
        const info = userStore.info
        const position = info?.position || ''
        let plabel = ''
        let clabel = ''
        console.log('getInitValue', info)
        if (this.action == 'create') {
            if (position.includes('产品')) {
                plabel = '组件'
                clabel = '业务'
            } else if (position.includes('前端')) {
                plabel = '控件'
                clabel = ''
            }
        }
        return {
            plabel,
            clabel,
        }
    }
    getFormAttrs() {
        return {
            span: 24,
            labelWidth: '120px',
            fields: [
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'name',
                            itemAttrs: {
                                label: '作品标题',
                                // helpMessage: '如 社区团购电商小程序用户端、团长端、中台三端全套实战原型（附带需求导航栏）',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            attrs: {
                                placeholder: '作品类型 / 行业 / 功能用途 / 使用场景等命名',
                                maxlength: 50,
                                'show-word-limit': true,
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            span: 8,
                            tag: 'select',
                            name: 'plabel',
                            itemAttrs: {
                                label: '作品类型',
                                helpMessage: '产品经理选择类型[组件-业务]、前端开发选择类型[控件]',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            attrs: {
                                //value: plabel,
                                placeholder: '请选择类型',
                                options: ComboGroupDict.plabel,
                                onInput: (val, { formActionType, formModel }) => {
                                    console.log('一级分类 onInput', val)
                                    this.$set(this.formModel, 'clabel', '')
                                },
                                // appendSlotRender: () => {
                                //     return <div class="tip">备注：</div>
                                // },
                            },
                        },
                        {
                            span: 8,
                            tag: 'select',
                            name: 'clabel',
                            itemAttrs: {
                                labelWidth: '100px',
                                label: '二级分类',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            attrs: {
                                //value: clabel,
                                onInput: (val, { formActionType, formModel }) => {
                                    console.log('二级分类 onInput', val)

                                    this.$set(this.formModel, 'slabel', '')

                                    //formActionType.updateSchema('slabel', 'attrs.options', result)
                                },
                            },
                            getAttrs: () => {
                                return {
                                    //value: this.formModel.clabel,
                                    placeholder: '请选择类型',
                                    options: () => {
                                        const val = this.formModel.plabel
                                        console.log('this.formModel.plabel', val)
                                        const result = ComboGroupDict.clabel.filter(item => item.parent === val)
                                        return result
                                    },
                                }
                            },
                            ifRender: model => {
                                const val = model.plabel
                                console.log('ifRender plabel', val)
                                const result = ComboGroupDict.clabel.filter(item => item.parent === val)
                                return val && result.length > 0
                            },
                        },
                        {
                            span: 8,
                            tag: 'select',
                            name: 'slabel',
                            itemAttrs: {
                                labelWidth: '100px',
                                label: '三级分类',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            getAttrs: (model: any) => {
                                return {
                                    //value: this.formModel.slabel,
                                    placeholder: '请选择类型',
                                    options: () => {
                                        const val = model.clabel
                                        console.log('this.formModel.clabel', val)
                                        const result = ComboGroupDict.slabel.filter(item => item.parent === val)
                                        return result
                                    },
                                }
                            },
                            ifRender: model => {
                                const val = model.clabel
                                console.log('ifRender clabel', val)
                                const result = ComboGroupDict.slabel.filter(item => item.parent === val)
                                return val && result.length > 0
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'intro',
                            itemAttrs: {
                                //helpMessage: '填写关键字方便搜索',
                                label: '作品介绍',
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '请填写',
                                    // },
                                ],
                            },
                            attrs: {
                                placeholder: '请描述作品类型，功能，使用平台，解决产品问题等',
                                maxlength: 100,
                                'show-word-limit': true,
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'select',
                            name: 'tags',
                            itemAttrs: {
                                helpMessage: '同一类的标签会相互关联',
                                label: '标签',
                                rules: [],
                            },
                            attrs: {
                                multiple: true,
                                filterable: true,
                                'allow-create': true,
                                'default-first-option': true,
                                placeholder: '输入后按回车键创建标签，建议写作品的使用场景、行业等',
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            span: 12,
                            tag: 'autocomplete',
                            name: 'owner',
                            itemAttrs: {
                                label: '负责人',
                            },
                            componentProps: ({ formActionType }) => {
                                return {
                                    attrs: {
                                        value: '',
                                        'value-key': 'label',
                                        debounce: 500,
                                        'highlight-first-item': true,
                                        'trigger-on-focus': true,
                                        placeholder: '模糊查询',
                                        options: async () => {
                                            let options = await UserService.getUserOptions()

                                            return options
                                        },
                                    },
                                }
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'radio',
                            name: 'communityState',
                            itemAttrs: {
                                label: '状态',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            attrs: {
                                value: 'done',
                                options: [
                                    {
                                        label: '已完成',
                                        value: 'done',
                                    },
                                    {
                                        label: '建设中',
                                        value: 'doing',
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'radio',
                            name: 'coverType',
                            itemAttrs: {
                                label: '设置封面',
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写',
                                    },
                                ],
                            },
                            attrs: {
                                value: 'image',
                                options: [
                                    {
                                        label: '有封面',
                                        value: 'image',
                                    },
                                    {
                                        label: '无封面',
                                        value: 'none',
                                    },
                                ],
                            },
                        },
                    ],
                },

                {
                    columns: [
                        {
                            ifRender: model => {
                                return model.coverType === 'image'
                            },
                            tag: 'uploader',
                            name: 'cover_urls',
                            itemAttrs: {
                                label: '上传封面',
                                rules: [
                                    {
                                        required: true,
                                        message: '请上传1张封面',
                                    },
                                ],
                            },
                            attrs: {
                                value: [],
                                limit: 1,
                                accept: '.png,.jpg,.jpeg,.gif',
                                'list-type': 'picture-card',

                                'http-request': async ({ file, filename, onProgress }: any) => {
                                    const formData = new FormData()
                                    formData.append('file', file)

                                    const { data } = await http.request({
                                        url: '/open/upload',
                                        data: formData,
                                        method: 'post',
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                        },

                                        onUploadProgress: (progressEvent: any) => {
                                            const complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)

                                            // 重点二：onProgress()方法需要以上方接收的形参来调用
                                            // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                            onProgress({ percent: complete })
                                        },
                                    })

                                    return data.url
                                },
                                'before-upload': (file: any) => {
                                    const maxSize = 2 * 1024 * 1024 // 2MB，根据你的需求设置最大文件大小

                                    if (file.size > maxSize) {
                                        this.$message({
                                            message: `文件大小超过了${maxSize / (1024 * 1024)}MB的限制`,
                                            type: 'warning',
                                        })
                                        return false
                                    }
                                    return true
                                },
                                'on-preview': (file: any) => {
                                    useImagePreview([file.url])
                                },
                                tipSlotRender: () => {
                                    return (
                                        <div class="cover-tip">
                                            <label>仅限1张，大小不超过2M，建议尺寸为800x480</label>
                                        </div>
                                    )
                                },
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'demoUrl',
                            itemAttrs: {
                                label: '案例链接',
                            },
                            attrs: {
                                value: '',
                                placeholder: '请填写无需登录的案例链接，方便预览',
                                appendSlotRender: () => {
                                    return (
                                        <div>
                                            <el-button
                                                icon="el-icon-info"
                                                type="text"
                                                size="mini"
                                                onClick={() => {
                                                    this.$alert('<strong class="">https://v2-h5.uviewui.com/index.html#/pages/componentsB/countTo/countTo?mode=mobile</strong>', 'url参数mode=mobile', {
                                                        dangerouslyUseHTMLString: true,
                                                        customClass: 'demo-alert-dialog',
                                                    })
                                                }}
                                            >
                                                移动端案例
                                            </el-button>
                                        </div>
                                    )
                                },
                            },
                        },
                    ],
                },

                // {
                //     columns: [
                //         {
                //             tag: 'radio',
                //             name: 'contentType',
                //             itemAttrs: {
                //                 label: '文档展示',
                //                 rules: [
                //                     {
                //                         required: true,
                //                         message: '请填写',
                //                     },
                //                 ],
                //             },
                //             attrs: {
                //                 value: 'url',
                //                 options: [
                //                     {
                //                         label: '链接',
                //                         value: 'url',
                //                     },
                //                     {
                //                         label: 'markdown',
                //                         value: 'markdown',
                //                     },
                //                 ],
                //             },
                //         },
                //     ],
                // },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'url',
                            itemAttrs: {
                                label: '文档链接',
                                // rules: [
                                //     {
                                //         required: true,
                                //         message: '请填写',
                                //     },
                                // ],
                            },
                            attrs: {
                                value: '',
                            },
                            // ifRender(model) {
                            //     return model['contentType'] === 'url'
                            // },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'git',
                            itemAttrs: {
                                label: '代码链接',
                            },
                            attrs: {
                                value: '',
                                placeholder: '请填写代码git地址',
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: () => import('./components/member/index.vue'),
                            name: 'meta',
                            itemAttrs: {
                                label: '团队成员',
                                autoTriggerSubComponentValidate: true,
                            },
                            attrs: {
                                value: [],
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            span: 24,
                            tag: 'mavon-editor',
                            //custom: 'mavon-editor',
                            name: 'markdown',
                            itemAttrs: {
                                helpMessage: '请使用markdown语法编写文档内容',
                                label: '详细说明',
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '请填写',
                                    // },
                                ],
                                class: 'markdown',
                            },
                            attrs: {
                                autofocus: false,
                                defaultOpen: 'edit',
                                toolbars: {
                                    bold: true, // 粗体
                                    //italic: true, // 斜体
                                    header: true, // 标题
                                    // underline: true, // 下划线
                                    // strikethrough: true, // 中划线
                                    // mark: true, // 标记
                                    // superscript: true, // 上角标
                                    // subscript: true, // 下角标
                                    quote: true, // 引用
                                    ol: true, // 有序列表
                                    ul: true, // 无序列表
                                    link: true, // 链接
                                    imagelink: true, // 图片链接
                                    code: true, // code
                                    //table: true, // 表格
                                    fullscreen: true, // 全屏编辑
                                    //readmodel: true, // 沉浸式阅读
                                    //htmlcode: true, // 展示html源码
                                    help: true, // 帮助
                                    /* 1.3.5 */
                                    //undo: true, // 上一步
                                    //redo: true, // 下一步
                                    trash: true, // 清空
                                    // save: true, // 保存（触发events中的save事件）
                                    /* 1.4.2 */
                                    //navigation: true, // 导航目录
                                    /* 2.1.8 */
                                    alignleft: true, // 左对齐
                                    aligncenter: true, // 居中
                                    alignright: true, // 右对齐
                                    /* 2.2.1 */
                                    subfield: true, // 单双栏模式
                                    preview: true, // 预览
                                },
                            },
                            on: {
                                imgAdd: (pos: any, file: any) => {
                                    const formRef = this.$refs.formRef as FormRef
                                    const ref: any = formRef.getFieldRef('markdown')
                                    // console.log(111, this.$refs, ref, $file)
                                    // ref.$img2Url(
                                    //     pos,
                                    //     'http://icinfo-ui.uat.icinfo.co/static/icon/logo.png',
                                    // )
                                    const formData = new FormData()
                                    formData.append('file', file)
                                    //formData.append('param1', '1')
                                    //return Promise.resolve('https://tva1.sinaimg.cn/large/008i3skNly1gqzmpw2gjoj30u50ktwkj.jpg')
                                    return http
                                        .request({
                                            url: '/open/upload',
                                            data: formData,
                                            //baseURL: 'http://192.168.1.242:8081/devops',
                                            method: 'post',
                                            headers: {
                                                'content-type': 'multipart/form-data',
                                            },
                                        })
                                        .then(res => {
                                            console.log(res.data)
                                            const data = res.data || {}
                                            ref.$img2Url(pos, data.url)
                                            return data.url
                                        })
                                },
                            },
                            appendRender: () => {
                                return (
                                    <div style="padding:5px 0;">
                                        <el-button
                                            type="text"
                                            size="mini"
                                            onClick={() => {
                                                this.formModel.markdown = requireDocCtxRaw
                                            }}
                                        >
                                            点击插入案例
                                        </el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            onClick={() => {
                                                const content = md.render(this.formModel.markdown)
                                                this.$modalDialog(() => import('./components/preview/index.vue'), {
                                                    content,
                                                })
                                            }}
                                        >
                                            预览
                                        </el-button>
                                    </div>
                                )
                            },
                            // ifRender(model) {
                            //     return model['contentType'] === 'markdown'
                            // },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'uploader',
                            name: 'preview_urls',
                            itemAttrs: {
                                label: '上传素材',
                                rules: [
                                    // {
                                    //     required: true,
                                    //     message: '请填写',
                                    // },
                                ],
                            },
                            attrs: {
                                value: [],
                                multiple: true,
                                //limit: 5,
                                accept: '.png,.jpg,.jpeg,.gif',
                                'list-type': 'picture-card',

                                'http-request': async ({ file, filename, onProgress }: any) => {
                                    const formData = new FormData()
                                    formData.append('file', file)

                                    const { data } = await http.request({
                                        url: '/open/upload',
                                        data: formData,
                                        method: 'post',
                                        headers: {
                                            'content-type': 'multipart/form-data',
                                        },

                                        onUploadProgress: (progressEvent: any) => {
                                            const complete = parseInt((progressEvent.loaded / progressEvent.total) * 100 + '', 10)

                                            // 重点二：onProgress()方法需要以上方接收的形参来调用
                                            // 这个方法有一个参数"percent"，给他进度值 complete 即可
                                            onProgress({ percent: complete })
                                        },
                                    })

                                    return data.url
                                },
                                'before-upload': (file: any) => {
                                    const maxSize = 2 * 1024 * 1024 // 2MB，根据你的需求设置最大文件大小

                                    if (file.size > maxSize) {
                                        this.$message({
                                            message: `文件大小超过了${maxSize / (1024 * 1024)}MB的限制`,
                                            type: 'warning',
                                        })
                                        return false
                                    }
                                    return true
                                },
                                'on-preview': (file: any) => {
                                    useImagePreview([file.url])
                                },
                                tipSlotRender: () => {
                                    return (
                                        <div class="cover-tip">
                                            <label>大小不超过2M</label>
                                        </div>
                                    )
                                },
                            },
                        },
                    ],
                },

                {
                    columns: [
                        {
                            tag: 'el-input-number',
                            name: 'recommend',
                            attrs: {
                                value: 0,
                            },
                            itemAttrs: {
                                helpMessage: '数值越高，越靠前',
                                helpIcon: 'el-icon-question',
                                label: '推荐值',
                            },
                            ifRender: () => {
                                return userStore.info?.role.includes('admin')
                            },
                        },
                    ],
                },
            ] as FormRow[],
        }
    }
    submit() {
        if (!userStore.token) {
            this.$notify({
                title: '警告',
                message: '请先登录',
                type: 'warning',
            })
            return
        }
        const formRef = this.$refs.formRef as FormRef
        formRef.validate(async valid => {
            console.log(111, valid, JSON.stringify(this.formModel))
            if (!valid) {
                return
            }

            const state = formRef.getState()
            let {
                markdown = '',

                ...payload
            } = state
            const content = md.render(markdown)
            console.log(valid, JSON.stringify(this.formModel))

            try {
                this.View.loading = true
                let uuid = this.id || ''
                if (this.action === 'update') {
                    await API.update({
                        ...payload,

                        markdown,
                        content,

                        id: this.id,
                    })
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success',
                    })
                } else {
                    const { data } = await API.create({
                        ...payload,

                        markdown,

                        content,
                    })
                    uuid = data.id

                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                    })
                }
                setTimeout(() => {
                    this.View.loading = false

                    this.$router.go(-1)
                    // this.$router.replace({
                    //     path: `/community/${uuid}`,
                    // })
                }, 300)
            } catch (err) {
                console.error(err)
                this.View.loading = false
            }
        }, true)
    }
}
</script>
<style lang="less">
.CommunityUploadBody {
    .MyNav {
        position: relative;
    }
    .squareContainer {
        margin-top: 0;
    }
}
.demo-alert-dialog {
    white-space: normal;
    word-break: break-all;
}
</style>
<style lang="less" scoped>
#web {
    background: rgb(246, 247, 248);
    min-height: 100%;
}
.CommunityUpload ::v-deep {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, Pingfang SC, Microsoft Yahei, WenQuanYi Micro Hei, sans-serif;

    .el-form-item.plabel {
        .sg-data-form-field {
            display: block;
        }
        .tip {
            color: #7d8b94;
        }
    }
    .backgroundColor {
        .el-radio-group {
            .el-radio__inner {
                border-radius: 0% !important;
            }
            .el-radio:nth-child(1) {
                .el-radio__input.is-checked {
                    .el-radio__inner {
                        background: #75abde;
                        border-color: #75abde;

                        &::after {
                            display: none;
                        }
                    }
                    & + .el-radio__label {
                        color: #75abde;
                    }
                }
            }
            .el-radio:nth-child(2) {
                .el-radio__input.is-checked {
                    .el-radio__inner {
                        background: #d2763c;
                        border-color: #d2763c;

                        &::after {
                            display: none;
                        }
                    }
                    & + .el-radio__label {
                        color: #d2763c;
                    }
                }
            }
        }
    }
    .v-note-wrapper {
        //z-index: 1000;
        min-height: 250px;
    }
    .markdown {
        .el-form-item__content {
            overflow-y: auto;
            padding: 5px;
        }
    }
    .jsIedF {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        align-items: center;
        padding-bottom: 80px;

        .formBox_container {
            width: 900px;
            display: flex;
            flex-direction: column;
            background: rgb(255, 255, 255);
            border-radius: 8px;
            padding: 30px 45px;
            margin-top: 32px;

            .el-form-item__label {
                font-size: 16px;

                font-weight: 600;
                color: rgb(65, 80, 88);
                margin-right: 15px;
            }

            .cover-tip {
                label {
                    margin-left: 4px;
                    color: rgb(141, 158, 167);
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 17px;
                }
            }
        }
        .footer_section {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            z-index: 2200;
            .line_in_main {
                width: 848px;
                height: 1px;
                background: rgb(200, 205, 208);
                margin-top: 25px;
            }
            .submitBox_of_upload {
                display: flex;
                flex-direction: column;
                -webkit-box-align: center;
                align-items: center;
                margin: 20px 0px;

                .btnBox_of_upload {
                    width: 266px;
                    height: 40px;
                    font-size: 16px;

                    border: none;
                    // background: rgb(22, 132, 252);
                    color: rgb(255, 255, 255) !important;
                    padding: 0px 1em;
                    cursor: pointer;
                    transition: all 0.2s ease-out 0s;
                }
            }
        }
    }
}
</style>
