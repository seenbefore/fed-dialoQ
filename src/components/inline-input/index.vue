<template>
    <span class="inline-input-container" :class="{ 'not-underline': notUnderline, disabled: disabled }">
        <span
            ref="inlineInput"
            class="inline-input"
            :contenteditable="!readonly && !disabled"
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
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { HTMLFilter, clearEndSpace, getFullwidthSpace, setCaretPosition, getCursortPosition, keepFirstIndex, transformNumber } from './utils'
@Component({
    name: 'InlineInput',
    components: {},
})
export default class InlineInput extends Vue {
    public $refs!: {
        inlineInput: HTMLElement
    }
    /**绑定值 */
    @Prop({ type: [String, Number], default: '' }) value!: string | number
    /**占位提示文本 */
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
    /**类型: 默认为text, (text: 文本; number: 数字) */
    @Prop({ type: String, default: 'text' }) type!: 'text' | 'number'
    /**保留几位小数，仅type为number时生效 */
    @Prop({ type: Number, default: 0 }) decimals!: number
    /**禁用 */
    @Prop({ type: Boolean, default: false }) disabled!: boolean
    /**锁定输入框的input事件 */
    locakInput = false
    /**输入框是否处于聚焦状态 */
    isFocus = false
    /**输入框值副本 */
    copyValue = ''
    /**默认长度 */
    get defaultLen() {
        const defaultLen = this.defaultLength || (this.maxLength === Infinity ? 0 : this.maxLength)
        return defaultLen
    }

    created() {}
    mounted() {
        this.init()
    }

    @Watch('value')
    valueChange(newV: string) {
        this.init()
    }
    /**输入事件 */
    @Emit('input')
    emitInputEvent(value: string) {
        return value
    }
    /**失焦事件 */
    @Emit('blur')
    emitBlurEvent(e: Event) {
        return e
    }
    /**聚焦事件 */
    @Emit('focus')
    emitFocusrEvent(e: Event) {
        return e
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
        this.emitInputEvent(clearEndSpace(innerText, !this.allowNewline))
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
        this.emitFocusrEvent(e)
    }
    /**输入框的失焦事件 */
    blurEvent(e: Event) {
        console.log('失焦状态')
        this.isFocus = false
        if (this.inputIsEmpty()) {
            this.setInputHtml(this.defaultFillHtml())
        }
        this.emitBlurEvent(e)
    }
    /**
     * 重新初始化光标(用于处理连续br问题)
     */
    anewInitCaret(target: HTMLElement) {
        let count = 0
        Array.from(target.childNodes).forEach((item, index) => {
            const nextSiblingNode = item.nextSibling
            if (item.nodeName.toLowerCase() === 'br' && nextSiblingNode?.nodeName.toLowerCase() === 'br') {
                const textDom = document.createTextNode(getFullwidthSpace(1))
                target.insertBefore(textDom, nextSiblingNode)
                // 移除第二个br
                nextSiblingNode.remove()
                setCaretPosition(target, 0, index + 1)
            }
        })
    }
}
</script>
<style lang="less" scoped>
.inline-input-container {
    border-bottom: 1px solid;
    &.not-underline {
        border-bottom: none;
    }
    &.disabled {
        cursor: not-allowed;
        color: #c0c4cc;
    }
    .inline-input {
        outline: none;
        word-break: break-all;
        position: relative;
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
