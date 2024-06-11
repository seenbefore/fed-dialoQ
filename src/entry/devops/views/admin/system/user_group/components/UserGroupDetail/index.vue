<template>
    <div class="UserGroupDetail">
        <sg-base-form class="column sg-mb-3" ref="formRef" :fields="formFields" v-model="formModel" @submit="handleSearch" @reset="handleSearch" :span="8"></sg-base-form>
        <sg-data-view :columns="columns" :load="load" ref="tableRef" height="100%" border></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { http } from '@/scripts/http'
import { dateFormat, clipboard } from '@/scripts/utils'

import { FormColumn, TableColumn, TableRef, FormRef, TableLoad } from '@/sharegood-ui'

@Component({
    name: 'UserGroupDetail',
    components: {},
})
export default class UserGroupDetail extends Vue {
    formModel: any = {}
    @Ref('tableRef')
    tableRef!: TableRef
    @Ref('formRef')
    formRef!: FormRef

    uri = ''
    apiComment = ''

    mounted() {}
}
</script>

<style lang="less" scoped>
.UserGroupDetail ::v-deep {
}
</style>
