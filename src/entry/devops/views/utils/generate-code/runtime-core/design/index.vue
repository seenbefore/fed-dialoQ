<script lang="ts">
import { DeleteModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/DeleteModelCommand'
import { UpdateActiveModelCommand } from '@/entry/devops/views/utils/generate-code/core/command/commands/UpdateActiveModelCommand'
import { createCommand } from '@/entry/devops/views/utils/generate-code/core/command/createCommand'
import { useCopy } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/useCopy'
import { useDomEvent } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/useDomEvent'
import { useUndoRedo } from '@/entry/devops/views/utils/generate-code/runtime-core/design/hooks/useUndoRedo'
import { designComponents } from '@/entry/devops/views/utils/generate-code/runtime-core/design/installDesignComponent'
import { UseApplication } from '@/entry/devops/views/utils/generate-code/runtime-core/hooks/UseApplication'
import { Component, Ref } from 'vue-property-decorator'

@Component({
    name: 'GenerateDesign',
    components: {
        ...designComponents,
    },
})
export default class GenerateDesign extends UseApplication {
    @Ref('designContainerRef')
    public designContainerRef!: HTMLDivElement

    public get activeType() {
        return this.app.configurationManage.config.type
    }

    public placeholderStacks: Array<HTMLElement> = []

    public clearEventHandlers: (...args: any) => any = () => void 0

    public popPlaceholder(): void {
        const pop = this.placeholderStacks.pop()
        pop && pop.classList.remove(this.CLASS_NAME_CONST_DATA.PLACEHOLDER_CLASS_NAME)
    }

    /* 修改placeholder的位置信息 */
    public updatePlaceholderPosition(domId: string): void {
        const currentTarget = document.querySelector('[data-id="' + domId + '"]') as HTMLElement
        if (currentTarget) {
            this.popPlaceholder()
            currentTarget.classList.add(this.CLASS_NAME_CONST_DATA.PLACEHOLDER_CLASS_NAME)
            this.placeholderStacks.push(currentTarget)
        } else {
            this.hiddenPlaceholder()
        }
    }

    public hiddenPlaceholder(): void {
        this.popPlaceholder()
    }

    public deleteHandler(event: KeyboardEvent): void {
        const { code, currentTarget } = event
        if (this.designContainerRef.contains(currentTarget as HTMLElement)) {
            if (this.activeModel && (code === 'Backspace' || code === 'Delete')) {
                createCommand(DeleteModelCommand, this.activeModel)
                const nextActiveModel = this.app.dataStore.getNextActiveModel(this.activeModel)
                if (!nextActiveModel) {
                    this.hiddenPlaceholder()
                } else {
                    createCommand(UpdateActiveModelCommand, nextActiveModel)
                }
            }
        }
    }

    public initEvents(): void {
        const { clear, addEvent } = useDomEvent()

        /* 按下删除按钮的时候删除模块 */
        addEvent(this.designContainerRef, 'keydown', this.deleteHandler)

        const { clearCopyEvents } = useCopy()
        const { clearUndoRedoEvents } = useUndoRedo()

        this.clearEventHandlers = () => {
            clear()
            clearCopyEvents()
            clearUndoRedoEvents()
        }
    }

    public clearActiveModel(event: PointerEvent): void {
        const designContainer = this.designContainerRef?.firstChild
        if (event.target === designContainer || event.target === this.designContainerRef) {
            if (this.activeModel) {
                createCommand(UpdateActiveModelCommand, void 0 as any)
                this.hiddenPlaceholder()
            }
        }
    }

    public mounted() {
        this.initEvents()
    }

    public beforeDestroy(): void {
        this.clearEventHandlers()
    }
}
</script>

<template>
    <div ref="designContainerRef" class="design__container" tabindex="0" @click="clearActiveModel">
        <component :is="activeType" @updatePlaceholderPosition="updatePlaceholderPosition"></component>
    </div>
</template>

<style lang="less" scoped>
.design {
    &__container {
        width: 100%;
        height: 100%;
        outline: none;

        ::v-deep {
            .dragenter__container {
                background-color: #e8f8ff !important;

                & > div {
                    background-color: #e8f8ff !important;
                }
            }

            .__placeholder-class {
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    border: 1px solid #0366f1;
                    pointer-events: none;
                    left: 0;
                    top: 0;
                    z-index: 2024;
                    box-sizing: border-box;
                }
            }

            .app-wrapper {
                &__container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgb(234, 240, 249);
                    padding: 20px 0;
                }

                &__body {
                    width: 414px;
                    height: 100%;
                    background-color: rgb(243, 245, 247);
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgb(216, 219, 224);
                }
            }
        }
    }
}
</style>
