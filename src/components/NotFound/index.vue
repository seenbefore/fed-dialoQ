<template>
    <div class="sg-page">
        <div class="my-error-page">
            <div class="wrapper">
                <div>
                    <img src="@/assets/images/admin/building.png" alt="" />
                    <p class="summary">
                        抱歉，您请求的页面不存在
                    </p>
                    <!-- <a class="button" href="/">返回首页</a> -->
                </div>
            </div>
        </div>

        <!-- <p class="footer">Powered by CODING DevOps</p> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'NotFound',
    components: {},
})
export default class NotFound extends Vue {}
</script>

<style lang="less" scoped></style>
