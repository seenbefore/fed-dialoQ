<template>
    <div class="vant-box">
        <div class="container">
            <van-tabs v-model="active">
                <!-- 控件一 -->
                <van-tab title="控件一">
                    <!-- vant 表单 -->
                    <van-form @submit="onSubmit">
                        <div class="form-item form-item1">
                            <!-- <h2 class="label">输入框控件</h2> -->
                            <!-- 分割线 -->
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">输入框控件</van-divider>
                            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" clearable :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                        </div>
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">提交</van-button>
                        </div>
                        <!-- 日历控件 -->
                        <div class="form-item form-item2">
                            <!-- <h2 class="label">日历控件</h2> -->
                            <!-- 分割线 -->
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">日历控件</van-divider>
                            <van-cell title="选择单个日期" :value="date" @click="show = true" />
                            <van-calendar v-model="show" @confirm="onConfirm" />

                            <van-cell title="选择日期区间" :value="dateRange" @click="rangeShow = true" />
                            <van-calendar v-model="rangeShow" type="range" @confirm="onConfirmRange" />
                        </div>
                        <!-- 按钮 -->
                        <div class="form-item form-item3">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">按钮控件</van-divider>
                            <van-button type="primary" @click="vanBtn" size="mini">迷你按钮</van-button>
                            <van-button type="info" disabled size="small">禁用(小)按钮</van-button>
                            <van-button type="info" icon="plus" size="normal">添加</van-button>
                            <van-button type="warning" @click="vanLoad">警告按钮</van-button>
                            <van-button type="danger">危险按钮</van-button>
                            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</van-button>
                        </div>
                        <!-- 单选框 -->
                        <div class="form-item form-item4">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">单选框控件</van-divider>
                            <van-radio-group v-model="radios">
                                <van-radio name="1" icon-size="16px">单选框 1</van-radio>
                                <van-radio name="2" icon-size="16px">单选框 2</van-radio>
                                <van-radio name="3" disabled icon-size="16px">单选框 3</van-radio>
                                <van-radio name="4" shape="square" icon-size="16px">单选框 4</van-radio>
                                <van-radio name="5" checked-color="#07c160" icon-size="16px">单选框 5</van-radio>
                            </van-radio-group>
                        </div>
                        <!-- 复选框 -->
                        <div class="form-item form-item5">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">复选框控件</van-divider>
                            <van-checkbox v-model="checked" shape="square" icon-size="16px">复选框1</van-checkbox>
                            <van-checkbox v-model="checked2" shape="square" icon-size="16px">复选框2</van-checkbox>
                            <van-checkbox v-model="checked3" shape="square" icon-size="16px">复选框3</van-checkbox>
                        </div>
                        <!-- 评分 -->
                        <div class="form-item form-item6">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">评分控件</van-divider>
                            <van-rate v-model="rateValue" />
                            <van-rate v-model="rateValue1" disabled />
                            <van-rate v-model="rateValue2" icon="like" void-icon="like-o" />
                            <van-rate v-model="rateValue3" allow-half void-icon="star" void-color="#eee" />
                            <van-rate v-model="rateValue4" readonly />
                        </div>
                    </van-form>
                    <!-- Stepper -->
                    <div class="form-item form-item7">
                        <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">滑块控件</van-divider>
                        <van-slider v-model="sliderValue" @change="onChange" />
                        <br />
                        <br />
                    </div>
                </van-tab>
                <!-- 控件二 -->
                <van-tab title="控件二">
                    <van-form @submit="onSubmit">
                        <!-- Switch -->
                        <div class="form-item form-item8">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">Switch 开关</van-divider>
                            <van-switch size="24" v-model="SwitchChecked" />
                            <van-switch size="24" v-model="SwitchChecked1" disabled />
                            <van-switch size="24" v-model="SwitchChecked2" active-color="#07c160" inactive-color="#ee0a24" />
                            <van-switch size="24" v-model="SwitchChecked3" loading />
                            <van-switch size="24" :value="SwitchChecked4" @input="onInputs" />
                        </div>
                        <!-- 键盘控件 -->
                        <div class="form-item">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">键盘控件</van-divider>
                            <van-field readonly clickable :value="keyValue" @touchstart.native.stop="keyShow = true" placeholder="请输入 长度限制10位" />
                            <van-number-keyboard v-model="keyValue" :show="keyShow" :maxlength="10" @blur="keyShow = false" />
                            <!-- 密码输入框 -->
                            <van-password-input class="mt10" :value="passwordValue" info="密码为 6 位数字" :focused="showKeyboard" @focus="showKeyboard = true" />
                            <!-- 数字键盘 -->
                            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
                        </div>
                        <!-- 倒计时 -->
                        <div class="form-item form-item9">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">倒计时控件</van-divider>
                            <van-count-down :time="time" />
                            <!-- 已定义格式 -->
                            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />

                            <!-- 手动控制 millisecond展示毫秒 -->
                            <van-count-down ref="countDown" millisecond :time="3000" :auto-start="false" format="ss:SSS" @finish="finish" />
                            <van-grid clickable>
                                <van-grid-item text="开始" icon="play-circle-o" @click="start" />
                                <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
                                <van-grid-item text="重置" icon="replay" @click="reset" />
                            </van-grid>
                        </div>
                        <!-- Dialog 弹出框 -->
                        <div class="form-item">
                            <van-divider :style="{ color: '#990030', borderColor: '#666', padding: '0 16px' }">Dialog 弹出框控件</van-divider>
                            <van-button type="primary" @click="dialogBtn">提示弹窗</van-button>
                            <van-button type="primary" @click="dialogConfirmBtn">确认弹窗</van-button>
                        </div>
                    </van-form>
                </van-tab>
                <!-- 控件三 -->
                <van-tab title="控件三">
                    <div class="form-item">
                        <!-- 上传组件 -->
                        <van-divider :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }">上传组件</van-divider>
                        <!-- <van-uploader :after-read="afterRead" /> -->
                        <van-uploader v-model="fileList" multiple />
                    </div>
                    <!-- 分享面板 -->
                    <div class="form-item">
                        <van-divider :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }">分享面板组件</van-divider>
                        <van-cell title="显示分享面板" @click="showShare = true" />
                        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
                    </div>
                    <div class="form-item10">
                        <van-divider :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }">滑动单元格</van-divider>
                        <van-swipe-cell>
                            <template #left>
                                <van-button square type="primary" text="选择" />
                            </template>
                            <van-cell class="mb10" :border="false" title="单元格" value="内容" />
                            <template #right>
                                <van-button square type="danger" text="删除" />
                                <van-button square type="primary" text="收藏" />
                            </template>
                        </van-swipe-cell>
                        <van-swipe-cell :before-close="beforeClose">
                            <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card" thumb="https://img.yzcdn.cn/vant/cat.jpeg" />
                            <template #right>
                                <van-button square text="删除" type="danger" class="delete-button" />
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-tab>
                <van-tab title="控件四">
                    <!-- 轮播图 -->
                    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                        <van-swipe-item>1</van-swipe-item>
                        <van-swipe-item>2</van-swipe-item>
                        <van-swipe-item>3</van-swipe-item>
                        <van-swipe-item>4</van-swipe-item>
                    </van-swipe>
                    <!-- 九宫格 -->
                    <van-divider :style="{ color: '#666', borderColor: '#666', padding: '0 16px' }">九宫格</van-divider>
                    <van-grid :column-num="3">
                        <van-grid-item icon="photo-o" text="新浪" />
                        <van-grid-item icon="certificate" text="百度" />
                        <van-grid-item icon="chat-o" text="腾讯" />
                        <van-grid-item icon="flower-o" text="阿里" />
                        <van-grid-item icon="music-o" text="酷狗" />
                        <van-grid-item icon="photo-o" text="搜狐" />
                        <van-grid-item icon="fire-o" text="微博" />
                        <van-grid-item icon="like-o" text="京东" />
                        <van-grid-item icon="chat-o" text="微信" />
                    </van-grid>
                    <!-- 动作面板 -->
                    <van-cell class="mt10" is-link title="动作面板" @click="sheetShow = true" />
                    <van-action-sheet v-model="sheetShow" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelects" @cancel="onCancel" />
                </van-tab>
                <van-tab title="控件五">
                    <van-cell-group>
                        <!-- 选择器 -->
                        <van-field readonly clickable name="picker" :value="pickerValue" label="选择器" placeholder="点击选择城市" @click="showPicker = true" />
                        <van-popup v-model="showPicker" position="bottom">
                            <van-picker show-toolbar :columns="columns" @confirm="onConfirms" @cancel="showPicker = false" />
                        </van-popup>
                        <!-- 省市选择 -->
                        <van-field readonly clickable name="area" :value="Areavalue" label="地区选择" placeholder="点击选择省市区" @click="showArea = true" />
                        <van-popup v-model="showArea" position="bottom">
                            <van-area :area-list="areaLists" value="110101" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="onConfirmArea" @cancel="showArea = false" />
                        </van-popup>
                        <!-- 输入任意文本 -->
                        <van-field v-model="text" label="文本" clearable />
                        <!-- 输入手机号，调起手机号键盘 -->
                        <van-field v-model="tel" type="tel" label="手机号" />
                        <!-- 允许输入正整数，调起纯数字键盘 -->
                        <van-field v-model="digit" type="digit" label="整数" />
                        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                        <van-field v-model="number" type="number" label="数字" />
                        <!-- 输入密码 -->
                        <van-field v-model="passwords" type="password" label="密码" />
                        <!-- 只读 -->
                        <van-field label="文本" value="输入框只读" readonly />
                        <!-- 禁用 -->
                        <van-field label="文本" value="输入框已禁用" disabled />
                        <van-field v-model="iptValue1" label="文本" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" />
                        <van-field v-model="iptValue2" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
                        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                            <template #button>
                                <van-button size="small" type="primary">发送验证码</van-button>
                            </template>
                        </van-field>
                        <van-field v-model="message" rows="1" autosize label="高度自适应" type="textarea" placeholder="请输入留言" />
                        <van-field v-model="txtTotalNum" rows="2" autosize label="字数统计" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
                        <van-field v-model="textAlignRight" label="右对齐" placeholder="输入框内容右对齐" input-align="right" />
                        <br />
                    </van-cell-group>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import Vue from 'vue'
import { Toast, Dialog } from 'vant'
import areaList from '@/entry/h5/scripts/area/index.js'

Vue.use(Toast)
Vue.use(Dialog)

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        // 这里存放数据
        return {
            active: 0,
            username: '',
            password: '',
            date: '', // 单日日历
            dateRange: '', // 区间日历
            show: false,
            rangeShow: false,
            keyValue: '', // 软键盘
            keyShow: false,
            passwordValue: '',
            showKeyboard: true,
            radios: 1, // 单选框
            checked: true, // 复选框
            checked2: false,
            checked3: false,
            rateValue: '', // 评分
            rateValue1: 3, // 评分禁用
            rateValue2: '',
            rateValue3: 3.5,
            rateValue4: 3, // 评分只读
            sliderValue: 60, // 步进器
            SwitchChecked: false, // switch 开关
            SwitchChecked1: true,
            SwitchChecked2: true,
            SwitchChecked3: true,
            SwitchChecked4: false,
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg', isImage: true },
            ],
            dialogShow: false,
            showShare: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: 'QQ', icon: 'qq' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
            time: 30 * 60 * 60 * 1000, // 倒计时
            tel: '',
            text: '',
            digit: '',
            number: '',
            passwords: '',
            iptValue1: '',
            iptValue2: '',
            sms: '', // 验证码
            message: '',
            txtTotalNum: '',
            textAlignRight: '',
            pickerValue: '',
            columns: ['杭州', '武汉', '黄冈', '深圳', '上海', '北京'],
            showPicker: false,
            Areavalue: '',
            showArea: false,
            areaLists: null,
            sheetShow: false,
            actions: [{ name: '选项一' }, { name: '选项二 (禁用)', disabled: true }, { name: '选项三' }, { name: '选项四', subname: '描述信息' }],
        }
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.areaLists = areaList
    },
    // 方法集合
    methods: {
        onSubmit(values) {
            console.log(values)
        },
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`
        },
        onConfirm(date) {
            this.show = false
            this.date = this.formatDate(date)
        },
        // 区间日历控件
        onConfirmRange(date) {
            const [start, end] = date
            this.rangeShow = false
            this.dateRange = `${this.formatDate(start)} - ${this.formatDate(end)}`
        },
        vanBtn() {
            Toast('我是成功按钮')
        },
        vanLoad() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
        },
        // 软键盘输入密码
        onInput(key) {
            this.passwordValue = (this.passwordValue + key).slice(0, 6)
        },
        onDelete() {
            this.passwordValue = this.passwordValue.slice(0, this.passwordValue.length - 1)
        },
        // 步进器
        onChange(value) {
            Toast(value)
        },
        // switch 开关确认弹窗
        onInputs(checked) {
            Dialog.confirm({
                title: '提醒',
                message: '是否切换开关？',
            }).then(() => {
                this.SwitchChecked4 = checked
            })
        },
        // 上传
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file)
        },
        // 弹窗
        dialogBtn() {
            Dialog.alert({
                title: '标题啊',
                message: '内容啊',
            }).then(() => {
                Toast('确定了')
            })
        },
        dialogConfirmBtn() {
            Dialog.confirm({
                title: '标题啊',
                message: '确认框内容哦123',
                cancelButtonText: '取消哦',
            })
                .then(() => {
                    Toast('确定了')
                })
                .catch(() => {
                    Toast('取消了')
                })
        },
        // 分享面板
        onSelect(option) {
            Toast(option.name)
            this.showShare = false
        },
        // 滑动单元格
        beforeClose({ position, instance }) {
            switch (position) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close()
                    break
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？',
                    }).then(() => {
                        instance.close()
                        Toast('确定了')
                    })
                    break
            }
        },
        // 倒计时
        start() {
            this.$refs.countDown.start()
        },
        pause() {
            this.$refs.countDown.pause()
        },
        reset() {
            this.$refs.countDown.reset()
        },
        finish() {
            Toast('倒计时结束')
        },
        // 选择器
        onConfirms(value) {
            this.pickerValue = value
            this.showPicker = false
        },
        onConfirmArea(values) {
            this.Areavalue = values.map(item => item.name).join('/')
            this.showArea = false
        },
        onSelects(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            Toast(item.name)
        },
        // 动作面板
        onCancel() {
            Toast('取消了...')
        },
    },
}
</script>

<style lang="less" scoped>
.vant-box {
    .container {
        font-size: 20px;
        .van-password-input {
            margin: 0;
        }
        .form-item {
            .van-button {
                display: inline-block;
                width: 30%;
                margin: 0 10px 10px 0;
            }
        }
        .form-item3,
        .form-item4,
        .form-item5,
        .form-item6,
        .form-item7,
        .form-item8,
        .form-item9 {
            padding: 0 10px;
        }
        .form-item4 {
            .van-radio {
                margin-bottom: 10px;
            }
        }
        .form-item5 {
            .van-checkbox {
                margin-bottom: 10px;
            }
        }
        .form-item6 {
            .van-rate {
                width: 60%;
                margin-bottom: 10px;
            }
        }
        .form-item8 {
            .van-switch {
                margin-right: 15px;
            }
        }
        .form-item9 {
            .van-count-down {
                margin-bottom: 10px;
            }
        }
        .form-item10 {
        }
        .goods-card {
            margin: 0;
            background-color: #fff;
        }
        .delete-button {
            height: 100%;
        }
        .my-swipe .van-swipe-item {
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            background-color: #39a9ed;
        }
    }
}
</style>
