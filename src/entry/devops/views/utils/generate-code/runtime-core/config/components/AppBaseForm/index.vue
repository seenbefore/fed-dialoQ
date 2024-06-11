<script lang="ts">
import { IAppBaseFormDataStoreConfig } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormDataStore'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.APP_BASE_FORM,
})
export default class AppBaseFormConfig extends Vue {
    @Prop({ type: Object })
    public config!: IAppBaseFormDataStoreConfig
}
</script>

<template>
    <div class="app-base-form-config__container">
        <el-form-item label="底部按钮显隐" prop="showFootBtns">
            <el-switch v-model="config.showFootBtns"></el-switch>
        </el-form-item>
        <el-form-item label="是否禁用" prop="disabled">
            <el-switch v-model="config.disabled"></el-switch>
        </el-form-item>
        <el-form-item label="内容对齐方式" prop="inputAlign">
            <el-radio-group v-model="config.inputAlign">
                <el-radio label="left" value="left"></el-radio>
                <el-radio label="center" value="center"></el-radio>
                <el-radio label="right" value="right"></el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<style scoped lang="less"></style>
