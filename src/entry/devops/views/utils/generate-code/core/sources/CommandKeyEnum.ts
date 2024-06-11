/**
 * 事件key
 */
export enum CommandKeyEnum {
    // 当激活的命令变了
    ON_CURRENT_CHANGE = 'on_current_change',
    // 命令堆栈改变
    ON_STACK_CHANGE = 'on_stack_change',
    // 添加模块
    ON_ADD_MODEL = 'on_add_model',
    // 模块数量变化
    ON_MODEL_NUM_UPDATE = 'on_model_num_update',
    /* 更新视图 */
    ON_UPDATE_VIEW = 'on_update_view',
    /* 属性发生变更 */
    ON_UPDATE_ATTR = 'on_update_attr',
    /* app配置发生改变 */
    ON_UPDATE_APP_CONFIG = 'on_update_app_config',
    /* 表单的配置发生变化 */
    ON_UPDATE_DESIGN_CONFIG = 'on_update_design_config',
}
