<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseInput from '@/sharegood-ui/packages/base-input/src/index.vue'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyInput',
    components: {},
    extends: BaseInput,
})
export default class MyInput extends BaseForm {
    loading = false

    render(h: CreateElement) {
        let component = []
        if (this.operaType === 'readonly') {
            component = [
                h(ExSlot, {
                    props: {
                        render: this.getRender(this.column, this.row),
                        row: this.row,
                        index: this.index,
                        column: this.column,
                        class: this.column.prop,
                        defaultValue: this.myDefaultValue(this.column),
                    },
                }),
            ]
        } else {
            component = [(BaseInput as any).render.bind(this)(h)]
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
