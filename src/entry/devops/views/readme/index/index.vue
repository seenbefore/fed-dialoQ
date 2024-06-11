<!--  -->
<template>
    <PageWrapper class="ReadmeIndex column">
        <template #title>
            说明
        </template>
        <section>
            <h3>添加文档</h3>
            <p>在`src/docs/readme`下新增markdown文件，文件名使用 PascalCase 命名法比如`PageTab`</p>

            <h3>添加案例</h3>
            <p>
                在`src/docs/demo`下新增vue文件，文件名使用 PascalCase 命名法比如`PageTab`
            </p>

            <h3>如何访问</h3>
            <p>
                在`menus.ts` 新增菜单 `${host}readme/PageTab?external=1`，如果需要显示源码则path新增路径`/1`，如`${host}readme/PageTab/1?external=1`
            </p>
            <h3>其他</h3>
            <p>
                其他自定义的组件案例请确保路由配置`meta.parent`为空，`meta.requireAuth`为false，菜单配置参考`${host}comp/file-group-preview?external=1`
            </p>
        </section>
    </PageWrapper>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { MyMixins } from '@/entry/devops/mixins'
@Component({
    name: 'ReadmeIndex',
    components: {},
})
export default class ReadmeIndex extends MyMixins {
    mounted() {}
}
</script>

<style lang="less" scoped>
.ReadmeIndex ::v-deep {
}
</style>
