<script lang="ts">
import IconButton from '@/components/icon-button/index.vue'
import { tagsViewStore } from '@/store/useStore'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'CustomBreadcrumb',
    components: { IconButton },
})
export default class CustomBreadcrumb extends Vue {
    @Prop({ type: String, default: '/' })
    public separator!: string

    @Prop({ type: Array, default: () => [] })
    public breadcrumbs!: Array<ICustomBreadcrumbItem | string>

    @Prop({ type: Function })
    public back!: () => void

    @Prop({ type: String })
    public backPath!: string

    public get getData() {
        return (key: keyof ICustomBreadcrumbItem, value: ICustomBreadcrumbItem | string) => {
            if (typeof value === 'object') {
                return Reflect.get(value, key)
            }
            return value
        }
    }

    public get getPath() {
        return (item: ICustomBreadcrumbItem | string) => {
            if (typeof item === 'object') {
                return { path: item.path, query: item.query }
            }
            return void 0
        }
    }

    public deleteView(): void {
        tagsViewStore.delView(this.$route)
    }

    public breadcrumbBack(): void {
        if (this.back) {
            this.back()
        } else {
            this.deleteView()
            if (this.backPath) {
                this.$router.replace(this.backPath)
            } else {
                this.$router.go(-1)
            }
        }
    }

    public goTo(item: ICustomBreadcrumbItem | string): void {
        const path = this.getPath(item)
        if (path) {
            this.deleteView()
            this.$router.push(path)
        }
    }
}
</script>

<template>
    <div class="custom-breadcrumb__container row-center">
        <div class="left flex-1">
            <el-breadcrumb :separator="separator">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="getData('path', item)" @click="goTo(item)">
                    <span :class="[index === breadcrumbs.length - 1 ? 'black-color-primary' : '', 'color-666', getPath(item) ? 'pointer' : '']" @click="goTo(item)">{{ getData('label', item) }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <IconButton @click="breadcrumbBack" type="text" icon="back">返回</IconButton>
        </div>
    </div>
</template>

<style scoped lang="less">
.custom-breadcrumb {
    &__container {
        height: 40px;
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        padding: 0 20px;

        .left {
            .el-breadcrumb__separator {
                margin: 0 6px;
            }
        }

        .right {
            .el-button {
                width: max-content;
                min-width: max-content;
                padding: 7px 0;
            }
        }

        .color-666 {
            color: var(--color-text-regular);
            font-size: 14px;
        }

        .black-color-primary {
            color: var(--color-text-primary);
            font-weight: 600;
        }
    }
}
</style>
