import { SignExampleModule } from '@/entry/devops/views/utils/generate-code/core/dataStore/appExampleDatastore/exampleModule/SignExampleModule'
import { AppExampleTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/FormDetailsTypeEnum'

export const getAppExampleModel = (type: AppExampleTypeEnum) => {
    switch (type) {
        case AppExampleTypeEnum.SIGN_COMPONENT:
            return SignExampleModule
        default:
            throw new Error(`${type} is not defined`)
    }
}
