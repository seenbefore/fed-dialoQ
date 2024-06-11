import { IComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AppBaseFormModelTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export const appBaseFormComponentList: Array<IComponentList> = [
    {
        label: '分组',
        type: AppBaseFormModelTypeEnum.GROUP,
        icon: '',
        isContainer: true,
    },
    {
        label: '输入框',
        type: AppBaseFormModelTypeEnum.INPUT,
        icon: '',
    },
    {
        label: '文本',
        type: AppBaseFormModelTypeEnum.TEXT,
        icon: '',
    },
    {
        label: '单选',
        type: AppBaseFormModelTypeEnum.RADIO,
        icon: '',
    },
    {
        label: '多选',
        type: AppBaseFormModelTypeEnum.CHECKBOX,
        icon: '',
    },
    {
        label: '级联',
        type: AppBaseFormModelTypeEnum.CASCADER,
        icon: '',
    },
    {
        label: '上传',
        type: AppBaseFormModelTypeEnum.UPLOADER,
        icon: '',
    },
    {
        label: '数字输入',
        type: AppBaseFormModelTypeEnum.NUMBER_INPUT,
        icon: '',
    },
    {
        label: '日期选择',
        type: AppBaseFormModelTypeEnum.DATE_PICKER,
        icon: '',
    },
    {
        label: '下拉选择',
        type: AppBaseFormModelTypeEnum.SELECT_PICKER,
        icon: '',
    },
]
