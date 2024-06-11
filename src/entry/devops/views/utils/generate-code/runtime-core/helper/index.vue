<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    name: 'GenerateHelper',
})
export default class GenerateHelper extends Vue {}
</script>

<template>
    <el-tooltip effect="dark" placement="top">
        <template #content>
            <div>
                <p>
                    1、快捷键：
                    <span class="color-red">ctrl + c</span>
                    可以复制组件（注意：
                    <span class="color-orange">数据不会复制到剪切板，只会复制在内存中</span>
                    ）。
                    <span class="color-red">ctrl + v</span>
                    可以粘贴到当前激活的组件内，无激活组件则复制在最外层。
                </p>
                <p>
                    2、快捷键：
                    <span class="color-red">ctrl + z</span>
                    可以撤销操作，
                    <span class="color-red">ctrl + y</span>
                    恢复操作
                </p>
                <p>
                    3、快捷键： Mac 系统使用：
                    <span class="color-red">Backspace，</span>
                    Windows系统使用：
                    <span class="color-red">Delete</span>
                    可以删除选中的组件。
                </p>
                <p>
                    4、为了避免快捷键影响到其他地方，所以快捷键执行内部判断了来源。所以如果发现快捷键失效的情况可以
                    <span class="color-red">点击下方空白处在执行快捷键！</span>
                </p>
            </div>
        </template>
        <i class="el-icon-question ml-10"></i>
    </el-tooltip>
</template>

<style scoped lang="less">
.color-red {
    color: #f4333c;
    font-weight: 800;
}

.color-orange {
    color: #ff7d00;
    font-weight: 800;
}
</style>
