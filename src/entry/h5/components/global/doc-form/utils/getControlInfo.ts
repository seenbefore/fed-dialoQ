import DocForm from '../index.vue'
import { useControlExtends } from '../extends/useControlExtends'
import { parseJson } from './parse'
import { CONTROL_TYPE, getApiFieldValue, newUploadApi } from './service'

export interface IJson {
    maxLen: string
    isEdit: string
    inputType: string
    timeShow: string
    pickerType: string
    unit: string
    float: string
    textVal: string
    fileType: string
    fileSize: string
    fileCount: string
    placeholder: string
}

export interface IField {
    controlType: CONTROL_TYPE
    controlConfigContent: string
    tableColumns?: Array<Record<string, any>>
    templateFieldCn: string
    templateFieldEn: string
    uploadApi?: string
}

export interface IControlInfo {
    tag: string | (() => Promise<any>)
    props?: Record<string, any>
}

const controlTypeMap = {
    [CONTROL_TYPE.TEXT]: ({ textVal }: IJson) => {
        return {
            tag: 'text',
            props: {
                text: textVal || '',
            },
        }
    },
    [CONTROL_TYPE.INPUT]: ({ maxLen, inputType, isEdit, placeholder }: IJson) => {
        return {
            tag: 'input',
            props: {
                placeholder: placeholder || '请输入',
                disabled: isEdit == '0',
                maxlength: maxLen || void 0,
                type: inputType === 'more' ? 'textarea' : '',
            },
        }
    },
    [CONTROL_TYPE.NUMBER_INPUT]: ({ float, unit, isEdit, placeholder }: IJson) => {
        return {
            tag: 'number-input',
            props: {
                type: parseFloat(float) == 0 ? 'digit' : 'number',
                placeholder: placeholder || '请输入',
                unit,
                disabled: isEdit == '0',
            },
        }
    },
    [CONTROL_TYPE.DATETIME]: ({ timeShow, pickerType, isEdit, placeholder }: IJson) => {
        const timeShowTrim = (value: string) => {
            return /[年月日时分秒]/.test(value) ? value.replace(/(\s*)/g, '') : value
        }
        const [dateFormat, timeFormat] = timeShow.split(' ')
        const datehourminuteFormat = timeShow.slice(0, -3)
        const datehourFormat = timeShow.slice(0, -6)
        const valueFormat: Record<string, any> = {
            date: dateFormat,
            time: timeFormat,
            datetime: timeShowTrim(timeShow),
            datehourminute: timeShowTrim(datehourminuteFormat),
            datehour: timeShowTrim(datehourFormat),
        }
        const type: Record<string, any> = {
            date: 'date',
            time: 'time',
            datetime: 'datetime',
            datehourminute: 'datetime',
            datehour: 'datehour',
        }
        return {
            tag: 'date-picker',
            props: {
                placeholder: placeholder || '请选择',
                disabled: isEdit == '0',
                valueFormat: valueFormat[pickerType],
                type: type[pickerType],
            },
        }
    },
    [CONTROL_TYPE.CHECKBOX]: ({ isEdit, placeholder }: IJson) => {
        return {
            tag: 'checkbox',
            props: {
                placeholder: placeholder || '请选择',
                disabled: isEdit == '0',
            },
        }
    },
    [CONTROL_TYPE.SELECT]: ({ placeholder }: IJson, field: IField, instance: DocForm) => {
        return {
            tag: 'select-picker',
            props: {
                placeholder: placeholder || '请选择',
                options: instance.parseEnumData(field),
            },
        }
    },
    [CONTROL_TYPE.CASCADER]: ({ placeholder }: IJson, field: IField, instance: DocForm) => {
        return {
            tag: 'cascader',
            props: {
                placeholder: placeholder || '请选择',
                options: instance.parseEnumData(field),
            },
        }
    },
    [CONTROL_TYPE.TABLE]: (_: IJson, { tableColumns }: IField, instance: DocForm) => {
        return {
            tag: 'table',
            props: {
                tableColumns: instance.fieldsFormat(tableColumns),
            },
        }
    },
    [CONTROL_TYPE.MAP_ADDRESS]: () => {
        return {
            tag: 'address',
            props: {
                layout: 'editable',
            },
        }
    },
    [CONTROL_TYPE.UPLOAD]: ({ fileType, isEdit, fileSize, fileCount }: IJson, { uploadApi }: IField, instance: DocForm) => {
        const uploadApi_ = parseJson(uploadApi, {})
        const httpRequest = async (params: Record<string, any>) => {
            const formData = new FormData()
            formData.append('file', params.file)
            // const resp = await getApiFieldValue(uploadApi_, this.extraParams, {}, (options: Record<string, any>) => {
            return await getApiFieldValue(newUploadApi, instance.extraParams, {}, (options: Record<string, any>) => {
                //这里把第一个形参改了 因为配置里的用不了
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
                const formData = new FormData()
                options.data.file = params.file
                Object.keys(options.data).forEach((key: string) => {
                    formData.append(key, options.data[key])
                })
                options.data = formData
                options.onUploadProgress = function(event: any) {
                    params.file.percent = (event.loaded / event.total) * 100
                    params.onProgress(params.file)
                }
                return options
            })
        }
        return {
            tag: 'uploader',
            props: {
                accept: fileType,
                disabled: isEdit == '0',
                httpRequest,
                maxSize: Number(fileSize || Infinity) * 1024 * 1024,
                maxCount: Number(fileCount || Infinity),
            },
        }
    },
    [CONTROL_TYPE.ORDER_SELECT]: ({ placeholder, isEdit, maxLen, inputType }: IJson) => {
        return {
            tag: 'order-select',
            props: {
                placeholder: placeholder || '请输入',
                disabled: isEdit == '0',
                maxlength: maxLen || undefined,
                type: inputType === 'more' ? 'textarea' : '',
            },
        }
    },
}

/**
 * 对原有的逻辑进行重新处理。。。
 * @param field
 * @param instance
 */
export const getControlInfo = (field: IField, instance: DocForm): IControlInfo => {
    const { controlType, controlConfigContent, templateFieldEn } = field
    const json = parseJson(controlConfigContent, {})

    /* 获取自定义逻辑，根据控件类型和templateFieldEn作为依据 */
    const customTagKey = `${controlType}_${templateFieldEn}`
    const customTag = Reflect.get(useControlExtends, customTagKey)
    if (customTag) {
        // const customControlInfo = customTag(json, field, instance)
        /* 处理事件绑定 */
        return customTag(json, field, instance)
    }

    // 以下是原有逻辑
    const controlInfoFnc = Reflect.get(controlTypeMap, controlType)
    if (!controlInfoFnc) {
        console.log(`${controlType}-组件类型暂不支持`)
        return { tag: 'text' }
    }
    return controlInfoFnc(json, field, instance)
}
