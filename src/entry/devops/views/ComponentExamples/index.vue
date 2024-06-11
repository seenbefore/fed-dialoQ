<template>
    <ComponentExample></ComponentExample>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ComponentExample from '@/components/ComponentExamples/index.vue'
@Component({
    name: 'ComponentExamples',
    components: {
        ComponentExample,
    },
})
export default class ComponentExamples extends Vue {
    mounted() {}
}
</script>

<style lang="less" scoped></style>
