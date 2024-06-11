import { IAppBaseFormModelProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormModel'
import { AppExampleModel, IAppExampleGenerate } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/AppExampleModel'
import { appExampleModelProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/sources/modelProperties'
import { generateCompile } from '@/entry/devops/views/utils/generate-code/core/generate/generateCompile'
import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { copyText, deleteEmptyValueByDefaultValue, objectToString } from '@/entry/devops/views/utils/generate-code/core/utils'
import { getDefaultPropertiesValue } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'
import { cloneDeep } from 'lodash'

declare interface ISignExampleModuleProperties {
    properties: {
        /* 当事人名称 */
        partyName: string
        /* 公司名称 */
        company: string
        /* 提示文本 */
        placeholder?: string
        /* 确认文本 */
        confirmStr?: string
        /* 是否自动销毁组件 */
        isAutoDestroy?: boolean
    }
}

export class SignExampleModule extends AppExampleModel {
    public get signProperties() {
        return this.properties as ISignExampleModuleProperties
    }

    public getProps(): IAppExampleGenerate {
        const cloneProperties = cloneDeep(this.signProperties)
        const defaultValue = getDefaultPropertiesValue(appExampleModelProperties[this.type as AppExampleTypeEnum]!, key => key !== 'properties.partyName')
        deleteEmptyValueByDefaultValue(cloneProperties, defaultValue)
        return cloneProperties
    }

    public generateToTemplate(): void {
        const template = require('../template/signTemplate.njk').default as string
        const properties = this.getProps()?.properties ?? {},
            keys = Reflect.ownKeys(properties),
            keysLength = keys.length
        let props: any = properties
        if (keysLength === 1) {
            const [key] = keys
            if (key === 'partyName') {
                props = `'${properties.partyName}'`
            }
        }
        const isObj = typeof props === 'object'
        if (isObj) {
            /* company 必填。 */
            if (!Reflect.has(props, 'company')) {
                Reflect.set(props, 'company', this.signProperties.properties.company)
            }
        }
        const data = {
            appConfig: this.app.configurationManage.config,
            data: typeof props === 'object' ? objectToString(props) : props,
        }
        const generateCode = generateCompile(template, data)
        copyText(generateCode)
        console.log(generateCode)
    }
}
