<template>
    <el-popover :disabled="disabled" placement="top-start" width="248" trigger="hover" popper-class="select-popclass">
        <div slot="reference" class="date-select-class">
            <div class="date-input">
                <div class="dsc-value">{{ currentDate.label }}</div>
                <img v-if="!disabled" class="dsc-arrow" src="./arrow.svg" />
            </div>
        </div>
        <ul class="select-pop-ul">
            <li v-for="item in optionsate" :key="item.value" class="select-pop-li" :class="{ 'select-pop-li-active': value === item.value }" @click="handleClick(item)">
                <div>{{ item.label }}</div>
            </li>
        </ul>
    </el-popover>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: '2',
        },
        disabled: {
            type: Boolean,
            default: true,
        },
    },
    created() {
        this.createDate()
    },
    mounted() {
        // this.showPop = true
    },
    data() {
        return {
            showPop: false,
            currentDate: '',
            optionsate: [],
        }
    },
    methods: {
        handleClick(item) {
            if (item.value === this.value) return
            this.$emit('input', item.value)
            this.$emit('change', item.value)
            this.showPop = false
        },
        createDate() {
            const gap = 6
            const date = new Date()
            // const m = date.getMonth() + 1
            const m = 7
            let y = date.getFullYear()
            for (let i = 1; i <= gap; i++) {
                const diff = m - (i % 12)
                const month = diff > 0 ? diff : 12 + diff
                console.log(y, month)
                const label = `截至${y}年0${month}月度末`
                // const label = '截至2023年06月度末'
                this.optionsate.push({
                    label,
                    value: label,
                })
                if (diff === 0) {
                    y--
                }
            }
            this.currentDate = this.optionsate[0]
        },
    },
}
</script>

<style lang="less" scoped>
.date-select-class {
    position: relative;
    user-select: none;

    .date-input {
        display: flex;
        align-items: center;
        padding: 0 10px;
        // width: 248px;
        height: 40px;
        background-image: url(./ds-bg.png);
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
            opacity: 0.9;
        }
        .dsc-value {
            overflow: hidden;
            flex: 1;
            padding-right: 5px;
            color: #eef2ff;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 22px;
            line-height: 24px;
        }
        .dsc-arrow {
            width: 16px;
            height: 12px;
        }
    }
}
.select-pop-ul {
    .select-pop-li {
        padding: 8px 10px;
        color: rgb(238, 242, 255, 0.8);
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        user-select: none;
        &:hover {
            background: rgba(0, 176, 255, 0.31);
            color: #fff;
        }
    }
    .select-pop-li-active {
        background: rgba(0, 176, 255, 0.31);
        color: #fff;
    }
}
</style>
