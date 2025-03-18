const fs = require('fs')
const path = require('path')

// 获取命令行参数
const args = process.argv.slice(2)
const componentName = args[0]
const componentType = args[1] || 'basic' // 默认为基础组件

if (!componentName) {
    console.error('请提供组件名称')
    process.exit(1)
}

// 检查组件类型是否有效
if (!['basic', 'business'].includes(componentType)) {
    console.error('组件类型必须是 basic 或 business')
    process.exit(1)
}

// 组件目录路径
const componentDir = path.resolve(__dirname, '../src/components', componentType, componentName)

// 创建组件目录
try {
    fs.mkdirSync(componentDir, { recursive: true })
    fs.mkdirSync(path.join(componentDir, 'demo'))
} catch (err) {
    console.error('创建目录失败:', err)
    process.exit(1)
}

// 读取模板文件
const readTemplate = filename => {
    return fs.readFileSync(path.resolve(__dirname, '../src/components', filename), 'utf-8')
}

// 替换模板中的占位符
const replaceTemplate = (content, replacements) => {
    return Object.entries(replacements).reduce((acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value), content)
}

try {
    // 创建组件文件
    const indexContent = `<template>
  <div class="${componentName.toLowerCase()}">
    <!-- 组件内容 -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: '${componentName}'
})
export default class ${componentName} extends Vue {
    // 组件逻辑
}
</script>

<style lang="less" scoped>
.${componentName.toLowerCase()} {
    // 组件样式
}
</style>`

    fs.writeFileSync(path.join(componentDir, 'index.vue'), indexContent)

    // 创建类型定义文件
    const dtsContent = `import { VueConstructor } from 'vue'

export declare class ${componentName} extends Vue {
    // 在这里定义组件的属性和方法
}

export declare const ${componentName}Constructor: VueConstructor<${componentName}>

export default ${componentName}Constructor`

    fs.writeFileSync(path.join(componentDir, 'index.d.ts'), dtsContent)

    // 创建文档文件
    const readmeTemplate = readTemplate('README.template.md')
    const readmeContent = replaceTemplate(readmeTemplate, {
        ComponentName: componentName,
    })
    fs.writeFileSync(path.join(componentDir, 'README.md'), readmeContent)

    // 创建示例文件
    const demoTemplate = readTemplate('demo.template.vue')
    const demoContent = replaceTemplate(demoTemplate, {
        'component-name': componentName.toLowerCase(),
        ComponentName: componentName,
    })
    fs.writeFileSync(path.join(componentDir, 'demo/demo1.vue'), demoContent)

    console.log(`组件 ${componentName} 创建成功！`)
    console.log(`目录: ${componentDir}`)
    console.log('请开始编写你的组件代码。')
} catch (err) {
    console.error('创建组件文件失败:', err)
    process.exit(1)
}
