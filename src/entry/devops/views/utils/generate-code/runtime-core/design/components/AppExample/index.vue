<script lang="ts">
import { AppExampleDatastore } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/AppExampleDatastore'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { UseDesign } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/UseDesign'
import { Component } from 'vue-property-decorator'
import { getComponents } from './installExamples'

const components = getComponents()

@Component({
    name: GenerateTypeEnum.APP_EXAMPLES,
    components,
})
export default class AppExample extends UseDesign<AppExampleDatastore> {
    public get model() {
        return this.dataStore.currentPageModel
    }

    public get properties() {
        return this.model.generate().properties
    }
}
</script>

<template>
    <div class="app-example__container app-wrapper__container">
        <div :class="['app-example__body app-wrapper__body', INTERACT_CONST_DATA.DROPZONE_SELECTOR]">
            <component v-if="model" :is="model.type" :properties="properties"></component>
        </div>
    </div>
</template>

<style scoped lang="less">
.app-example {
    &__container {
    }

    &__body {
    }
}
</style>
