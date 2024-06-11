<script lang="ts">
import { UseAttrModel } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/hooks/useAttrModel'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'AttrTextarea',
})
export default class AttrTextarea extends UseAttrModel {}
</script>

<template>
    <el-form-item v-if="activeModel" :label="attr.label">
        <el-input type="textarea" v-model="value" placeholder="请输入" @change="updateValue"></el-input>
    </el-form-item>
</template>

<style scoped lang="less"></style>
