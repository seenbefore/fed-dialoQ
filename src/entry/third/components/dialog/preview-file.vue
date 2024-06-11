<!-- 查看授权书 -->
<template>
    <el-dialog class="sg-dialog" visible :fullscreen="!hasPdf" title="预览" :close-on-click-modal="false" @close="cancel" v-loading="loading">
        <div class="dialog-body">
            <template v-if="hasPdf">
                <el-link class="file" v-for="item in fileList" :key="item" type="primary" :href="item" target="_blank">{{ item }}</el-link>
            </template>
            <el-carousel v-else arrow="always" :autoplay="false">
                <el-carousel-item v-for="item in fileList" :key="item">
                    <img class="img" :src="item" alt="" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'EditUser',
    props: {
        id: {
            type: String,
            default: '',
        },
        authUrl: {
            // 授权书
            type: String,
            default: '',
        },
        authName: {
            // 授权书
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: false,
            file: '',
            fileList: [],
            url: '',
        }
    },
    computed: {
        // 是否有pdf文件
        hasPdf() {
            return this.fileList.some(v => v.endsWith('pdf'))
        },
    },
    created() {
        // 获取授权书
        this.getAuthCertificate()
    },
    mounted() {},
    methods: {
        cancel() {
            this.$options.cancel()
        },
        async getAuthCertificate() {
            const res = await this.$http.get('/sysCommon/getHostName')
            this.fileList = [`http://${res.data}/${this.authUrl}`]
        },
        // 申请授权记录
        applyAuth() {
            this.$options.confirm()
        },
    },
}
</script>
<style lang="less" scoped>
.img {
    width: 100%;
    height: 100%;
}
.file {
    margin-right: 15px;
}
/deep/ .el-carousel__container {
    width: 100%;
    height: 80vh;
}
</style>
