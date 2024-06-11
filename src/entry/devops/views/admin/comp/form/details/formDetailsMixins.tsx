import { FormDetailsBuilder, IFormDetailsColumns, IFormDetailsBuilderConfig } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import { Component, Vue } from 'vue-property-decorator'
import BaseFormDetails from '@/sharegood-ui/packages/base-form-details/index.vue'

// @ts-ignore
@Component({
    components: {
        BaseFormDetails,
    },
})
export abstract class FormDetailsMixins<T = any> extends Vue {
    public abstract get columns(): Array<IFormDetailsColumns>

    public abstract get config(): IFormDetailsBuilderConfig

    public fb = new FormDetailsBuilder<T>()

    public render() {
        return (
            <div class="sg-page demo-comp-form-details__container">
                {/* @ts-ignore */}
                <BaseFormDetails fb={this.fb}></BaseFormDetails>
            </div>
        )
    }

    public created() {
        this.fb.init(this.columns, this.config)
    }
}
