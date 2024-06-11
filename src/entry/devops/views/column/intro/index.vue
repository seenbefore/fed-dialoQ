<!--  -->
<template>
    <div class="ColumnIntro">
        <div class="content">
            <div class="article-item-not-buy" v-for="(item, index) in dataList" :key="index">
                <div class="left">
                    <div>
                        <div class="text" v-html="item.title" @click="redirect(item)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import axios from 'axios'
const dataList = [
    { id: 0, title: '0 开篇词 | 你为什么需要学管理？.json' },
    { id: 1, title: '01  | 多年前的那些工程师都去哪了？.json' },
    { id: 2, title: '02  | 我要不要做管理呢？内心好纠结！.json' },
    { id: 3, title: '03 | 哪些人比较容易走上管理岗位？.json' },
    { id: 4, title: '04 | 我要不要转回去做技术呢？.json' },
    { id: 5, title: '05 | 作为技术管理者，我如何保持技术判断力？.json' },
    { id: 6, title: '06 | 我这样的风格能做管理吗？.json' },
    { id: 7, title: '07 | 我能做好管理吗，大家服我吗？.json' },
    { id: 8, title: '08 | 管理到底都做哪些事儿？.json' },
    { id: 9, title: '09 | 从工程师到管理者，角色都发生了哪些变化？.json' },
    { id: 10, title: '10 | 新经理常踩的坑儿有哪些？.json' },
    { id: 11, title: '11 | 我刚开始带团队，从哪里着手呢？.json' },
    { id: 12, title: '12 | 如何界定我团队是干什么的呢？.json' },
    { id: 13, title: '13 | 如何为团队设定合理的目标呢？.json' },
    { id: 14, title: '14 | 如何来规划团队的组织结构呢？.json' },
    { id: 15, title: '15 | 我都要申请哪些资源呢？.json' },
    { id: 16, title: '16 | 团队建设该从哪里入手？.json' },
    { id: 17, title: '17 | 如何提升员工的个人能力？.json' },
    { id: 18, title: '18 | 如何提升员工的工作意愿和积极性？.json' },
    { id: 19, title: '19 | 如何兼顾团队分工的稳定性和灵活性？.json' },
    { id: 20, title: '20 | 有什么方法可以有效提升团队凝聚力吗？.json' },
    { id: 21, title: '21 | 如何物色和培养核心人才？.json' },
    { id: 22, title: '22 | 如何建设团队文化，营造团队氛围？.json' },
    { id: 23, title: '23 | 如何和低绩效员工谈绩效？.json' },
    { id: 24, title: '24 | 如何让团建活动不再“收效甚微”？.json' },
    { id: 25, title: '25 | 多任务并行该如何应对？.json' },
    { id: 26, title: '26 | 如何确保项目的有效执行？.json' },
    { id: 27, title: '27 | 如何让流程机制得到有效的执行？.json' },
    { id: 28, title: '28 | 管理沟通那些事儿.json' },
    { id: 29, title: '29 | 沟通经常鸡同鸭讲，说不到一块怎么办？.json' },
    { id: 30, title: '30 | 如何掌控自己的情绪，以及如何管理情绪化的员工？.json' },
    { id: 31, title: '31 | 我各方面做得都很好，就是做不好向上沟通.json' },
    { id: 32, title: '32 | 横向沟通和非职权影响力.json' },
    { id: 33, title: '33 | 向下沟通的常见实例解析.json' },
    { id: 34, title: '34 | 管理沟通上有哪些常见的坑儿呢？.json' },
    { id: 35, title: '35 | 从空降谈管理方法论的积累.json' },
    { id: 36, title: '36 | 走出自己的管理之路.json' },
    { id: 37, title: '复习课（一） | 管理方法论和角色认知.json' },
    { id: 38, title: '复习课（三） | 团队建设.json' },
    { id: 39, title: '复习课（二） | 管理规划.json' },
    { id: 40, title: '复习课（五） | 管理沟通.json' },
    { id: 41, title: '复习课（四） | 任务管理.json' },
]

@Component({
    name: 'ColumnIntro',
    components: {},
})
export default class ColumnIntro extends Vue {
    dataList = dataList
    async mounted() {
        // const { data } = await axios.get(`/json/${list[0].title}`)
        // console.log(1, data)
    }
    redirect(item: any) {
        let routeUrl = this.$router.resolve({
            path: `/column/article/${item.id}`,
        })
        window.open(routeUrl.href, '_blank')
    }
}
</script>

<style lang="less" scoped>
.ColumnIntro ::v-deep {
    .article-item-not-buy {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: flex-start;
        margin-left: 20px;
        padding: 15px 15px 15px 0;
        box-shadow: inset 0 -1px 1px -1px #ccc;
        margin-top: 10px;
        padding-top: 15px;
        margin-left: 17px;
    }
    .left {
        flex: 1 1 auto;
        margin-right: 10px;
    }
    .text {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #404040;
        cursor: pointer;
    }
    .read-time {
        margin-top: 7px;
        font-size: 12px;
        color: #888;
        line-height: 16px;
    }
}
</style>
