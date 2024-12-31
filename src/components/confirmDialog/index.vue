<script lang="tsx">
import { ConfirmResultEnum, IUseConfirm } from '@/components/confirmDialog/useConfirm'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'ConfirmDialog',
    components: {
        RenderCell: {
            functional: true,
            props: {
                render: Function,
                row: Object,
            },
            render: (h: any, ctx: any) => {
                return ctx.props.render(h, { row: ctx.props.row })
            },
        },
    },
})
export default class ConfirmDialog extends Vue {
    @Prop({ type: Object })
    public options!: IUseConfirm

    private noRemind = false

    public close(selfClose?: boolean): void {
        if (!selfClose) {
            const { beforeClose } = this.options
            if (beforeClose && typeof beforeClose === 'function') {
                beforeClose(() => {
                    this.$emit(ConfirmResultEnum.CANCEL)
                })
                return
            }
        }
        this.$emit(ConfirmResultEnum.CANCEL)
    }

    public confirm(): void {
        this.$emit(ConfirmResultEnum.CONFIRM)
    }

    private handleNoRemindChange(checked: boolean): void {
        this.noRemind = checked
        if (this.options.onNoRemindChange) {
            this.options.onNoRemindChange(checked)
        }
    }

    public getTitle(title: string | JSX.Element, icon?: string, className?: string, style?: string): JSX.Element | string {
        /* XXX 不是以这些资源为结尾的都处理为iconFont */
        const isIconFont = !/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(icon ?? '')
        return (
            <div class="confirm-dialog__icon-title">
                {icon ? isIconFont ? <i class={[icon, className]} style={style}></i> : <img class={className} src={icon} alt="icon" style={style} /> : null}
                <span>{title}</span>
            </div>
        )
    }

    public render() {
        const {
            message,
            footerCancelText,
            footerConfirmText,
            beforeClose,
            title,
            titleIcon,
            titleIconClass,
            titleIconStyle,
            showNoRemind,
            noRemindText = '不再提醒',
            render,
            ...bindOptions
        } = this.options

        return (
            <el-dialog
                {...{
                    attrs: {
                        ...bindOptions,
                        visible: true,
                        center: 'center',
                    },
                }}
                append-to-body
                class="confirm-dialog__dialog"
                onClose={() => this.close(true)}
                beforeClose={beforeClose}
                scopedSlots={{
                    title: () => this.getTitle(title!, titleIcon, titleIconClass, titleIconStyle),
                }}
            >
                <div class="confirm-dialog__body">{typeof message === 'function' ? <render-cell render={message} row={message} /> : message}</div>
                <div class="confirm-dialog__footer">
                    <el-button onClick={this.confirm} type="primary">
                        {footerConfirmText}
                    </el-button>
                    <el-button onClick={() => this.close(false)}>{footerCancelText}</el-button>
                    {showNoRemind && (
                        <div class="confirm-dialog__no-remind">
                            <el-checkbox value={this.noRemind} onInput={this.handleNoRemindChange}>
                                {noRemindText}
                            </el-checkbox>
                        </div>
                    )}
                </div>
            </el-dialog>
        )
    }
}
</script>

<style lang="less">
.confirm-dialog {
    &__dialog {
        display: flex;
        align-items: center;
        justify-content: center;

        & > .el-dialog--center {
            & > .el-dialog__header {
                height: max-content;
                padding: 34px 0 0 0;
                border: none;

                .el-dialog__title {
                    flex: 1;
                }
            }

            & > .el-dialog__body {
                padding: 12px 20px 20px 20px;
            }

            .confirm-dialog__icon-title {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                line-height: 22px;

                & > span {
                    margin-left: 8px;
                }

                & > i {
                    font-size: 20px;
                }
            }
        }

        .el-dialog {
            margin: 0 !important;
        }
    }

    &__body {
        text-align: center;
        margin-bottom: 24px;
    }

    &__footer {
        text-align: center;
        margin-top: 8px;

        .el-button {
            width: 88px;
        }

        .el-button--default {
            color: #158dff;
            border-color: #158dff;

            &:hover,
            &:focus,
            &:active {
                background-color: #fff;
            }
        }
    }

    &__no-remind {
        margin-top: 16px;
        text-align: center;

        .el-checkbox {
            color: #606266;
            font-size: 14px;
        }
    }
}
</style>
