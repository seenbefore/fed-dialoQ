import { Application } from '@/entry/devops/views/utils/generate-code/core/Application'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { AbstractBaseDataStore } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { CommandKeyEnum } from '@/entry/devops/views/utils/generate-code/core/sources/CommandKeyEnum'
import { initDropzone } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/useInteract'
import { CLASS_NAME_CONST_DATA, toPx } from '@/entry/devops/views/utils/generate-code/runtime-core/utils'
import { Component, InjectReactive, Vue } from 'vue-property-decorator'

@Component
export class UseDesign<T extends AbstractBaseDataStore<any, any, any>> extends Vue {
    @InjectReactive('app')
    public app!: Application

    /* 当前激活的模块 */
    public get activeModel() {
        return this.app.dataStore.activeModel
    }

    public get dataStore(): T {
        return this.app.getDataStore<T>()
    }

    public readonly INTERACT_CONST_DATA = CLASS_NAME_CONST_DATA

    public addByTarget<T extends string = string, U extends HTMLElement = HTMLElement>(type: T, target: U): void {
        const domId = target.getAttribute('data-id')
        let parent
        if (domId) {
            parent = this.app.dataStore.findByDomId(domId)
        }
        this.app.dataStore.createModel(type, void 0, parent)
    }

    public beforeUpdatePlaceholderPosition(): void {
        /* 为了给子类在修改placeholder之前触发的事件 */
    }

    public listenUpdateView(): void {
        this.app.commandManage.on(CommandKeyEnum.ON_UPDATE_VIEW, () => {
            this.beforeUpdatePlaceholderPosition()
            this.$nextTick(() => {
                this.updatePlaceholderPosition(this.app.dataStore.activeModel?.domId)
            })
        })
    }

    public mounted() {
        /* 添加外层 */
        initDropzone((type, { currentTarget }) => {
            this.addByTarget(type, currentTarget)
        })

        this.listenUpdateView()
    }

    public updatePlaceholderPosition(domId?: string): void {
        this.$emit('updatePlaceholderPosition', domId)
    }

    public clickHandler(event: PointerEvent): void {
        const currentTarget = event.currentTarget as HTMLElement
        const domId = currentTarget.getAttribute('data-id')
        if (domId) {
            const model = this.app.dataStore.findByDomId(domId)
            if (model && model.id !== this.activeModel?.id) {
                createCommand(UpdateActiveModelCommand, model)
            }
        }
    }
}
