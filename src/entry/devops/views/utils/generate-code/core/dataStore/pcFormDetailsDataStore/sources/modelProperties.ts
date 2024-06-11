import { IPcFormDetailsProperties } from '@/entry/devops/views/utils/generate-code/core/dataStore/pcFormDetailsDataStore/PcFormDetailsModel'
import { PcFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'
import { createUUID } from '@/entry/devops/views/utils/generate-code/core/utils'
import { getNextLabel } from '@/entry/devops/views/utils/generate-code/core/utils/getNextLabel'
import { assignDefaultProperties, getDefaultPropertiesValue, IPropertiesDefinition, parseProperties } from '@/entry/devops/views/utils/generate-code/core/utils/parseProperties'

const pcFormDetailsModelProperties: Record<PcFormDetailsModelTypeEnum, IPropertiesDefinition> = {
    [PcFormDetailsModelTypeEnum.TITLE]: {
        title: {
            _label: '标题内容',
            _type: 'input',
            _defaultValue: getNextLabel('标题'),
        },
    },
    [PcFormDetailsModelTypeEnum.COLUMN]: {
        title: {
            _label: '标题内容',
            _type: 'input',
        },
        label: {
            _label: 'label',
            _type: 'input',
            _defaultValue: () => getNextLabel('列名称'),
        },
        prop: {
            _label: 'prop',
            _type: 'input',
            _defaultValue: () => createUUID(),
        },
        span: {
            _label: '占几格',
            _type: 'input',
            _defaultValue: 12,
        },
    },
}

export const getAttrsByPcFromDetailsModelType = (type: PcFormDetailsModelTypeEnum) => {
    return parseProperties(pcFormDetailsModelProperties[type])
}

export const assignPropertiesValuesByPcFromDetailsModelType = (type: PcFormDetailsModelTypeEnum, properties: Partial<IPcFormDetailsProperties>) => {
    return assignDefaultProperties(getDefaultPropertiesValue(pcFormDetailsModelProperties[type]), properties)
}
