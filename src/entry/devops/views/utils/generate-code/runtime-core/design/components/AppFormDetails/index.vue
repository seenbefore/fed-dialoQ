<script lang="tsx">
import { AppFormDetailsDataStore } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsDataStore'
import { AppFormDetailsModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsModel'
import { appFormDetailsComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/sources/componentList'
import { AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { UseDesign } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/UseDesign'
import ElDescriptionsItem from '@/sharegood-ui/packages/base-form-details/components/el-descriptions-item/index'
import ElDescriptions from '@/sharegood-ui/packages/base-form-details/components/el-descriptions/index'
import { IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'
import { cloneDeep } from 'lodash'
import { Component } from 'vue-property-decorator'

@Component({
    name: GenerateTypeEnum.APP_FORM_DETAILS,
    components: {
        ElDescriptions,
        ElDescriptionsItem,
    },
})
export default class AppFormDetails extends UseDesign<AppFormDetailsDataStore> {
    public get isContainer() {
        return (type: string) => appFormDetailsComponentList.find(it => it.type === type)?.isContainer
    }

    public isDetailComponent(type: AppFormDetailsModelTypeEnum) {
        return [AppFormDetailsModelTypeEnum.DESCRIPTIONS, AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM].includes(type)
    }

    public parseProperties(properties: IFormDetailsColumns & Obj): Obj {
        const parsedProperties: Obj = cloneDeep(properties)
        const { isText, useSlot, wrapInline } = properties
        /* 存储一份之前的label */
        parsedProperties.__label = parsedProperties.label
        if (isText || wrapInline) {
            parsedProperties.label = ''
        }
        if (useSlot) {
            parsedProperties.labelSuffix = ''
        }
        return parsedProperties
    }

    public renderChildren(item: AppFormDetailsModel, properties: Obj) {
        return item.type === AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM && properties.text
            ? properties.text
            : properties.isText
            ? properties.text
            : item.children.map(sub => {
                  return sub.type === AppFormDetailsModelTypeEnum.DESCRIPTIONS ? (
                      <AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM span={sub.properties.subSpan}>{this.renderComponent(sub)}</AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM>
                  ) : (
                      this.renderComponent(sub)
                  )
              })
    }

    public renderOperations(item: AppFormDetailsModel) {
        const properties = item.properties
        return (
            <AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM onClick={this.clickHandler} data-id={item.domId} rowClassName="description__operations-item">
                <div class={['description__operations', `description__operations--${properties.align}`]}>
                    {properties.count.split(',')?.map((m: string) => {
                        return <div class="operations__btn">{m}</div>
                    })}
                </div>
            </AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM>
        )
    }

    public renderStatusTag(item: AppFormDetailsModel) {
        const properties = item.properties
        return (
            <AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM onClick={this.clickHandler} data-id={item.domId} rowClassName="description__status-tag__container">
                {properties.list.map((m: { label: string; color: string; bgColor: string }) => {
                    return (
                        <div class="description__status-tag__item" style={{ color: m.color, backgroundColor: m.bgColor }}>
                            {m.label}
                        </div>
                    )
                })}
            </AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM>
        )
    }

    public getImgSrcList(item: AppFormDetailsModel): Array<string> {
        const srcListStr = item.properties.srcListStr
        if (srcListStr) {
            return srcListStr.split(',')
        }
        return ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']
    }

    public renderImg(item: AppFormDetailsModel) {
        const srcList = this.getImgSrcList(item)
        return (
            <AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM onClick={this.clickHandler} data-id={item.domId} rowClassName="description__image__container" contentClassName="description__image__content">
                <div class="description__image__wrapper">
                    <div class="description__image__label">{item.properties.label}</div>
                    <div class="description__image__body">
                        {srcList.map((src: string) => {
                            return (
                                <div class="image__wrapper">
                                    <img src={src} alt="图片" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM>
        )
    }

    public renderComponent(item: AppFormDetailsModel) {
        if (item.type === AppFormDetailsModelTypeEnum.OPERATIONS) {
            return this.renderOperations(item)
        }
        if (item.type === AppFormDetailsModelTypeEnum.STATUS_TAG) {
            return this.renderStatusTag(item)
        }
        if (item.type === AppFormDetailsModelTypeEnum.IMAGE) {
            return this.renderImg(item)
        }

        const properties = this.parseProperties(item.properties)
        return (
            <item.type
                key={item.id}
                class={this.isContainer(item.type) ? this.INTERACT_CONST_DATA.DROPZONE_SELECTOR : ''}
                data-id={item.domId}
                {...{ attrs: properties }}
                onClick={this.clickHandler}
                onThClick={this.clickHandler}
            >
                {properties.wrapInline ? (
                    <div>
                        <span class="color-999">{properties.__label}</span>
                        {this.renderChildren(item, properties)}
                    </div>
                ) : (
                    this.renderChildren(item, properties)
                )}
            </item.type>
        )
    }

    public render() {
        return (
            <div class="app-form-details__container app-descriptions__container app-wrapper__container">
                <div class="app-form-details__body app-wrapper__body">
                    <div class={['app-form-details__app-content', this.INTERACT_CONST_DATA.DROPZONE_SELECTOR]}>{this.dataStore.data.map(item => this.renderComponent(item))}</div>
                    {this.dataStore.config.formConfig.footerButton ? (
                        <div class="app-form-details__footer">
                            <div class="btn">提交</div>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
@import '/src/sharegood-ui/packages/base-form-details/assets/app-descriptions.less';
@import '~@/entry/h5/styles/reset/app-form-details-reset.less';

.app-form-details {
    &__app-content {
        width: 100%;
        flex: 1;
        overflow: auto;
        padding: 16px;

        .el-descriptions:not(:last-child) {
            margin-bottom: 8px;
        }

        ::v-deep {
            .description__operations-item {
                .el-descriptions-item {
                    padding-bottom: 0;
                }
            }
        }

        .description__operations {
            display: flex;
            width: 100%;

            .operations__btn {
                height: 32px;
                line-height: 32px;
                text-align: center;
                font-size: 14px;
                color: #c7000b;
                font-weight: 400;
                min-width: 80px;
                border: 1px solid rgba(199, 0, 11, 1);
                border-radius: 4px;
            }
        }

        .description__operations--left {
            justify-content: flex-start;

            .operations__btn {
                margin-right: 4px;
            }
        }

        .description__operations--middle {
            justify-content: center;

            .operations__btn {
                margin-right: 4px;
            }
        }

        .description__operations--right {
            justify-content: flex-end;

            .operations__btn {
                margin-left: 4px;
            }
        }

        .color-999 {
            color: #999;
        }

        .description__status-tag {
            &__container {
                display: flex;
                align-items: center;
            }

            &__item {
                border-radius: 2px;
                padding: 2px 6px;

                &:not(:last-child) {
                    margin-right: 4px;
                }
            }
        }

        .description__image {
            &__body {
                display: flex;
                flex-wrap: wrap;

                img {
                    width: 68px;
                    height: 68px;
                    border-radius: 4px;
                }

                .image__wrapper {
                    height: 68px;
                    box-sizing: content-box;
                    padding: 0 8px 4px 0;
                }
            }

            &__label {
                color: #999;
            }
        }

        ::v-deep {
            .description__image {
                &__container {
                    .el-descriptions-row .el-descriptions-item {
                        padding-bottom: 0;
                    }
                }
            }
        }
    }

    &__footer {
        //background-color: #fff;
        padding: 16px;
        display: flex;

        .btn {
            height: 48px;
            line-height: 48px;
            background: #c7000b;
            border-radius: 24px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            font-weight: 600;
            flex: 1;
        }
    }
}
</style>
