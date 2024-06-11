<!-- 文章统计 -->
<template>
    <PageWrapper class="DevopsPipelineStat AdminArticleStat " :title="null">
        <AppChart></AppChart>
    </PageWrapper>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
import AppChart from './components/AppChart.vue'
import { MyMixins } from '@/entry/devops/mixins'
type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'AdminArticleStat',
    components: {
        AppChart,
    },
})
export default class AdminArticleStat extends MyMixins {
    mounted() {}
}
</script>

<style lang="less" scoped>
.AdminArticleStat ::v-deep {
}
</style>
