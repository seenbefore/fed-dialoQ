<template>
    <div class="global-search" v-clickoutside="handleClose">
        <el-input placeholder="请输入关键词搜索部门/派出机构" v-model="keyword" @input="querySearchAsync" @focus="showSuggestions = !!keyword">
            <template #suffix>
                <img src="../images/search.svg" />
            </template>
        </el-input>
        <transition name="el-zoom-in-top">
            <div class="suggestions-box" v-loading="loading" v-if="showSuggestions">
                <el-checkbox class="all-choose" :value="allChecked === 'all'" :indeterminate="allChecked === 'half'" @change="chooseAll">
                    全选
                </el-checkbox>
                <el-scrollbar wrap-class="suggestions__wrap">
                    <el-checkbox
                        class="suggestions-item"
                        v-for="option in suggestionOptions"
                        :label="option.label"
                        :key="option.value"
                        :value="isChecked(option, selectedOptions).flag"
                        @change="chooseItem($event, option)"
                    >
                        <org-option-item :option="option" :highlight-word="keyword" :render-content="renderOptionContent"></org-option-item>
                    </el-checkbox>
                </el-scrollbar>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { debounce } from '@/decorator'
import { Component, Emit, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import { SeachConfig, Option, OptionFieldNames } from '../types'
// @ts-ignore
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { dedupNode, getOptionFields } from '../utils'
import OrgOptionItem from '../org-option-item'
@Component({
    name: 'GlobalSearch',
    components: { OrgOptionItem },
    directives: { Clickoutside },
})
export default class GlobalSearch extends Vue {
    @Model('change', { type: Array, default: () => [] })
    value!: Option[]
    /**搜索框配置 */
    @Prop({ type: Function, default: () => [] })
    suggestions!: SeachConfig['suggestions']
    /**选项字段配置 */
    @Prop({ type: Object, default: () => ({}) })
    optionFieldName!: SeachConfig['optionFieldName']
    /**选项内容渲染函数 */
    @Prop({ type: Function, default: null })
    renderOptionContent!: SeachConfig['renderOptionContent']
    /**
     * 抛出值变化事件
     * @return {Option[]}
     */
    @Emit('change')
    emitChange() {
        return [...this.selectedOptions]
    }

    created() {}
    mounted() {}

    loading = false
    /**搜索词 */
    keyword = ''
    /**显示搜索建议 */
    showSuggestions = false
    /**建议词条 */
    suggestionOptions: Option[] = []
    /**选中的选项 */
    selectedOptions: Option[] = []
    @Watch('value', { immediate: true, deep: true })
    watchValue(newV: Option[]) {
        this.selectedOptions = newV
    }
    /**
     * 搜索建议查询
     * @param {String} keyword 检索词
     */
    @debounce(300)
    async querySearchAsync(keyword: string) {
        this.showSuggestions = !!keyword
        this.loading = true
        try {
            const data = await this.suggestions({ keyword })
            this.suggestionOptions = data.map(option => ({
                ...option,
                value: option[getOptionFields(this.optionFieldName).value],
                label: option[getOptionFields(this.optionFieldName).label],
            })) as Option[]
        } catch (error) {
            console.log('获取部门建议列表失败>>>: ', error)
            this.suggestionOptions = []
        } finally {
            this.loading = false
        }
    }
    /**关闭搜索建议 */
    handleClose() {
        this.showSuggestions = false
    }

    /**选中项的索引表 */
    get selectedOptionsMap() {
        return this.selectedOptions.reduce((acc, option) => {
            acc[option.value] = option
            return acc
        }, {} as Record<string, Option>)
    }
    /**空为为选中，half为半选中，all为全选中 */
    get allChecked() {
        const hasCkecked = this.suggestionOptions.some(option => !!this.selectedOptionsMap[option.value])
        const allChecked = this.suggestionOptions.every(option => !!this.selectedOptionsMap[option.value])
        if (hasCkecked && allChecked) {
            return 'all'
        } else if (hasCkecked && !allChecked) {
            return 'half'
        }
        return ''
    }
    /**
     * 判断是否选中
     * @param {Option} option
     * @param {Option[]} options
     * @return {{flag:Boolean, index:Number}}
     */
    isChecked(option: Option, options: Option[]) {
        const index = options.findIndex(item => item.value === option.value)
        return { flag: index > -1, index }
    }
    /**
     * 选择全部
     * @param {Boolean} checked
     */
    chooseAll(checked: boolean) {
        const selectedOptions = [...this.selectedOptions]
        if (checked) {
            this.suggestionOptions.forEach(option => {
                selectedOptions.push(option)
            })
        } else {
            this.suggestionOptions.forEach(option => {
                const { flag, index } = this.isChecked(option, selectedOptions)
                flag && selectedOptions.splice(index, 1)
            })
        }
        this.selectedOptions = dedupNode(selectedOptions)
        this.emitChange()
    }
    /**
     * 选择单个
     * @param {Boolean} checked
     * @param {Option} option
     */
    chooseItem(checked: boolean, option: Option) {
        if (checked) {
            this.selectedOptions.push(option)
        } else {
            const { flag, index } = this.isChecked(option, this.selectedOptions)
            flag && this.selectedOptions.splice(index, 1)
        }
        this.emitChange()
    }
}
</script>

<style lang="less" scoped>
.global-search {
    padding: 15px 14px;
    ::v-deep {
        .el-autocomplete {
            width: 100%;
        }
        .el-input--medium .el-input__inner {
            height: 34px;
            line-height: 34px;
        }
        .el-input-group__append {
            background-color: transparent;
        }
        .el-input__suffix-inner {
            width: 25px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .suggestions-box {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 3;
        ::v-deep.suggestions__wrap {
            height: 312px;
        }
        .all-choose,
        .suggestions-item {
            margin-right: 0;
            padding: 4px 21px;
            width: 100%;
            display: flex;
            align-items: center;
            ::v-deep {
                .el-checkbox__label {
                    white-space: pre-wrap;
                }
            }
        }
        .all-choose {
            padding-top: 8px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #dddddd;
        }
    }
}
</style>
