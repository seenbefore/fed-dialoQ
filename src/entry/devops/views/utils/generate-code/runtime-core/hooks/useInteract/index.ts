import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { CLASS_NAME_CONST_DATA } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'
import { Interactable } from '@interactjs/core/Interactable'
import interact from 'interactjs'
import { Message } from 'element-ui'

interface IInteractEvent extends MouseEvent {
    currentTarget: HTMLElement
    relatedTarget: HTMLElement
    target: HTMLElement
    client: {
        x: number
        y: number
    }
}

const getInteract = (selector: string): Interactable => {
    /* 为了解决重复注册带来的问题 */
    interact(selector).unset()
    return interact(selector)
}

let placeholder: UndefinedAble<HTMLDivElement> = void 0

/**
 * 初始化拖拽
 */
export const initDraggable = (): void => {
    getInteract(`.${CLASS_NAME_CONST_DATA.DRAGGABLE_SELECTOR}`).draggable({
        /* 拖动的时候展示 move 光标 */
        cursorChecker: () => 'move',
        onstart: (event: IInteractEvent): void => {
            const target = event.currentTarget
            placeholder = target.cloneNode(true) as HTMLDivElement
            target.parentElement?.insertBefore(placeholder, target)
            /* 加上正在移动的样式 */
            target.classList.add(CLASS_NAME_CONST_DATA.DRAGGABLE_MOVING)
        },
        onmove: (event: IInteractEvent): void => {
            const target = event.target
            const moveSpace = target.offsetWidth / 2
            const { x, y } = event.client
            /* XXX 可使用 transform 优化 */
            Object.assign(target.style, { left: `${x - moveSpace}px`, top: `${y - moveSpace}px` } as CSSStyleDeclaration)
        },
        onend(e: IInteractEvent) {
            const target = e.currentTarget
            if (target && placeholder) {
                target.parentElement?.removeChild(placeholder)
                target.classList.remove(CLASS_NAME_CONST_DATA.DRAGGABLE_MOVING)
            }
        },
    })
}

const dragenterContainerClass = 'dragenter__container'

/**
 * 初始化接收的容器
 * @param callBack
 * @param selector
 */
export const initDropzone = (callBack: (type: string, event: IInteractEvent) => void | Promise<void>, selector = `.${CLASS_NAME_CONST_DATA.DROPZONE_SELECTOR}`): void => {
    const app = Application.getInstance()

    getInteract(selector)
        .dropzone({
            accept: `.${CLASS_NAME_CONST_DATA.DRAGGABLE_SELECTOR}`,
            overlap: 0.5,
            ondrop(event: IInteractEvent) {
                const { relatedTarget, currentTarget } = event
                if (relatedTarget) {
                    const type = relatedTarget.getAttribute('data-type') as string
                    if (!type) {
                        throw new Error('Unexpected problems，type is not found')
                    }
                    currentTarget.classList.remove(dragenterContainerClass)
                    const dataId = currentTarget.getAttribute('data-id')
                    let containerModel
                    if (dataId) {
                        containerModel = app.dataStore.findByDomId(dataId)
                    }
                    const message = app.dataStore.getValidateMessage(type, containerModel?.type, currentTarget, relatedTarget)
                    if (message) {
                        Message.warning(message)
                    } else {
                        callBack(type, event)
                    }
                }
            },
        })
        .on('dragenter', ({ currentTarget }: IInteractEvent) => {
            currentTarget.classList.add(dragenterContainerClass)
        })
        .on('dragleave', ({ currentTarget }: IInteractEvent) => {
            currentTarget.classList.remove(dragenterContainerClass)
        })
}
