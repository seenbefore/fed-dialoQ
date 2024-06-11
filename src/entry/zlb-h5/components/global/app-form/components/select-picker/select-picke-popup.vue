<template>
    <van-action-sheet class="my-popup-picker" van-popup v-model="showPicker" round position="bottom" :safe-area-inset-bottom="true">
        <van-picker show-toolbar :visible-item-count="5" :columns="columns" :value-key="valueKey" :title="title" @cancel="showPicker = false" @confirm="onConfirm" :default-index="activeIndex" />
    </van-action-sheet>
</template>

<script>
export default {
    name: 'MyPopupPicker',
    props: {
        value: {
            type: [Number, String],
            default: '',
        },
        columns: {
            type: Array,
            default() {
                return [
                    // { label: '高德地图', value: 'amap' },
                    // { label: '百度地图', value: 'bmap' },
                ]
            },
        },
        valueKey: {
            type: String,
            default: 'label',
        },
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showPicker: false,
        }
    },
    computed: {
        activeIndex({ value: activeValue, columns }) {
            let activeIndex = 0
            columns.find(({ value }, index) => {
                const flag = value === activeValue
                if (flag) {
                    activeIndex = index
                }
                return flag
            })
            return activeIndex
        },
    },
    watch: {
        showPicker(val) {
            if (!val) {
                setTimeout(() => {
                    this.$options.cancel()
                }, 500)
            }
        },
    },
    mounted() {
        this.showPicker = true
    },
    methods: {
        onConfirm(value) {
            this.$options.confirm(value)
        },
    },
}
</script>
