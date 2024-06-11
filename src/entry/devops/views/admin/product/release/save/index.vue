<!-- 发布单保存 -->

<template>
    <div class="sg-page AdminProductReleaseSave sg-p-0">
        <ReleaseForm v-bind="$attrs"></ReleaseForm>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ReleaseForm from '../components/ReleaseForm/index.vue'
@Component({
    name: 'AdminProductReleaseSave',
    components: {
        ReleaseForm,
    },
})
export default class AdminProductReleaseSave extends Vue {
    async created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
