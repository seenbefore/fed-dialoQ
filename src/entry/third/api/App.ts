import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '../scripts/http'
import { PartialType } from '@/@types'

import { Page, Result, Query, Pipeline, PipelineLog, NginxConf, User, ProjectTemplate, Review } from '../models/index'

export class OpenService {
    static notify(payload: any = {}, options?: ExAxiosRequestConfig) {
        const data = {
            ...payload,
        }
        return http.request<Result<any>>({
            url: '/open/dingding/notify',
            method: 'POST',
            data,
            ...options,
        })
    }
    static notifyByQiWei(payload: any = {}, options?: ExAxiosRequestConfig) {
        const data = {
            ...payload,
        }
        return http.request<Result<any>>({
            url: '/open/qiwei/notify',
            method: 'POST',
            data,
            ...options,
        })
    }
}
/**
 * Ued走查
 */
export class UedReviewService {
    static statProductCount(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/statProductCount',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static statReviewCount(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/statReviewCount',
            method: 'POST',
            data,
            ...options,
        })
    }
    static product_stat(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/product_stat',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static stat(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/stat',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/ued_review/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
}

/**
 * 项目接口
 */
export class ProjectService {
    //
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class UserGroupService {
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/remove',
            method: 'POST',
            data,
            ...options,
        })
    }

    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user_group/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
}
export class DictService {
    // 不分页
    static group(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/group',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 不分页
    static all(data?: any, options?: ExAxiosRequestConfig) {
        return http
            .request<Result<any>>({
                url: '/dict/all',
                method: 'POST',
                data,
                ...options,
            })
            .then(res => res.data)
    }
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static config(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/config',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/dict/update',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class ProductService {
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    static findOneByParams(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/findOneByParams',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static config(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/config',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/product/update',
            method: 'POST',
            data,
            ...options,
        })
    }
}
/**
 * 代码走擦
 */
export class ReviewService {
    /**
     * 删除
     * @param data
     * @param options
     * @returns
     */
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/review/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/review/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static stat(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<PartialType<Review>[]>>({
            url: '/review/stat',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class ArticleService {
    //
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    //
    static publish(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/publish',
            method: 'POST',
            data,
            ...options,
        })
    }

    //
    static getByUUID(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/getByUUID',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static removeOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/article/removeOne',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class AppBranchService {
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<string[]>>({
            url: '/app/branch/list',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class UserService {
    static autoLogin(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/auto-login',
            method: 'POST',
            data,
            ...options,
        })
    }
    static register(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static login(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/login',
            method: 'POST',
            data,
            ...options,
        })
    }
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    /**
     * 获取人员Options
     * @param payload
     * @param options
     * @returns
     */
    static async getUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        const result = data.map(item => {
            const value = item.username
            const label = item.name
            return {
                ...item,
                label,
                value,
            }
        })

        return result
    }
    /**
     * 获取产品人员列表
     * @param payload
     * @param options
     * @returns
     */
    static async getProductUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        return data
            .filter(item => {
                return ['产品经理'].includes(item.position!)
            })
            .map(item => {
                return {
                    label: item.name,
                    value: item.username,
                }
            })
    }
    /**
     * 获取设计人员列表
     * @param payload
     * @param options
     * @returns
     */
    static async getUedUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        return data
            .filter(item => {
                return ['设计师'].includes(item.position!)
            })
            .map(item => {
                return {
                    label: item.name,
                    value: item.username,
                }
            })
    }
    // 获取应用分支列表 不分页
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<User[]>>>({
            url: '/user/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static findOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/findOne',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static current(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/current',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static remove(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    static update_password(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/update/password',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class PipelineService {
    static stat(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/stat',
            method: 'POST',
            data,
            ...options,
        })
    }
    static notification_users(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User[]>>({
            url: '/pipeline/notification/users',
            method: 'POST',
            data,
            ...options,
        })
    }
    static notification_users_remove(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/notification/users/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
    static notification_users_add(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/notification/users/add',
            method: 'POST',
            data,
            ...options,
        })
    }
    static updateMember(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/update/member',
            method: 'POST',
            data,
            ...options,
        })
    }
    static deleteMember(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/delete/member',
            method: 'POST',
            data,
            ...options,
        })
    }
    static update(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    static updateVersion(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/updateVersion',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static query(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<Pipeline[]>>>({
            url: '/pipeline/query',
            method: 'POST',
            data,
            ...options,
        })
    }
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<Pipeline[]>>>({
            url: '/pipeline/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Pipeline[]>>({
            url: '/pipeline/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Pipeline>>({
            url: '/pipeline/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    static remove(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Pipeline>>({
            url: '/pipeline/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
    static run(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/build',
            method: 'POST',
            data,
            ...options,
        })
    }
    static uncollect(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/uncollect',
            method: 'POST',
            data,
            ...options,
        })
    }
    static collect(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/collect',
            method: 'POST',
            data,
            ...options,
        })
    }
    static projects(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/projects',
            method: 'POST',
            data,
            ...options,
        })
    }
    static groups(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/groups',
            method: 'POST',
            data,
            ...options,
        })
    }
    static project_tpls(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/project/tpls',
            method: 'POST',
            data,
            ...options,
        })
    }
    static project_branches(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/project/branches',
            method: 'POST',
            data,
            ...options,
        })
    }
    static project_create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/project/create',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class PipelineLogService {
    static stat(data?: Query<any>, options?: ExAxiosRequestConfig) {
        return http.request<Result<PipelineLog[]>>({
            url: '/pipeline-log/stat',
            method: 'POST',
            data,
            ...options,
        })
    }
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<PipelineLog[]>>({
            url: '/pipeline-log/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    static list(data?: Query<any>, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<PipelineLog[]>>>({
            url: '/pipeline-log/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<PipelineLog>>({
            url: '/pipeline-log/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    static cancel(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline-log/cancel',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class PipelineBranchService {
    // 获取应用分支列表 不分页
    static list(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<string[]>>({
            url: '/pipeline/branch/list',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class BaseService {
    // 获取应用分支列表 不分页
    static config(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/config',
            method: 'get',
            data,
            ...options,
        })
    }
    // 获取服务器信息
    static getDiskFree(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/open/dist/free',
            method: 'get',
            data,
            ...options,
        })
    }
}

export class NginxService {
    static getVhostList(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<NginxConf[]>>({
            url: '/nginx/vhost/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static vhostImport(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/vhost/import',
            method: 'POST',
            data,
            ...options,
        })
    }
    static status(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<boolean>>({
            url: '/nginx/status',
            method: 'GET',
            data,
            ...options,
        })
    }
    static start(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/start',
            method: 'GET',
            data,
            ...options,
        })
    }
    static stop(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/stop',
            method: 'GET',
            data,
            ...options,
        })
    }
    static validate(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/validate',
            method: 'POST',
            data,
            ...options,
        })
    }
    static reload(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/reload',
            method: 'GET',
            data,
            ...options,
        })
    }
    static update(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/nginx/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<NginxConf[]>>>({
            url: '/nginx/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<NginxConf>>({
            url: '/nginx/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    static remove(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<NginxConf>>({
            url: '/nginx/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
}

export class ProjectTemplateService {
    static update(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project-template/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/project-template/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<ProjectTemplate[]>>>({
            url: '/project-template/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    static get(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<ProjectTemplate>>({
            url: '/project-template/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    static remove(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<ProjectTemplate>>({
            url: '/project-template/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
}
