<template>
    <div class="sg-page AdminFeatBreadcrumb">
        <AdminBreadcrumb></AdminBreadcrumb>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AdminBreadcrumb from '@/entry/devops/layout/admin/components/AppBreadcrumb.vue'
@Component({
    name: 'AdminFeatBreadcrumb',
    components: {
        AdminBreadcrumb,
    },
})
export default class AdminFeatBreadcrumb extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped></style>
