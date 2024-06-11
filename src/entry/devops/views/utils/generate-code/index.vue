<script lang="tsx">
import { UpdateAppConfigCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateAppConfigCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { GenerateCodeTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateCodeTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import GenerateAttrs from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/index.vue'
import GenerateComponentList from '@/entry/devops/views/utils/generate-code/runtime-core/component-list/index.vue'
import GenerateConfig from '@/entry/devops/views/utils/generate-code/runtime-core/config/index.vue'
import GenerateDesign from '@/entry/devops/views/utils/generate-code/runtime-core/design/index.vue'
import GenerateHelper from '@/entry/devops/views/utils/generate-code/runtime-core/helper/index.vue'
import { ElInput } from 'element-ui/types/input'
import { Component, ProvideReactive, Ref, Vue } from 'vue-property-decorator'
import { Application } from './core/Application'
import './core/sources/provider/DataStoreIoc'

@Component({
    name: 'GenerateCode',
    components: {
        GenerateHelper,
        GenerateConfig,
        GenerateAttrs,
        GenerateComponentList,
        GenerateDesign,
    },
})
export default class GenerateCode extends Vue {
    @ProvideReactive('app')
    public app: Application = Application.getInstance()

    @Ref('generateDesignRef')
    public generateDesignRef!: GenerateDesign

    @Ref('generateConfigRef')
    public generateConfigRef!: GenerateConfig

    @Ref('appNameRef')
    public appNameRef!: ElInput

    public readonly typeOptions = [
        {
            value: GenerateTypeEnum.APP_FORM_DETAILS,
            label: 'APP表单详情',
        },
        {
            value: GenerateTypeEnum.APP_BASE_FORM,
            label: 'APP基础表单',
        },
        // {
        //     value: GenerateTypeEnum.APP_EXAMPLES,
        //     label: 'APP案例',
        // },
        // {
        //     value: GenerateTypeEnum.PC_FORM_DETAILS,
        //     label: 'PC表单详情',
        // },
    ]

    public readonly generateTypes = [
        {
            label: '生成template',
            value: GenerateCodeTypeEnum.TEMPLATE,
        },
        {
            label: '生成script',
            value: GenerateCodeTypeEnum.SCRIPT,
        },
        {
            label: '生成style',
            value: GenerateCodeTypeEnum.STYLE,
        },
    ]

    public type: GenerateTypeEnum = GenerateTypeEnum.APP_FORM_DETAILS

    public get title() {
        return `${this.typeOptions.find(it => it.value === this.type)!.label ?? ''}配置`
    }

    public appName = ''

    /**
     * 生成代码
     */
    public generate(type?: GenerateCodeTypeEnum): void {
        if (!this.appName) {
            this.$message.error('请先输入组件名称')
            this.appNameRef.focus()
            return
        }
        this.app.dataStore.generate(type)
        this.$message.success('生成成功，代码已复制在剪切板中！')
    }

    public generateCommand(value: GenerateCodeTypeEnum): void {
        this.generate(value)
    }

    public updateFormConfig(): void {
        this.generateConfigRef.open(this.title)
    }

    public updateType(value: GenerateTypeEnum): void {
        this.generateDesignRef.hiddenPlaceholder()
        this.app.updateType(value)
    }

    public undo(): void {
        this.app.commandManage.undo()
    }

    public redo(): void {
        this.app.commandManage.redo()
    }

    public replaceAppName(appName: string): void {
        this.appName = appName?.replace(/[^a-zA-Z]/g, '') ?? ''
    }

    public changeAppName(value: string): void {
        createCommand(UpdateAppConfigCommand, this.app.dataStore.activeModel!, { name: value })
    }

    public initEvents(): void {
        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_APP_CONFIG, () => {
            const { name } = this.app.configurationManage.config
            if (name !== this.appName) {
                this.appName = name
                this.appNameRef.focus()
            }
        })

        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_DESIGN_CONFIG, () => {
            /* XXX: 暂时不做回退的时候弹框配置 */
            // if (!this.generateConfigRef.visible) {
            //     this.updateFormConfig()
            // }
        })
    }

    public mounted(): void {
        const { type } = this.app.configurationManage.config
        this.type = type

        this.initEvents()
    }
}
</script>

<template>
    <div class="generate-code__container sg-page">
        <div class="generate-code__container sg-page">
            <div class="generate-code__top">
                <div class="generate-code__top-left">
                    <el-button :disabled="!app.commandManage.hasNextCommand" type="primary" @click="undo">撤销</el-button>
                    <el-button :disabled="!app.commandManage.hasPreCommand" type="primary" @click="redo">恢复</el-button>
                    <el-button type="primary" @click="updateFormConfig">{{ title }}</el-button>
                    <span class="ml-10">当前类型：</span>
                    <el-select v-model="type" @change="updateType">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-dropdown @command="generateCommand">
                        <el-button class="ml-10" type="success" @click="generate()">
                            生成
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in generateTypes" :key="item.label" :command="item.value">{{ item.label }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <GenerateHelper />
                </div>
                <div class="generate-code__top-right">
                    <div class="app-name__label">生成的组件名称：</div>
                    <el-input ref="appNameRef" v-model="appName" placeholder="请输入字母" @input="replaceAppName" @change="changeAppName"></el-input>
                </div>
            </div>
            <GenerateConfig ref="generateConfigRef" />
            <div class="generate-code__content">
                <div class="generate-code__left">
                    <GenerateComponentList />
                </div>
                <div class="generate-code__middle">
                    <GenerateDesign ref="generateDesignRef" />
                </div>
                <div class="generate-code__right">
                    <GenerateAttrs />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.ml-10 {
    margin-left: 10px;
}

.generate-code {
    &__container {
        padding: 0 !important;
        display: flex;
        flex-direction: column;
    }

    &__top {
        padding: 0 12px;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__content {
        display: flex;
        width: 100%;
        height: calc(100% - 48px);

        & > div {
            height: 100%;
        }
    }

    &__top-left {
        .el-icon-question {
            cursor: pointer;
            font-size: 18px;
            color: #ccc;
        }
    }

    &__top-right {
        display: flex;
        align-items: center;

        .app-name__label {
            width: max-content;
            flex-shrink: 0;
        }
    }

    &__left,
    &__right {
        width: 250px;
        padding: 8px 12px;
        overflow: auto;
    }

    &__left {
        width: 284px;
        padding: 8px 8px 8px 12px;
    }

    &__middle {
        flex: 1;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        overflow: auto;
    }
}
</style>
