<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import ExSlot from '../ex-slot/index'
import BaseForm from '../base-form/index.vue'
@Component({
    name: 'MyText',
    components: {},
})
export default class MyText extends BaseForm {
    render(h: CreateElement) {
        return h(ExSlot, {
            props: {
                render: this.getRender(this.column, this.row),
                index: this.index,
                row: this.row,
                column: this.column,
                class: this.column.prop,
                defaultValue: this.myDefaultValue(this.column),
            },
        })
    }
}
</script>
