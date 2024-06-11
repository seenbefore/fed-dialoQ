interface IOptions {
    triggers?: any[]
    target_urls?: any[]
}
interface ITargetOption {
    label: any
    value: any
    [prop: string]: any
}
/**
 * 获取流水线环境options
 * @param options.triggers pipeline.config.triggers
 * @param options.target_urls pipeline.target_urls
 * @returns
 */
export function getTargetOptions(options: IOptions = {}): ITargetOption[] {
    const triggers: any[] = options.triggers || []
    const target_urls: any[] = options.target_urls || []
    const targetOptions = [
        {
            label: '测试环境(uat)',
            value: 'uat',
        },
        {
            label: '预发环境(pre)',
            value: 'pre',
        },
        {
            label: '线上环境(prd)',
            value: 'prd',
        },
        {
            label: '开发环境1(fat1)',
            value: 'fat1',
        },
        {
            label: '开发环境2(fat2)',
            value: 'fat2',
        },
        {
            label: '开发环境3(fat3)',
            value: 'fat3',
        },
        {
            label: '开发环境4(fat4)',
            value: 'fat4',
        },
        {
            label: '开发环境5(fat5)',
            value: 'fat5',
        },
        {
            label: '开发环境6(fat6)',
            value: 'fat6',
        },
    ]

    const triggerOptions = triggers.map(item => {
        const { title, target } = item
        let label = ''
        if (!title) {
            const option = targetOptions.find(item => item.value === target)
            if (option) {
                label = `${option.label}`
            } else {
                label = `${target}(${target})`
            }
        } else {
            label = `${title}(${target})`
        }
        return {
            label: label,
            value: item.target,
        }
    })
    const target_urlsOptions = target_urls.map(item => {
        return {
            label: `${item.label}(${item.value})`,
            value: item.value,
        }
    })

    // 创建一个函数来检查值是否已存在于数组中
    function isValueExists(array: any[], value: any) {
        return array.some(item => item.value === value)
    }

    // 创建一个新的空数组来存储合并后的结果
    let merged: any = []
    ;[triggerOptions, target_urlsOptions].forEach((array: any) => {
        array.forEach((item: any) => {
            if (!isValueExists(merged, item.value)) {
                merged.push(item)
            }
        })
    })

    // 遍历A，并将那些value不在merged中的元素添加到merged中
    targetOptions.forEach(item => {
        if (!isValueExists(merged, item.value)) {
            merged.push(item)
        }
    })

    return merged
}
