<template>
    <div class="sg-img-code" @click="onLoad">
        <div class="sg-img-code__content" v-loading="loading">
            <template v-if="isError">
                <slot name="error">加载失败</slot>
            </template>
            <template v-else>
                <img :src="code" alt="" v-if="code" class="sg-img-code__image" />
            </template>
        </div>
        <div class="sg-img-code__tip">{{ tip }}</div>
    </div>
</template>

<script>
export default {
    name: 'SgImgCode',
    props: {
        // 是否自动加载
        auto: {
            type: Boolean,
            default: true,
        },
        // 提示
        tip: {
            type: String,
            default: '看不清？换一张',
        },
        // 请求函数
        load: {
            type: Function,
            default() {
                return Promise.resolve('')
            },
        },
    },
    data() {
        return {
            code: '',
            loading: false,
            isError: false,
        }
    },
    created() {},
    mounted() {
        this.auto && this.onLoad()
    },
    methods: {
        onLoad() {
            if (!this.loading) {
                this.loading = true
                this.isError = false
                return this.load()
                    .then(res => {
                        this.loading = false
                        this.code = res
                    })
                    .catch(err => {
                        this.loading = false
                        this.isError = true
                    })
            }
        },
    },
}
</script>
