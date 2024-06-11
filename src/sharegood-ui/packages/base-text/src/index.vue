<template>
    <div class="sg-data-form-field">
        <span v-html="currentValue" class="sg-base-form-text"></span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseText',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
    },
    mixins: [formMixins],
    data() {
        return {
            currentValue: this.value,
        }
    },
}
</script>
