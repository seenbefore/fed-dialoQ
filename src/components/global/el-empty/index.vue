<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'ElEmpty',
})
export default class ElEmpty extends Vue {
    @Prop({ type: String, default: '暂无数据' })
    public description!: string

    @Prop({ type: String, default: '80' })
    public imageSize!: string

    @Prop({
        type: String,
        default:
            'data:image/png;base64,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',
    })
    public image!: string
}
</script>

<template>
    <div class="el-empty">
        <div class="el-empty__image" :style="{ width: imageSize + 'px', height: imageSize + 'px' }">
            <svg v-if="!image" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
                        <path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" />
                        <path
                            d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                            fill="url(#linearGradient-1)"
                            transform="translate(13.56)"
                        />
                        <path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" />
                        <path
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                            fill="#DCE0E6"
                        />
                    </g>
                    <path
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        fill="#DCE0E6"
                    />
                    <g fill="#FFF" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <img v-else :src="image" :alt="description" />
        </div>
        <div class="el-empty__description">
            <slot>
                <span>{{ description }}</span>
            </slot>
        </div>
        <div v-if="$slots.default" class="el-empty__bottom">
            <slot name="default"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.el-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    box-sizing: border-box;
    padding: 20px 0;

    &__image {
        color: var(--el-empty-icon-color, #c0c4cc);
        font-size: 0;
        vertical-align: middle;
    }

    &__description {
        margin: 5px 0 0;
        font-size: 14px;
        color: var(--el-text-color-secondary, #909399);
    }

    &__bottom {
        margin-top: 10px;
    }
}
</style>
