import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { getDefaultPropertiesValue, IPropertiesDefinition, parseProperties } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'

export const appExampleModelProperties: Partial<Record<AppExampleTypeEnum, IPropertiesDefinition>> = {
    [AppExampleTypeEnum.SIGN_COMPONENT]: {
        properties: {
            /* 当事人名称 */
            partyName: {
                _type: 'input',
                _label: '当事人名称',
                _defaultValue: '当事人',
            },
            /* 公司名称 */
            company: {
                _type: 'input',
                _label: '公司名称',
                _defaultValue: '浙江汇信科技有限公司',
            },
            /* 提示文本 */
            placeholder: {
                _type: 'input',
                _label: '提示文本',
                _defaultValue: '请签名',
            },
            /* 确认文本 */
            confirmStr: {
                _type: 'input',
                _label: '确认文本',
                _defaultValue: '请确认',
            },
            /* 是否自动销毁组件 */
            isAutoDestroy: {
                _type: 'switch',
                _label: '是否自动销毁组件',
                _defaultValue: false,
            },
        },
    },
}

export const getAttrsByAppExampleModelType = (type: AppExampleTypeEnum) => {
    return parseProperties(appExampleModelProperties[type]!)
}

export const assignPropertiesValuesByAppExampleModelType = (type: AppExampleTypeEnum) => {
    return getDefaultPropertiesValue(appExampleModelProperties[type]!)
}
