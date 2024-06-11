<template>
    <div class="sg-page AdminPageBaseListPage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="页面示例" name="list" lazy>
                <demo-block>
                    <component :is="examples.List" slot="source"></component>
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.List"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
            <el-tab-pane label="弹窗代码" name="dialog" lazy>
                <demo-block>
                    <!-- <component :is="examples.AddRoleDialog" slot="source"></component> -->
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.AddRoleDialog"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
            <el-tab-pane label="表单子组件代码" name="dialogComp" lazy>
                <demo-block>
                    <div slot="highlight" v-highlight>
                        <pre><code class="javascript" v-text="examplesRaw.ApplyAreaTypeComp"></code></pre>
                    </div>
                </demo-block>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { useLoadExampleFiles } from '@/docs/utils'
import { Component, Vue } from 'vue-property-decorator'

const { examples, examplesRaw } = useLoadExampleFiles('base-list-page')

@Component({
    name: 'AdminPageBaseListPage',
    components: {},
})
export default class AdminPageBaseListPage extends Vue {
    examples = examples
    examplesRaw = examplesRaw
    activeName = 'list'
    mounted() {}
}
</script>

<style lang="less" scoped></style>
