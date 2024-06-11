<script lang="ts">
import { UseAttrModel } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/hooks/useAttrModel'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'AttrSelect',
})
export default class AttrSelect extends UseAttrModel {
    public get options() {
        return (
            this.attr.options?.map(m => {
                if (typeof m !== 'object') {
                    return { label: m, value: m }
                }
                return m
            }) ?? []
        )
    }
}
</script>

<template>
    <el-form-item v-if="activeModel" :label="attr.label">
        <el-select v-model="value" placeholder="请选择" @change="updateValue">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
</template>

<style scoped lang="less"></style>
