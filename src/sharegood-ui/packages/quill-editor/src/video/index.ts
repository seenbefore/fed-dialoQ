import Quill from 'quill' //引入编辑器
import './index.less'
import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, UnclickableBlotSpec } from 'quill-blot-formatter'
const Embed = Quill.import('blots/embed')

const MOUSE_ENTER_ATTRIBUTE = 'data-blot-formatter-unclickable-bound'
class VideoResizeAction extends ResizeAction {
    onDrag = (event: MouseEvent) => {
        if (!this.formatter.currentSpec) {
            return
        }

        const target = this.formatter.currentSpec.getTargetElement()
        if (!target) {
            return
        }

        const deltaX = event.clientX - this.dragStartX
        let newWidth = 0

        if (this.dragHandle === this.topLeftHandle || this.dragHandle === this.bottomLeftHandle) {
            newWidth = Math.round(this.preDragWidth - deltaX)
        } else {
            newWidth = Math.round(this.preDragWidth + deltaX)
        }

        const newHeight = this.targetRatio * newWidth

        target.setAttribute('width', `${newWidth}`)
        target.setAttribute('height', `${newHeight}`)
        const nextElementSibling = target.nextElementSibling as HTMLElement
        nextElementSibling?.style.setProperty('width', `${newWidth}px`)

        this.formatter.update()
    }
}
class VideoSpec extends UnclickableBlotSpec {
    constructor(formatter: BlotFormatter) {
        super(formatter, 'span.ql-video video')
    }
    init() {
        this.formatter.quill.on('text-change', this.onTextChange)
    }

    hideProxyImage() {}

    onTextChange = () => {
        Array.from(document.querySelectorAll(`${this.selector}:not([${MOUSE_ENTER_ATTRIBUTE}])`)).forEach(unclickable => {
            unclickable.setAttribute(MOUSE_ENTER_ATTRIBUTE, 'true')
            const nextElementSibling = unclickable.nextElementSibling as HTMLElement
            nextElementSibling.addEventListener('click', this.onProxyImageClick)
        })
    }

    onProxyImageClick: any = (event: MouseEvent) => {
        event.stopPropagation()
        const unclickable = (event.target as HTMLElement)?.previousElementSibling
        if (!(unclickable instanceof HTMLElement)) {
            return
        }
        this.unclickable = unclickable
        this.nextUnclickable = undefined
        this.formatter.show(this)

        const toolbarBtns = this.formatter.overlay.querySelectorAll('.blot-formatter__toolbar>.blot-formatter__toolbar-button')
        toolbarBtns.forEach((btn, index) => {
            ;(btn as HTMLElement).addEventListener('click', (event: MouseEvent) => {
                const target = this.getTargetElement()
                const align = target?.getAttribute('data-align') ?? ''
                const parent = target?.parentElement?.parentElement
                if (!parent) return
                parent.setAttribute('data-align', align)
                this.formatter.update()
            })
        })
    }

    getActions() {
        return [AlignAction, VideoResizeAction, DeleteAction]
    }
}

interface VideoLabelOptions {
    id?: string
    /**视频地址 */
    src: string
    /**加载中 */
    loading?: boolean
    width?: number
    height?: number
    /**对齐方式 */
    align?: 'left' | 'center' | 'right' | ''
}
class VideoLabel extends Embed {
    static create(options: VideoLabelOptions) {
        const { width, height, align, id, loading, src } = options
        const node = super.create()
        node.setAttribute('data-align', align ?? '')
        node.setAttribute('id', id ?? '')
        if (loading) {
            node.classList.add('loading')
        }

        const video = document.createElement('video')
        // 设置视频地址
        video.setAttribute('src', src ?? '')
        video.setAttribute('controls', 'true')
        video.setAttribute('width', `${width ?? '600'}`)
        video.setAttribute('height', `${height ?? 'auto'}`)
        video.setAttribute('data-align', align ?? '')
        node.appendChild(video)

        console.log(id, width)

        // 视频遮罩层，防止编辑时，用户点击到视频播放
        const mask = document.createElement('span')
        mask.classList.add('ql-video_mask')
        mask.style.setProperty('width', `${parseFloat(`${width ?? 600}`)}px`)
        node.appendChild(mask)

        return node
    }

    format(name: string, value: any) {
        if (['loading'].includes(name)) {
            value ? this.domNode.classList.add(name) : this.domNode.classList.remove(name)
            return
        }
        if (['align'].includes(name)) {
            this.domNode.setAttribute(`data-${name}`, value)
            return
        }
        if (['src'].includes(name)) {
            this.domNode.querySelector('video').setAttribute(name, value)
            return
        }
        super.format(name, value)
    }

    /**
     * 回写时显示的属性
     * @param node
     * @returns
     */
    static value(node: HTMLElement) {
        const video = node.querySelector('video')
        if (!video) return
        return {
            id: node.getAttribute('id'),
            src: video.getAttribute('src'),
            width: video.getAttribute('width'),
            height: video.getAttribute('height'),
            loading: node.classList.contains('loading'),
            align: node.getAttribute('data-align'),
        }
    }
}
VideoLabel.blotName = 'video'
VideoLabel.tagName = 'SPAN'
VideoLabel.className = 'ql-video'
Quill.register(VideoLabel)

const BTN_NAME = 'video'
export interface httpRequestContext {
    file: File
    onProgress?: (data: { percent: number }) => void
}
export interface VideoOptions {
    httpRequest?: (data: httpRequestContext) => Promise<string>
}
export class Video {
    quill!: Quill
    options!: VideoOptions
    constructor(quill: Quill, options: VideoOptions) {
        this.quill = quill
        this.options = options
        const toolbar = quill.getModule('toolbar')
        toolbar.addHandler(BTN_NAME, this.toolbarBtnClick.bind(this))

        // 注册视频尺寸，对齐方式工具
        const myBlotFormatter = new BlotFormatter(quill, {
            specs: [VideoSpec],
        } as any)
        Quill.register('modules/blotFormatter', myBlotFormatter)
    }
    /**工具栏，视频按钮点击事件 */
    async toolbarBtnClick() {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'video/mp4'
        input.click()
        input.onchange = async event => {
            const target = event.target as HTMLInputElement
            const file = target.files?.[0]
            if (!file) return
            const quill = this.quill
            const selection = quill.getSelection()
            const id = `video_${Math.random() * 10e18}`
            const index = selection?.index ?? 0
            // 先插入视频标签，占位
            quill.insertEmbed(index, 'video', { id, src: '', loading: true }, Quill.sources.USER)
            // 调整光标到最后
            quill.setSelection(index + 1, 0, Quill.sources.USER)
            const videoLabel = quill.root.querySelector(`#${id}`) as HTMLElement
            const data = {
                file,
                onProgress: ({ percent }) => {
                    videoLabel?.style.setProperty('--loading-percent', JSON.stringify(percent.toString()))
                },
            } as httpRequestContext
            try {
                // 等待接口返回url地址后，替换视频地址
                const url = await this.options.httpRequest?.(data)
                videoLabel?.classList.remove('loading')
                videoLabel?.querySelector('video')?.setAttribute('src', url ?? '')
            } catch (error) {
                const videoLabel = quill.root.querySelector(`#${id}`)
                videoLabel?.remove()
            }
        }
    }

    /**存在上传中的视频 */
    existUploadingVideo() {
        const video = this.quill?.root?.querySelector('.loading') as HTMLElement
        video?.scrollIntoView()
        return video
    }
}
Quill.register('modules/video', Video)
