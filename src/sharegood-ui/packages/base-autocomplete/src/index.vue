<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-autocomplete
            v-model="currentValue"
            :clearable="clearable"
            :value-key="valueKey"
            :debounce="debounce"
            :fetch-suggestions="fetchSuggestions || querySearch"
            v-bind="$attrs"
            v-on="listeners"
            @input="onInputEvent"
        >
            <slot slot="prefix" name="prefix"></slot>
            <slot slot="suffix" name="suffix"></slot>
            <slot slot="prepend" name="prepend"></slot>
            <slot slot="append" name="append"></slot>

            <template slot-scope="{ item }">
                <slot name="autocompleteSlot" :item="item"></slot>
                <ex-slot :row="item" :render="defaultSlotRender" v-if="defaultSlotRender"></ex-slot>
            </template>
        </el-autocomplete>
        <slot name="appendSlot"></slot>
        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'
import { ExSlot } from '../../utils/ExSlot'

export default {
    name: 'SgBaseAutoComplete',
    components: {
        ExSlot,
    },
    props: {
        value: {
            type: [String, Number],
            default: null,
        },
        debounce: {
            type: Number,
            default: 500,
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        fetchSuggestions: {
            type: Function,
            default: null,
        },
        load: {
            type: Function,
            default(queryString, dataList) {
                // 默认取前十
                if (!queryString) {
                    return Promise.resolve(dataList.slice(0, 10))
                }
                const createStateFilter = queryString => {
                    return state => {
                        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.label.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    }
                }
                const results = queryString ? dataList.filter(createStateFilter(queryString)) : dataList
                return Promise.resolve(results)
            },
        },
        defaultSlotRender: {
            type: [Function],
            default: null,
        },
        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
    },
    watch: {
        currentValue: {
            handler(val) {
                this.$emit('input', val)
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            queryString: '',
            dataList: [],
            timeout: null,
            currentValue: this.value,
            originDataList: [],
        }
    },
    created() {},
    mounted() {
        this.parseOptions()
    },
    methods: {
        parseOptions() {
            if (Array.isArray(this.options)) {
                this.dataList = [...this.options]
                this.originDataList = [...this.options]
            } else if (typeof this.options === 'function') {
                const result = this.options()

                if (result.then) {
                    result
                        .then(list => {
                            this.dataList = [...list]
                            this.originDataList = [...list]
                        })
                        .catch(err => {
                            console.error(err)
                        })
                } else if (Array.isArray(result)) {
                    this.dataList = [...this.result]
                    this.originDataList = [...this.result]
                }
            }
        },
        querySearch(queryString, cb) {
            this.load(queryString, this.originDataList).then(results => {
                this.dataList = results

                cb(results)
            })
        },
    },
}
</script>
