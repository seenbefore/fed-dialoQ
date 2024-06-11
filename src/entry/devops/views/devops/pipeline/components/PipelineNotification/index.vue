<template>
    <div class="PipelineNotification ">
        <sg-base-form class="column" ref="formRef" :fields="fields" v-model="model" :span="24"></sg-base-form>

        <div class="app-content-body">
            <div class="mw-row">
                <!-- <div class="mw-col list-animation-leftIn">
                    <div class="macwk-app border white cursor-pointer">
                        <div class="macwk-app__header--icon"></div>
                        <div class="macwk-app__body ">
                            项目
                        </div>
                        <div class="macwk-app__extend sg-flexbox ">
                            最近一次提交
                        </div>
                        <div class="macwk-app__footer">操作</div>
                    </div>
                </div> -->
                <div class="mw-col list-animation-leftIn" :class="`delay-${index}`" v-for="(item, index) in list" :key="index">
                    <div href="javascript:void(0)" target="_self" class="macwk-app border white cursor-pointer">
                        <div class="macwk-app__header--icon">
                            <img class="delay-0" :src="item.avatar_url" lazy="loaded" />
                        </div>
                        <div class="macwk-app__body ">
                            <h5 class="macwk-app__body--title">
                                <span v-text="item.name" class="btn"></span>
                            </h5>
                            <!-- <p class="macwk-app__body--info">
                                <span v-text="item.description || '-'"></span>
                            </p> -->
                        </div>
                        <div class="macwk-app__extend sg-flexbox "></div>
                        <div class="macwk-app__footer">
                            <el-button type="danger" @click="handleRemove(item.id)">删除</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { FormColumn, FormRow, FormRef } from '@/sharegood-ui'
import { User } from '@/entry/devops/models'

@Component({
    components: {},
})
export default class PipelineNotification extends Vue {
    @Prop() id!: string
    public $refs!: {
        formRef: FormRef
    }
    private model = {
        at: [],
    }
    private FormView = {
        loading: false,
    }
    list: User[] = []
    private fields: FormRow[] = [
        {
            columns: [
                {
                    tag: 'select',
                    name: 'at',
                    itemAttrs: {
                        label: '通知列表',
                    },
                    attrs: {
                        multiple: true,
                        filterable: true,
                        options: () => {
                            return API.UserService.findAll().then(res => {
                                const data = res.data
                                return data.map(item => ({
                                    label: item.name,
                                    value: item.id,
                                    username: item.username,
                                }))
                            })
                        },
                    },
                },
            ],
        },

        {
            columns: [
                {
                    tag: 'slot',
                    itemAttrs: {
                        label: ' ',
                    },
                    render: h => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'primary',
                                        loading: this.FormView.loading,
                                    },
                                    on: {
                                        click: () => {
                                            this.handleAdd()
                                        },
                                    },
                                },
                                `添加`,
                            ),
                        ]
                    },
                },
            ],
        },
    ]
    async handleAdd() {
        const model = this.model
        const at = model.at
        if (at && at.length) {
            console.log(model)
            await API.PipelineService.notification_users_add({
                atUserIds: at,
                id: this.id,
            })
            this.model.at = []
            this.onLoad()
        }
    }
    async handleRemove(id: string) {
        await API.PipelineService.notification_users_remove({
            id: this.id,
            atUserIds: [id],
        })
        this.onLoad()
    }
    async onLoad() {
        const { data } = await API.PipelineService.notification_users({
            id: this.id,
        })
        this.list = data
    }
    async created() {
        this.onLoad()
    }
}
</script>

<style lang="less" scoped>
.macwk-app {
    position: relative;
    width: 100%;
    border-radius: 5px;
    padding: 25px 25px 20px;
    display: block;
    overflow: hidden;
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out, translateY 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        color: inherit;
    }
}
.macwk-app {
    display: flex;
    align-content: center;
    border-radius: 0;
    margin-bottom: -2px;
    align-items: center;
    border-width: 0 !important;
    background-color: transparent;
    background-image: linear-gradient(#fff, hsla(0, 0%, 100%, 0.7));
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.06);

    .macwk-app__header--icon img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #f5f5f5;
        margin-right: 15px;
    }
    .macwk-app__extend--status {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 7px;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__extend--author {
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 7px;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__extend--date {
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        opacity: 0.7;
        font-size: 14px;
    }
    .macwk-app__body {
        width: 220px;
        margin-right: 10px;
    }
    .macwk-app__extend {
        flex: 1;
    }
    .macwk-app__footer {
        // width: 130px;
    }
}
.macwk-app.active,
.macwk-app:hover {
    transform: translateY(-1px);
    background-color: transparent;
    border-top-style: solid !important;
    background-image: linear-gradient(#fff, hsla(0, 0%, 100%, 0.5) 30%, #fff);
    box-shadow: 0 0 26px rgba(0, 61, 131, 0.1);
    z-index: 1;
}
.macwk-app {
    padding: 15px 25px 16px;
}
.macwk-app__body--title {
    font-size: 18px;
    margin: 0;
}
.macwk-app__body--info {
    font-size: 15px;
    opacity: 0.5;
    margin: 0;
}

@keyframes leftIn {
    0% {
        transform: translateX(-50px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
.mw-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -10px;
    margin-left: -10px;
}

.mw-col {
    width: 100%;
    max-width: 100%;
    flex: 0 0 100%;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
}
.macwk-animation .list-animation-leftIn {
    -webkit-animation-name: leftIn;
    animation-name: leftIn;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
}

.macwk-animation .delay-0 {
    -webkit-animation-delay: 0ms;
    animation-delay: 0ms;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-1 {
    -webkit-animation-delay: 50ms;
    animation-delay: 50ms;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-2 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-3 {
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-4 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-5 {
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-7 {
    -webkit-animation-delay: 0.35s;
    animation-delay: 0.35s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-8 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-9 {
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-10 {
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-11 {
    -webkit-animation-delay: 0.55s;
    animation-delay: 0.55s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-12 {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-13 {
    -webkit-animation-delay: 0.65s;
    animation-delay: 0.65s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-14 {
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-15 {
    -webkit-animation-delay: 0.75s;
    animation-delay: 0.75s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-16 {
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-17 {
    -webkit-animation-delay: 0.85s;
    animation-delay: 0.85s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-18 {
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-19 {
    -webkit-animation-delay: 0.95s;
    animation-delay: 0.95s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-20 {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-21 {
    -webkit-animation-delay: 1.05s;
    animation-delay: 1.05s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-22 {
    -webkit-animation-delay: 1.1s;
    animation-delay: 1.1s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-23 {
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-24 {
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-25 {
    -webkit-animation-delay: 1.25s;
    animation-delay: 1.25s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-26 {
    -webkit-animation-delay: 1.3s;
    animation-delay: 1.3s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-27 {
    -webkit-animation-delay: 1.35s;
    animation-delay: 1.35s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-28 {
    -webkit-animation-delay: 1.4s;
    animation-delay: 1.4s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-29 {
    -webkit-animation-delay: 1.45s;
    animation-delay: 1.45s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-30 {
    -webkit-animation-delay: 1.5s;
    animation-delay: 1.5s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-31 {
    -webkit-animation-delay: 1.55s;
    animation-delay: 1.55s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-32 {
    -webkit-animation-delay: 1.6s;
    animation-delay: 1.6s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-33 {
    -webkit-animation-delay: 1.65s;
    animation-delay: 1.65s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-34 {
    -webkit-animation-delay: 1.7s;
    animation-delay: 1.7s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-35 {
    -webkit-animation-delay: 1.75s;
    animation-delay: 1.75s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-36 {
    -webkit-animation-delay: 1.8s;
    animation-delay: 1.8s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-37 {
    -webkit-animation-delay: 1.85s;
    animation-delay: 1.85s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-38 {
    -webkit-animation-delay: 1.9s;
    animation-delay: 1.9s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-39 {
    -webkit-animation-delay: 1.95s;
    animation-delay: 1.95s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-40 {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-41 {
    -webkit-animation-delay: 2.05s;
    animation-delay: 2.05s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-42 {
    -webkit-animation-delay: 2.1s;
    animation-delay: 2.1s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-43 {
    -webkit-animation-delay: 2.15s;
    animation-delay: 2.15s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-44 {
    -webkit-animation-delay: 2.2s;
    animation-delay: 2.2s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-45 {
    -webkit-animation-delay: 2.25s;
    animation-delay: 2.25s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-46 {
    -webkit-animation-delay: 2.3s;
    animation-delay: 2.3s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-47 {
    -webkit-animation-delay: 2.35s;
    animation-delay: 2.35s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-48 {
    -webkit-animation-delay: 2.4s;
    animation-delay: 2.4s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-49 {
    -webkit-animation-delay: 2.45s;
    animation-delay: 2.45s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}

.macwk-animation .delay-50 {
    -webkit-animation-delay: 2.5s;
    animation-delay: 2.5s;
    -webkit-animation-fill-mode: backwards !important;
    animation-fill-mode: backwards !important;
}
.PipelineNotification ::v-deep {
}
</style>
