<template>
    <div style="height: 600px; width: 100%;">
        <my-chat model-name="自定义AI模型" :user-avatar-url="userAvatar" :ai-avatar-url="aiAvatar" :welcome-message="welcomeMessage" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyChat from '../index.vue'

@Component({
    name: 'CustomDemo',
    components: {
        MyChat,
    },
})
export default class CustomDemo extends Vue {
    userAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    aiAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    welcomeMessage = '您好！我是自定义AI助手，请问有什么可以帮您？\n\n我可以：\n1. 回答各类问题\n2. 帮助您完成写作\n3. 提供专业建议'
}
</script>
