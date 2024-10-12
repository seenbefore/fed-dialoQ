import { Component, Vue } from 'vue-property-decorator'

Component.registerHooks(['beforeRouteEnter'])
// @ts-ignore
@Component
export abstract class UseListRefreshMixins extends Vue {
    public needRefresh = false

    public abstract refreshNames: Array<string>

    public abstract onRefresh(): void

    public beforeRouteEnter(to: any, from: any, next: any) {
        next((vm: UseListRefreshMixins) => {
            /* 第一次会进入这里 */
            if (!vm.needRefresh) {
                vm.needRefresh = true
            } else {
                if (vm.refreshNames.includes(from.name)) {
                    vm.onRefresh()
                }
            }
        })
    }
}
