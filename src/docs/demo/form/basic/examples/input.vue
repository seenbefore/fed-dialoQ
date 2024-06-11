<template>
    <div class="sg-flexbox">
        <el-input v-model="currentValue" @input="onChange" style="flex:1;margin-right:8px;"></el-input>
        <span v-text="tip"></span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class Demo extends Vue {
    /**
     * 接收表单的值
     */
    @Prop() value!: string
    currentValue = this.value
    onChange(val: any) {
        this.$emit('input', val)
    }
    @Prop() tip!: string
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
