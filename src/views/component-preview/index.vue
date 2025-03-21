<template>
    <div class="component-preview">
        <div class="component-preview__sidebar" v-if="!name">
            <el-menu :default-active="activeComponentName" class="component-menu" @select="handleSelect">
                <!-- <el-submenu index="1">
                    <template slot="title">国际化</template>
                    <el-menu-item v-for="item in groupedComponents['i18n']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">自定义主题</template>
                    <el-menu-item v-for="item in groupedComponents['theme']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">内置过渡动画</template>
                    <el-menu-item v-for="item in groupedComponents['transition']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu> -->
                <el-submenu index="4">
                    <template slot="title">Basic</template>
                    <el-menu-item v-for="item in groupedComponents['basic']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="5">
                    <template slot="title">Layout 布局</template>
                    <el-menu-item v-for="item in groupedComponents['layout']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">Container 布局容器</template>
                    <el-menu-item v-for="item in groupedComponents['container']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">Color 色彩</template>
                    <el-menu-item v-for="item in groupedComponents['color']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">Typography 字体</template>
                    <el-menu-item v-for="item in groupedComponents['typography']" :key="item.name" :index="item.name">
                        {{ item.title }}
                    </el-menu-item>
                </el-submenu> -->
            </el-menu>
        </div>
        <div class="component-preview__content">
            <doc-preview v-if="activeComponentName" :name="activeComponentName" :code="true" :demos="activeComponent.demos" :key="activeComponentName" :doc-raw="activeComponent.docRaw"></doc-preview>
            <div v-else class="component-preview__empty">
                <i class="el-icon-document"></i>
                <p>请选择要预览的组件</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DocPreview from '@/components/DocPreview.vue'

interface ComponentInfo {
    name: string
    title: string
    group: string
    [key: string]: any
}

@Component({
    name: 'ComponentPreview',
    components: {
        DocPreview,
    },
})
export default class ComponentPreview extends Vue {
    /**
     * 显示的组件名称
     */
    @Prop({ type: String, default: '' }) readonly name!: string
    activeComponentName = ''

    private components: ComponentInfo[] = [
        {
            name: 'MyTreeSelect',
            title: '树形选择器',
            group: 'basic',
            docRaw: require(`!!raw-loader!@/components/global/my-tree-select/README.md`),
            demos: [
                {
                    name: 'DomainAndRegionExample',
                    title: '适用领域和地区选择器',
                    component: () => import('@/components/global/my-tree-select/examples/DomainAndRegionExample.vue'),
                    raw: require(`!!raw-loader!@/components/global/my-tree-select/examples/DomainAndRegionExample.vue`),
                },
            ],
        },
        {
            name: 'ElEmpty',
            title: '空状态',
            group: 'basic',
            docRaw: require(`!!raw-loader!@/components/global/el-empty/README.md`),
            demos: [
                {
                    name: 'demo1',
                    title: '基础用法',
                    component: () => import('@/components/global/el-empty/demo/demo1.vue'),
                    raw: require(`!!raw-loader!@/components/global/el-empty/demo/demo1.vue`),
                },
            ],
        },
        {
            name: 'ElSkeleton',
            title: '骨架屏',
            group: 'basic',
            docRaw: require(`!!raw-loader!@/components/global/el-skeleton/README.md`),
            demos: [
                {
                    name: 'demo1',
                    title: '基础用法',
                    component: () => import('@/components/global/el-skeleton/demo/demo1.vue'),
                    raw: require(`!!raw-loader!@/components/global/el-skeleton/demo/demo1.vue`),
                },
            ],
        },
        {
            name: 'CustomList',
            title: '自定义列表',
            group: 'basic',
            docRaw: require(`!!raw-loader!@/components/custom-list/README.md`),
            demos: [
                {
                    name: 'demo1',
                    title: '基础用法',
                    component: () => import('@/components/custom-list/demo/demo1.vue'),
                    raw: require(`!!raw-loader!@/components/custom-list/demo/demo1.vue`),
                },
            ],
        },
        {
            name: 'BaseButton',
            title: '按钮',
            group: 'basic',
            docRaw: require(`!!raw-loader!@/components/basic/BaseButton/README.md`),
            demos: [
                {
                    name: 'demo1',
                    title: '基础用法',
                    component: () => import('@/components/basic/BaseButton/demo/demo1.vue'),
                    raw: require(`!!raw-loader!@/components/basic/BaseButton/demo/demo1.vue`),
                },
                {
                    name: 'demo2',
                    title: '不同尺寸',
                    component: () => import('@/components/basic/BaseButton/demo/demo2.vue'),
                    raw: require(`!!raw-loader!@/components/basic/BaseButton/demo/demo2.vue`),
                },
            ],
        },
    ]

    get groupedComponents() {
        const groups = {
            i18n: [],
            theme: [],
            transition: [],
            basic: [],
            layout: [],
            container: [],
            color: [],
            typography: [],
        }

        this.components.forEach(component => {
            if (groups[component.group]) {
                groups[component.group].push(component)
            }
        })

        return groups
    }

    get activeComponent() {
        return this.components.find(component => component.name === this.activeComponentName)
    }

    private handleSelect(index: string) {
        this.activeComponentName = index
    }

    mounted() {
        console.log(this.name)
        this.activeComponentName = this.name || this.components[0].name
    }
}
</script>

<style lang="less" scoped>
.component-preview {
    display: flex !important;
    &__sidebar {
        width: 240px;
        border-right: 1px solid #dcdfe6;
        overflow-y: auto;

        ::v-deep .component-menu {
            border-right: none;

            .el-submenu__title {
                height: 45px;
                line-height: 45px;
            }

            .el-menu-item {
                height: 40px;
                line-height: 40px;
            }
            .el-menu-item:focus,
            .el-menu-item:hover {
                outline: 0;
                background-color: transparent;
            }
        }
    }

    &__content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #909399;

        i {
            font-size: 48px;
            margin-bottom: 16px;
        }

        p {
            font-size: 14px;
        }
    }
}
</style>
