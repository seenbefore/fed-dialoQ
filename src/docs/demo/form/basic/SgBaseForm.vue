<template>
    <div class="DemoCompFormBasic ">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in examples" :key="index">
                <keep-alive :key="item.name">
                    <demo-block v-if="activeName == item.name">
                        <component :is="item.name" slot="source"></component>
                        <div slot="highlight" v-highlight>
                            <pre><code class="language-html" v-text="examplesRaw[item.name]"></code></pre>
                        </div>
                    </demo-block>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { useLoadExampleFiles } from '@/docs/utils'
import { Component, Vue } from 'vue-property-decorator'

const { examples, examplesRaw } = useLoadExampleFiles('form/basic')

@Component({
    name: 'DemoCompFormBasic',
    components: {
        ...examples,
        //  MarkDown,
    },
})
export default class DemoCompFormBasic extends Vue {
    activeName = ''
    examplesRaw = examplesRaw
    examples = [
        {
            label: '基础表单',
            name: 'basic',
        },
        {
            label: '查询',
            name: 'search',
        },
        {
            label: 'tab条件查询',
            name: 'tab-search',
        },
        {
            label: '校验',
            name: 'validate',
        },
        // {
        //     label: '联动',
        //     name: '联动',
        // },
        {
            label: '日期范围',
            name: 'daterange',
        },
        {
            label: '自定义组件',
            name: 'custom',
        },
    ]

    created() {
        const example = this.examples.find(item => item.name === 'daterange')
        this.activeName = example?.name + ''
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
