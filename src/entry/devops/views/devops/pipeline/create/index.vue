<template>
    <div class="sg-page page-devops-app-create sg-p-0">
        <PipelineForm></PipelineForm>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PipelineForm from '../components/PipelineForm/index.vue'
@Component({
    name: 'DevopsPipelineCreate',
    components: {
        PipelineForm,
    },
})
export default class DevopsPipelineCreate extends Vue {
    async created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
