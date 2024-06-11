<!--  -->
<template>
    <div class="sg-page Readme">
        <el-button v-bind="btn.attrs" v-for="(btn, index) in menuList" :key="index" @click="onBtn(btn)">{{ btn.label }}</el-button>
    </div>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'Readme',
    components: {},
})
export default class Readme extends Vue {
    menuList = [
        {
            label: '基础组件示例',
            attrs: {
                type: 'primary',
            },
            path: '/example/one',
        },
        {
            label: '高阶组件示例',
            attrs: {
                type: 'primary',
            },
            path: '/example/two',
        },
        {
            label: 'echarts组件示例',
            attrs: {
                type: 'primary',
            },
            path: '/example/echarts',
        },
        // {
        //     label: '大屏模板1',
        //     attrs: {
        //         type: 'primary',
        //     },
        //     path: '/example/template-one',
        // },
        {
            label: '衢州市执法监管驾驶舱',
            attrs: {
                type: 'primary',
            },
            path: '/qz-zfjd-jsc',
        },
    ]
    onBtn(row: any) {
        console.log('row :>> ', row)
        const { path } = row
        path && this.$router.push(path)
    }
}
</script>

<style lang="less" scoped></style>
