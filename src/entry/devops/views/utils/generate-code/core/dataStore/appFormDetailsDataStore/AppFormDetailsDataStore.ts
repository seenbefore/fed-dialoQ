import { AddModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/AddModelCommand'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { AbstractBaseDataStore, IComponentList, IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AppFormDetailsModel, IAppFormDetailsProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/AppFormDetailsModel'
import { appFormDetailsComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/sources/componentList'
import { getAttrsByAppFromDetailsModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appFormDetailsDataStore/sources/modelProperties'
import { generateCompile } from '@/entry/devops/views/utils/generate-code/core/generate/generateCompile'
import { AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateCodeTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateCodeTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { InjectableDataStore } from '@/entry/devops/views/utils/generate-code/core/sources/provider/DataStoreIoc'
import { copyCodeByType, copyText, objectToString } from '@/entry/devops/views/utils/generate-code/core/utils'
import { IFormDetailsBuilderConfig } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'

export interface IAppFormDetailsDataStoreConfig {
    detailFormConfig: IFormDetailsBuilderConfig
    formConfig: {
        footerButton: boolean
    }
}

@InjectableDataStore(GenerateTypeEnum.APP_FORM_DETAILS)
export class AppFormDetailsDataStore extends AbstractBaseDataStore<IAppFormDetailsDataStoreConfig, IAppFormDetailsProperties, AppFormDetailsModel> {
    public config: IAppFormDetailsDataStoreConfig = {
        /* xxx 在app中暂时无用 */
        detailFormConfig: {
            gutterSpan: 12,
            elRowProps: {
                /* 默认向右 */
                justify: 'start',
            },
            labelSuffix: '：',
            emptyValue: '-',
        },
        formConfig: {
            footerButton: false,
        },
    }

    public createModel(type: AppFormDetailsModelTypeEnum, properties?: Partial<IAppFormDetailsProperties>, parent?: AppFormDetailsModel, notUpdateActive?: boolean): AppFormDetailsModel {
        const newModel = createCommand(AddModelCommand, new AppFormDetailsModel(type, properties, parent))
        !notUpdateActive && createCommand(UpdateActiveModelCommand, newModel)
        return newModel
    }

    public generate(type: GenerateCodeTypeEnum): void {
        const formData = {}
        const formConfig = {}
        const data = {
            columns: this.data.map(item => item.generate(formData, formConfig)),
            config: this.config,
            appConfig: this.app.configurationManage.config,
            formData: objectToString(formData),
            formConfig,
        }
        const template = require('./template/appFormDetailsTemplate.njk').default as string
        const generateCode = generateCompile(template, data)
        console.log(generateCode)
        if (type) {
            copyCodeByType(type, generateCode)
        } else {
            copyText(generateCode)
        }
    }

    public getAttr(type: AppFormDetailsModelTypeEnum): Array<IModelAttr> {
        return getAttrsByAppFromDetailsModelType(type)
    }

    public getComponentList(): Array<IComponentList> {
        return appFormDetailsComponentList
    }

    public getValidateMessage(type: AppFormDetailsModelTypeEnum, containerType: AppFormDetailsModelTypeEnum): UndefinedAble<string> {
        /* 代表将非desc放到了最外层，不支持！ */
        if (type !== AppFormDetailsModelTypeEnum.DESCRIPTIONS) {
            if (!containerType) {
                return '最外层只能放置分组控件！'
            } else if (containerType !== AppFormDetailsModelTypeEnum.DESCRIPTIONS) {
                return `${containerType}不能放其他控件！`
            }
        }
        return
    }

    public copyModelIntoActiveModel(data: AppFormDetailsModel): void {
        const { properties, children, type } = data
        const parent = this.createModel(type as AppFormDetailsModelTypeEnum, properties, this.activeModel, true)
        if (parent && children.length) {
            children.forEach(child => {
                this.createModel(child.type as AppFormDetailsModelTypeEnum, child.properties, parent, true)
            })
        }
    }
}
