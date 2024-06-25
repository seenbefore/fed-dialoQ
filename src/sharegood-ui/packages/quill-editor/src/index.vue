<template>
    <!--    这是一个富文本的组件-->
    <div class="sg-quill-editor" ref="wrap">
        <div class="ql-upload-box">
            <el-upload ref="myQuillUploadRef" class="quill-uploader" :on-success="onUploadSuccess" v-bind="exUploadConfig">
                上传
            </el-upload>
        </div>
        <el-row v-loading="quillUpdateImg">
            <quill-editor v-model="currentValue" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)" v-on="this.$listeners" v-bind="this.$attrs"></quill-editor>
        </el-row>
    </div>
</template>

<script>
import Quill from 'quill' //引入编辑器
import { quillEditor } from 'vue-quill-editor'
//import ImageResize from 'quill-image-resize-module'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './plugins/video/index'

// 自定义字体大小
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '32px']

Quill.register(Size, true)
//Quill.register('modules/imageResize', ImageResize)
/*富文本编辑图片上传配置*/
const uploadConfig = {
    action: '', // 必填参数 图片上传地址
    name: 'file', // 必填参数 文件的参数名
    limit: 1,
    accept: 'image/*', // 可选 可上传的图片格式 image/png, image/gif, image/jpeg, image/bmp, image/x-icon
}

//quill编辑器的字体
// var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
// var Font = Quill.import('formats/font');
// Font.whitelist = fonts; //将字体加入到白名单
// Quill.register(Font, true);
//quill图片可拖拽改变大小
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

// 富文本工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    //[{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: Size.whitelist }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    //[{ font: fonts }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    //['link', 'image', 'video'],
    ['clean'], // remove formatting button
]
export default {
    name: 'SgQuillEditor',
    components: { quillEditor },
    data() {
        return {
            base64ImgUploadUrl: `${process.env.VUE_APP_BASEURL_API}/open/upload`, // base64图片上传的接口地址，后续根据自己的项目进行更换地址
            currentValue: this.value, // 我们不能直接使用props传过来的值，先赋值到这里
            // 富文本配置项
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
                placeholder: '',
                theme: 'snow', // or 'bubble'
                modules: {
                    imageResize: {
                        //调整大小组件。
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white',
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar'],
                    },
                    video: {
                        httpRequest: this.uploadConfig?.httpRequest ?? this.uploadConfig?.['http-request'],
                        ...this.videoConfig,
                    },
                    toolbar: {
                        container: toolbarOptions, // 工具栏
                        handlers: {
                            image: value => {
                                console.log(this, value, document.getElementById('uploadBtn'))
                                if (value) {
                                    // 触发input框选择图片文件
                                    this.$refs.wrap.querySelector('.el-upload').click()
                                } else {
                                    this.quill.format('image', false)
                                }
                            },
                        },
                    },
                },
            },
        }
    },
    props: {
        uploadConfig: {
            type: Object,
            default() {
                return {}
            },
        },
        /** 编辑器的value，默认：空 */
        value: {
            type: String,
            default: '',
        },
        /** 编辑器是否可编辑，默认：false */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**视频配置 */
        videoConfig: {
            type: Object,
            default: () => ({
                // 示例
                // 插入视频默认宽度，不传默认600
                // width: 300,
                // 插入视频默认高度，不传默认auto
                // height: 169,
                // 视频上传请求, 不传默认共用uploadConfig.httpRequest
                // httpRequest: async (data: any) => {
                //     // return 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
                //     const resp = await portalUploadAutoType(
                //         { file: data.file },
                //         {
                //             exApiHooks: ['uploadFile'],
                //             exShowLoading: false,
                //             // 上传进度
                //             onUploadProgress(event) {
                //                 data.file.percent = Math.round((event.loaded / event.total) * 100)
                //                 data.onProgress(data.file)
                //             },
                //         },
                //     )
                //     return resp.data.url
                // },
            }),
        },
    },

    computed: {
        exUploadConfig() {
            const CONFIG = this.$ShareGood || {}
            const UploaderConfig = CONFIG.Uploader || {}

            return {
                ...uploadConfig,
                ...UploaderConfig,
                ...this.uploadConfig,
            }
        },
        action() {
            return this.baseUrl + this.upload
        },
        editor() {
            return this.$refs.myQuillEditor.quill
        },
    },
    created() {},
    mounted() {
        if (this.disabled) {
            this.$refs.myQuillEditor.quill.enable(false)
        }
    },
    watch: {
        disabled: {
            handler(val) {
                if (val === true) {
                    this.$refs.myQuillEditor.quill.enable(false)
                } else {
                    this.$refs.myQuillEditor.quill.enable(true)
                }
            },
        },
        value: {
            handler(val) {
                this.currentValue = val
            },
        },
    },
    methods: {
        reset() {
            this.currentValue = ''
        },
        getText(len) {
            let content = this.currentValue || ''
            content = content.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
            if (len) {
                return content.slice(0, len)
            }
            return content
        },
        // 上传成功 img 可以是url 或者是base64
        onUploadSuccess(img) {
            console.log('图片', img)
            if (img) {
                // 获取富文本组件实例
                const quill = this.$refs.myQuillEditor.quill
                const length = quill.getSelection().index
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', img)
                // 调整光标到最后
                quill.setSelection(length + 1)
            }
            this.$refs.myQuillUploadRef.clearFiles() //上传成功,清空已上传的文件列表堆栈
        },

        onEditorFocus(event) {
            if (this.disabled) {
                event.enable(false)
            }
        },
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        // onEditorFocus() {
        //     console.log(
        //         this.$refs.myQuillEditor.quill.getSelection().index,
        //         '获取示例',
        //     )
        // },
        // 获得焦点事件
        onEditorChange() {
            //let content = filterXSS(this.currentValue)
            const content = this.currentValue
            this.handleBase64Images()
            // if (
            //     content !== '' &&
            //     content.indexOf('sg-quill-editor-content') === -1
            // ) {
            //     content = `<div class="sg-quill-editor-content">${content}</div>`
            // }
            // console.log('onEditorChange', this.currentValue)
            this.$emit('input', content) //将值绑定到changeQuill上传递过去,引入组件的时候监听这个值，可以拿到改变的值，
        }, // 内容改变事件

        // 调用此方法以处理并替换base64图片
        async handleBase64Images() {
            // 正则表达式来匹配富文本内容中的所有base64图片
            const base64ImageRegex = /<img\s+src="(data:image\/[^;]+;base64,[^"]+)"/g
            // 获取所有base64图片的matches数组
            let matches
            const imagesToReplace = []
            while ((matches = base64ImageRegex.exec(this.currentValue))) {
                const base64String = matches[1] // matches[1]是正则括号内匹配到的字符串
                if (base64String) {
                    imagesToReplace.push({
                        base64String,
                        position: matches.index, // 获得每个匹配到的base64图片在内容字符串中的位置
                    })
                }
            }

            if (imagesToReplace.length === 0) {
                // 没有base64图片需要处理
                return
            }

            // 捕获编辑器中的内容（因为后面的更新可能会引起变化）
            let updatedContent = this.currentValue

            // 遍历待替换的base64图片数组
            for (let image of imagesToReplace) {
                const newImageUrl = await this.uploadBase64Image(image.base64String)
                if (newImageUrl) {
                    // 将内容中的base64字符串替换为新的图片URL
                    updatedContent = updatedContent.replace(image.base64String, newImageUrl)
                }
            }

            // 最后更新富文本内容以反映新的图片URLs
            this.currentValue = updatedContent
            this.$refs.myQuillEditor.quill.root.innerHTML = this.currentValue
            this.$emit('input', this.currentValue) // 同步到v-model
        },

        // 实现上传base64图片的逻辑
        async uploadBase64Image(base64String) {
            try {
                // 使用正则表达式提取 base64 字符串中的媒体类型和编码数据
                const matches = base64String.match(/^data:(.+);base64,(.*)$/)
                // 如果匹配结果不符合预期，抛出错误
                if (matches.length !== 3) {
                    throw new Error('Invalid base64 string')
                }
                // 获取匹配中的 MIME 类型
                const mimeType = matches[1]
                // 获取匹配中的 base64 编码数据
                const base64 = matches[2]

                // 解码 base64 字符串得到每个字符的字节表示
                const byteCharacters = atob(base64)
                const byteNumbers = new Array(byteCharacters.length)
                // 将每个字符转换为字节
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                // 把字节转换成 TypedArray（Uint8Array类型）以构建二进制数据
                const byteArray = new Uint8Array(byteNumbers)

                // 利用前面获取的二进制数据和 MIME 类型，创建一个 Blob 对象
                const file = new Blob([byteArray], { type: mimeType })
                // 初始化 FormData 对象，用于装载文件（Blob 对象）和其他参数，以便上传
                const formData = new FormData()
                // 将文件数据添加到 FormData 对象中
                formData.append('file', file, 'image.png')
                formData.append('source', '7')

                // 发起 POST 请求，上传文件到服务器
                // 提供服务器的 API 端点，FormData 对象，和需要的 HTTP 头部信息
                const response = await axios.post(this.base64ImgUploadUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log('response', response.data?.data?.url)
                // 假设服务器返回一个 JSON 对象，其中包含上传文件的 URL 地址
                return response.data?.data?.url || '' // 根据你的 API 调整
            } catch (error) {
                console.error('Failed to upload image', error)
                return null
            }
        },
    },
}
</script>
