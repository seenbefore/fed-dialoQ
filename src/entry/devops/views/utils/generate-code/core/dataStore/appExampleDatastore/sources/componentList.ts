import { IComponentList } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export const appExampleComponentList: Array<IComponentList> = [
    {
        label: '签名页面',
        type: AppExampleTypeEnum.SIGN_COMPONENT,
        icon: '',
    },
]
