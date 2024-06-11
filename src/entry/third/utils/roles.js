import { userStore } from '@/entry/third/store/useStore'

const { roleName } = userStore.info

/** 其他人员  风险小组暂未分组*/
const HeadOffice = ['超级管理员', '总行审查岗', '总行管理员', '总行人员']
const BranchBank = ['支行审查岗', '支行审批岗', '支行管理员', '支行人员']
const Net = ['网点负责人']
const Manager = ['客户经理', '客户经理B岗']
// 管理员
export const isAdmin = function() {
    return roleName?.split(',').some(item => ['管理员'].includes(item))
}
// 总行 角色
const isHeadOffice = function() {
    return roleName?.split(',').some(item => HeadOffice.includes(item))
}

// 支行 角色
const isBranchBank = function() {
    return roleName?.split(',').some(item => BranchBank.includes(item))
}

// 网点 角色
const isNet = function() {
    return roleName?.split(',').some(item => Net.includes(item))
}

// 客户经理 角色
const isManager = function() {
    return roleName?.split(',').some(item => Manager.includes(item))
}

// 总行大于支行大于网点大于客户经理 按最大的显示
export const role = function() {
    if (isHeadOffice()) {
        return '总行'
    } else if (isBranchBank()) {
        return '支行'
    } else if (isNet()) {
        return '网点'
    } else if (isManager()) {
        return '客户经理'
    }
    return ''
}
