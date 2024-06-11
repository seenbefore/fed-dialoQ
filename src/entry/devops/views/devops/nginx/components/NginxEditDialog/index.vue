<template>
    <el-dialog ref="dialog" :title="myTitle" visible class="NginxEditDialog" :fullscreen="false" :append-to-body="false" :close-on-click-modal="false" width="900px" v-bind="$attrs" @close="cancel">
        <div class="pre-deploy-dialog__content">
            <el-alert title="请先选择应用名称和环境，系统将自动生成服务配置信息，有问题请重新进入" type="warning" style="margin-bottom:10px;" v-if="!isEdit"></el-alert>
            <sg-base-form label-width="80px" ref="formRef" v-if="formFields.length" :fields="formFields" v-model="formModel" :span="24"></sg-base-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmit" :loading="View.loading">确定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRef, FormRow } from '@/sharegood-ui'
import { userStore } from '@/entry/devops/store/useStore'
import { getTargetOptions } from '@/entry/devops/views/devops/pipeline/components/helper'

const TPL = `server {
        # {appLabel$}
        listen {port};
        client_max_body_size 500M;
        client_header_buffer_size 128k;
        large_client_header_buffers 4 128k;

        gzip on;
        gzip_buffers 32 4K;
        gzip_comp_level 6;
        gzip_min_length 100;
        gzip_types application/javascript text/css text/xml;
        gzip_disable "MSIE [1-6]\.";
        gzip_vary on;

        # 无虚拟路径
        location / {
            root /data/projects/{target$}/{appId$};
            index index.html index.htm;
            try_files $uri $uri/ /index.html;

            # 首页禁止缓存
            if ($request_filename ~ .*\.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            }
            # 静态资源默认缓存14天
            if ($request_filename ~ .*\.(js|css|png|jpg)$) {
                expires 336h;
            }
        }
        # 有虚拟路径 一般在打包配置文件中需配置 BASE_URL = '/虚拟路径/'
        location /虚拟路径 {
            alias /data/projects/{target$}/{appId$};
            try_files $uri $uri/ /虚拟路径/index.html;
            index index.html index.htm;

            # 首页禁止缓存
            if ($request_filename ~ .*\.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            }
            # 静态资源默认缓存14天
            if ($request_filename ~ .*\.(js|css|png|jpg)$) {
                expires 336h;
            }

        }

        # 接口反向代理
        location /@API/ {
            # 后端地址
            proxy_pass http://192.168.1.247:8086/;
        }

    }`
interface FormModel {
    branch?: string
    target?: string
    appId$?: string
    target$?: string
    appLabel$?: string
    name?: string
}
@Component({
    name: 'NginxEditDialog',
    components: {},
})
export default class NginxEditDialog extends Vue {
    @Prop({ type: Number }) port!: number
    @Prop({ type: String }) title!: string
    @Prop({ type: String }) id!: string
    @Prop({ type: Object }) meta: any
    @Prop({ default: false }) private isEdit!: boolean
    public $refs!: {
        formRef: FormRef
    }
    private formModel: FormModel = {}
    public dataSource: Record<string, any> = {}
    get myTitle() {
        if (this.isEdit) {
            return '修改'
        }
        return '创建'
    }
    private View = {
        loading: false,
    }
    get formFields(): FormRow[] {
        if (!Object.keys(this.dataSource).length) {
            return []
        }
        return [
            {
                columns: [
                    {
                        span: 8,
                        tag: 'select',
                        name: 'appId$',
                        itemAttrs: {
                            label: '应用名称',
                        },
                        attrs: {
                            filterable: true,
                            options: () => {
                                return this.dataSource.PipelineOptions ?? []
                            },
                            onChange: ({ value, option }, { formActionType }) => {
                                const { target_urls, triggers } = option

                                const options = getTargetOptions({
                                    target_urls,
                                    triggers,
                                })
                                formActionType.updateSchema('target$', 'attrs.options', options)
                                if (value) {
                                    this.$set(this.formModel, 'appLabel$', option?.label ?? '')
                                } else {
                                    this.$set(this.formModel, 'appLabel$', '')
                                }
                                this.initConfig()
                            },
                        },
                        ifRender: () => {
                            return this.isEdit === false
                        },
                    },
                    {
                        span: 6,
                        tag: 'select',
                        name: 'target$',
                        itemAttrs: {
                            label: '环境',
                        },
                        attrs: {
                            //filterable: true,
                            options: [
                                {
                                    label: '测试环境(uat)',
                                    value: 'uat',
                                },
                                {
                                    label: '预发环境(pre)',
                                    value: 'pre',
                                },
                                {
                                    label: '线上环境(prd)',
                                    value: 'prd',
                                },
                                {
                                    label: '开发环境1(fat1)',
                                    value: 'fat1',
                                },
                                {
                                    label: '开发环境2(fat2)',
                                    value: 'fat2',
                                },
                                {
                                    label: '开发环境3(fat3)',
                                    value: 'fat3',
                                },
                                {
                                    label: '开发环境4(fat4)',
                                    value: 'fat4',
                                },
                                {
                                    label: '开发环境5(fat5)',
                                    value: 'fat5',
                                },
                                {
                                    label: '开发环境6(fat6)',
                                    value: 'fat6',
                                },
                            ],
                            onChange: () => {
                                this.initConfig()
                            },
                        },
                        ifRender: () => {
                            return this.isEdit === false
                        },
                    },
                    {
                        span: 10,
                        tag: 'input',
                        name: 'name',
                        itemAttrs: {
                            label: '名称',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        componentProps: ({ formModel }) => {
                            const { appId$, target$, appLabel$ } = formModel
                            let disabled = !appId$ || !target$
                            if (this.isEdit) {
                                disabled = false
                            }
                            return {
                                attrs: {
                                    disabled,
                                    placeholder: '请先选择应用名称和环境',
                                },
                            }
                        },
                    },
                ],
            },

            {
                columns: [
                    {
                        tag: 'input',
                        name: 'content',
                        itemAttrs: {
                            label: '服务配置',
                            rules: [
                                {
                                    required: true,
                                    message: '必填',
                                },
                            ],
                        },
                        componentProps: ({ formModel }) => {
                            const { appId$, target$, appLabel$ } = formModel
                            let disabled = !appId$ || !target$
                            if (this.isEdit) {
                                disabled = false
                            }
                            return {
                                attrs: {
                                    type: 'textarea',
                                    rows: 10,
                                    disabled,
                                    placeholder: '请先选择应用名称和环境',
                                },
                            }
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'note',
                        itemAttrs: {
                            label: '备注',
                        },
                        attrs: {
                            //type: 'textarea',
                        },
                    },
                ],
            },
        ] as FormRow[]
    }
    /**
     * 初始化NGINX配置
     */
    initConfig() {
        if (this.isEdit) {
            return
        }
        const { appId$, target$, appLabel$ } = this.formModel
        if (!appId$ || !target$ || !appLabel$) {
            return
        }
        const name = `${target$}_${appId$}`
        const data: any = {
            ...this.formModel,
            port: this.port,
        }
        const tpl = TPL.replace(/\{(.+?)\}/g, ($1: any, key: any) => {
            const result = data[key] || ''
            return result
        })
        this.$refs.formRef.setState({
            name,
            content: tpl,
            note: appLabel$,
        })
    }

    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
    handleSubmit() {
        const { name = '' } = this.formModel
        if (name?.indexOf('/') > -1) {
            this.$message.warning('名称中不能包含 / ')
            return
        }
        if (this.isEdit) {
            this.handleUpdate()
        } else {
            this.handleCreate()
        }
    }
    handleUpdate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                try {
                    const row = this.formatData(this.formModel)

                    const id = this.id
                    this.View.loading = true

                    await API.NginxService.update({
                        id,
                        ...row,
                        updatedUserId: userStore.info?.username,
                        updatedUser: userStore.info?.name,
                    })

                    this.View.loading = false
                    this.$message.success('修改成功')
                    this.confirm()
                } catch (err) {
                } finally {
                    this.View.loading = false
                }
            }
        })
    }
    handleCreate() {
        const ref = this.$refs.formRef
        ref.validate(async valid => {
            if (valid) {
                try {
                    const row = this.formatData(this.formModel)
                    this.View.loading = true
                    await API.NginxService.create({
                        ...row,
                    })
                    this.$message.success('创建成功')
                    this.confirm()
                } catch (err) {
                } finally {
                    this.View.loading = false
                }
            }
        })
    }
    public formatData(data: any = {}) {
        const result = { ...data }

        return result
    }
    public parseData(data: any = {}) {
        const result = { ...data }

        return result
    }
    async syncPipelineOptions() {
        const { data } = await API.PipelineService.findAll()
        const options = data.map(item => {
            const { target_urls, config } = item
            const triggers = config?.triggers
            return {
                label: item.name,
                value: `${item.id}`,
                triggers: triggers,
                target_urls,
            }
        })

        this.$set(this, 'dataSource', {
            PipelineOptions: options,
        })
        return options
    }
    async created() {
        await this.syncPipelineOptions()

        if (this.isEdit) {
            const id = this.id
            const { data } = await API.NginxService.get({ id })
            //console.log(12345, this.parseData(data))
            this.formModel = this.parseData(data)
        }
    }
}
</script>

<style lang="less" scoped>
.NginxEditDialog ::v-deep {
    .el-dialog__body {
        padding: 10px 20px;
    }
    .branch {
        .el-select {
            width: 250px;
        }
    }
    .el-radio-group {
        padding-top: 12px;
    }
    .el-radio {
        display: block;
        margin-bottom: 10px;
    }
}
</style>
