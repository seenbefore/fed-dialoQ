export class InjectApp {
    public get app() {
        /* XXX：因为Application如果直接导入会导致很多地方产生循环依赖，所以变更为动态导入 */
        return require('@/entry/devops/views/utils/generate-code/core/Application').Application.getInstance()
    }
}
