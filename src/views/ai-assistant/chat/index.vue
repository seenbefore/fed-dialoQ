<template>
    <div class="sg-page AiChat" :class="{ 'show-sidebar': showSessionList, 'show-settings': showSettings }">
        <!-- 历史会话 -->
        <div class="chat-history" v-show="showSessionList">
            <div class="sidebar-header">
                <span class="title">历史会话</span>
                <el-button type="text" icon="el-icon-plus" @click="handleNewSession"></el-button>
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

        <!-- 当前会话 -->
        <div class="chat-main">
            <div class="chat-header">
                <span class="title">{{ (currentSession && currentSession.title) || '新的对话' }}</span>
                <div class="actions">
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
                            <div class="message-content" v-html="renderMessage(message.content)"></div>
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

        <!-- 右侧设置面板 -->
        <div class="chat-settings" v-show="showSettings">
            <div class="settings-header">
                <span class="title">设置</span>
                <el-button type="text" @click="showSettings = false">
                    <i class="el-icon-close"></i>
                </el-button>
            </div>
            <div class="settings-content">
                <sg-base-form ref="settingsForm" v-model="settings" v-bind="getSettingsFormAttrs"></sg-base-form>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableRef } from '@/sharegood-ui'
import { MessageStatusEnum, MessageStatusEnumMap } from './enum'
import { getSessionList, getMessageList, sendMessage, deleteSession, ChatSession, ChatMessage } from './api'

@Component({
    name: 'AiChat',
})
export default class AiChat extends Vue {
    @Ref('sessionListRef') sessionListRef!: TableRef
    @Ref('settingsForm') settingsForm!: FormRef
    @Ref('messageContainer') messageContainer!: HTMLElement

    // 是否显示会话列表
    showSessionList = true

    currentSession: ChatSession | null = null
    messageList: ChatMessage[] = []
    inputMessage = ''
    showSettings = false
    settings = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxLength: 2000,
        contextLength: 5,
    }

    userAvatar =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmMENgjAQRU83cQRGcARGYARGcARGcARGcARGcAQ3cARGsOTSNJTSu9YWEmO4kRDg/p/7e4WQBbYEAsACyAIbIAtsgCywAbLABsgCGyALbIAsGKvwn+v8xZoGNmbVOAvzAPKYD5CF6g2YB5DHfIAs/N6+iHkAecwHyAIbIAtsgCywAbLABsgCGyALbIAssMEGxDFYuOY1FxNQ1uAzV0Gw7uXiUkjVIFwbEGJCXwP2zggXBsS+gWOPAa4MCHkJjz0GeDEg9jVM9hjgw4AhbuLYY4AzA4a6i2WPAU4MGPIyjj0GODVg6Os49hjgxIAULyTYY4ATA1K8kWGPAdYNSPVKij0GWDUg5Ts59hhgzYDULyXZY4AVA+Z4Kx3MHgOED5jzvXwQewwQOmBOAwaxB4nGDkKGvhvlWPYgUeQBhA5BnFhvZw8SRR5A6BDEifV29iBR5AGEDkGcWG9nDxJFHkDoEMSJ9Xb2INGYQchgBHuQaOwgZDCCPUg0dhAyGMEeJBo7CBmMYA8SjR2EDEawB4nGDkIGI9iDRGMHIYMR7EGisYOQwQj2INHYQchgBHuQaOwgZDCCPUg0dhAyGMEeJEodxCLwR0FIEItFEItFEItFEItFEItFEP8U/AJlXn5s1pDvmwAAAABJRU5ErkJggg=='
    aiAvatar =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmMENgjAQRU83cQRGcARGYARGcARGcARGcARGcAQ3cARGsOTSNJTSu9YWEmO4kRDg/p/7e4WQBbYEAsACyAIbIAtsgCywAbLABsgCGyALbIAsGKvwn+v8xZoGNmbVOAvzAPKYD5CF6g2YB5DHfIAs/N6+iHkAecwHyAIbIAtsgCywAbLABsgCGyALbIAssMEGxDFYuOY1FxNQ1uAzV0Gw7uXiUkjVIFwbEGJCXwP2zggXBsS+gWOPAa4MCHkJjz0GeDEg9jVM9hjgw4AhbuLYY4AzA4a6i2WPAU4MGPIyjj0GODVg6Os49hjgxIAULyTYY4ATAyZ7I8MeA6wbkOqVFHsMsGpAyndS7DHAmgGp30myxwArBszxVjqYPQYIHzDne/kg9hggdMCcBgxiDxKNHYQMfTfKsexBosgDCB2COLHezh4kijyA0CGIE+vt7EGiyAMIHYI4sd7OHiSKPIDQIYgT6+3sQaKxg5DBCPYg0dhByGAEe5Bo7CBkMII9SDR2EDIYwR4kGjsIGYxgDxKNHYQMRrAHicYOQgYj2INEYwchgxHsQaKxg5DBCPYg0dhByGAEe5Bo7CBkMII9SDR2EDIYwR4kSh3EIvBHQUgQi0UQi0UQi0UQi0UQi0UQ/xT8AmVefmzWkO+bAAAAAElFTkSuQmCC'

    sessionList: ChatSession[] = []

    get getSessionListAttrs() {
        return {
            load: async (params: any) => {
                const { data } = await getSessionList(params)
                return {
                    result: data,
                    total: data.length,
                }
            },
        }
    }

    get getSettingsFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'model',
                label: 'AI模型',
                attrs: {
                    options: [
                        { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
                        { label: 'GPT-4', value: 'gpt-4' },
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
            fields,
        }
    }

    async mounted() {
        // 加载会话列表
        try {
            const { data } = await getSessionList()
            this.sessionList = data
        } catch (error) {
            console.error(error)
        }
    }

    @Watch('messageList')
    onMessageListChange() {
        this.$nextTick(() => {
            this.scrollToBottom()
        })
    }

    scrollToBottom() {
        if (this.messageContainer) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight
        }
    }

    renderMessage(content: string) {
        return content
    }

    async handleSelectSession(session: ChatSession) {
        this.currentSession = session
        const { data } = await getMessageList({ sessionId: session.id })
        this.messageList = data
    }

    async handleSend() {
        if (!this.inputMessage.trim()) return

        const message = {
            content: this.inputMessage,
            sessionId: (this.currentSession && this.currentSession.id) || '',
            sender: 'user' as const,
        }

        this.messageList.push(message as ChatMessage)
        this.inputMessage = ''

        try {
            const { data } = await sendMessage(message)
            this.messageList.push(data)
        } catch (error) {
            this.$message.error('发送失败')
        }
    }

    async handleDeleteSession(session: ChatSession) {
        try {
            await this.$confirm('确认删除该会话？', '提示', {
                type: 'warning',
            })
            await deleteSession({ sessionId: session.id })
            this.$message.success('删除成功')
            // 重新加载会话列表
            const { data } = await getSessionList()
            this.sessionList = data
            if (this.currentSession?.id === session.id) {
                this.currentSession = null
                this.messageList = []
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleNewSession() {
        this.currentSession = null
        this.messageList = []
    }

    handleSettings() {
        this.showSettings = !this.showSettings
    }

    /**
     * 置顶/取消置顶会话
     */
    async handlePinSession(session: ChatSession) {
        try {
            // TODO: 调用置顶API
            this.$message.success(session.isTop ? '已取消置顶' : '已置顶')
            this.sessionListRef.onLoad()
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 收藏/取消收藏会话
     */
    async handleFavoriteSession(session: ChatSession) {
        try {
            // TODO: 调用收藏API
            this.$message.success(session.isFavorite ? '已取消收藏' : '已收藏')
            this.sessionListRef.onLoad()
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 导出会话记录
     */
    async handleExport() {
        try {
            if (!this.currentSession) {
                this.$message.warning('请先选择会话')
                return
            }
            // TODO: 调用导出API
            this.$message.success('导出成功')
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 复制消息内容
     */
    handleCopy(message: ChatMessage) {
        // TODO: 实现复制功能
        this.$message.success('复制成功')
    }

    /**
     * 重新生成回复
     */
    async handleRegenerate(message: ChatMessage) {
        try {
            // TODO: 调用重新生成API
            this.$message.success('重新生成成功')
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 编辑消息
     */
    async handleEditMessage(message: ChatMessage) {
        try {
            // TODO: 实现编辑功能
            this.$message.success('编辑成功')
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 删除消息
     */
    async handleDeleteMessage(message: ChatMessage) {
        try {
            await this.$confirm('确认删除该消息？', '提示', {
                type: 'warning',
            })
            // TODO: 调用删除API
            this.$message.success('删除成功')
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 上传文件
     */
    async handleUpload() {
        try {
            // TODO: 实现文件上传功能
            this.$message.success('上传成功')
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * 语音输入
     */
    async handleVoiceInput() {
        try {
            // TODO: 实现语音输入功能
            this.$message.success('语音输入成功')
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="less" scoped>
.AiChat {
    display: flex !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f7fa;
    overflow: hidden;

    .chat-history {
        width: 300px;
        background: #fff;
        box-shadow: 1px 0 2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100%;

        .sidebar-header {
            padding: 16px;
            border-bottom: 1px solid #f0f2f5;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: 16px;
                font-weight: 500;
                color: #333;
            }

            .el-button {
                font-size: 14px;
                padding: 0;
            }
        }

        .session-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
        }

        .session-item {
            padding: 16px;
            margin: 0 8px 4px;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
                background: #f0f2f5;
            }

            &.active {
                background: #e6f4ff;
                border-left: 3px solid #409eff;
            }

            .session-title {
                font-size: 14px;
                margin-bottom: 4px;
                font-weight: 500;
                color: #333;
            }

            .session-meta {
                font-size: 12px;
                color: #999;
                display: flex;
                justify-content: space-between;

                .last-message {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 8px;
                }
            }

            .session-actions {
                display: none;
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
            }

            &:hover .session-actions {
                display: flex;
                gap: 8px;
                animation: fadeIn 0.2s ease;
            }
        }
    }

    .chat-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #fff;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        height: 100%;
        overflow: hidden;
        margin-left: 1px;

        .chat-header {
            padding: 16px;
            border-bottom: 1px solid #f0f2f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            flex-shrink: 0;
            transition: left 0.3s ease;

            .title {
                font-size: 16px;
                font-weight: 500;
                color: #333;
            }
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            scroll-behavior: smooth;
            min-height: 0;

            .message-item {
                display: flex;
                margin-bottom: 32px;
                animation: slideIn 0.3s ease;

                &.user {
                    flex-direction: row-reverse;

                    .content {
                        margin-left: 0;
                        margin-right: 12px;

                        .message-content {
                            background: #e6f4ff;
                            color: #333;
                        }
                    }
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .content {
                    margin-left: 12px;
                    max-width: 80%;

                    .message-content {
                        padding: 16px;
                        background: #f7f8fa;
                        border-radius: 4px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        line-height: 1.6;
                        color: #333;

                        pre {
                            margin: 16px 0;
                            padding: 16px;
                            background: #282c34;
                            border-radius: 4px;
                            color: #abb2bf;
                            overflow-x: auto;
                        }
                    }

                    .message-meta {
                        margin-top: 4px;
                        font-size: 12px;
                        color: #999;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                        padding-right: 80px;

                        .actions {
                            display: none;
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            background: inherit;
                        }

                        &:hover .actions {
                            display: flex;
                            gap: 8px;
                            animation: fadeIn 0.2s ease;
                        }
                    }
                }
            }
        }

        .chat-input {
            padding: 16px;
            border-top: 1px solid #f0f2f5;
            background: #fff;
            flex-shrink: 0;

            .el-textarea {
                .el-textarea__inner {
                    resize: none;
                    border-radius: 4px;
                    padding: 12px;
                    min-height: 80px;
                    background: #fff;

                    &:focus {
                        border-color: #409eff;
                    }
                }
            }

            .input-actions {
                margin-top: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #fff;

                .el-button {
                    &[type='text'] {
                        font-size: 18px;
                        color: #606266;

                        &:hover {
                            color: #409eff;
                        }
                    }

                    &[type='primary'] {
                        padding: 8px 24px;
                    }
                }
            }
        }
    }

    .chat-settings {
        width: 300px;
        background: #fff;
        box-shadow: -1px 0 2px rgba(0, 0, 0, 0.05);
        padding: 16px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;

        .settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;

            .title {
                font-size: 16px;
                font-weight: 500;
                color: #333;
            }
        }
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
