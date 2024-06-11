<script lang="tsx">
import { UpdateAttrCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateAttrCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { UseAttrModel } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/hooks/useAttrModel'
import { cloneDeep, get } from 'lodash'
import { Component } from 'vue-property-decorator'

const ChildrenInput = {
    name: 'ChildrenInput',
    props: {
        value: String,
    },
    data() {
        return {
            currentValue: '',
        }
    },
    methods: {
        updateValue(): void {
            this.$emit('change', this.currentValue)
        },
    },
    render() {
        // @ts-ignore
        return <ElInput v-model={this.currentValue} onChange={this.updateValue}></ElInput>
    },
    watch: {
        value: {
            handler(newValue: string): void {
                this.currentValue = newValue
            },
            immediate: true,
        },
    },
}

@Component({
    name: 'AttrStatusList',
    components: {
        ChildrenInput,
    },
})
export default class AttrStatusList extends UseAttrModel {
    public get value(): any {
        if (!this.isInitialized) {
            this.transitionValue = cloneDeep(get(this.activeModel?.properties, this.path)) ?? []
            this.isInitialized = true
        }
        return this.transitionValue
    }

    public set value(value: any) {
        this.transitionValue = cloneDeep(value)
    }

    public updateValue() {
        if (this.customUpdate) {
            this.customUpdate(this.value, get(this.activeModel?.properties, this.path) ?? '')
        } else {
            this.activeModel && createCommand(UpdateAttrCommand, this.activeModel, this.path, cloneDeep(this.transitionValue))
        }
        this.isInitialized = false
        this.$emit('updateValue', cloneDeep(this.value))
    }

    public mounted() {
        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_VIEW, () => {
            this.isInitialized = false
        })
    }

    public add(): void {
        this.value = [...this.value, { color: '#FA7312', label: '状态', bgColor: '#FFF2E5', className: '' }]
        this.updateValue()
    }

    public updateInputValue(index: number | string, key: string, value: string): void {
        const originValue = [...this.value]
        originValue[+index][key] = value
        this.value = [...originValue]
        this.updateValue()
    }
}
</script>

<template>
    <el-form-item class="status-list__form-item" v-if="activeModel" :label="attr.label">
        <div class="status-list__container">
            <div class="status-list__item" v-for="(item, index) in value" :key="item">
                <div class="status-list__item-content">
                    <div class="status-list__label">文本内容</div>
                    <ChildrenInput :value="item.label" placeholder="请输入" @change="v => updateInputValue(index, 'label', v)" />
                </div>
                <div class="status-list__item-content">
                    <div class="status-list__label">文字颜色</div>
                    <el-color-picker v-model="item.color" @change="updateValue"></el-color-picker>
                </div>
                <div class="status-list__item-content">
                    <div class="status-list__label">背景颜色</div>
                    <el-color-picker v-model="item.bgColor" @change="updateValue"></el-color-picker>
                </div>
                <div class="status-list__item-content">
                    <div class="status-list__label">className</div>
                    <ChildrenInput :value="item.className" placeholder="请输入" @change="v => updateInputValue(index, 'className', v)" />
                </div>
            </div>
            <div class="status-list__footer">
                <el-button type="primary" @click="add">添加</el-button>
            </div>
        </div>
    </el-form-item>
</template>

<style scoped lang="less">
.status-list {
    &__form-item {
        ::v-deep {
            .el-form-item__label {
                float: none;
            }
        }
    }

    &__item {
        border: 1px solid #0366f1;
        border-radius: 4px;
        padding: 0 12px 8px 12px;
        margin-bottom: 8px;
    }

    &__footer {
        text-align: center;
    }
}
</style>
