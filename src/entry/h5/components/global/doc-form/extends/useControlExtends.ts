import DocForm from '../index.vue'
import { IControlInfo, IField, IJson, CONTROL_TYPE } from '../utils'

export type IControlExtendFnc = (_: IJson, field: IField, instance: DocForm) => IControlInfo

/*
 * 用于注册扩展的控件。
 * key: `${CONTROL_TYPE}_${field.templateFieldEn}`
 *  */
export const useControlExtends: Record<string, IControlExtendFnc> = {
    /* 选择执法人员测试 */
    [`${CONTROL_TYPE.INPUT}_sxsy`]: (json: IJson, { templateFieldCn }: IField, instance: DocForm) => {
        return {
            tag: () => import('../example/control-example.vue'),
            props: {
                /* 传递给 control-example 组件的 label */
                label: templateFieldCn,
            },
        }
    },
}
