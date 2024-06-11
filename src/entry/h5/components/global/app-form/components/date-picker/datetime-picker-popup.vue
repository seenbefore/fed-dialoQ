<template>
    <!-- 阻止冒泡导致父菜单收起 -->
    <div class="datetime-picker-popup" @click.stop>
        <van-popup v-model="showPopup" position="bottom" :close-on-click-overlay="false" :safe-area-inset-bottom="true" @click-overlay="cancel">
            <van-datetime-picker class="datetime-picker" :type="type" v-model="currentDate" :min-date="minDate" :max-date="maxDate">
                <template #default>
                    <div style="width: 100%">
                        <div class="van-picker__toolbar" style="width: 100%">
                            <button @click="cancel" type="button" class="van-picker__cancel">
                                取消
                            </button>
                            <button @click="confirm" type="button" class="van-picker__confirm">
                                确认
                            </button>
                        </div>
                        <div class="time-select-box">
                            <van-button v-for="item in timeSelectList" :key="item.label" type="primary" size="small" @click="timeSelect(item.value)">
                                {{ item.label }}
                            </van-button>
                        </div>
                    </div>
                </template>
            </van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
import { formatDate } from 'icinfo-util'
export default {
    name: 'DatetimePickerPopup',
    props: {
        minDate: {
            type: [Date, String],
            default: undefined,
        },
        maxDate: {
            type: [Date, String],
            default: undefined,
        },
        defaultDate: {
            type: [Date, String],
            default() {
                return new Date()
            },
        },
        valueFormat: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'datetime',
        },
        timeSelectList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showPopup: false,
            currentDate: new Date(formatDate(this.defaultDate || new Date(), 'yyyy/MM/dd HH:mm:ss')),
            // timeSelectList: [
            //     {
            //         label: '30分钟',
            //         value: 30 * 60 * 1000,
            //     },
            //     {
            //         label: '60分钟',
            //         value: 60 * 60 * 1000,
            //     },
            //     {
            //         label: '2小时',
            //         value: 60 * 60 * 1000 * 2,
            //     },
            //     {
            //         label: '3日',
            //         value: 60 * 60 * 1000 * 24 * 3,
            //     },
            //     {
            //         label: '7日',
            //         value: 60 * 60 * 1000 * 24 * 7,
            //     },
            //     {
            //         label: '15日',
            //         value: 60 * 60 * 1000 * 24 * 15,
            //     },
            // ],
        }
    },
    mounted() {
        this.showPopup = true
    },
    methods: {
        timeSelect(value) {
            const date = new Date()
            const time = date.getTime()
            date.setTime(time + value)
            this.currentDate = date
            this.confirm()
        },
        cancel() {
            this.showPopup = false
            setTimeout(() => {
                this.$options.cancel()
            }, 500)
        },
        confirm() {
            // this.currentDate = date
            const currentDate = this.valueFormat ? formatDate(this.currentDate, this.valueFormat) : this.currentDate
            this.showPopup = false
            setTimeout(() => {
                this.$options.confirm(currentDate)
            }, 500)
        },
    },
}
</script>

<style lang="less">
.datetime-picker {
    .van-picker__toolbar {
        min-height: 1.2rem;
        height: auto;
    }
}
.time-select-box {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
}
</style>
