import { userStore } from '@/store/useStore'

/**
 * 如果是编辑需要传递修改人的id和名称
 * 新建传递创建人的id和名称
 * @param isEdit
 */
export const useSaveParams = (isEdit: boolean) => {
    const { realName, userId } = userStore.info
    return isEdit ? { updateUserId: userId, updateUserName: realName } : { createUserId: userId, createUserName: realName }
}
