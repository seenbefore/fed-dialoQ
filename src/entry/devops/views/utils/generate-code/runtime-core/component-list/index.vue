<script lang="ts">
import { IComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'GenerateComponentList',
})
export default class GenerateComponentList extends UseApplication {
    public get componentList() {
        return this.app.dataStore.getComponentList()
    }

    public getIcon(item: IComponentList) {
        return item.icon || require('./assets/icon.svg')
    }
}
</script>

<template>
    <div class="component-list__container">
        <div class="component-list__item" :class="CLASS_NAME_CONST_DATA.DRAGGABLE_SELECTOR" v-for="item in componentList" :key="item.type" :data-type="item.type">
            <img :src="getIcon(item)" alt="icon" />
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.component-list {
    &__container {
        display: flex;
        flex-wrap: wrap;

        .__draggable__moving {
            position: fixed;
            background-color: rgba(0, 0, 0, 0.1);
            transform: scale(0.6);
            z-index: 9999;

            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }

    &__item {
        width: 80px;
        height: 80px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 8px;
        cursor: pointer;
        padding-top: 2px;
        margin-bottom: 8px;

        img {
            width: 55px;
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
