<template>
    <div class="region-org-tree" :class="{ disabled: disabled }">
        <el-popover popper-class="region-org-tree-menu-popver" placement="bottom-start" trigger="click" transition="el-zoom-in-top" :disabled="disabled" @show="visible = true" @hide="visible = false">
            <menu-box :left-tree-config="leftTreeConfig" :right-tree-config="rightTreeConfig" :search-config="searchConfig" v-model="myValue" @change="regionOrgTreeChange" />
            <div class="selected-container" slot="reference">
                <tags-box v-model="myValue" :disabled="disabled" @click.native="referenceRef.focus()"></tags-box>
                <el-input
                    ref="reference"
                    v-model="selectedLabel"
                    type="text"
                    :placeholder="myPlaceholder"
                    readonly
                    :validate-event="false"
                    :class="{ 'is-focus': visible }"
                    :disabled="disabled"
                    @focus="handleFocus"
                    @keydown.native.esc.stop.prevent="visible = false"
                    @keydown.native.tab="visible = false"
                    @mouseenter.native="inputHovering = true"
                    @mouseleave.native="inputHovering = false"
                >
                    <template slot="prefix" v-if="$slots.prefix">
                        <slot name="prefix"></slot>
                    </template>
                    <template slot="suffix">
                        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
                        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
                    </template>
                </el-input>
            </div>
        </el-popover>
    </div>
</template>
<script lang="ts">
import { ElInput } from 'element-ui/types/input'
import { Component, Emit, Model, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import MenuBox from './menu-box.vue'
import TagsBox from './tags-box/index.vue'
import { LeftTreeConfig, Option, RightTreeConfig, SeachConfig } from './types'
import { getOptionFields, isEmpty } from './utils'
@Component({
    name: 'RegionalOrgTree',
    components: { MenuBox, TagsBox },
})
export default class RegionalOrgTree extends Vue {
    @Model('change', { type: Array, default: () => [] })
    value!: Option[]
    /**占位符 */
    @Prop({ type: String, default: '请选择' })
    placeholder!: string
    /**是否禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean
    /**是否可以清空选项 */
    @Prop({ type: Boolean, default: true })
    clearable!: boolean
    /**左侧树配置 */
    @Prop({ type: Object, default: () => ({}) })
    leftTreeConfig!: LeftTreeConfig
    /**右侧树配置 */
    @Prop({ type: Object, default: () => ({}) })
    rightTreeConfig!: RightTreeConfig
    /**搜索框配置 */
    @Prop({ type: Object, default: () => ({}) })
    searchConfig!: SeachConfig
    /**
     * 抛出值变化事件
     * @param {Option[]} selectedOrgs
     * @return {Option[]}
     */
    @Emit('change')
    emitChange(selectedOrgs: Option[]) {
        return selectedOrgs
    }

    created() {}
    mounted() {}

    @Ref('reference')
    referenceRef!: ElInput
    /**显示下拉框 */
    visible = false
    /**input是否hover中 */
    inputHovering = false
    /**选中的值 */
    myValue: Option[] = []
    @Watch('value', { immediate: true, deep: true })
    watchValue(newV: Option[]) {
        const { optionFieldName } = this.rightTreeConfig
        this.myValue = newV.map(option => ({
            ...option,
            value: option[getOptionFields(optionFieldName).value],
            label: option[getOptionFields(optionFieldName).label],
        })) as Option[]
    }
    selectedLabel = ''
    /**组件宽度 */
    inputWidth = 0
    /**选中的组织 */
    selectedOrgs: Option[] = []

    get iconClass() {
        return this.visible ? 'arrow-up is-reverse' : 'arrow-up'
    }
    get showClose() {
        const criteria = this.clearable && !this.disabled && this.inputHovering && !isEmpty(this.myValue)
        return criteria
    }
    get myPlaceholder() {
        return isEmpty(this.myValue) ? this.placeholder : ''
    }

    /**
     * 失焦事件
     * @param {Event} event
     */
    handleFocus(event: Event) {
        this.visible = true
    }

    /**清空选中数据 */
    handleClearClick() {
        this.emitChange([])
    }
    /**
     * 区域组织树change事件
     * @param {Option[]} selectedOrgs
     */
    regionOrgTreeChange(selectedOrgs: Option[]) {
        this.emitChange(selectedOrgs)
    }
}
</script>

<style lang="less" scoped>
.region-org-tree {
    width: 100%;
    ::v-deep {
        .el-input__suffix,
        .el-input__inner {
            cursor: pointer;
        }
        .el-select__caret {
            transition: transform 0.3s;
            transform: rotateZ(180deg);
            &.is-reverse {
                transform: rotateZ(0);
            }
        }
    }
    .selected-container {
        position: relative;
        .tags-box {
            position: absolute;
            left: 10px;
            right: 30px;
            z-index: 1;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
    &.disabled {
        ::v-deep {
            .selected-container .tags-box,
            .el-input__suffix,
            .el-input__inner {
                cursor: not-allowed;
            }
        }
    }
}
</style>
<style lang="less">
.region-org-tree-menu-popver {
    padding: 0;
    .popper__arrow {
        left: 8px !important;
    }
    .menu-box {
        border: none;
    }
}
</style>
