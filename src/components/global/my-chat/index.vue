<template>
    <div class="sg-page my-chat" :class="{ 'show-settings': showSettings, 'show-history': showHistory }">
        <!-- 当前会话 -->
        <div class="chat-main">
            <div class="chat-header">
                <span class="title">{{ (currentSession && currentSession.title) || '新的对话' }}</span>
                <div class="actions">
                    <el-button type="text" @click="handleHistory">
                        <i class="el-icon-document"></i>
                        历史会话
                    </el-button>
                    <el-button type="text" @click="handleExport">
                        <i class="el-icon-download"></i>
                        导出
                    </el-button>
                    <el-button type="text" @click="handleSettings">
                        <i class="el-icon-setting"></i>
                        设置
                    </el-button>
                </div>
            </div>

            <!-- 消息列表区域 -->
            <div class="chat-messages" ref="messageContainer">
                <template v-for="message in messageList">
                    <div :key="message.id" :class="['message-item', message.sender]">
                        <div class="avatar">
                            <img :src="message.sender === 'user' ? userAvatar : aiAvatar" />
                        </div>
                        <div class="content">
                            <div class="message-content">
                                <template v-if="message.sender === 'ai'">
                                    <div v-html="message.content"></div>
                                </template>
                                <template v-else>
                                    {{ message.content }}
                                </template>
                            </div>
                            <div class="message-meta">
                                <span class="time">{{ message.createTime }}</span>
                                <div class="actions">
                                    <template v-if="message.sender === 'ai'">
                                        <el-button type="text" @click="handleCopy(message)">
                                            <i class="el-icon-document-copy"></i>
                                        </el-button>
                                        <el-button type="text" @click="handleRegenerate(message)">
                                            <i class="el-icon-refresh"></i>
                                        </el-button>
                                    </template>
                                    <template v-else>
                                        <el-button type="text" @click="handleEditMessage(message)">
                                            <i class="el-icon-edit"></i>
                                        </el-button>
                                    </template>
                                    <el-button type="text" danger @click="handleDeleteMessage(message)">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <!-- 加载状态 -->
            <div class="chat-loading" v-if="isLoading">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="loading-text">正在思考...</div>
            </div>

            <!-- 固定的输入区域 -->
            <div class="chat-input">
                <el-input v-model="inputMessage" type="textarea" :rows="3" placeholder="输入消息..." @keyup.enter.native="handleSend" />
                <div class="input-actions">
                    <el-button type="text" @click="handleUpload">
                        <i class="el-icon-upload2"></i>
                    </el-button>
                    <el-button type="text" @click="handleVoiceInput">
                        <i class="el-icon-microphone"></i>
                    </el-button>
                    <el-button type="primary" @click="handleSend">发送</el-button>
                </div>
            </div>
        </div>

        <!-- 右侧历史会话抽屉 -->
        <div class="chat-history" v-show="showHistory">
            <div class="drawer-header">
                <span class="title">历史会话</span>
                <el-button type="text" @click="showHistory = false">
                    <i class="el-icon-close"></i>
                </el-button>
            </div>
            <div class="drawer-content">
                <div class="sidebar-header">
                    <el-button class="new-session-btn" type="primary" icon="el-icon-plus" size="small" @click="handleNewSession">新建会话</el-button>
                </div>
                <div class="session-list">
                    <div class="session-items">
                        <template v-for="session in sessionList">
                            <div :key="session.id" class="session-item" :class="{ active: currentSession && currentSession.id === session.id }" @click="handleSelectSession(session)">
                                <div class="session-title">{{ session.title || '新的对话' }}</div>
                                <div class="session-meta">
                                    <span class="last-message">{{ session.lastMessage }}</span>
                                    <span class="update-time">{{ session.updateTime }}</span>
                                </div>
                                <div class="session-actions">
                                    <el-button type="text" @click.stop="handlePinSession(session)">
                                        <i :class="session.isTop ? 'el-icon-top' : 'el-icon-bottom'"></i>
                                    </el-button>
                                    <el-button type="text" @click.stop="handleFavoriteSession(session)">
                                        <i :class="session.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
                                    </el-button>
                                    <el-button type="text" danger @click.stop="handleDeleteSession(session)">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧设置面板 -->
        <div class="chat-settings" v-show="showSettings">
            <div class="drawer-header">
                <span class="title">设置</span>
                <el-button type="text" @click="showSettings = false">
                    <i class="el-icon-close"></i>
                </el-button>
            </div>
            <div class="drawer-content">
                <sg-base-form ref="settingsForm" v-model="settings" v-bind="getSettingsFormAttrs"></sg-base-form>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch, Ref, Prop } from 'vue-property-decorator'
import { FormColumn, FormRef } from '@/sharegood-ui'
import { MessageStatusEnum, ChatSession, ChatMessage } from './types'
import { generateUUID, copyToClipboard, truncateText } from './utils'
const md = require('markdown-it')({ html: true })

@Component({
    name: 'my-chat',
})
export default class MyChat extends Vue {
    @Ref('settingsForm') settingsForm!: FormRef
    @Ref('messageContainer') messageContainer!: HTMLElement

    /**
     * 默认AI模型名称
     */
    @Prop({ type: String, default: 'DeepSeek Chat' }) readonly modelName!: string

    /**
     * 用户头像URL
     */
    @Prop({ type: String, default: '' }) readonly userAvatarUrl!: string

    /**
     * AI头像URL
     */
    @Prop({ type: String, default: '' }) readonly aiAvatarUrl!: string

    /**
     * 欢迎消息
     */
    @Prop({
        type: String,
        default: '您好！我是AI助手，很高兴为您服务。我可以帮您：\n\n1. 回答问题和解释概念\n2. 提供建议和分析\n3. 协助写作和创作\n4. 代码开发和技术支持\n\n请问有什么我可以帮您的吗？',
    })
    readonly welcomeMessage!: string

    /**
     * 是否显示历史会话列表
     */
    showHistory = false

    /**
     * 当前选中的会话
     */
    currentSession: ChatSession | null = null

    /**
     * 消息列表
     */
    messageList: ChatMessage[] = []

    /**
     * 输入的消息
     */
    inputMessage = ''

    /**
     * 是否显示设置面板
     */
    showSettings = false

    /**
     * 设置面板数据
     */
    settings = {
        model: 'deepseek-chat',
        temperature: 0.7,
        maxLength: 2000,
        contextLength: 5,
    }

    /**
     * 用户头像
     */
    get userAvatar() {
        return (
            this.userAvatarUrl ||
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmMENgjAQRU83cQRGcARGYARGcARGcARGcARGcAQ3cARGsOTSNJTSu9YWEmO4kRDg/p/7e4WQBbYEAsACyAIbIAtsgCywAbLABsgCGyALbIAsGKvwn+v8xZoGNmbVOAvzAPKYD5CF6g2YB5DHfIAs/N6+iHkAecwHyAIbIAtsgCywAbLABsgCGyALbIAssMEGxDFYuOY1FxNQ1uAzV0Gw7uXiUkjVIFwbEGJCXwP2zggXBsS+gWOPAa4MCHkJjz0GeDEg9jVM9hjgw4AhbuLYY4AzA4a6i2WPAU4MGPIyjj0GODVg6Os49hjgxIAULyTYY4ATA1K8kWGPAdYNSPVKij0GWDUg5Ts59hhgzYDULyXZY4AVA+Z4Kx3MHgOED5jzvXwQewwQOmBOAwaxB4nGDkKGvhvlWPYgUeQBhA5BnFhvZw8SRR5A6BDEifV29iBR5AGEDkGcWG9nDxJFHkDoEMSJ9Xb2INGYQchgBHuQaOwgZDCCPUg0dhAyGMEeJBo7CBmMYA8SjR2EDEawB4nGDkIGI9iDRGMHIYMR7EGisYOQwQj2INHYQchgBHuQaOwgZDCCPUg0dhAyGMEeJEodxCLwR0FIEItFEItFEItFEItFEItFEP8U/AJlXn5s1pDvmwAAAABJRU5ErkJggg=='
        )
    }

    /**
     * AI头像
     */
    get aiAvatar() {
        return this.aiAvatarUrl || 'https://chatglm.cn/img/pc_20speed-min.e4bebda4.gif'
    }

    /**
     * 会话列表
     */
    sessionList: ChatSession[] = []

    /**
     * 是否加载中
     */
    isLoading = false

    /**
     * 设置表单属性
     */
    get getSettingsFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'model',
                label: 'AI模型',
                attrs: {
                    options: [
                        { label: 'DeepSeek Chat', value: 'deepseek-chat' },
                        { label: 'DeepSeek Code', value: 'deepseek-code' },
                    ],
                },
            },
            {
                tag: 'input',
                name: 'temperature',
                label: '温度',
                attrs: {
                    type: 'number',
                    min: 0,
                    max: 2,
                    step: 0.1,
                },
            },
            {
                tag: 'input',
                name: 'maxLength',
                label: '最大长度',
                attrs: {
                    type: 'number',
                    min: 100,
                    max: 4000,
                },
            },
            {
                tag: 'input',
                name: 'contextLength',
                label: '上下文长度',
                attrs: {
                    type: 'number',
                    min: 1,
                    max: 10,
                },
            },
        ]
        return {
            span: 24,
            fields,
        }
    }

    /**
     * 组件挂载后执行
     */
    async mounted() {
        // 初始化一个默认会话
        this.initDefaultSession()
    }

    /**
     * 初始化默认会话
     */
    initDefaultSession() {
        // 创建一个默认会话
        const defaultSession: ChatSession = {
            id: generateUUID(),
            title: '新的对话',
            lastMessage: this.welcomeMessage,
            updateTime: new Date().toLocaleString('zh-CN'),
            messageCount: 1,
            isFavorite: false,
            isTop: false,
        }

        this.sessionList = [defaultSession]
        this.currentSession = defaultSession

        // 添加默认欢迎消息
        this.messageList = [
            {
                id: generateUUID(),
                sessionId: defaultSession.id,
                sender: 'ai',
                content: this.welcomeMessage,
                createTime: new Date().toLocaleString('zh-CN'),
                status: MessageStatusEnum.COMPLETED,
            },
        ]
    }

    /**
     * 监听消息列表变化，滚动到底部
     */
    @Watch('messageList')
    onMessageListChange() {
        this.$nextTick(() => {
            if (this.messageContainer) {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight
            }
        })
    }

    /**
     * 处理选择会话
     */
    handleSelectSession(session: ChatSession) {
        this.currentSession = session
        // 实际应用中这里应该从API获取会话消息
        // 这里为了演示，使用一个简单的默认消息
        if (session.id && this.messageList.length === 0) {
            this.messageList = [
                {
                    id: generateUUID(),
                    sessionId: session.id,
                    sender: 'ai',
                    content: this.welcomeMessage,
                    createTime: new Date().toLocaleString('zh-CN'),
                    status: MessageStatusEnum.COMPLETED,
                },
            ]
        }
        // 在移动设备上，选择会话后关闭历史会话面板
        if (window.innerWidth < 768) {
            this.showHistory = false
        }
    }

    /**
     * 处理创建新会话
     */
    handleNewSession() {
        const newSession: ChatSession = {
            id: generateUUID(),
            title: '新的对话',
            lastMessage: this.welcomeMessage,
            updateTime: new Date().toLocaleString('zh-CN'),
            messageCount: 1,
            isFavorite: false,
            isTop: false,
        }
        this.sessionList.unshift(newSession)
        this.currentSession = newSession

        // 清空消息列表，添加默认欢迎消息
        this.messageList = [
            {
                id: generateUUID(),
                sessionId: newSession.id,
                sender: 'ai',
                content: this.welcomeMessage,
                createTime: new Date().toLocaleString('zh-CN'),
                status: MessageStatusEnum.COMPLETED,
            },
        ]

        // 在移动设备上，创建新会话后关闭历史会话面板
        if (window.innerWidth < 768) {
            this.showHistory = false
        }
    }

    /**
     * 处理置顶会话
     */
    handlePinSession(session: ChatSession) {
        session.isTop = !session.isTop
        // 这里应该调用API更新会话状态
        this.sortSessionList()
    }

    /**
     * 处理收藏会话
     */
    handleFavoriteSession(session: ChatSession) {
        session.isFavorite = !session.isFavorite
        // 这里应该调用API更新会话状态
    }

    /**
     * 处理删除会话
     */
    async handleDeleteSession(session: ChatSession) {
        try {
            await this.$confirm('确定要删除这个会话吗？')
            // 这里应该调用API删除会话
            const index = this.sessionList.findIndex(item => item.id === session.id)
            if (index !== -1) {
                this.sessionList.splice(index, 1)
            }

            // 如果删除的是当前会话，则选择第一个会话或创建新会话
            if (this.currentSession && this.currentSession.id === session.id) {
                if (this.sessionList.length > 0) {
                    this.currentSession = this.sessionList[0]
                    // 加载会话消息
                    // 此处应调用API获取消息
                } else {
                    this.handleNewSession()
                }
            }
        } catch (error) {
            // 用户取消删除操作
            console.log('用户取消删除操作')
        }
    }

    /**
     * 对话列表排序
     */
    sortSessionList() {
        this.sessionList.sort((a, b) => {
            // 先按照置顶状态排序
            if (a.isTop && !b.isTop) return -1
            if (!a.isTop && b.isTop) return 1

            // 然后按照更新时间排序
            return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
        })
    }

    /**
     * 处理复制消息
     */
    handleCopy(message: ChatMessage) {
        // 使用工具函数复制内容
        if (copyToClipboard(message.content)) {
            // 显示复制成功提示
            this.$message({
                message: '复制成功',
                type: 'success',
                duration: 2000,
            })
        } else {
            this.$message.error('复制失败，请手动复制')
        }
    }

    /**
     * 处理重新生成
     */
    handleRegenerate(message: ChatMessage) {
        // 在实际应用中，这里应该调用API重新生成响应
        this.$message({
            message: '重新生成功能尚未实现',
            type: 'info',
            duration: 2000,
        })
    }

    /**
     * 处理编辑消息
     */
    handleEditMessage(message: ChatMessage) {
        this.inputMessage = message.content
        // 删除该消息后的所有消息
        const index = this.messageList.findIndex(item => item.id === message.id)
        if (index !== -1) {
            this.messageList = this.messageList.slice(0, index)
        }
    }

    /**
     * 处理删除消息
     */
    async handleDeleteMessage(message: ChatMessage) {
        try {
            await this.$confirm('确定要删除这条消息吗？')
            // 这里应该调用API删除消息
            const index = this.messageList.findIndex(item => item.id === message.id)
            if (index !== -1) {
                this.messageList.splice(index, 1)
            }
        } catch (error) {
            // 用户取消删除操作
            console.log('用户取消删除操作')
        }
    }

    /**
     * 处理历史会话按钮点击
     */
    handleHistory() {
        this.showHistory = !this.showHistory
        this.showSettings = false
    }

    /**
     * 处理导出按钮点击
     */
    handleExport() {
        const content = this.messageList
            .map(message => {
                const role = message.sender === 'user' ? '用户' : 'AI'
                return `${role}: ${message.content}\n\n`
            })
            .join('')

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${this.currentSession?.title || '聊天记录'}_${new Date().toLocaleDateString()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    /**
     * 处理设置按钮点击
     */
    handleSettings() {
        this.showSettings = !this.showSettings
        this.showHistory = false
    }

    /**
     * 处理上传按钮点击
     */
    handleUpload() {
        this.$message({
            message: '上传功能尚未实现',
            type: 'info',
            duration: 2000,
        })
    }

    /**
     * 处理语音输入按钮点击
     */
    handleVoiceInput() {
        this.$message({
            message: '语音输入功能尚未实现',
            type: 'info',
            duration: 2000,
        })
    }

    /**
     * 处理发送按钮点击
     */
    async handleSend() {
        // 检查消息是否为空
        if (!this.inputMessage.trim()) {
            return
        }

        // 确保有当前会话
        if (!this.currentSession) {
            this.handleNewSession()
        }

        // 添加用户消息
        const userMessage: ChatMessage = {
            id: generateUUID(),
            sessionId: this.currentSession!.id,
            sender: 'user',
            content: this.inputMessage,
            createTime: new Date().toLocaleString('zh-CN'),
            status: MessageStatusEnum.COMPLETED,
        }
        this.messageList.push(userMessage)

        // 更新会话信息
        if (this.currentSession) {
            this.currentSession.lastMessage = this.inputMessage
            this.currentSession.updateTime = new Date().toLocaleString('zh-CN')
            this.currentSession.messageCount++

            // 如果是系统自动生成的标题，则使用用户的第一条消息作为标题
            if (this.currentSession.title === '新的对话' && this.currentSession.messageCount <= 2) {
                this.currentSession.title = truncateText(this.inputMessage, 20)
            }
        }

        // 清空输入框
        const userInput = this.inputMessage
        this.inputMessage = ''

        // 显示加载状态
        this.isLoading = true

        try {
            // 在实际应用中，这里应该调用API发送消息并获取响应
            // 模拟API响应延迟
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 模拟AI回复
            const aiResponse = `这是对"${userInput}"的AI回复。在实际应用中，应该通过API获取真实的AI回复。`

            // 添加AI回复消息
            const aiMessage: ChatMessage = {
                id: generateUUID(),
                sessionId: this.currentSession!.id,
                sender: 'ai',
                content: aiResponse,
                createTime: new Date().toLocaleString('zh-CN'),
                status: MessageStatusEnum.COMPLETED,
            }
            this.messageList.push(aiMessage)

            // 更新会话信息
            if (this.currentSession) {
                this.currentSession.lastMessage = aiResponse
                this.currentSession.updateTime = new Date().toLocaleString('zh-CN')
                this.currentSession.messageCount++
            }

            // 排序会话列表
            this.sortSessionList()
        } catch (error) {
            console.error('发送消息失败:', error)
            this.$message.error('发送消息失败，请稍后重试')

            // 添加错误消息
            const errorMessage: ChatMessage = {
                id: generateUUID(),
                sessionId: this.currentSession!.id,
                sender: 'ai',
                content: '发送消息失败，请稍后重试',
                createTime: new Date().toLocaleString('zh-CN'),
                status: MessageStatusEnum.ERROR,
            }
            this.messageList.push(errorMessage)
        } finally {
            // 隐藏加载状态
            this.isLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.my-chat {
    display: flex;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #f5f7fa;

    .chat-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #fff;
        transition: all 0.3s;

        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #ebeef5;
            background-color: #fff;
            z-index: 10;

            .title {
                font-size: 16px;
                font-weight: 500;
                margin-right: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .actions {
                display: flex;
                align-items: center;

                .el-button {
                    margin-left: 8px;
                    padding: 5px 10px;
                    font-size: 14px;

                    i {
                        margin-right: 4px;
                    }
                }
            }
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background-color: #f5f7fa;

            .message-item {
                display: flex;
                margin-bottom: 24px;

                &.user {
                    flex-direction: row-reverse;

                    .content {
                        margin-right: 12px;
                        margin-left: 60px;
                        align-items: flex-end;

                        .message-content {
                            background-color: #ecf5ff;
                            border-radius: 12px 2px 12px 12px;
                        }

                        .message-meta {
                            justify-content: flex-end;
                        }
                    }
                }

                &.ai {
                    .content {
                        margin-left: 12px;
                        margin-right: 60px;

                        .message-content {
                            background-color: #fff;
                            border-radius: 2px 12px 12px 12px;
                        }
                    }
                }

                .avatar {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    max-width: calc(100% - 80px);

                    .message-content {
                        padding: 12px 16px;
                        font-size: 14px;
                        line-height: 1.5;
                        word-break: break-word;
                        white-space: pre-wrap;
                    }

                    .message-meta {
                        display: flex;
                        align-items: center;
                        margin-top: 4px;
                        font-size: 12px;
                        color: #909399;

                        .time {
                            margin-right: 8px;
                        }

                        .actions {
                            display: flex;
                            align-items: center;
                            visibility: hidden;
                        }
                    }

                    &:hover {
                        .message-meta {
                            .actions {
                                visibility: visible;
                            }
                        }
                    }
                }
            }
        }

        .chat-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;

            .loading-dots {
                display: flex;
                justify-content: center;

                span {
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                    background-color: #409eff;
                    border-radius: 50%;
                    display: inline-block;
                    animation: loading 1.4s infinite ease-in-out both;

                    &:nth-child(1) {
                        animation-delay: -0.32s;
                    }

                    &:nth-child(2) {
                        animation-delay: -0.16s;
                    }

                    &:nth-child(3) {
                        animation-delay: 0s;
                    }
                }
            }

            .loading-text {
                margin-top: 8px;
                font-size: 14px;
                color: #909399;
            }

            @keyframes loading {
                0%,
                80%,
                100% {
                    transform: scale(0);
                }
                40% {
                    transform: scale(1);
                }
            }
        }

        .chat-input {
            padding: 16px;
            border-top: 1px solid #ebeef5;
            background-color: #fff;

            .el-input {
                margin-bottom: 8px;
            }

            .input-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .el-button + .el-button {
                    margin-left: 8px;
                }
            }
        }
    }

    .chat-history,
    .chat-settings {
        position: fixed;
        top: 0;
        right: -320px;
        width: 320px;
        height: 100%;
        background-color: #fff;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
        z-index: 100;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #ebeef5;

            .title {
                font-size: 16px;
                font-weight: 500;
            }
        }

        .drawer-content {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;

            .sidebar-header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #ebeef5;

                .new-session-btn {
                    width: 100%;
                }
            }

            .session-list {
                flex: 1;
                overflow-y: auto;

                .session-items {
                    .session-item {
                        padding: 12px 16px;
                        border-bottom: 1px solid #f0f0f0;
                        cursor: pointer;
                        transition: all 0.3s;

                        &:hover {
                            background-color: #f5f7fa;

                            .session-actions {
                                visibility: visible;
                            }
                        }

                        &.active {
                            background-color: #ecf5ff;
                        }

                        .session-title {
                            font-size: 14px;
                            font-weight: 500;
                            margin-bottom: 4px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .session-meta {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 12px;
                            color: #909399;

                            .last-message {
                                flex: 1;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }

                            .update-time {
                                flex-shrink: 0;
                                margin-left: 8px;
                            }
                        }

                        .session-actions {
                            display: flex;
                            justify-content: flex-end;
                            margin-top: 4px;
                            visibility: hidden;
                        }
                    }
                }
            }
        }
    }

    &.show-history {
        .chat-history {
            right: 0;
        }
    }

    &.show-settings {
        .chat-settings {
            right: 0;
        }
    }
}

// 响应式布局
@media screen and (max-width: 768px) {
    .my-chat {
        .chat-history,
        .chat-settings {
            width: 100%;
            right: -100%;
        }

        &.show-history {
            .chat-main {
                transform: translateX(-100%);
                opacity: 0.5;
            }
        }

        &.show-settings {
            .chat-main {
                transform: translateX(-100%);
                opacity: 0.5;
            }
        }
    }
}
</style>
