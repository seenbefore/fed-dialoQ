<script lang="ts">
import { IPcFormDetailsDataStoreConfig } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/PcFormDetailsDataStore'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { toNumber } from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.PC_FORM_DETAILS,
})
export default class PcFormDetailsConfig extends Vue {
    @Prop({ type: Object })
    public config!: IPcFormDetailsDataStoreConfig

    public replaceNumber(value: string): void {
        this.config.gutterSpan = toNumber(value)
    }
}
</script>

<template>
    <div class="pc-form-details-config__container">
        <el-form-item label="默认格子占比" prop="gutterSpan">
            <el-input v-model="config.gutterSpan" placeholder="请输入数字" @input="replaceNumber"></el-input>
        </el-form-item>
        <el-form-item label="label后缀" prop="labelSuffix">
            <el-input v-model="config.labelSuffix" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="空值的默认值" prop="emptyValue">
            <el-input v-model="config.emptyValue" placeholder="请输入"></el-input>
        </el-form-item>
    </div>
</template>

<style scoped lang="less"></style>
