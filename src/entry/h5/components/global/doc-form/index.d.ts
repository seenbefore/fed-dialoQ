import Vue from 'vue'

export class Form extends Vue {
    validate(name?: string | string[]): Promise<void>
    getRefField(name: string): any
}
