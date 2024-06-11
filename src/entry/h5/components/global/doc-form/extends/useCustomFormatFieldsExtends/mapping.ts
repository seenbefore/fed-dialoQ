import { TestCustomFormatFields } from './formats/test'
import { CustomFormatFields } from './index'

/**
 * 文书的 catalogCode 和 文书实例的映射。用于处理文书的自定义字段逻辑
 */
export const customFormatFieldsMap: Record<string, { new (...args: any[]): CustomFormatFields }> = {
    test: TestCustomFormatFields,
}
