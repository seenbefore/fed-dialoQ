<template>
    <div class="sg-data-form-field">
        <el-time-picker v-model="currentValue" @input="onInputEvent" v-bind="$attrs" :clearable="clearable"></el-time-picker>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseDate',
    props: {
        value: {
            type: [String, Number, Array, Date],
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
