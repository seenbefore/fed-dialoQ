import _ from 'lodash'

/**
 * 将树形数据扁平化处理
 * @param data 树形数据
 * @returns 扁平化后的数据
 */
export function flattenTree(data: any[]) {
    let result: any[] = []

    function traverse(node: any[]) {
        _.forEach(node, item => {
            const currentNode = _.omit(item, 'children')
            result.push(currentNode)

            if (_.isArray(item.children) && item.children.length > 0) {
                traverse(item.children)
            }
        })
    }

    traverse(data)
    return result
}

/**
 * 从树形数据中查找匹配的节点
 * @param tree 树形数据
 * @param codes 需要匹配的编码字符串(逗号分隔)
 * @param options 配置项
 * @returns 匹配到的节点数组
 */
export function findMatchingNodes(
    tree: any[],
    codes: string,
    options: {
        valueKey?: string
        labelKey?: string
    } = {},
) {
    const { valueKey = 'key', labelKey = 'title' } = options

    let result: any[] = []
    const codesArray = codes.split(',')

    const traverse = (nodes: any[]) => {
        if (!nodes) return

        for (const node of nodes) {
            if (codesArray.includes(node[valueKey])) {
                result.push({
                    [valueKey]: node[valueKey],
                    [labelKey]: node[labelKey],
                })
            }
            if (node.children) {
                traverse(node.children)
            }
        }
    }

    traverse(tree)
    return result
}

/**
 * 处理树选择数据变化
 * @param selectedData 选中的数据
 * @param options 配置项
 * @returns 处理后的数据 { displayData: array, rawValue: string }
 */
export function handleTreeSelectChange(
    selectedData: any[],
    options: {
        valueKey?: string
        labelKey?: string
        displayFields?: string[]
    } = {},
) {
    const { valueKey = 'key', labelKey = 'title', displayFields = [valueKey, labelKey] } = options

    let data = flattenTree(selectedData)

    // 只保留需要的字段
    data = data.map((item: any) => {
        const result: any = {}
        displayFields.forEach(field => {
            result[field] = item[field]
        })
        return result
    })

    // 生成原始值字符串
    const rawValue = data.map((item: any) => item[valueKey]).join(',')

    return {
        displayData: data,
        rawValue,
    }
}

// 为了向后兼容，保留原有的业务函数，但使用通用函数实现
export function handleDomainCodesChange(selectedData: any[]) {
    const result = handleTreeSelectChange(selectedData, {
        valueKey: 'territoryId',
        labelKey: 'title',
        displayFields: ['territoryId', 'title'],
    })

    return {
        domainCodes$: result.displayData,
        domainCodes: result.rawValue,
    }
}

export function handleRegionCodesChange(selectedData: any[]) {
    const result = handleTreeSelectChange(selectedData, {
        valueKey: 'key',
        labelKey: 'title',
        displayFields: ['key', 'title'],
    })

    return {
        regionCodes$: result.displayData,
        regionCodes: result.rawValue,
    }
}
