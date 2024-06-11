<script lang="tsx">
import { AppBaseFormDataStore } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormDataStore'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { EMPTY_FNC } from '@/entry/devops/views/utils/generate-code/core/utils'
import { UseDesign } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/UseDesign'
import AppForm from '@/entry/h5/components/global/app-form/index.vue'
import { Component, Ref } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.APP_BASE_FORM,
    components: {
        AppForm,
    },
})
export default class AppBaseForm extends UseDesign<AppBaseFormDataStore> {
    @Ref('appFormRef')
    public appFormRef!: AppForm

    public get fields() {
        return this.dataStore.getBaseFormFields()
    }

    public formData = {}

    public updatePlaceholderPosition(domId: string): void {
        /* 因为 app-form 组件的 data-id 是在 mounted 中动态加上的，所以加个定时器处理 */
        setTimeout(() => {
            const target = this.$el.querySelector(`[data-id="${domId}"]`) as UndefinedAble<HTMLElement>
            target && this.$emit('updatePlaceholderPosition', domId)
        }, 50)
    }

    public mounted(): void {
        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_ATTR, () => {
            this.$nextTick(() => {
                this.dataStore.activeModel?.updateView?.()
            })
        })
    }

    public render() {
        return (
            <div class="app-base-form__container app-wrapper__container">
                <div class="app-base-form__body app-wrapper__body">
                    <div class={['app-base-form__app-content app-base-form-reset', this.INTERACT_CONST_DATA.DROPZONE_SELECTOR]}>
                        {/* @ts-ignore */}
                        <app-form
                            ref="appFormRef"
                            v-model={this.formData}
                            {...{ attrs: this.dataStore.config }}
                            fields={this.fields}
                            onFieldClick={this.clickHandler}
                            onFieldGroupClick={this.clickHandler}
                            onCancel={EMPTY_FNC}
                            onSubmit={EMPTY_FNC}
                            disabled={true}
                        ></app-form>
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style scoped lang="less">
@import '~@/entry/h5/styles/reset/app-base-form-reset.less';

.app-base-form {
    &__container {
        ::v-deep {
            .__placeholder-class {
                &::before {
                    border-radius: 8px;
                }
            }
        }
    }

    &__app-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        padding: 16px;

        .app-form {
            padding: 0;
        }
    }
}
</style>
