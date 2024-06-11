<template>
    <el-dialog ref="dialog" class="UserActionDialog" :close-on-click-modal="false" :title="'查看用户行为'" width="800px" :fullscreen="false" v-bind="$attrs" :visible="true" @close="cancel">
        <div class="body">
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in activities2" :key="index" :icon="activity.icon" :color="activity.color" :timestamp="format(activity.time)">
                    {{ activity.content }}
                </el-timeline-item>
            </el-timeline>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    components: {},
})
export default class UserActionDialog extends Vue {
    @Prop({ type: String }) id!: string
    @Prop({ type: Boolean }) isEdit!: boolean
    @Prop({ type: Object }) row: any

    get activities2() {
        const row = this.row || {}
        const breadcrumb = JSON.parse(row.breadcrumb || '[]')
        const result = breadcrumb.map((item: any) => {
            const level = item.level.toLowerCase() || ''
            const color = level.indexOf('error') > -1 ? '#F70B0B' : '#5FF713'
            const icon = level.indexOf('error') > -1 ? 'el-icon-close' : 'el-icon-check'

            const actions: any = {
                Route: '页面跳转',
                'UI.Click': '用户点击',
                Xhr: '请求',
                '': '',
            }
            const action = actions[item.type || '']
            return {
                ...item,
                icon,
                color,
                content: `${action} ${level}：` + JSON.stringify(item.data),
            }
        })

        return result
    }
    activities: any = [
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--primary el-button--mini'>js错误</button>",
            time: 1701655278379,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--primary el-button--mini'>js错误</button>",
        },
        {
            type: 'error',
            category: 'Code_Error',
            data: {
                type: 'error',
                status: 'error',
                time: 1701655278389,
                message: "Cannot read properties of undefined (reading 'length')",
                fileName:
                    'webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=script&lang=js',
                line: 148,
                column: 13,
                recordScreenId: '14246982-e46c-496a-97a2-902b70d47b63',
            },
            time: 1701655278389,
            status: 'error',
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: "代码报错：Cannot read properties of undefined (reading 'length')",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--success el-button--mini'>异步错误</button>",
            time: 1701655279740,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--success el-button--mini'>异步错误</button>",
        },
        {
            type: 'error',
            category: 'Code_Error',
            data: {
                type: 'error',
                status: 'error',
                time: 1701655279741,
                message: 'Uncaught SyntaxError: Unexpected end of JSON input',
                fileName:
                    'webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=script&lang=js',
                line: 142,
                column: 14,
                recordScreenId: '14246982-e46c-496a-97a2-902b70d47b63',
            },
            time: 1701655279741,
            status: 'error',
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: '代码报错：Uncaught SyntaxError: Unexpected end of JSON input',
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
            time: 1701655282490,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-dialog__headerbtn'></button>",
            time: 1701656025579,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-dialog__headerbtn'></button>",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--success el-button--mini'>异步错误</button>",
            time: 1701656052157,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--success el-button--mini'>异步错误</button>",
        },
        {
            type: 'error',
            category: 'Code_Error',
            data: {
                type: 'error',
                status: 'error',
                time: 1701656052159,
                message: 'Uncaught SyntaxError: Unexpected end of JSON input',
                fileName:
                    'webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=script&lang=js',
                line: 142,
                column: 14,
            },
            time: 1701656052159,
            status: 'error',
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: '代码报错：Uncaught SyntaxError: Unexpected end of JSON input',
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--danger el-button--mini'>promise错误</button>",
            time: 1701656053489,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--danger el-button--mini'>promise错误</button>",
        },
        {
            type: 'unhandledrejection',
            category: 'Code_Error',
            time: 1701656053490,
            status: 'error',
            data: {
                type: 'unhandledrejection',
                status: 'error',
                time: 1701656053490,
                message: "Cannot read properties of undefined (reading 'age')",
                fileName:
                    'webpack-internal:///./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/views/HomeView.vue?vue&type=script&lang=js',
                line: 166,
                column: 21,
                recordScreenId: 'ee065606-213f-4381-8f06-a211e8d5510e',
            },
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: "代码报错：Cannot read properties of undefined (reading 'age')",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--info el-button--mini'>xhr请求报错</button>",
            time: 1701656055698,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--info el-button--mini'>xhr请求报错</button>",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--danger el-button--mini'>加载资源报错</button>",
            time: 1701656059312,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--danger el-button--mini'>加载资源报错</button>",
        },
        {
            type: 'resource',
            category: 'Resource_Error',
            status: 'error',
            time: 1701656059842,
            data: {
                time: 1701656059842,
                message: 'https://abc.com/index.js; 资源加载失败',
                name: 'script',
            },
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: '加载资源报错：undefined',
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
            time: 1701656066396,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-dialog__headerbtn'></button>",
            time: 1701656068323,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-dialog__headerbtn'></button>",
        },
        {
            type: 'click',
            status: 'ok',
            category: 'Click',
            data: "<button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
            time: 1701656069282,
            color: '#5FF713',
            icon: 'el-icon-check',
            content: "用户点击dom: <button class='el-button el-button--primary el-button--mini'>查看用户行为</button>",
        },
        {
            type: 'error',
            category: 'Code_Error',
            data: {
                type: 'error',
                status: 'error',
                time: 1701656106026,
                message: 'Initialize failed: invalid dom.',
                fileName: 'webpack-internal:///./node_modules/echarts/lib/core/echarts.js',
                line: 2345,
                column: 15,
                recordScreenId: '7e810c09-4718-4de5-995f-2fe40af67e97',
            },
            time: 1701656106026,
            status: 'error',
            color: '#F70B0B',
            icon: 'el-icon-close',
            content: '代码报错：Initialize failed: invalid dom.',
        },
    ]
    format(time: any) {
        let str = new Date(time)
        return str.toLocaleDateString().replace(/\//g, '-') + ' ' + str.toTimeString().substr(0, 8)
    }
    cancel() {
        const $options: any = this.$options
        $options.cancel('取消/关闭')
    }
    confirm() {
        const $options: any = this.$options
        $options.confirm('确定')
    }
}
</script>

<style lang="less" scoped>
.UserActionDialog ::v-deep {
    .el-dialog__header {
        font-size: 20px;
        font-weight: 800;
    }
    .el-timeline {
        text-align: left;
        .el-timeline-item__icon {
            font-size: 12px;
        }
    }
}
</style>
