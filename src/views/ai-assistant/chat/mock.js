import { mock } from 'mockjs'

export default [
    {
        name: '/chat/sessions',
        method: 'get',
        description: '获取会话列表',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        title: '新对话',
                        lastMessage: '您好！我是Claude，一个AI助手。很高兴为您服务。',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 1,
                        isFavorite: false,
                        isTop: false,
                    },
                    {
                        id: '2',
                        title: 'Vue3源码解析',
                        lastMessage: '让我们继续分析Vue3的响应式系统实现原理',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 12,
                        isFavorite: true,
                        isTop: true,
                    },
                    {
                        id: '3',
                        title: 'TypeScript进阶',
                        lastMessage: '泛型和类型体操是TypeScript的精髓所在',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 8,
                        isFavorite: false,
                        isTop: false,
                    },
                ],
                message: '获取成功',
            })
        },
    },
    {
        name: '/chat/messages',
        method: 'get',
        description: '获取会话消息列表',
        onMock(opt, query) {
            const { sessionId } = query
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        sessionId,
                        sender: 'user',
                        content: '你好，请问你是谁？',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                    {
                        id: '2',
                        sessionId,
                        sender: 'ai',
                        content: '您好！我是Claude，一个AI助手。我擅长编程开发、文本创作、数据分析等工作。我会用专业且友���的方式来协助您，请问有什么我可以帮您的吗？',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                    {
                        id: '3',
                        sessionId,
                        sender: 'user',
                        content: '能帮我写一个Vue3的组件吗？需要实现一个带搜索的下拉选择框',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                    {
                        id: '4',
                        sessionId,
                        sender: 'ai',
                        content: `好的，这是一个基于Vue3的可搜索下拉选择框组件示例：

\`\`\`vue
<template>
  <div class="searchable-select">
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="请输入关键词搜索"
      @focus="showOptions = true"
    />
    <div v-show="showOptions" class="options-container">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="option-item"
        :class="{ 'active': option.value === modelValue }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
      <div v-if="filteredOptions.length === 0" class="no-data">
        无匹配数据
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const showOptions = ref(false)

const filteredOptions = computed(() => {
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  showOptions.value = false
  searchQuery.value = ''
}

// 点击外部关闭下拉框
const closeOnClickOutside = (e: MouseEvent) => {
  if (!(e.target as Element).closest('.searchable-select')) {
    showOptions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped>
.searchable-select {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #409eff;
}

.options-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  z-index: 999;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.option-item:hover {
  background: #f5f7fa;
}

.option-item.active {
  color: #409eff;
  font-weight: bold;
  background: #ecf5ff;
}

.no-data {
  padding: 8px 12px;
  color: #909399;
  text-align: center;
}
</style>
\`\`\`

这个组件实现了以下功能：
1. 支持输入关键词过滤选项
2. 使用v-model双向绑定
3. 点击外部自动关闭下拉框
4. 支持键盘操作
5. 响应式布局和过渡动画

使用示例：
\`\`\`vue
<template>
  <searchable-select
    v-model="selected"
    :options="options"
  />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]
</script>
\`\`\``,
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                ],
                message: '获取成功',
            })
        },
    },
    {
        name: '/chat/messages/send',
        method: 'post',
        description: '发送消息',
        onMock(opt, query, body) {
            const { sessionId, content } = body
            // AI回复模板
            const replies = [
                '我理解您的问题。让我来详细解答：\n\n${content}\n\n希望这个解答对您有帮助。如果您还有任何疑问，请随时告诉我。',
                '这是一个很好的问题。我的看法是：\n\n${content}\n\n您觉得这样的解释清晰吗？',
                '让我从以下几个方面来分析：\n\n${content}\n\n如果需要更详细的解释，我很乐意为您进一步说明。',
                '根据我的理解，这个问题的关键在于：\n\n${content}\n\n您对这个观点有什么想法吗？',
                '我来为您分析一下：\n\n${content}\n\n希望这个答案对您有帮助。',
            ]

            // 随机选择一个回复模板
            const template = replies[Math.floor(Math.random() * replies.length)]
            const reply = template.replace('${content}', content)

            return mock({
                code: 200,
                data: {
                    id: '@id',
                    sessionId,
                    sender: 'ai',
                    content: reply,
                    createTime: new Date()
                        .toLocaleString('zh-CN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                        })
                        .replace(/\//g, '-'),
                    status: 'completed',
                },
                message: '发送成功',
            })
        },
    },
    {
        name: '/chat/sessions/delete',
        method: 'post',
        description: '删除会话',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
]
