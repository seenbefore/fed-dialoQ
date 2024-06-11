<script lang="tsx">
import ElDescriptions from '@/sharegood-ui/packages/base-form-details/components/el-descriptions'
import ElDescriptionsItem from '@/sharegood-ui/packages/base-form-details/components/el-descriptions-item'
import ElDescriptionsRow from '@/sharegood-ui/packages/base-form-details/components/el-descriptions/descriptions-row'
import { FormDetailsBuilder, IFormDetailsBuilderConfig, IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import BaseFormDetails from '@/sharegood-ui/packages/base-form-details/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'DemoCompFormDetails',
    components: { ElDescriptionsRow, ElDescriptions, BaseFormDetails, ElDescriptionsItem },
})
export default class DemoCompFormDetails extends Vue {
    public message = 0

    public fb = new FormDetailsBuilder()

    public get columns(): Array<IFormDetailsColumns> {
        return [
            {
                prop: 'a',
                label: '值是动态的',
                render: () => {
                    return this.message
                },
            },
            {
                prop: 'b',
                label: '值是model绑定的值',
                render: () => {
                    return this.fb.model.a
                },
            },
            {
                title: () => `这是一个动态的标题--${this.message}`,
            },
            {
                label: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的label',
                render: 'value',
                labelClassName: 'test-1',
                labelSuffix: '?',
            },
            {
                prop: 'c',
                label: () => `这是动态的message-${this.message}`,
            },
            {
                prop: 'd',
                label: 'message为2的整数的时候展示',
                render: () => {
                    return <div>{this.fb.model.d}</div>
                },
                hidden: () => this.message % 2 === 0,
            },
            {
                prop: 'e',
            },
            {
                prop: 'g',
                class: 'test-1',
                render: () => `这是没有label的动态内容${this.message}`,
                elColProps: {
                    span: 24,
                },
            },
            {
                label: 'label-f',
                render: () => {
                    return <el-input v-model={this.message}></el-input>
                },
            },
            {
                label: '修改值',
                render: () => {
                    return (
                        <el-button onclick={this.update} type="primary">
                            修改message
                        </el-button>
                    )
                },
            },
        ]
    }

    public get config(): IFormDetailsBuilderConfig {
        return {
            gutterSpan: 12,
            elRowProps: {
                style: () => {
                    return {
                        backgroundColor: this.message % 2 === 0 ? 'yellow' : 'blue',
                    }
                },
                class: '123',
            },
        }
    }

    public update() {
        this.fb.model.a += 1
        this.message++
    }

    public created() {
        this.fb.init(this.columns, this.config).buildModel({ a: 1, b: 2, c: 3, d: 11, e: '这是没有label的内容' })
    }
}
</script>

<template>
    <div class="sg-page demo-comp-form-details__container">
        <BaseFormDetails :fb="fb"></BaseFormDetails>
        <!--<section>-->
        <!--    <ElDescriptions title="这里也可以设置title">-->
        <!--        <ElDescriptionsItem label="这是label">这是内容</ElDescriptionsItem>-->
        <!--    </ElDescriptions>-->
        <!--</section>-->
    </div>
</template>

<style scoped lang="less">
::v-deep {
    .test-1 {
        color: pink;
    }
}
</style>
