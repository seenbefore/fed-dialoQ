<script lang="ts">
import { useLoadExampleFiles } from '@/docs/utils'
import { Vue, Component } from 'vue-property-decorator'

const { examplesRaw, examples } = useLoadExampleFiles('image-preview')

@Component({
    name: 'ImagePreview',
    components: {
        ...examples,
    },
})
export default class ImagePreview extends Vue {
    public activeModel = ''

    public examples = [
        {
            label: '通过方法掉用（推荐使用该方法）',
            name: 'UseHooks',
        },
        {
            label: '通过指令掉用',
            name: 'UseDirective',
        },
        {
            label: '通过组件掉用',
            name: 'UseComponent',
        },
    ]

    public get examplesRaw() {
        return examplesRaw
    }

    public created() {
        this.activeModel = this.examples[0].name
    }
}
</script>

<template>
    <div class="image-preview__container">
        <el-tabs v-model="activeModel">
            <el-tab-pane :label="item.label" :name="item.name" v-for="item in examples" :key="item.name">
                <demo-block>
                    <component :is="item.name" slot="source"></component>
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw[activeModel]"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="less">
.image-preview {
    &__container {
        ::v-deep {
            .img-class {
                width: 100px;
                height: auto;
                cursor: pointer;
            }
        }
    }
}
</style>
