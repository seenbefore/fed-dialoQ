<template>
    <span class="my-inline-input" :class="{ 'not-underline': notUnderline }" :style="[isReadonlyStyle ? readonlyStyle : '']">
        <span
            ref="inlineInput"
            class="inline-input"
            :contenteditable="!isReadonly"
            :placeholder="placeholder"
            @input="inputEvent"
            @compositionstart="locakInputEvent($event, true)"
            @compositionend="locakInputEvent($event, false)"
            @paste="pasteEvent"
            @focus="foucesEvent"
            @blur="blurEvent"
            :disabled="disabled"
        ></span>
    </span>
</template>
<script lang="ts">
import EventEmitter from '../../bus/publishSubscribe'
import { DOCPARSE_EVENT } from '../../enum'
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { HTMLFilter, clearEndSpace, getFullwidthSpace, setCaretPosition, getCursortPosition, keepFirstIndex, transformNumber } from './utils'
@Component({
    name: 'MyInlineInput',
    components: {},
})
export default class MyInlineInput extends Vue {
    public $refs!: {
        inlineInput: HTMLElement
    }
    @Prop({ type: [String, Number], default: '' }) value!: string | number
    @Prop({ type: String, default: '' }) placeholder!: string
    /**只读 */
    @Prop({ type: Boolean, default: false }) readonly!: boolean
    /**最大长度 */
    @Prop({ type: Number, default: Infinity }) maxLength!: number
    /**默认长度(默认长度为零时，取最大长度最为默认长度。若最大长度为无穷，则默认长度为0) */
    @Prop({ type: Number, default: 0 }) defaultLength!: number
    /**允许换行 */
    @Prop({ type: Boolean, default: false }) allowNewline!: boolean
    /**无下划线 */
    @Prop({ type: Boolean, default: false }) notUnderline!: boolean
    /**类型: 默认为text */
    @Prop({ type: String, default: 'text' }) type!: 'text' | 'number'
    /**保留几位小数，仅type为number时生效 */
    @Prop({ type: Number, default: 0 }) decimals!: number
    /**允许换行 */
    @Prop({ type: Boolean, default: false }) disabled!: boolean
    /**是否需要禁用的灰背景样式 */
    @Prop({ type: Boolean, default: false }) isReadonlyStyle!: boolean
    /**只读规则 */
    @Prop({ type: String, default: '' }) readonlyRule!: string
    // 锁定输入框的input事件
    locakInput = false
    // 输入框是否处于聚焦状态
    isFocus = false
    copyValue = ''
    readonly readonlyStyle = {
        background: '#f5f7fa',
        color: '#000',
        cursor: 'not-allowed',
    }
    // 默认长度
    get defaultLen() {
        const defaultLen = this.defaultLength || (this.maxLength === Infinity ? 0 : this.maxLength)
        return defaultLen
    }
    public isReadonly = false
    // 是否粘贴
    public isPasteEvent = false

    created() {}
    mounted() {
        this.init()
    }

    @Watch('value')
    valueChange(newV: string) {
        this.init()
    }
    @Watch('readonly', { immediate: true })
    watchReaonly(newV: boolean) {
        if (!this.readonlyRule) {
            this.isReadonly = !!newV
        }
    }
    @Emit('blurFromEvent')
    blurFromEvent() {
        return
    }

    /**初始化 */
    private init() {
        const value = typeof this.value === 'number' ? this.value.toString() : this.value
        this.copyValue = clearEndSpace(HTMLFilter(value, !this.allowNewline), !this.allowNewline)
        if (this.copyValue && this.copyValue === this.getInputText()) return
        const textLen = this.copyValue.length
        const restLength = this.getRestLen(textLen)
        // 获取占位字符
        const placeholder = getFullwidthSpace(restLength)
        const text = (this.copyValue + placeholder).substr(0, this.maxLength)
        this.setInputText(text)
        console.log('聚焦状态', this.isFocus)
        if (!this.isFocus && this.inputIsEmpty()) {
            this.setInputHtml(this.defaultFillHtml())
        }
        if (this.readonly) {
            this.isReadonly = true
        } else {
            if (this.readonlyRule) {
                EventEmitter.instance.on(DOCPARSE_EVENT, this.handleReadonlyRule)
                this.$once('hook:beforeDestroy', () => {
                    EventEmitter.instance.off(DOCPARSE_EVENT, this.handleReadonlyRule)
                })
            }
        }
    }
    /**默认填充html */
    private defaultFillHtml() {
        const textLen = this.copyValue.length
        const restLength = this.getRestLen(textLen)
        return `<span class="placeholde">${this.placeholder}${getFullwidthSpace(restLength - this.placeholder.length)}</span>`
    }
    /**设置输入框文本 */
    private setInputText(text: string) {
        // 如果最后一位是换行符，则最后追加一个空格占位
        if (text.charAt(text.length - 1) === '\n') {
            text += getFullwidthSpace(1)
        }
        this.$refs.inlineInput.innerText = text
    }
    /**获取输入框文本 */
    private getInputText() {
        return clearEndSpace(HTMLFilter(this.$refs.inlineInput.innerText, !this.allowNewline), !this.allowNewline)
    }
    /**获取输入框html内容 */
    private getInputHtml() {
        return this.$refs.inlineInput.innerHTML
    }
    /**获取输入框html内容 */
    private setInputHtml(html: string) {
        return (this.$refs.inlineInput.innerHTML = html)
    }
    /**获取剩余长度 */
    private getRestLen(textLen: number) {
        const defaultLen = this.defaultLen
        return defaultLen - textLen < 0 ? 0 : defaultLen - textLen
    }
    /**输入框内容未空 */
    private inputIsEmpty() {
        const text = this.getInputText()
        const html = this.getInputHtml()
        const defaultHtml = this.defaultFillHtml()
        return html === defaultHtml || text.length === 0
    }
    /**输入框的粘贴事件 */
    pasteEvent(e: any) {
        this.isPasteEvent = true
        const maxlength = this.maxLength
        // 计算去除头尾空格的文本长度
        const textLen = this.getInputText.length
        const restLength = maxlength - textLen
        // 获取剪贴板对象
        const clipboardData = e.clipboardData || (window as any).clipboardData
        const pastedData = clearEndSpace(HTMLFilter(clipboardData.getData('text/plain'), !this.allowNewline), !this.allowNewline)
        let realText = pastedData.substr(0, maxlength)
        if (this.type === 'number') {
            realText = transformNumber(realText, this.decimals)
        }
        // 如果有剩余长度，则截取剩余长度的内容，插入
        if (restLength) {
            document.execCommand('insertText', false, realText)
        }
        e.preventDefault()
    }
    /**输入框的input事件 */
    inputEvent(e: any) {
        if (this.locakInput) return
        // 在输入汉字的情况下后面代码不会执行，因为input事件总是先于compositionend
        const $target: HTMLElement = e.target as HTMLElement
        if (this.allowNewline) {
            this.anewInitCaret($target)
        }
        const maxlength = this.maxLength
        let innerText = this.getInputText()
        if (this.type === 'number') {
            innerText = transformNumber(innerText, this.decimals)
        }
        const textLen = innerText.length
        const restLength = this.getRestLen(textLen)
        // 获取光标位置
        const { caretOffset, caretContainerIndex } = getCursortPosition($target, this.allowNewline)
        // 如果文本长度大于最大长度，则截断
        if (textLen > maxlength) {
            innerText = innerText.substr(0, maxlength)
        } else {
            // 否则，根据默认展示长度，计算出，剩余长度，用字符填充
            innerText += getFullwidthSpace(restLength)
        }
        this.setInputText(innerText)
        // 实际文本长度
        let realTextLen = innerText.length
        if (this.type === 'number') {
            realTextLen = clearEndSpace(innerText).length
        }
        // 将光标移动到指定位置
        setCaretPosition($target, Math.min(realTextLen, caretOffset), caretContainerIndex)
        this.$emit('input', clearEndSpace(innerText, !this.allowNewline), e.data)
        setTimeout(() => {
            this.isPasteEvent = false
        }, 0)
    }
    /**是否锁定输入框的input事件 */
    locakInputEvent(e: Event, flag: boolean) {
        this.locakInput = flag
        this.inputEvent(e)
    }
    /**输入框的聚焦事件 */
    foucesEvent(e: Event) {
        console.log('聚焦状态')
        this.isFocus = true
        if (this.inputIsEmpty()) {
            const $target: HTMLElement = e.target as HTMLElement
            const restLength = this.getRestLen(0)
            const placeholder = getFullwidthSpace(restLength)
            this.setInputText(placeholder)
            keepFirstIndex($target)
        }
    }
    /**输入框的失焦事件 */
    blurEvent(e: Event) {
        console.log('失焦状态')
        this.isFocus = false
        this.blurFromEvent()
        if (this.inputIsEmpty()) {
            this.setInputHtml(this.defaultFillHtml())
        } else {
            let inputVal = ''
            try {
                inputVal = clearEndSpace(this.getInputText() || '', !this.allowNewline)
            } catch (error) {}
            this.$emit('blur', inputVal)
        }
    }
    /**
     * 重新初始化光标(用于处理连续br问题)
     */
    anewInitCaret(target: HTMLElement, fullwidthSpace = 1) {
        let count = 0
        Array.from(target.childNodes).forEach((item, index) => {
            const nextSiblingNode = item.nextSibling
            if (item.nodeName.toLowerCase() === 'br' && nextSiblingNode?.nodeName.toLowerCase() === 'br') {
                const textDom = document.createTextNode(getFullwidthSpace(this.isPasteEvent ? -1 : fullwidthSpace))
                target.insertBefore(textDom, nextSiblingNode)
                // 移除第二个br
                nextSiblingNode.remove()
                setCaretPosition(target, 0, index + 1)
            }
        })
    }
    /**只读规则处理 */
    handleReadonlyRule(formData) {
        try {
            const fn = new Function('data', this.readonlyRule)
            const result = fn(formData)
            this.isReadonly = !!result
        } catch (err) {
            console.error(err)
            this.isReadonly = false
        }
    }
}
</script>
<style lang="less" scoped>
.my-inline-input {
    border-bottom: 1px solid;
    &.not-underline {
        border-bottom: none;
    }
    .inline-input {
        position: relative;
        outline: none;
        word-break: break-all;
        /deep/.placeholde {
            color: #ccc;
            font-size: 0.95em;
        }
        // &::after {
        //     content: attr(placeholder);
        //     left: 0;
        //     position: absolute;
        // }
        // &:focus::after {
        //     content: none;
        // }
    }
}
</style>
