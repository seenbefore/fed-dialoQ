<template>
    <div class="sg-form-field sg-radio" :class="[type ? 'sg-radio--button' : '']">
        <slot name="prependSlot"></slot>

        <template v-if="type === 'button'">
            <el-radio-group v-model="currentValue" v-bind="$attrs" v-on="listeners">
                <el-radio-button :label="item.value" v-for="(item, index) in dataList" :key="index">
                    <span :class="item.class">
                        <span v-if="item.dot" :class="['sg-dot', item.dot]"></span>
                        <span v-text="item.label" class="sg-radio__txt"></span>
                        <span v-if="showNum" class="sg-radio__num">
                            (
                            <span class="sg-radio__num-val" v-text="item.num"></span>
                            )
                        </span>
                    </span>
                </el-radio-button>
            </el-radio-group>
        </template>
        <template v-else>
            <el-radio-group v-model="currentValue" v-bind="$attrs" v-on="listeners">
                <el-radio :label="item.value" v-for="(item, index) in dataList" :key="index">
                    <span v-text="item.label" class="sg-radio__txt"></span>
                    <span v-if="showNum" class="sg-radio__num">
                        <span class="sg-radio__num-val" v-text="item.num"></span>
                    </span>
                </el-radio>
            </el-radio-group>
        </template>

        <slot name="appendSlot"></slot>

        <span class="suffix" v-if="appendSlotRender">
            <ex-slot :row="{ model: formModel, schema: schema }" :render="appendSlotRender" v-if="appendSlotRender"></ex-slot>
        </span>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseRadio',
    props: {
        /**
         * button
         */
        type: {
            type: String,
            default: '',
        },
        showNum: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number, Array],
            default: null,
        },
        options: {
            type: [Object, Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    watch: {
        currentValue(value) {
            const target = this.dataList.find(item => item.value == value)
            this.onChange &&
                this.onChange(
                    {
                        name: this.name,
                        value: value,
                        option: target,
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
            this.initOptions(val)
        },
    },
    mounted() {
        // console.log(this, this.name, this.onChange, this.listeners, this.$attrs)
        if (Array.isArray(this.options)) {
            this.initOptions(this.options)
        } else if (typeof this.options === 'function') {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.initOptions(list)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.initOptions(result)
            }
        } else {
            this.initOptions(this.options)
        }
    },
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    methods: {
        initOptions(options = []) {
            if (Array.isArray(options)) {
                this.dataList = options
            } else {
                console.log(options, this.dictToArray(options))
                this.dataList = this.dictToArray(options)
            }
        },
    },
}
</script>
