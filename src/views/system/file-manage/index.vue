<template>
    <admin-page class="FileManage">
        <div class="file-manage-container">
            <file-type-nav v-model="currentType" @change="handleTypeChange"></file-type-nav>
            <file-list :type="currentType"></file-list>
        </div>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import AdminPage from '@/components/admin/admin-page/index.vue'
import FileTypeNav from './components/file-type-nav/index.vue'
import FileList from './components/file-list/index.vue'

@Component({
    name: 'FileManage',
    components: {
        AdminPage,
        FileTypeNav,
        FileList,
    },
})
export default class FileManage extends Vue {
    currentType = 'all'

    handleTypeChange(type: string) {
        this.currentType = type
    }
}
</script>

<style lang="less" scoped>
.FileManage ::v-deep {
    padding: 0 !important;
    .file-manage-container {
        height: 100%;
        display: flex;
        background: #fff;
    }
    .admin-page__content {
        padding: 0;
    }
}
</style>
