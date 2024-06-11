<template>
    <div class="my-image-class">
        <div ref="ref_container" class="my-image-wrapper" :style="styleOuter">
            <div v-if="showContainer" class="my-image-container" :style="styleContainer">
                <transition name="el-fade-in">
                    <img v-if="showImg" class="my-image-inner" :class="imgClass" v-bind="$attrs" :src="src" :style="styleImg" :draggable="false" />
                </transition>
            </div>
        </div>
        <!-- 工具条 -->
        <ToolBar @click="handleAction" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ToolBar from './ToolBar.vue'
import { IPreviewConfig, ENUM_ACTION } from './config'
import { debounce } from 'lodash'
import { FilePreviewDB } from '../db'

const initConfig = (): IPreviewConfig => ({
    scale: 1,
    angle: 0,
})

@Component({
    name: 'ImageView',
    components: {
        ToolBar,
    },
})
export default class ImageView extends Vue {
    $refs!: any

    /** 图片链接 */
    @Prop({ default: '' }) src!: string
    /** 远程服务器地址 */
    @Prop({ default: '' }) url!: string
    /** 图片显示方式 */
    @Prop({ default: 'contain' }) fit!: string
    /** 使用数据库 */
    @Prop({ default: false }) useDb!: boolean
    /** 数据库配置 */
    @Prop({ default: () => ({}) }) dbConfig!: Record<string, any>

    created() {
        if (!this.useDb) {
            this.sImg = true
        } else {
            this.DataBase = new FilePreviewDB({
                ...this.dbConfig,
                success: () => {
                    this.getDbConfig()
                },
            })
        }
    }

    mounted() {
        this.imgResize()
    }

    DataBase: any = null

    imgLoadad = false

    sImg = false
    get showImg() {
        return Boolean(this.src) && this.sImg
    }
    get showContainer() {
        return !this.imgLoadad
    }

    @Watch('src')
    onSrcChange() {
        this.imgLoadad = true
        this.imgResize()
        setTimeout(() => {
            this.imgLoadad = false
        })
    }

    get databaseKey() {
        return this.url || this.src
    }

    @Watch('databaseKey')
    onWatchDatabaseKey() {
        this.getDbConfig()
    }

    imgBaseSize = {
        width: 0,
        height: 0,
    }

    transTime = ''
    get styleContainer() {
        const { width: bw, height: bh } = this.imgBaseSize
        const { scale, angle } = this.previewConfig
        let width = scale * bw
        let height = scale * bh
        const tranStr: string[] = [`rotate(${angle}deg)`]
        if (angle % 180 !== 0) {
            const min = Math.min(width, height)
            width = height = min
        }
        const transform = tranStr.join(' ')
        const style = {
            width: `${width}px`,
            height: `${height}px`,
            transform,
            transition: this.transTime,
        }
        return style
    }

    get styleImg() {
        const style = {
            'object-fit': this.fit,
        }
        return style
    }

    get imgClass() {
        const cls: string[] = []
        return cls
    }

    get styleOuter() {
        const style: any = {}
        this.overHidden && (style.overflow = 'hidden')
        return style
    }

    previewConfig: any = initConfig()

    imgResize() {
        const rect = this.$refs.ref_container.getBoundingClientRect()
        this.imgBaseSize.width = rect.width
        this.imgBaseSize.height = rect.height
    }
    /** 获取缓存数据 */
    async getDbConfig() {
        this.previewConfig = initConfig()
        try {
            if (this.useDb && this.databaseKey) {
                const config = await this.DataBase.getImgConfig(this.databaseKey)
                if (config) {
                    Object.entries(config).forEach(([key, val]: any) => {
                        this.$set(this.previewConfig, key, val)
                    })
                }
            }
        } catch (error) {
            console.error(error)
        }
        this.sImg = true
    }

    scaleStep = 0.2
    rotateStep = 90

    startTrans() {
        this.transTime = '0.2s'
        setTimeout(() => {
            this.transTime = ''
        }, 200)
    }
    handleAction(action: string) {
        if (action !== ENUM_ACTION.RESET) {
            this.startTrans()
        }
        switch (action) {
            case ENUM_ACTION.ZOOMOUT:
                if (this.previewConfig.scale > 0.4) {
                    this.previewConfig.scale -= this.scaleStep
                }
                break
            case ENUM_ACTION.ZOOMIN:
                if (this.previewConfig.scale < 3) {
                    this.previewConfig.scale += this.scaleStep
                }
                break
            case ENUM_ACTION.ROTATELEFT:
                this.previewConfig.angle -= this.rotateStep
                break
            case ENUM_ACTION.ROTATERIGHT:
                this.previewConfig.angle += this.rotateStep
                break
            case ENUM_ACTION.RESET:
                this.previewConfig = initConfig()
                break
        }
        Object.entries(this.previewConfig).forEach(([key, val]: any) => {
            let value = val
            if (key === 'scale') {
                value = Math.floor(val * 10) / 10
            } else if (key === 'angle') {
                value = Math.floor(val)
            }
            this.previewConfig[key] = value
        })
        this.useDb && this.hanldeUpdateDb()
        // 样式
        this.overHidden = true
        this.handleAni()
    }

    overHidden = false

    handleAni = debounce(function() {
        this.overHidden = false
    }, 250)

    /** 修改数据库存储配置 */
    hanldeUpdateDb() {
        this.DataBase.addImgConfig({
            storeKey: this.databaseKey,
            config: this.previewConfig,
        })
    }
}
</script>

<style scoped lang="less">
.my-image-class {
    width: 100%;
    height: 100%;
    position: relative;
    .my-image-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
        .my-image-container {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            // transition: 0.2s;
            .my-image-inner {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
}
</style>
