import { Component, Prop, Vue } from 'vue-property-decorator'
import { Option, Render } from './types'
@Component({
    name: 'OrgOptionItem',
    components: {},
})
export default class OrgOptionItem extends Vue {
    /**选项 */
    @Prop({ type: Object, default: () => ({}) })
    option!: Option
    /**高亮词 */
    @Prop({ type: String, default: '' })
    highlightWord!: string
    /**内容渲染函数 */
    @Prop({ type: Function, default: null })
    renderContent!: Render

    created() {}
    mounted() {}

    render() {
        let label = <span>{this.option.label}</span>
        const index = this.option.label.indexOf(this.highlightWord)
        if (this.highlightWord && index > -1) {
            label = (
                <span>
                    {this.option.label.substring(0, this.option.label.indexOf(this.highlightWord))}
                    <span style="color: #f50">{this.highlightWord}</span>
                    {this.option.label.substring(this.option.label.indexOf(this.highlightWord) + this.highlightWord.length)}
                </span>
            )
        }
        if (this.renderContent) {
            return this.renderContent(this.$createElement, {
                option: this.option,
                optionNode: label,
                highlightWord: this.highlightWord,
            })
        }
        return <div>{label}</div>
    }
}
