import { IAppBaseFormModelProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/appBaseFormDatastore/AppBaseFormModel'
import { AppBaseFormModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'
import { getNextLabel } from '@/entry/devops/views/utils/generate-code/core/utils/getNextLabel'
import { assignDefaultProperties, getDefaultPropertiesValue, IPropertiesDefinition, parseProperties } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'

const globalProperties: IPropertiesDefinition = {
    label: {
        _label: '标签名',
        _type: 'input',
        _defaultValue: () => getNextLabel('label内容'),
    },
    name: {
        _label: 'name',
        _type: 'input',
        _defaultValue: () => `${createUUID()}`,
    },
    required: {
        _label: '是否必填',
        _type: 'switch',
    },
    defaultValue: {
        _label: '默认值',
        _type: 'input',
    },
    hiddenLabel: {
        _label: '是否隐藏label',
        _type: 'switch',
    },
    verticalAlign: {
        _label: '垂直对齐方式',
        _type: 'select',
        _defaultValue: 'left',
        _options: ['top', 'left'],
    },
}

const globalProps = {
    class: {
        _label: '样式类名',
        _type: 'input',
    },
}

const globalOptions = {
    options: {
        _label: '选项',
        _type: 'textarea',
        _defaultValue: `[{ value: '男', label: '男' }, {  value: '女', label: '女' }]`,
    },
}

const globalPlaceholder = {
    placeholder: {
        _label: '占位提示',
        _type: 'input',
        _defaultValue: '请输入',
    },
}

export const appBaseFormModelProperties: Partial<Record<AppBaseFormModelTypeEnum, IPropertiesDefinition>> = {
    [AppBaseFormModelTypeEnum.GROUP]: {
        groupName: {
            _label: '分组名',
            _type: 'input',
            _defaultValue: () => getNextLabel('分组'),
        },
        groupId: {
            _label: '分组ID',
            _type: 'input',
            _defaultValue: () => createUUID(),
        },
    },
    [AppBaseFormModelTypeEnum.INPUT]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalPlaceholder,
            showWordLimit: {
                _label: '是否显示字数统计',
                _type: 'switch',
                _defaultValue: false,
            },
            maxlength: {
                _label: '最大长度',
                _type: 'input',
            },
        },
    },
    [AppBaseFormModelTypeEnum.TEXT]: {
        ...globalProperties,
        props: {
            ...globalProps,
            text: {
                _label: '文本内容',
                _type: 'textarea',
                _defaultValue: () => getNextLabel('文本内容'),
            },
            rows: {
                _label: '行数',
                _type: 'input',
                _defaultValue: 1,
            },
        },
    },
    [AppBaseFormModelTypeEnum.RADIO]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalOptions,
        },
    },
    [AppBaseFormModelTypeEnum.CHECKBOX]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalOptions,
            isGroup: {
                _label: '是否分组',
                _type: 'switch',
                _defaultValue: true,
            },
        },
    },
    [AppBaseFormModelTypeEnum.CASCADER]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalOptions,
        },
    },
    [AppBaseFormModelTypeEnum.UPLOADER]: {
        ...globalProperties,
        props: {
            ...globalProps,
            isFullRow: {
                _label: '标题是否自定义独占一行',
                _type: 'switch',
                _defaultValue: true,
            },
            accept: {
                _label: '允许上传的文件类型',
                _type: 'input',
                _defaultValue: 'png/jpg/jpeg',
            },
            maxCount: {
                _label: '最大上传数量',
                _type: 'input',
                _defaultValue: 5,
            },
            maxSize: {
                _label: '最大上传大小',
                _type: 'input',
                _defaultValue: 5,
            },
        },
    },
    [AppBaseFormModelTypeEnum.NUMBER_INPUT]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalPlaceholder,
            type: {
                _label: '类型',
                _type: 'select',
                _defaultValue: 'digit',
                _options: [
                    /* number-数字; digit-整数 */
                    { label: '数字', value: 'number' },
                    { label: '整数', value: 'digit' },
                ],
            },
        },
    },
    [AppBaseFormModelTypeEnum.DATE_PICKER]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalPlaceholder,
            type: {
                _label: '类型',
                _type: 'select',
                _defaultValue: 'date',
                _options: [
                    /* 'date' | 'time' | 'year-month' | 'month-day' | 'datehour' */
                    { label: '日期', value: 'date' },
                    { label: '时间', value: 'time' },
                    { label: '年月', value: 'year-month' },
                    { label: '月日', value: 'month-day' },
                    { label: '日期时间', value: 'datehour' },
                ],
            },
            valueFormat: {
                _label: '格式化值',
                _type: 'input',
                _defaultValue: 'yyyy-M-d HH:mm',
            },
        },
    },
    [AppBaseFormModelTypeEnum.SELECT_PICKER]: {
        ...globalProperties,
        props: {
            ...globalProps,
            ...globalPlaceholder,
            ...globalOptions,
        },
    },
}

export const getAttrsByAppBaseFormModelType = (type: AppBaseFormModelTypeEnum) => {
    return parseProperties(appBaseFormModelProperties[type]!)
}

export const assignPropertiesValuesByAppBaseFormModelType = (type: AppBaseFormModelTypeEnum, properties: Partial<IAppBaseFormModelProperties>) => {
    return Object.assign(assignDefaultProperties(getDefaultPropertiesValue(appBaseFormModelProperties[type]!), properties), {
        tag: type,
        randomKey: createUUID(),
    })
}
