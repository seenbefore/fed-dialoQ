import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export class UseGenerate extends Vue {
    @Prop({ type: String, default: '' })
    public dataId!: string

    public mounted() {
        if (this.dataId) {
            this.$el.setAttribute('data-id', this.dataId)
            this.$el.addEventListener('click', (...args) => {
                this.$emit('click', ...args)
            })
        }
    }
}
