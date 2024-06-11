import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { useDomEvent } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/useDomEvent'
import { CLASS_NAME_CONST_DATA, operationNotify } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'
import { cloneDeep } from 'lodash'

export const useCopy = () => {
    const { clear, addEvent } = useDomEvent()

    const app = Application.getInstance()

    const getAttrsContainer = () => document.querySelector(`.${CLASS_NAME_CONST_DATA.ATTR_CONTAINER}`) as HTMLMapElement

    const getCopyData = (activeModel: AbstractBaseModel) => {
        return {
            properties: cloneDeep(activeModel.properties),
            type: activeModel.type,
            children: activeModel.children.map(m => {
                return { type: m.type, properties: cloneDeep(m.properties) }
            }),
        }
    }

    /* 复制数据暂时不做复制到剪切板的操作 */
    let copyData: ReturnType<typeof getCopyData>

    /* 监听复制和粘贴：复制功能会把 properties 也复制进去 */
    addEvent(document.body, 'copy', ({ target }) => {
        if (getAttrsContainer().contains(target as HTMLElement)) {
            return
        }
        const activeModel = app.dataStore.activeModel
        if (!activeModel) {
            return
        }
        copyData = getCopyData(activeModel)
        operationNotify.success(`${activeModel.type} 已复制成功，可以选中需要粘贴的控件将其粘贴进去！`)
    })

    addEvent(document.body, 'paste', ({ target }) => {
        if (getAttrsContainer().contains(target as HTMLElement) || !copyData) {
            return
        }
        const activeModel = app.dataStore.activeModel
        if (activeModel) {
            const validateMessage = app.dataStore.getValidateMessage(copyData.type, activeModel.type)
            if (validateMessage) {
                operationNotify.warning(validateMessage)
                return
            }
        }
        app.dataStore.copyModelIntoActiveModel(cloneDeep(copyData) as any)
        operationNotify.success('已粘贴成功！')
    })

    return {
        clearCopyEvents: clear,
    }
}
