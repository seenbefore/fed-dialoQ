<script lang="tsx">
import { isEmpty, isFunction } from 'lodash'
import { CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ElDescriptions from './components/el-descriptions'
import ElDescriptionsItem from './components/el-descriptions-item'
import { IStyleKey } from './core'
import { FormDetailsBuilder, IFormDetailsColumns } from './core/FormDetailsBuilder'
import { RenderSlot } from './core/utils'

@Component({
    name: 'SgBaseFormDetails',
    components: {
        RenderSlot,
        ElDescriptions,
        ElDescriptionsItem,
    },
})
export default class BaseFormDetails extends Vue {
    @Prop({ type: Object })
    public fb!: FormDetailsBuilder

    /**
     * 在拖拽的时候需要放置的class
     */
    @Prop({ type: String, default: '' })
    public draggableClass!: string

    private runCallBack<T = any>(value?: T | ((...args: any) => T), ...args: any[]): T {
        if (!value) return value as T
        return isFunction(value) ? value(...args) : value
    }

    public get getValue() {
        return (column: IFormDetailsColumns) => (column ? column.render ?? (column.prop ? this.fb.getValue(column.prop) : '') : '')
    }

    public get getClassAndStyle() {
        return (obj?: IStyleKey): Required<IStyleKey> => {
            return {
                class: this.runCallBack(obj?.class ?? ''),
                style: this.runCallBack(obj?.style ?? ''),
            }
        }
    }

    public get getLabel() {
        return (column: IFormDetailsColumns) => {
            return column.label ?? this.runCallBack(column.elDescriptionItemProps)?.label
        }
    }

    public get elRowProps() {
        return this.runCallBack(this.fb.config.elRowProps)
    }

    public get elColProps() {
        return (column: IFormDetailsColumns) => this.runCallBack(column.elColProps)
    }

    public get elDescriptionProps() {
        return (column: IFormDetailsColumns) => this.runCallBack(column.elDescriptionProps)
    }

    public get elDescriptionItemProps() {
        return (column: IFormDetailsColumns) => this.runCallBack(column.elDescriptionItemProps)
    }

    public get getShowValue() {
        return (column: IFormDetailsColumns, value: any) => {
            if (typeof value === 'number') {
                return value
            }
            return isEmpty(value) ? this.runCallBack(column.emptyValue) ?? this.runCallBack(this.fb.config.emptyValue) : value
        }
    }

    /**
     * 在column和config中都存在某个值的时候，先获取column的值，如果不存在，则使用config的值。
     */
    public get configAndColumnCompareValue() {
        return (column: IFormDetailsColumns, key: keyof IFormDetailsColumns) => {
            const value = Reflect.get(column, key)
            const configValue = Reflect.get(this.fb.config, key)
            if (typeof value === 'number') {
                return value
            }
            return isEmpty(value) ? this.runCallBack(configValue) : this.runCallBack(value)
        }
    }

    public created() {
        this.fb.initFormRef(this)
    }

    public render(h: CreateElement) {
        return (
            <div class="base-form-details__container pc-description__container" ref="formRef">
                {/* 不直接使用 v-bind 绑定，在部分项目中可能会报错 Failed to resolve directive: bind */}
                <el-row {...{ attrs: this.elRowProps }} class={this.getClassAndStyle(this.elRowProps).class} style={this.getClassAndStyle(this.elRowProps).style}>
                    {this.fb.showColumns.map((column: IFormDetailsColumns) => {
                        return (
                            <el-col
                                key={column.id ?? column.prop}
                                /* 不直接使用 v-bind 绑定，在部分项目中可能会报错 Failed to resolve directive: bind */
                                {...{ attrs: this.elColProps(column) }}
                                span={this.runCallBack(column.span) ?? this.elColProps(column)?.span ?? this.fb.config.gutterSpan ?? 24}
                                class={this.getClassAndStyle(this.elColProps(column)).class + this.draggableClass + ` ${column.hasAutoMargin ? 'col__has-auto-margin' : ''}`}
                                style={this.getClassAndStyle(this.elColProps(column)).style}
                                id={column.id}
                                data-id={column.dataId}
                            >
                                {/* 给每一个都加上一个 descriptions */}
                                <el-descriptions
                                    /* 不直接使用 v-bind 绑定，在部分项目中可能会报错 Failed to resolve directive: bind */
                                    {...{ attrs: this.elDescriptionProps(column) }}
                                    label-suffix={column.labelSuffix ?? this.fb.config.labelSuffix}
                                    title={this.runCallBack(column.title) ?? this.elDescriptionProps(column)?.title}
                                    label-class-name={this.runCallBack(column.labelClassName) ?? this.elDescriptionProps(column)?.labelClassName}
                                    label-style={this.runCallBack(column.labelStyle) ?? this.elDescriptionProps(column)?.labelStyle}
                                    content-class-name={this.runCallBack(column.contentClassName) ?? this.elDescriptionProps(column)?.contentClassName}
                                    content-style={this.runCallBack(column.contentStyle) ?? this.elDescriptionProps(column)?.contentStyle}
                                    onClick={(...args: any) => {
                                        column.on?.click?.(...args)
                                        this.$emit('descriptionClick', column, ...args)
                                    }}
                                    label-width={this.configAndColumnCompareValue(column, 'labelWidth')}
                                    onThClick={(...args: any) => {
                                        this.$emit('descriptionThClick', column, ...args)
                                    }}
                                >
                                    {isEmpty(column) || (!column.render && !column.prop && !column.label && isEmpty(column.elDescriptionItemProps)) ? null : (
                                        /* 不直接使用 v-bind 绑定，在部分项目中可能会报错 Failed to resolve directive: bind */
                                        <el-descriptions-item {...{ attrs: this.elDescriptionItemProps(column) }} label={this.getLabel(column)}>
                                            {this.getShowValue(
                                                column,
                                                typeof column.render === 'function' ? column?.render(h) : column ? column.render ?? (column.prop ? this.fb.getValue(column.prop) : '') : '',
                                            )}
                                        </el-descriptions-item>
                                    )}
                                </el-descriptions>
                            </el-col>
                        )
                    })}
                </el-row>
            </div>
        )
    }
}
</script>

<style scoped lang="less">
@import './assets/pc-descriptions.less';

.base-form-details {
    &__form-item {
        margin-bottom: 8px;

        ::v-deep {
            .el-form-item__label {
                line-height: 20px;
                font-size: 14px;
                color: #999;
            }

            .el-form-item__content {
                line-height: 20px;
                font-size: 14px;
                color: #333;
            }
        }
    }

    &__custom-form-item {
        margin-bottom: 8px;
    }
}
</style>
