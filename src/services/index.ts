
import * as API from '@/services/usercenter/user'
export class UserService {
    static async login() {
        const result = await API.login()
        return result.data
    }
    static async current() {
        const result = await API.login()
        return result
    }
}