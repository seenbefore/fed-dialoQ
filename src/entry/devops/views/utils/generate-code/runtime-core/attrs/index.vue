<script lang="ts">
import { IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AttrsComponent } from '@/entry/devops/views/utils/generate-code/runtime-core/attrs/installAttrsComponent'
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { initDraggable } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/useInteract'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'GenerateAttrs',
    components: {
        ...AttrsComponent,
    },
})
export default class GenerateAttrs extends UseApplication {
    public get attrs(): Array<IModelAttr> {
        const activeModel = this.activeModel
        return activeModel && !activeModel.isDelete ? this.app.dataStore.getAttr(activeModel.type) : []
    }

    public get attrComponentName() {
        return (attrType: string) => `attr-${attrType}`
    }

    public mounted(): void {
        initDraggable()
    }
}
</script>

<template>
    <div :class="['generate-attrs__container', CLASS_NAME_CONST_DATA.ATTR_CONTAINER]">
        <el-form v-if="attrs.length" class="generate-attrs__form" :model="app.dataStore.activeModel" @submit.native.prevent label-position="top">
            <component v-for="attr in attrs" :key="attr.path" :is="attrComponentName(attr.type)" :attr="attr"></component>
        </el-form>
    </div>
</template>

<style scoped lang="less">
.generate-attrs {
    &__container {
        ::v-deep {
            .el-form--label-top .el-form-item__label {
                padding: 0;
            }
        }
    }

    &__form {
        ::v-deep {
            .el-form-item--small.el-form-item {
                margin-bottom: 8px;
            }
        }
    }
}
</style>
