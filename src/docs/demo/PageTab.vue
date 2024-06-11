<!--  -->
<template>
    <div class="report-box ic-h-100 ic-row column">
        {{ current }}
        <page-tab :options="options" v-model="current" max-width="600px" />
        {{ current2 }}
        <page-tab :options="options2" v-model="current2" max-width="460px">
            <template slot-scope="scope">
                {{ scope.row.label }}
                <span class="my-badge" style="position: absolute;top: 5px;right:60px;">{{ scope.row.count || '' }}</span>
            </template>
        </page-tab>
    </div>
</template>
<script lang="tsx">
import PageTab from '@/entry/third/components/page-tab/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'Demo',
    components: {
        PageTab,
    },
})
export default class Demo extends Vue {
    options = [
        { value: '调查报告', label: '调查报告' },
        { value: '审查审批报告', label: '审查审批报告' },
    ]
    current = '调查报告'

    options2 = [
        { value: 'entCount', label: '企业', count: 10 },
        { value: 'personCount', label: '个人', count: 20 },
    ]
    current2 = 'entCount'
}
</script>

<style lang="less" scoped></style>
