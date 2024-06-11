<template>
    <div class="">
        <el-divider content-position="left"><h3>基本用法</h3></el-divider>
        <div>
            根据《中华人民共和国行政处罚法》
            <inline-input v-model="content1" placeholder="请输入" :disabled="true" />
            的规定，你（单位）依法享有陈述、申辩的权利。如你（单位）对本机关拟作出行政处罚决定的事实、理由、依据及内容等有异议的，应在收到本告知书起5个工作日内向本机关提出书面陈述、申辩意见，或到本机关进行口头陈述、申辩。逾期不提供陈述、申辩意见，本机关将依法作出行政处罚决定。
            如不服本处罚决定，可以在收到本决定书之日起 60日内向
            <inline-input v-model="content2" placeholder="请输入机关名称" :default-length="7" />
            申诉,
            <inline-input :readonly="true" placeholder="我是只读模式" :default-length="7" />
            xxxx
        </div>
        <br />

        <el-divider content-position="left">
            <h3>允许换行，限制最多300字</h3>
        </el-divider>
        <div>
            <p>汇报案件情况：</p>
            <inline-input v-model="content3" placeholder="请输入案件情况" :max-length="300" :allow-newline="true" />
        </div>
        <br />

        <el-divider content-position="left">
            <h3>输入数字</h3>
        </el-divider>
        <div>
            罚款
            <inline-input type="number" v-model="content4" placeholder="最多两位小数" :default-length="7" :decimals="2" />
            接到通知
            <inline-input type="number" v-model="content5" placeholder="请输入天数" :default-length="7" />
            日内可申诉
        </div>
        <br />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import InlineInput from '@/components/inline-input/index.vue'

@Component({
    components: { InlineInput },
})
export default class BaseDemo extends Vue {
    content1 = '第一条'
    content2 = ''
    content3 = `违法事实:XXXX年X月X日，我厅(局) 执法人员XXX、XXX对XXX公司进行执法检查，发现该公司正在进行XXX生产，(陈述违法享实)。以上事实，有如下证据为证：
1、营业执照复印件1份、居民身份证复印件1份，证明·..···的身份;
2、XXXX年X月X日现场检查(勘察)笔录1份，证明··.···的情况;
3、XXXX年X月X日现场照片证据8张，证明·..·.·的情况;
4、XXXX年X月X日调查询问笔录1份，证明·..···的情况:
5、《当享人送达地址确认书》1份，证明·...·.·的情况;
6、执法人员的执\法证2份、采样资格证复印件2份，证明·....·的身份和资格        `
    content4 = ''
    content5 = ''

    mounted() {}
}
</script>

<style lang="less" scoped>
p,
h3 {
    margin: 0;
}
</style>
