<template>
    <div class="app-loader">
        <ic-loading v-if="loading"></ic-loading>
        <template v-if="status === ''">
            <div>准备</div>
        </template>
        <template v-else-if="status === 'error'">
            <div>数据异常</div>
        </template>
        <template v-else-if="status === 'empty'">
            <div>暂无数据</div>
        </template>
        <template v-else-if="status === 'success'">
            <slot :list="list"></slot>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'AppLoader',
    components: {},
})
export default class AppLoader extends Vue {
    @Prop() load!: any
    loading = false
    list: any = []
    status = ''
    async reload() {
        if (typeof this.load === 'function') {
            try {
                this.loading = true
                this.list = []
                this.status = ''
                const { result } = await this.load()
                if (result.length) {
                    this.status = 'success'
                    this.list = result
                } else {
                    this.status = 'empty'
                }
                this.loading = false
            } catch (err) {
                console.error(err)
                this.status = 'error'
                this.loading = false
            }
        }
    }
    async created() {
        this.reload()
    }
}
</script>

<style lang="less" scoped></style>
