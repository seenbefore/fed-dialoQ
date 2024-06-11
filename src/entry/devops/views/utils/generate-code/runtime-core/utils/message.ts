import { Notification } from 'element-ui'
import { MessageType } from 'element-ui/types/message'
import { NotificationPosition } from 'element-ui/types/notification'

export const operationNotify = (message: string, type?: MessageType, position?: NotificationPosition) => {
    // @ts-ignore
    Notification.closeAll()
    Notification({
        title: '操作提示',
        message,
        type,
        position,
    })
}

operationNotify.success = (message: string) => operationNotify(message, 'success')

operationNotify.warning = (message: string) => operationNotify(message, 'warning')
