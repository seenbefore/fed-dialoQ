import { IComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { PcFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export const pcFormDetailsComponentList: Array<IComponentList> = [
    {
        label: '标题',
        type: PcFormDetailsModelTypeEnum.TITLE,
        icon: '',
        isContainer: true,
    },
    {
        label: '行',
        type: PcFormDetailsModelTypeEnum.COLUMN,
        icon: '',
    },
]
