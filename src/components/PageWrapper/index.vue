<template>
    <div class="sg-page sg-p-0 ">
        <section class="sg-card">
            <div class="sg-card-header " v-if="title != null">
                <div class="sg-flex-1">
                    <slot name="title">
                        <div class="sg-card-title" v-text="title"></div>
                    </slot>
                </div>
                <div>
                    <slot name="extra"></slot>
                </div>
            </div>

            <div class="sg-card-body sg-pl-3 sg-pr-3">
                <slot></slot>
            </div>
            <div class="sg-card-footer">
                <slot name="footer"></slot>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'PageWrapper',
    components: {},
})
export default class PageWrapper extends Vue {
    @Prop({ default: '' }) title!: string
    mounted() {}
}
</script>

<style lang="less" scoped></style>
