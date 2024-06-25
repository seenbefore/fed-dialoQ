<template>
    <van-field class="my-table" label-class="my-table-label" input-align="left" v-bind="$attrs" :disabled="disabled" :value="myFieldValue">
        <template v-slot:input>
            <div class="my-table-input">
                <div class="form-box-item" v-for="(item, index) in myValue" :key="index">
                    <van-icon name="delete" class="delete-btn" @click="deleteOpera(item, index)" />
                    <app-form ref="appForm" :value="item" :fields="myOptions" :show-foot-btns="false" :force-same-set="true" :class="{ hidden: closeFlags[index] }" @input="tableInput($event, index)">
                        <template v-slot:rightIconSlotTitle>
                            <van-button class="text" @click="toggle(index)">{{ closeFlags[index] ? '展开' : '收起' }}</van-button>
                        </template>
                    </app-form>
                </div>
                <van-button class="add-btn" plain type="info" @click="addOpera">添加</van-button>
            </div>
        </template>
        <slot slot="label" name="label"></slot>
        <slot slot="left-icon" name="left-icon"></slot>
        <slot slot="right-icon" name="right-icon"></slot>
        <slot slot="button" name="button"></slot>
        <slot slot="extra" name="extra "></slot>
    </van-field>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import loading from '../../directives/v-loading'
import AppForm, { Field } from '../../index.vue'

@Component({
    name: 'MyTable',
    components: {},
    directives: { loading },
})
export default class MyTable extends Vue {
    /**当前输入的值 */
    @Prop({ type: [Array, String], default: () => [] })
    value!: Record<string, any>[] | ''
    /**禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    @Prop({ type: Array, default: () => [] })
    tableColumns!: Field[]
    /*[
        {
            tag: 'input',
            name: 'title',
            label: '标题',
            hiddenLabel: true,
            props: {
                placeholder: '请输入',
                inputAlign: 'left',
                rightIconSlot: 'rightIconSlotTitle',
            },
        },
        {
            tag: 'number-input',
            name: 'count',
            label: '数量',
            props: {
                placeholder: '请输入',
            },
        },
    ]*/

    public $refs!: {
        appForm: AppForm[]
    }

    get myOptions() {
        return this.tableColumns.map((item: Field, index: number) => {
            return {
                ...item,
                ...(index === 0 ? { noVisibleLabel: true } : {}),
                props: {
                    ...(item.props || {}),
                    ...(index === 0
                        ? {
                              inputAlign: 'left',
                              rightIconSlot: 'rightIconSlotTitle',
                          }
                        : {}),
                },
            }
        })
    }

    myValue: Record<string, any>[] = []
    @Watch('value', { deep: true, immediate: true })
    watchValue(newV: Record<string, any>[] | '', oldV: Record<string, any>[] | '') {
        if (JSON.stringify(newV) === JSON.stringify(oldV)) return
        this.myValue = newV ? newV : []
    }
    get myFieldValue() {
        return this.myValue.toString()
    }

    /**table内表单值变动事件 */
    tableInput(value: any, index: number) {
        this.$set(this.myValue, index, value)
        this.$emit('input', this.myValue)
    }

    /**展开收起 */
    closeFlags: boolean[] = []
    toggle(index: number) {
        this.$set(this.closeFlags, index, !this.closeFlags[index])
    }
    /**添加行操作 */
    addOpera() {
        this.myValue.push({})
        this.$emit('input', this.myValue)
    }
    /**删除行操作 */
    async deleteOpera(item: Field, index: number) {
        if (!this.isEmptyItem(item)) {
            await this.$dialog.confirm({
                message: '该项已有内容，确认删除?',
                title: '提示',
            })
        }
        this.myValue.splice(index, 1)
        this.$emit('input', this.myValue)
    }

    /**表单校验 */
    async validate() {
        const $appForms = this.$refs.appForm || []
        const validateTasks: Promise<any>[] = []
        $appForms.forEach((item: AppForm) => {
            validateTasks.push(item.validate())
        })
        return Promise.all(validateTasks)
    }

    /**是否是空项 */
    isEmptyItem(value: any): boolean {
        if (value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
            return true
        }
        if (Object.prototype.toString.call(value) === '[object Object]') {
            return Object.values(value).every(item => {
                return this.isEmptyItem(item)
            })
        }
        return false
    }
}
</script>
<style lang="less" scoped>
.my-table {
    flex-wrap: wrap;
    /deep/.hidden {
        .van-cell-group {
            height: 56px;
            overflow: hidden;
        }
    }
    /deep/.my-table-label {
        margin-bottom: 20px;
    }
    /deep/.van-field__value {
        flex: unset;
        width: 100%;
        .van-field__body {
            .van-field__control {
            }
        }
        .my-table-input {
            flex: 1;
            .form-box-item {
                position: relative;
                margin-top: 20px;
                &:first-child {
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                .delete-btn {
                    color: red;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 1;
                    transform: translate(40%, -40%);
                    // prettier-ignore
                    font-size: 18PX;
                }
            }
            .app-form {
                padding: 0;
                // prettier-ignore
                border: 1PX solid #d1dde8;
                // prettier-ignore
                border-radius: 4PX;

                .form-body {
                    margin: 0;
                }
                .van-form-cell {
                    &::after {
                        left: 0;
                        right: 0;
                        transform: scaleY(1);
                        border-color: #dddddd;
                    }
                    &:first-child {
                        .van-cell__value {
                            font-weight: bold;
                        }
                    }
                }
                .van-field__right-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .van-button.text {
                        padding: 0;
                        font-weight: normal;
                    }
                }
                .van-form .van-cell-group--inset {
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
    .van-button {
        &.text {
            color: #158dff;
            height: auto;
            border: none;
        }
    }
    .add-btn {
        width: 100%;
        border-radius: 4px;
        // prettier-ignore
        // margin-top: 20PX;
        // prettier-ignore
        height: 48PX;
        font-size: 16px;
        color: #158dff;
    }
}
</style>
