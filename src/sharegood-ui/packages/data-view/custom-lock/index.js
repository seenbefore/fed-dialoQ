import Vue from 'vue'
import styles from './index.module.less'
import SvgIcon from '@/components/SvgIcon/index.vue'
const vm = new Vue()
const h = vm.$createElement
export default function useCustomLock({ fixedKey = 'fixed', callback } = {}) {
    /**自定义锁列配置 */
    const customLockColumn = {
        /**显示锁的开始列索引 */
        startIndex: 0,
        /**显示锁的结束列索引 */
        endIndex: 0,
    }
    /**初始化配置项 */
    const iniOptions = scope => {
        const { store, _self } = scope
        const _columns = store.states._columns || []
        _columns.some((_column, _index) => {
            // 非序号索引列
            if (!['index', 'selection'].includes(_column.type)) {
                customLockColumn.startIndex = _index
                return true
            }
            return false
        })
        customLockColumn.endIndex = customLockColumn.startIndex + _self.customLockColumn - 1
    }
    /**是否自定义锁的列 */
    const isCustomLockColumn = index => {
        return index >= customLockColumn.startIndex && index <= customLockColumn.endIndex
    }
    return {
        /**渲染用户自定义锁列 */
        renderLockVNode(scope) {
            const { column, $index, store, _self } = scope
            iniOptions(scope)
            // 非范围内的列，不显示锁
            if (!isCustomLockColumn($index)) return null
            const fixed = column[fixedKey]
            const vnode = h('span', { class: [styles['custom-lock'], 'sg-m-l-4'] }, [
                h(SvgIcon, {
                    props: { icon: fixed ? 'lock' : 'unlock' },
                    nativeOn: {
                        click: event => {
                            event.stopPropagation()
                            // 自定义锁列范围内的列处理逻辑
                            const _columns = store.states._columns || []
                            console.log('columns', _columns)
                            _columns.forEach((_column, _index) => {
                                if (!isCustomLockColumn(_index)) return true
                                // 上锁操作
                                if (_index <= $index && !fixed) {
                                    _column[fixedKey] = !fixed
                                }
                                // 解锁操作
                                else if (_index >= $index && fixed) {
                                    _column[fixedKey] = !fixed
                                }
                            })
                            // 自定义锁列开始范围前的列处理逻辑
                            const columnsConfig = _self.columns?.filter?.(item => !item.ifRender || item.ifRender()) ?? []
                            _columns.some((_column, _index) => {
                                if (_index >= customLockColumn.startIndex) return true
                                // 如果开始索引被锁，则开始索引前的列强制锁定
                                if (_columns?.[customLockColumn.startIndex]?.[fixedKey]) {
                                    _column[fixedKey] = true
                                } else {
                                    // 否则，将其还原
                                    _column[fixedKey] = columnsConfig[_index]?.[fixedKey]
                                }
                                return false
                            })
                            // 更新table
                            store.scheduleLayout(true)
                            callback?.()
                        },
                    },
                }),
            ])
            return vnode
        },
    }
}
