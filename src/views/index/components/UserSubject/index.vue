<template>
    <div class="user-subject">
        <template v-if="subjectList.length">
            <div class="user-top">切换主体</div>
            <div class="user-middle">
                <el-radio-group v-model="current">
                    <el-radio tabindex="0" :label="item.deptCode" v-for="item in subjectList" :key="item.orgShortName" class="middle-item">
                        <span class="middle-text">是卡迪拉克打了卡SDK拉萨到拉萨打打SD卡了多少</span>
                    </el-radio>
                </el-radio-group>
            </div>
        </template>
        <template v-else>
            <div></div>
        </template>
        <div class="user-bottom">
            <!-- <div class="item" @click="handleEdit">修改信息</div>
            <div class="item" @click="handlePasswordEdit">修改密码</div> -->

            <div class="item" @click="logOut">退出</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { userStore } from '@/store/useStore'

@Component({
    name: 'UserSubject',
    components: {},
})
export default class UserSubject extends Vue {
    subjectList: any = []
    current = ''
    logOut() {
        //this.$router.push('/logout')
        userStore.fedLogOut()
    }
    handlePasswordEdit() {
        this.$modalDialog(() => import('@/components/UserPasswordDialog/index.vue')).then(() => {
            setTimeout(() => {
                this.logOut()
            }, 1000)
        })
    }
    handleEdit() {
        // this.$modalDialog(
        //     () =>
        //         import(
        //             /* webpackChunkName: "UserEditDialog" */ '@/components/UserEditDialog/index.vue'
        //         ),
        //     {
        //         title: '请补全用户信息',
        //         isEdit: true,
        //     },
        // ).then(() => {})
    }
}
</script>

<style lang="less" scoped>
.user-subject {
    z-index: 100;
    max-width: 290px;
    background: #ffffff;
    .user-top {
        display: flex;
        align-items: center;
        margin: 0 10px;
        height: 39px;
        border-bottom: 1px dashed #d2dbe8;
        color: #404956;
        text-align: left;
        letter-spacing: 0em;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }
    .user-middle {
        box-sizing: border-box;

        padding: 10px 0;
        //   height: 100px;
        max-width: 370px;
        border-bottom: 1px solid #d2dbe8;
        .el-radio {
            white-space: normal;
        }
        .middle-item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-right: 10px;
            padding-left: 10px;
            min-height: 26px;
            width: 100%;

            .middle-text {
                display: -webkit-box; /* 对象作为伸缩盒子模型显示 */

                overflow: hidden;

                color: #404956;
                text-align: left;
                text-overflow: ellipsis; /* 超出部分省略号 */
                word-break: break-all; /* break-all(允许在单词内换行。) */
                letter-spacing: 0em;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
                -webkit-line-clamp: 2; /* 显示的行数 */
                &:hover {
                    color: var(--color-primary);
                }
            }
        }
    }
    .user-no-find {
        padding: 10px;
        border-bottom: 1px solid #d2dbe8;
        font-size: 14px;
    }
    .user-bottom {
        box-sizing: border-box;
        padding: 10px 0;
        .item {
            display: flex;
            align-items: center;
            padding: 0 10px;
            height: 30px;
            color: #404956;
            text-align: left;
            letter-spacing: 0em;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            cursor: pointer;
            &:hover {
                background: #d4e8fd;
                color: var(--color-primary);
            }
        }
    }
}
</style>
