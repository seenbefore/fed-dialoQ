<script lang="ts">
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { PcFormDetailsDataStore } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/PcFormDetailsDataStore'
import { IPcFormDetailsProperties, PcFormDetailsModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/PcFormDetailsModel'
import { PcFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { UseDesign } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/UseDesign'
import { FormDetailsBuilder, IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import SgBaseFormDetails from '@/sharegood-ui/packages/base-form-details/index.vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.PC_FORM_DETAILS,
    components: { SgBaseFormDetails },
})
export default class PcFormDetails extends UseDesign<PcFormDetailsDataStore> {
    public fb = new FormDetailsBuilder()

    public get columns(): Array<IFormDetailsColumns> {
        return this.dataStore.getDetailsColumns()
    }

    public isTitleModel(model: PcFormDetailsModel): model is PcFormDetailsModel {
        return model.type === PcFormDetailsModelTypeEnum.TITLE
    }

    private getNextTitleIndex(titleModel: PcFormDetailsModel): number {
        const currentIndex = this.dataStore.findIndex(titleModel.id),
            length = this.dataStore.data.length
        let nextIndex = length
        if (currentIndex < length) {
            for (let i = currentIndex + 1; i < length; ++i) {
                const current = this.dataStore.data[i]
                if (this.isTitleModel(current)) {
                    nextIndex = i
                    break
                }
            }
        }
        return nextIndex
    }

    public addByTarget<T extends string = string, U extends HTMLElement = HTMLElement>(type: T, target: U): void {
        const domId = target.getAttribute('data-id')
        if (domId) {
            const targetModel = this.app.dataStore.findByDomId(domId) as UndefinedAble<PcFormDetailsModel>
            if (targetModel) {
                if (this.isTitleModel(targetModel)) {
                    const index = this.getNextTitleIndex(targetModel)
                    this.dataStore.createModel(type as PcFormDetailsModelTypeEnum, void 0, void 0, false, index)
                    return
                }
            }
        }
        /* xxx：因为最开始的详情表单设计缘故导致没有分组的概念。所以无parent */
        this.dataStore.createModel(type as PcFormDetailsModelTypeEnum, void 0, void 0)
    }

    public descriptionClick(properties: IPcFormDetailsProperties): void {
        const model = this.dataStore.findByDomId(properties.dataId as string)
        if (model) {
            createCommand(UpdateActiveModelCommand, model)
        }
    }

    /* xxx: 为了解决init之后class会被重制导致手动添加的class被清空。所以先执行 init，再执行 updatePlaceholderPosition */
    public beforeUpdatePlaceholderPosition(): void {
        this.fb.init(this.columns, this.dataStore.config)
    }
}
</script>

<template>
    <div :class="['pc-form-details__container', INTERACT_CONST_DATA.DROPZONE_SELECTOR]">
        <SgBaseFormDetails
            class="pc-form-details__details-form"
            :fb="fb"
            :draggable-class="INTERACT_CONST_DATA.DROPZONE_SELECTOR"
            @descriptionClick="descriptionClick"
            @descriptionThClick="descriptionClick"
        ></SgBaseFormDetails>
    </div>
</template>

<style scoped lang="less">
.pc-form-details {
    &__container {
        width: 100%;
        height: 100%;

        /* 为了加层级 */
        .pc-form-details__details-form {
            ::v-deep {
                .__placeholder-class {
                    &::before {
                        top: -4px;
                    }
                }

                .col__has-auto-margin {
                    &::before {
                        top: 0;
                    }
                }
            }
        }
    }
}
</style>
