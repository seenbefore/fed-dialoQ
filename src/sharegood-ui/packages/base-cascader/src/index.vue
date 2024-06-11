<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-cascader v-model="currentValue" v-on="listeners" :options="dataList" :clearable="clearable" v-bind="$attrs"></el-cascader>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseCascader',
    props: {
        value: {
            type: [String, Number, Array],
            default: null,
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    watch: {
        currentValue(value) {
            this.onChange &&
                this.onChange(
                    {
                        name: this.name,
                        value: value,
                    },
                    {
                        schema: this.schema,
                        formActionType: this.formActionType,
                        formModel: this.formModel,
                    },
                )
            this.$emit('input', value)
        },
        options(val) {
            this.dataList = val
        },
    },
    mounted() {
        if (Array.isArray(this.options)) {
            this.dataList = this.options
        } else {
            const result = this.options()

            if (result.then) {
                result
                    .then(list => {
                        this.dataList = list
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.dataList = result
            }
        }
    },
}
</script>
