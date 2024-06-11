import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '../scripts/http'

import { Page, Result, Query, Pipeline, PipelineLog, NginxConf, User, ProjectTemplate } from '../models/index'

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
    static create(data: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/pipeline/create',
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
