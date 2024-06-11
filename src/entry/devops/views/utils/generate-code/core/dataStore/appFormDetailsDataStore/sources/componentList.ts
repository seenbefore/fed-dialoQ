import { IComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AppFormDetailsModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export const appFormDetailsComponentList: Array<IComponentList> = [
    {
        label: '分组',
        type: AppFormDetailsModelTypeEnum.DESCRIPTIONS,
        icon: '',
        isContainer: true,
    },
    {
        label: '行',
        type: AppFormDetailsModelTypeEnum.DESCRIPTION_ITEM,
        icon: '',
    },
    {
        label: '操作按钮',
        type: AppFormDetailsModelTypeEnum.OPERATIONS,
        icon: '',
    },
    {
        label: '状态标签',
        type: AppFormDetailsModelTypeEnum.STATUS_TAG,
        icon: '',
    },
    {
        label: '图片',
        type: AppFormDetailsModelTypeEnum.IMAGE,
        icon: '',
    },
]
