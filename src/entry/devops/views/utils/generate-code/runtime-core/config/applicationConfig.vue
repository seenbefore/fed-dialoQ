<script lang="ts">
import { IConfiguration } from '@/entry/devops/views/utils/generate-code/core/configuration'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { cloneDeep } from 'lodash'
import { Component } from 'vue-property-decorator'

/* 生成的所有config */
@Component({
    name: 'ApplicationConfig',
})
export default class ApplicationConfig extends UseApplication {
    public cacheConfig: IConfiguration['cacheConfig'] = {} as IConfiguration['cacheConfig']

    public get isAppBaseForm() {
        return this.app.configurationManage.config.type === GenerateTypeEnum.APP_BASE_FORM
    }

    public update() {
        /* 不做历史记录，因为涉及到缓存就不走缓存了 */
        this.app.configurationManage.updateCacheConfig(this.cacheConfig)
    }

    public mounted(): void {
        this.cacheConfig = cloneDeep(this.app.configurationManage.config.cacheConfig)
    }
}
</script>

<template>
    <el-form :model="cacheConfig">
        <el-form-item label="app应用名称（entry的名称）" prop="applicationName">
            <el-input v-model="cacheConfig.applicationName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="isAppBaseForm" label="app基础表单的通用类名" prop="applicationName">
            <el-input v-model="cacheConfig.appBaseFormClassName" placeholder="请输入"></el-input>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="less"></style>
