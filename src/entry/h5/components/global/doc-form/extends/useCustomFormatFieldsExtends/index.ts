import { IDocParams } from '../../request'
import { Field } from '@/entry/h5/components/global/app-form/index.vue'
import DocForm from '@/entry/h5/components/global/doc-form/index.vue'

export abstract class CustomFormatFields {
    constructor(public fields: Field[], public docParams: IDocParams, public instance: DocForm) {}

    /* 掉用format返回格式化之后的字段 */
    public abstract format(): Field[] | Promise<Field[]>
}

/**
 * 工厂函数用于创建实例
 * @param key catalogCode
 * @param fields
 * @param docParams
 * @param instance
 */
const customFormatFieldsFactory = <T extends CustomFormatFields>(key: string, fields: Field[], docParams: IDocParams, instance: DocForm): T | null => {
    /* 为了解决循环依赖问题 */
    const { customFormatFieldsMap } = require('./mapping')
    const FactoryClass = customFormatFieldsMap[key]
    if (FactoryClass) {
        return new FactoryClass(fields, docParams, instance) as T
    }
    return null
}

/**
 * 自定义format字段
 * @param fields
 * @param docParams
 * @param instance
 */
export const useCustomFormatFieldsExtends = async (fields: Field[], docParams: IDocParams, instance: DocForm): Promise<Field[]> => {
    try {
        const factoryInstance = customFormatFieldsFactory(docParams.documentCatalogCode, fields, docParams, instance)
        if (factoryInstance) {
            return factoryInstance.format()
        }
    } catch (error) {
        console.error('自定义format解析失败', error)
        return fields
    }
    return fields
}
