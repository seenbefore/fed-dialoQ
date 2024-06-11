<script lang="ts">
import { UseAttrModel } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/hooks/useAttrModel'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'AttrSwitch',
})
export default class AttrSwitch extends UseAttrModel {}
</script>

<template>
    <el-form-item v-if="activeModel" :label="attr.label">
        <el-switch v-model="value" @change="updateValue"></el-switch>
    </el-form-item>
</template>

<style scoped lang="less"></style>
