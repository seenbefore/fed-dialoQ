import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { useDomEvent } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/useDomEvent'
import { CLASS_NAME_CONST_DATA, operationNotify } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'

export const useUndoRedo = () => {
    const { clear, addEvent } = useDomEvent()

    const getAttrsContainer = () => document.querySelector(`.${CLASS_NAME_CONST_DATA.ATTR_CONTAINER}`) as HTMLMapElement

    const app = Application.getInstance()

    addEvent(document.body, 'keydown', (e: KeyboardEvent) => {
        if (getAttrsContainer().contains(e.target as HTMLElement)) {
            return
        }
        const isCtrlOrCommand = e.ctrlKey || e.metaKey
        if (isCtrlOrCommand && e.code === 'KeyZ') {
            const message = app.commandManage.currentCommand?.label
            if (message) {
                operationNotify.warning(`撤销：${message}`)
            }
            e.preventDefault()
            app.commandManage.undo()
        }

        if (isCtrlOrCommand && e.code === 'KeyY') {
            const message = app.commandManage.currentCommand?.label
            if (message) {
                operationNotify.warning(`恢复：${message}`)
            }
            app.commandManage.redo()
            e.preventDefault()
        }
    })

    return {
        clearUndoRedoEvents: clear,
    }
}
