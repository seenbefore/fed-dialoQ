<script lang="ts">
import { IAppFormDetailsDataStoreConfig } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsDataStore'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.APP_FORM_DETAILS,
})
export default class AppFormDetailsConfig extends Vue {
    @Prop({ type: Object })
    public config!: IAppFormDetailsDataStoreConfig
}
</script>

<template>
    <div class="app-form-details-config__container">
        <el-form-item label="底部按钮显隐" prop="formConfig.footerButton">
            <el-switch v-model="config.formConfig.footerButton"></el-switch>
        </el-form-item>
    </div>
</template>

<style scoped lang="less"></style>
