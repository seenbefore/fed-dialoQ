<template>
    <div class="StepForm">
        <!-- Steps indicator -->
        <div class="steps-wrapper">
            <el-steps :active="currentStep" align-center finish-status="success" ref="elStepsRef">
                <el-step v-for="(step, index) in steps" :key="index" :title="step.title" :status="getStepStatus(index)" :data-title="step.title"></el-step>
            </el-steps>
        </div>

        <!-- Main content -->
        <div class="content">
            <template v-if="isKeepAlive">
                <keep-alive>
                    <component :is="currentComponent" v-bind="currentProps" ref="stepComponent"></component>
                </keep-alive>
            </template>
            <template v-else>
                <component :is="currentComponent" v-bind="currentProps" ref="stepComponent"></component>
            </template>
        </div>

        <!-- Fixed bottom action bar -->
        <div class="fixed-bottom">
            <render-cell :render="currentConfig.render" :row="currentConfig" :handlers="handlers"></render-cell>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'

interface StepButton {
    text?: string
    type?: 'primary' | 'default' | 'success' | 'warning' | 'danger'
    action: 'prev' | 'next' | 'cancel' | 'save' | string
    validate?: boolean
    handler?: (component: any) => Promise<any>
    /** 自定义操作渲染函数 */
    render?: (
        loading: boolean,
        handlers: {
            prev: () => void
            next: () => void
            submit: () => void
        },
    ) => JSX.Element
}

/** 步骤配置接口 */
export interface StepConfig {
    /** 步骤标题 */
    title: string
    /** 步骤对应的组件 */
    component: any
    /** 传递给组件的属性 */
    props?: Record<string, any>
    /** 步骤的其他操作 */
    actions?: any
    /** 自定义渲染函数 */
    render?: (
        h: any,
        ctx: {
            row: any
            handlers: {
                /** 上一步 */
                prev: any
                /** 下一步 */
                next: any
                /** 提交 */
                submit: any
                /** 获取当前组件 */
                getCurrentComponent: any
                loading: boolean
            }
        },
    ) => JSX.Element
}

@Component({
    name: 'StepForm',
    components: {
        RenderCell: {
            functional: true,
            props: {
                render: Function,
                row: Object,
                handlers: Object,
            },
            render: (h: any, ctx: any) => {
                return ctx.props.render(h, { row: ctx.props.row, handlers: ctx.props.handlers })
            },
        },
    },
})
export default class StepForm extends Vue {
    @Prop({ type: Boolean, default: true })
    isKeepAlive!: boolean
    @Prop({ type: Array, required: true })
    steps!: StepConfig[]

    @Prop({ type: Number, default: 0 })
    value!: number

    @Ref('stepComponent')
    stepComponent!: any

    currentStep = 0
    loading = false

    created() {
        this.currentStep = this.value
    }
    mounted() {
        const elStepsRef = this.$refs.elStepsRef as any
        if (elStepsRef.$children) {
            for (const elStepsItem of elStepsRef.$children) {
                elStepsItem.$el.firstChild.dataset.title = elStepsItem.$el.dataset.title
            }
        }
    }

    @Watch('value')
    onValueChange(val: number) {
        this.currentStep = val
    }

    get currentConfig(): StepConfig {
        return this.steps[this.currentStep]
    }

    get currentComponent() {
        return this.currentConfig.component
    }

    get currentProps() {
        return this.currentConfig.props || {}
    }

    prev() {
        if (this.currentStep > 0) {
            this.currentStep--
            this.$emit('input', this.currentStep)
        }
    }

    next() {
        this.handleButtonClick({ action: 'next', validate: true })
    }

    submit() {
        this.handleButtonClick({ action: 'save', validate: true })
    }

    handlers = {
        loading: false,
        prev: () => this.prev(),
        next: () => this.next(),
        submit: () => this.submit(),
        getCurrentComponent: () => this.getCurrentComponent(),
    }

    getStepStatus(index: number) {
        // if (index < this.currentStep) return 'success'
        // if (index === this.currentStep) return 'process'
        // return 'wait'
    }
    getCurrentComponent() {
        return this.stepComponent
    }

    async handleButtonClick(button: StepButton) {
        try {
            this.loading = true

            // 如果需要验证表单
            if (button.validate && this.stepComponent?.validate) {
                await this.stepComponent.validate()
            }

            // 如果有自定义处理函数
            if (button.handler) {
                await button.handler(this.stepComponent)
            }

            // 根据action处理
            switch (button.action) {
                case 'prev':
                    if (this.currentStep > 0) {
                        this.currentStep--
                        this.$emit('input', this.currentStep)
                    }
                    break
                case 'next':
                    if (this.currentStep < this.steps.length - 1) {
                        this.currentStep++
                        this.$emit('input', this.currentStep)
                    }
                    break
                case 'cancel':
                    this.$emit('cancel')
                    break
                case 'save':
                    this.$emit('save', this.stepComponent?.getFormData?.())
                    break
                default:
                    this.$emit(button.action, this.stepComponent)
            }
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    }

    renderButton(button: StepButton, index: number) {
        // 如果提供了render函数，使用自定义渲染
        if (button.render) {
            // 提供导航和提交函数给render函数
            const handlers = {
                prev: () => this.handleButtonClick({ action: 'prev' }),
                next: () => this.handleButtonClick({ action: 'next', validate: true }),
                submit: () => this.handleButtonClick({ action: 'save', validate: true }),
            }
            return button.render(this.loading, handlers)
        }

        // 默认按钮渲染
        return (
            <el-button key={index} type={button.type || 'default'} onClick={() => this.handleButtonClick(button)} loading={this.loading && button.action === 'next'}>
                {button.text}
            </el-button>
        )
    }
}
</script>

<style lang="less" scoped>
.StepForm {
    height: 100%;
    display: flex;
    flex-direction: column;

    .steps-wrapper {
        padding: 20px;
        background: #fff;
        border-bottom: 1px solid #eee;
    }

    .content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .fixed-bottom {
        height: 50px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #ddd;

        .el-button + .el-button {
            margin-left: 10px;
        }
    }

    ::v-deep {
        .el-step {
            font-weight: 600;
            .el-step__head {
                &:after {
                    position: relative;
                    margin-left: 2px;
                    background: #fff;
                    content: attr(data-title);
                }
                &.is-process {
                    color: #333 !important;
                    // font-weight: 600;
                }

                &.is-success {
                    color: #333;
                }
                .el-step__icon.is-text {
                    border-width: 1px;
                }
            }
            .el-step__line {
                top: 12.5px;
                left: 60%;
                width: 80%;
                height: 2px;
            }
            .el-step__main {
                display: none;
            }
        }
        .el-step__head.is-process {
            .el-step__icon.is-text {
                border: none;
                background: var(--color-primary);
                color: #ffffff;
            }
        }
        .el-step__title {
            color: #666;
            font-weight: normal;
            font-size: 14px;
        }
        .el-step__title.is-process {
            color: #333 !important;
            font-weight: 600 !important;
        }
        .el-step__line {
            background-color: #ddd;
        }
        .el-step__head.is-wait {
            .el-step__icon.is-text {
                border: none;
                background: #f0f0f0;
                color: var(--ic-text-second);
            }
            &::after {
                color: var(--ic-text-second);
                font-weight: 400;
            }
        }
        .el-step__head.is-success {
            border-color: var(--color-primary) !important;
            .el-step__icon.is-text {
                border-color: var(--color-primary);
                background: #fff;
                color: var(--color-primary);
            }
            .el-step__line {
                background-color: var(--color-primary) !important;
            }
            &::after {
                display: inline-block;
                transform: translateY(-6px);
            }
        }
        .el-step__icon {
            width: 28px;
            height: 28px;
            .el-step__icon-inner.is-status {
                &::before {
                    content: ' ';
                }
                width: 100%;
                height: 100%;
                background: url('~@/components/step-form/assets/icon-circle-check.svg') center no-repeat;
                transform: none;
                // display: none;
            }
        }
        .el-step__description {
            color: #333333;
            font-weight: normal;
            font-size: 14px;
        }
    }
}
</style>
