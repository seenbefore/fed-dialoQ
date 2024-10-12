<script lang="tsx">
import { FunctionalDialogEventEnum, IUseFunctionalDialog } from '@/components/functionalDialog/useFunctionalDialog'
import VueInstance from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { CombinedVueInstance } from 'vue/types/vue'

@Component({
    name: 'FunctionalDialog',
})
export default class FunctionalDialog extends Vue {
    @Prop({ type: Object })
    public options!: Omit<Partial<IUseFunctionalDialog>, 'children'> & { __childrenComponent__: VueClass<any> }

    @Ref('dialogContentRef')
    public dialogContentRef!: any

    public childrenInstance: UndefinedAble<CombinedVueInstance<any, any, any, any, any>> = void 0

    public get parseOptions() {
        const { __childrenComponent__, showConfirmBtn, confirmBtnText, showCancelBtn, cancelBtnText, options, title, ...dialogOptions } = this.options
        return {
            __childrenComponent__,
            showConfirmBtn,
            confirmBtnText,
            showCancelBtn,
            cancelBtnText,
            options,
            title,
            dialogOptions,
        }
    }

    public closeEmitter(...args: any): void {
        this.$emit(FunctionalDialogEventEnum.CANCEL, args)
        this.destroyChildren()
    }

    public close(...args: any) {
        const { beforeClose } = this.options
        if (beforeClose) {
            beforeClose(() => this.closeEmitter(...args), FunctionalDialogEventEnum.CANCEL, ...args)
            return
        }
        this.closeEmitter(...args)
    }

    public confirmEmitter(...args: any): void {
        this.$emit(FunctionalDialogEventEnum.CONFIRM, args)
        this.destroyChildren()
    }

    public confirm(...args: any) {
        console.log(args)
        const { beforeClose } = this.options
        if (beforeClose) {
            beforeClose(() => this.confirmEmitter(...args), FunctionalDialogEventEnum.CONFIRM, ...args)
            return
        }
        this.confirmEmitter(...args)
    }

    public async mounted() {
        await this.$nextTick()
        const { options, __childrenComponent__ } = this.parseOptions
        if (__childrenComponent__) {
            const ChildrenInstance = VueInstance.extend(__childrenComponent__)

            this.childrenInstance = new ChildrenInstance({
                propsData: options,
                router: this.$router,
                store: this.$store,
            })
            this.childrenInstance.$mount(this.dialogContentRef)
            this.childrenInstance.$on(FunctionalDialogEventEnum.CANCEL, (...args: any) => this.close(args))
            this.childrenInstance.$on(FunctionalDialogEventEnum.CONFIRM, (...args: any) => this.confirm(args))
        }
    }

    public render() {
        const { dialogOptions, title, showConfirmBtn, confirmBtnText, showCancelBtn, cancelBtnText } = this.parseOptions

        const cancelBtn = (
            <el-button class="functional-dialog__footer__btn-cancel" type="default" onClick={() => this.close()}>
                {cancelBtnText}
            </el-button>
        )

        const confirmBtn = (
            <el-button class="functional-dialog__footer__btn-confirm" type="primary" onClick={() => this.confirm()}>
                {confirmBtnText}
            </el-button>
        )

        return (
            <el-dialog
                {...{
                    attrs: {
                        visible: true,
                        ...(dialogOptions || {}),
                    },
                }}
                append-to-body
                class="functional-dialog__dialog"
                onClose={() => this.closeEmitter()}
                scopedSlots={{
                    title: () => <div class="functional-dialog__title">{title}</div>,
                }}
            >
                {showCancelBtn || showConfirmBtn ? (
                    <template slot="footer">
                        {showConfirmBtn ? confirmBtn : null}
                        {showCancelBtn ? cancelBtn : null}
                    </template>
                ) : null}
                <div ref="dialogContentRef" class="functional-dialog__body"></div>
            </el-dialog>
        )
    }

    public destroyChildren() {
        if (this.childrenInstance) {
            this.childrenInstance.$off(FunctionalDialogEventEnum.CANCEL)
            this.childrenInstance.$off(FunctionalDialogEventEnum.CONFIRM)
            this.childrenInstance.$destroy()
            this.childrenInstance = void 0
        }
    }

    public beforeDestroy() {
        this.destroyChildren()
    }
}
</script>

<style scoped lang="less">
.functional-dialog {
    &__dialog {
        & > .el-dialog--center {
            & > .el-dialog__header {
                .functional-dialog__title {
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }

    &__title {
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
    }

    &__content {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }

    &__body {
        flex: 1;
        overflow: auto;
    }

    &__footer {
    }
}
</style>
