<script lang="ts">
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { UseAttrModel } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/hooks/useAttrModel'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'AttrInput',
})
export default class AttrInput extends UseAttrModel {}
</script>

<template>
    <el-form-item v-if="activeModel" :label="attr.label">
        <el-input v-model="value" placeholder="请输入" @change="updateValue"></el-input>
    </el-form-item>
</template>

<style lang="less" scoped></style>
