<template>
    <div class="AdminCompTableBasic">
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

const { examples, examplesRaw } = useLoadExampleFiles('table/basic')

@Component({
    name: 'AdminCompTableBasic',
    components: {
        ...examples,
    },
})
export default class AdminCompTableBasic extends Vue {
    activeName = ''
    examplesRaw = examplesRaw
    examples = [
        {
            label: '打印和导出',
            name: 'ActionTable',
        },
        {
            label: '树形表格',
            name: 'TreeTable',
        },
        {
            label: '跨页选择',
            name: 'MultipleSelected',
        },
        {
            label: '多级表头',
            name: 'MultipleHeader',
        },
        {
            label: '自定义列',
            name: 'CustomerCell',
        },
        {
            label: '基础',
            name: 'Basic',
        },
    ]
    created() {
        const example = this.examples.find(item => item.name === 'Basic')
        this.activeName = example?.name + ''
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
