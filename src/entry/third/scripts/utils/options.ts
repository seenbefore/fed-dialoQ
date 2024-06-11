// 将数组转换为map
export const opt2map = (options: any[]) => {
    try {
        return options.reduce((result: any, item: any) => {
            result[item.value] = item
            return result
        }, {})
    } catch (error) {
        return {}
    }
}

export const map2Opt = (map: any) => {
    try {
        return Object.values(map)
    } catch (error) {
        return []
    }
}

export const withAll = (arr: any[]) => {
    try {
        return [
            {
                label: '全部',
                value: '',
            },
            ...arr,
        ]
    } catch (error) {
        return []
    }
}

// 角色层级 1：个人/客户经理 2：支行登录 3：总行登录 0 网点
export enum ENUM_ROLE_LV {
    gr = '1',
    khjl = '1',
    zhih = '2',
    zongh = '3',
    wd = '0',
}

export enum ENUM_ROLE_NAME {
    admin = '超级管理员',
    zhihscg = '支行审查岗',
    zhihspg = '支行审批岗',
    zonghscg = '总行审查岗',
    zonghgly = '总行管理员',
    zhihgly = '支行管理员',
    khjl = '客户经理',
    zonghry = '总行人员',
    zhihry = '支行人员',
    fxxzspg = '风险小组审批岗',
    khjlbg = '客户经理B岗',
    qtry = '其他人员',
}

export enum ENUM_FORMTYPE {
    XT = 2,
    SS = 1,
    DIS = 0,
}
