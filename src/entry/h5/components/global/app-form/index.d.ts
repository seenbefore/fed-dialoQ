import Vue from 'vue'

export class Form extends Vue {
    submit(): Promise<void>
    validate(name?: string | string[]): Promise<void>
    getRefField(name: string): any
    // resetValidation(name?: string | string[]): void
    // scrollToField(name: string, options?: boolean | ScrollIntoViewOptions): void
}
