<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseAutocomplete from '@/sharegood-ui/packages/base-autocomplete/src/index.vue'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyAutocomplete',
    components: {},
    extends: BaseAutocomplete,
})
export default class MyAutocomplete extends BaseForm {
    loading = false

    render(h: CreateElement) {
        let component = []
        if (this.operaType === 'readonly') {
            component = [
                h(ExSlot, {
                    props: {
                        render: this.getRender(this.column, this.row),
                        index: this.index,
                        row: this.row,
                        column: this.column,
                        class: this.column.prop,
                        defaultValue: this.myDefaultValue(this.column),
                    },
                }),
            ]
        } else {
            component = [(BaseAutocomplete as any).render.bind(this)(h)]
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
