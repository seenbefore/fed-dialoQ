import { Component, Model, Vue } from 'vue-property-decorator'

@Component
export class CustomControlModel<T = any> extends Vue {
    @Model('model:update')
    public value!: T

    public update(value: T): void {
        this.$emit('model:update', value)
    }
}
