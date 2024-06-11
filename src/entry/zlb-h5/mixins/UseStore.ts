import { IAppSysInfo, IAppUserInfo } from '@zlb-h5/store/modules/app'
import { appStore } from '@zlb-h5/store/useStore'
import { Vue } from 'vue-property-decorator'

export class UseStore extends Vue {
    public appUserInfo: IAppUserInfo = appStore.appUserInfo

    public appSysInfo: IAppSysInfo = appStore.appSysInfo

    /* 是否为老年版 */
    public get isElder() {
        return this.appSysInfo.uiStyle === 'elder'
    }

    /* 通过浙里办判断是否为个人登录 */
    public get isPersonByZLB() {
        return this.appSysInfo.userType !== '2'
    }

    /* 修改是否为老年版信息 */
    public updateUiStyle(uiStyle: IAppSysInfo['uiStyle']) {
        this.$store.commit('app/updateAppSysInfo', { uiStyle })
    }
}
