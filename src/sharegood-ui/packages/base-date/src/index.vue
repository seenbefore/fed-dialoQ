<template>
    <div class="sg-data-form-field">
        <el-date-picker v-model="currentValue" @input="onInputEvent" v-bind="$attrs" :clearable="clearable"></el-date-picker>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
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
