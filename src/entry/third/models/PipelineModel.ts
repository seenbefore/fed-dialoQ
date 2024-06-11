import { MinLength, IsNotEmpty, ValidateNested } from 'class-validator'
import { guid, formatDate } from './index'
export class User {
    id: any
    role?: string = ''
    phone?: string
    token?: string

    // 英文名
    username = ''
    avatar_url?: string
    // 中文名
    name?: string
    password?: string
    email?: string
    isDeleted?: number
    createdAt?: number
    createdUser?: string
    updatedAt?: number
    updatedUser?: string
    position?: string

    constructor(options: any = {}) {
        this.id = guid()
        Object.assign(this, options)
    }
}
export class ProjectTemplate {
    id: any
    createdAt = 0
    updatedAt = 0
    @IsNotEmpty({ message: '保存失败：缺少模板仓库地址' })
    resposity = ''
    @IsNotEmpty({ message: '保存失败：缺少模板名称' })
    name = ''
    // 备注
    note = ''
}
export class NginxConf {
    id?: string
    name?: string
    // 唯一端口
    port?: string
    note?: string
    // server 配置
    content?: string
    createdUserId?: string
    createdAt?: number = 0
    updatedAt?: number = 0
    // 服务是否启动
    on = 0
    // 文件名 xx.conf
    filename?: string
    // 文件路径
    filepath?: string

    // constructor(options: any = {}) {
    //     this.id = guid()
    //     Object.keys(options).forEach((key:string) => {
    //         if (Object.prototype.hasOwnProperty.call(this, key)) {
    //             this[key] = options[key]
    //         }
    //     })
    // }
}

export class PipelineConfig {
    @IsNotEmpty({ message: '保存失败：缺少项目仓库地址' })
    resposity = ''
    // fat uat pre prd 部署环境
    target = ''
    // 部署分支
    branch = ''

    beforeInstallCommands: string[] = []
    installCommands: string[] = ['npm install --detail --color']
    buildCommands: string[] = ['npm run build:$env']
    deployCommands: string[] = []

    distDir = ''
    // 部署服务器地址
    serverIP = ''
    // 部署目录 一般同Pipeline 英文名
    serverDir = ''
    dingdingSuccess = ''
    dingdingFail = ''
    fatCount = 3
    // 跳过更新依赖
    disableUpdateDependencies = false
    ignoreCommandErrors = false

    commit = ''
    detach = false
    message = ''
    lastCommit = ''
    lastTarget = ''
    filter = ''
    http_url_to_repo = ''
    releaseId?: number
    skipRemoveWorkspace = 0

    constructor(options: any = {}) {
        options.branch = options.branch || 'dev'
        options.target = options.target || 'fat1'
        options.distDir = options.distDir || 'dist'
        Object.assign(this, options)
    }
}

interface Preview {
    uat?: string
    pre?: string
    prd?: string
    [prop: string]: any
}
export interface UatUrl {
    /**
     * 环境
     */
    target?: string
    name?: string
    url?: string
    note?: string
}
export interface TargetUrl {
    /**
     * 环境
     */
    label: string
    value: string
    target?: string
}
export class Pipeline {
    /**
     * 应用 英文名
     */

    id: any
    // 应用id
    //@IsNotEmpty({ message: '保存失败：缺少 appId' })
    appId = ''

    /**
     * 应用称 中文
     */
    @IsNotEmpty({ message: '缺少 name' })
    name: string
    // 预览地址
    preview?: Preview
    /**
     * 应用类型
     */
    type = ''

    createdAt = 0
    updatedAt = 0

    creator = ''
    createdUserId = ''
    createdUser$?: User

    // 收藏的用户id
    collectUserIds: string[] = []
    collectUsers$?: User[]

    // 成员
    memberUserIds: string[] = []
    memberUsers$?: User[]

    @ValidateNested()
    config: PipelineConfig

    lastLog$?: PipelineLog
    releaseId = 0
    changelogs: any[] = []

    loading$?: boolean
    isCollected$?: boolean
    uat_urls?: UatUrl[]
    target_urls?: TargetUrl[]
    trigger_method?: string = ''
    trigger_target?: string = ''
    trigger_branch?: string = ''
    version?: string = ''
    appType?: string = ''
    technology?: string = ''
    frontendManagerA?: string = ''
    business?: string = ''
    developmentManager?: string = ''
    productManager?: string = ''
    deliveryManager?: string = ''
    devopsManager?: string = ''
    frontendManagerB?: string = ''
    readme?: string = ''

    constructor(options: any = {}) {
        this.id = guid()
        this.type = options.type || 'Node.js'
        this.name = options.name || '日常环境' + formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
        options.config = options.config || {}
        options.config.serverDir = options.config.serverDir || this.id
        this.config = new PipelineConfig(options.config)
    }
}

export class ProcessTask {
    id?: any
    cmd?: string
    user?: User
    // 任务名称
    name?: string
    data?: {
        logId?: any
        pipelineLogId?: any
        pipelineId?: any
        config?: any
        [prop: string]: any
    }
    process?: any
    abort?: any
    script?: string
    message?: Function
    start?: Function
    end?: Function
}

export interface Context {
    user?: User
    [prop: string]: any
}
export interface Query<T> {
    page?: number
    pageSize?: number
    conditions?: T
    [prop: string]: any
}

export class PipelineLog {
    id: any
    logId = 0
    logUri?: string
    appId: any
    name = ''
    target = ''
    branch = ''
    pipelineId = ''
    // 运行备注
    description = ''
    // 构建信息
    triggerMessage = ''
    config?: PipelineConfig
    pipeline$?: Pipeline
    userId = ''
    user$?: User
    steps$?: PipelineStep[]
    createdAt = 0
    updatedAt = 0
    startTime = 0
    endTime = 0
    releaseId = 0
    message?: string
    // 访问地址
    url = ''
    // 制品地址  zip
    artifact?: {
        name?: string
        size?: number
        url?: string
        folderName?: string
        folderSize?: number
    }
    status?: 'success' | 'error' | 'pending' | 'abort' | 'doing'
    errors?: string
    // 发布标题
    releaseTitle?: string
    // 发布名称 release_日期
    release?: string
    releaseContent?: string
    uat_urls?: UatUrl[]
    image_scanner_body?: any;

    [prop: string]: any

    constructor(options: any = {}) {
        Object.assign(this, options)
        this.id = guid()
        this.releaseId = 0
        this.name = '应用日志 ' + formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
    }
}

export interface PipelineStep {
    name: string
    title: string
    content: string
    status: string
    time: string
    startTime: number
    endTime: number
}
