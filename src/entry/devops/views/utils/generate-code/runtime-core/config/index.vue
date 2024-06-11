<script lang="ts">
import { UpdateDesignConfigCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateDesignConfigCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { IConfiguration } from '@/entry/devops/views/utils/generate-code/core/configuration'
import ApplicationConfig from '@/entry/devops/views/utils/generate-code/runtime-core/config/applicationConfig.vue'
import { configComponents } from '@/entry/devops/views/utils/generate-code/runtime-core/config/installConfig'
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { cloneDeep } from 'lodash'
import { Vue, Component, Ref } from 'vue-property-decorator'

@Component({
    name: 'GenerateConfig',
    components: {
        ApplicationConfig,
        ...configComponents,
    },
})
export default class GenerateConfig extends UseApplication {
    @Ref('applicationConfigRef')
    public applicationConfigRef!: ApplicationConfig

    public visible = false

    public title = ''

    public config: Obj = {}

    public open(title: string): void {
        this.title = title
        this.visible = true
        this.config = cloneDeep(this.app.dataStore.config)
    }

    public cancel(): void {
        this.visible = false
    }

    public confirm(): void {
        this.applicationConfigRef.update()
        createCommand(UpdateDesignConfigCommand, this.activeModel!, this.config)
        /* 修改配置 */
        this.cancel()
    }
}
</script>

<template>
    <el-dialog :title="title" :visible.sync="visible" width="500px" :close-on-click-modal="false">
        <el-form class="config-form" :model="config">
            <component :is="app.configurationManage.config.type" :config="config"></component>
        </el-form>
        <p class="config-tips">application的配置。（注意：该配置会默认存储在缓存中的）</p>
        <ApplicationConfig v-if="visible" ref="applicationConfigRef" />
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </span>
    </el-dialog>
</template>

<style scoped lang="less">
.config-form {
    ::v-deep {
        .el-form-item--small.el-form-item {
            margin-bottom: 8px;
        }
    }
}

.config-tips {
    margin: 0;
    padding: 0;
    color: #f4333c;
    font-weight: 800;
}
</style>
