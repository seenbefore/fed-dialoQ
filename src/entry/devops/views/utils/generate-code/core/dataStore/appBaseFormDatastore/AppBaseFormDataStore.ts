import { AddModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/AddModelCommand'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { AbstractBaseDataStore, IComponentList, IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AppBaseFormModel, IAppBaseFormModelProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormModel'
import { appBaseFormComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/sources/componentList'
import { getAttrsByAppBaseFormModelType } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/sources/modelProperties'
import { generateCompile } from '@/entry/devops/views/utils/generate-code/core/generate/generateCompile'
import { AppBaseFormModelTypeEnum, AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { GenerateCodeTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateCodeTypeEnum'
import { GenerateTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateTypeEnum'
import { InjectableDataStore } from '@/entry/devops/views/utils/generate-code/core/sources/provider/DataStoreIoc'
import { copyCodeByType, copyText, objectToString } from '@/entry/devops/views/utils/generate-code/core/utils'

export interface IAppBaseFormDataStoreConfig {
    /* 底部按钮显隐 */
    showFootBtns?: boolean
    /* 是否禁用 */
    disabled?: boolean
    /* inputAlign */
    inputAlign?: 'left' | 'right' | 'center'
}

@InjectableDataStore(GenerateTypeEnum.APP_BASE_FORM)
export class AppBaseFormDataStore extends AbstractBaseDataStore<IAppBaseFormDataStoreConfig, IAppBaseFormModelProperties, AppBaseFormModel> {
    public config: IAppBaseFormDataStoreConfig = {
        showFootBtns: true,
        disabled: false,
        inputAlign: 'left',
    }

    public createModel(type: AppBaseFormModelTypeEnum, properties?: Partial<IAppBaseFormModelProperties>, parent?: AppBaseFormModel, notUpdateActive?: boolean): AppBaseFormModel {
        const newModel = createCommand(AddModelCommand, new AppBaseFormModel(type, properties, parent))
        !notUpdateActive && createCommand(UpdateActiveModelCommand, newModel)
        return newModel
    }

    public getBaseFormFields(): Array<IAppBaseFormModelProperties> {
        return this.data.map(m => m.generate({}))
    }

    public generate(type: GenerateCodeTypeEnum): void {
        const formData = {}
        const data = {
            data: objectToString(this.data.map(item => item.generate(formData, true))),
            config: this.config,
            appConfig: this.app.configurationManage.config,
            formData: objectToString(formData),
        }
        const template = require('./template/appBaseFormTemplate.njk').default as string
        const generateCode = generateCompile(template, data)
        console.log(generateCode)
        if (type) {
            copyCodeByType(type, generateCode)
        } else {
            copyText(generateCode)
        }
    }

    public getAttr(type: AppBaseFormModelTypeEnum): Array<IModelAttr> {
        return getAttrsByAppBaseFormModelType(type)
    }

    public getComponentList(): Array<IComponentList> {
        return appBaseFormComponentList
    }

    public getValidateMessage(type: AppBaseFormModelTypeEnum, containerType: AppBaseFormModelTypeEnum): UndefinedAble<string> {
        if (type === AppBaseFormModelTypeEnum.GROUP) {
            if (containerType) {
                return '分组控件固定只能放在最外层!'
            }
        }
        return
    }

    public copyModelIntoActiveModel(data: AppBaseFormModel): void {
        const { properties, children, type } = data
        const parent = this.createModel(type as AppBaseFormModelTypeEnum, properties, this.activeModel, true)
        if (parent && children.length) {
            children.forEach(child => {
                this.createModel(child.type as AppBaseFormModelTypeEnum, child.properties, parent, true)
            })
        }
    }
}
