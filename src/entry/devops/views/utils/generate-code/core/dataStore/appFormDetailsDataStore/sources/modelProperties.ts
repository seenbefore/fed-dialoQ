import { AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { getNextLabel } from '@/entry/devops/views/utils/generate-code/core/utils/getNextLabel'
import { assignDefaultProperties, getDefaultPropertiesValue, IPropertiesDefinition, parseProperties } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'
import { IFormDetailsColumns } from '@/sharegood-ui/packages/base-form-details/core/FormDetailsBuilder'

const appFormDetailsModelProperties: Record<AppFormDetailsModelTypeEnum, IPropertiesDefinition> = {
    [AppFormDetailsModelTypeEnum.DESCRIPTIONS]: {
        title: {
            _label: '标题内容',
            _type: 'input',
            _defaultValue: () => getNextLabel('标题'),
        },
        column: {
            _label: '列数',
            _type: 'input',
            _defaultValue: 1,
        },
        extra: {
            _label: '额外内容',
            _type: 'input',
        },
        labelClassName: {
            _label: 'className',
            _type: 'input',
        },
        contentClassName: {
            _label: 'content类名',
            _type: 'input',
        },
        useSlot: {
            _label: '是否使用插槽渲染label',
            _type: 'switch',
            _defaultValue: false,
        },
        subSpan: {
            _label: '作为子项的时候占的列数',
            _type: 'input',
            _defaultValue: 1,
        },
    },
    [AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM]: {
        label: {
            _label: '文本内容',
            _type: 'input',
            _defaultValue: () => getNextLabel('文本内容'),
        },
        isText: {
            _label: '是否为文本',
            _type: 'switch',
            _defaultValue: false,
        },
        text: {
            _label: '文本内容',
            _type: 'textarea',
        },
        props: {
            _label: 'model的key',
            _type: 'input',
        },
        useSlot: {
            _label: '是否使用插槽渲染label',
            _type: 'switch',
            _defaultValue: false,
        },
        wrapInline: {
            _label: '第二行是否从label处开始展示',
            _type: 'switch',
            _defaultValue: false,
        },
        labelClassName: {
            _label: 'label类名',
            _type: 'input',
        },
        contentClassName: {
            _label: 'content类名',
            _type: 'input',
        },
        rowClassName: {
            _label: 'row类名',
            _type: 'input',
        },
        span: {
            _label: '列数',
            _type: 'input',
        },
    },
    [AppFormDetailsModelTypeEnum.OPERATIONS]: {
        count: {
            _label: '按钮文本（逗号分割）',
            _type: 'input',
            _defaultValue: '按钮,按钮2',
        },
        align: {
            _label: '对齐方式',
            _type: 'select',
            _defaultValue: 'right',
            _options: ['left', 'middle', 'right'],
        },
    },
    [AppFormDetailsModelTypeEnum.STATUS_TAG]: {
        list: {
            _label: '状态列表',
            _type: 'status-list',
            _defaultValue: [{ color: '#FA7312', label: '状态', bgColor: '#FFF2E5', className: '' }],
        },
        generateClass: {
            _label: '生成选中的颜色class样式',
            _type: 'switch',
            _defaultValue: true,
        },
    },
    [AppFormDetailsModelTypeEnum.IMAGE]: {
        label: {
            _label: '文本内容',
            _type: 'input',
            _defaultValue: () => getNextLabel('文本内容'),
        },
        props: {
            _label: 'model的key',
            _type: 'input',
        },
        srcListStr: {
            _label: '展示固定图片（多个用逗号分隔）',
            _type: 'textarea',
        },
    },
}

export const getAttrsByAppFromDetailsModelType = (type: AppFormDetailsModelTypeEnum) => {
    return parseProperties(appFormDetailsModelProperties[type])
}

export const assignPropertiesValuesByAppFromDetailsModelType = (type: AppFormDetailsModelTypeEnum, properties: Partial<IFormDetailsColumns>) => {
    return assignDefaultProperties(getDefaultPropertiesValue(appFormDetailsModelProperties[type]), properties)
}
