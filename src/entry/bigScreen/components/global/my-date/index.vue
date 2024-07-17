<template>
    <div class="my-date">
        <div class="md-date-class">{{ curDate }}</div>
        <div class="md-time-class">{{ curTime }}</div>
        <div class="md-week-class">{{ curWeek }}</div>
    </div>
</template>

<script>
import { format } from 'date-fns'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default {
    components: {},
    props: {},
    created() {
        this.getCurrentDate()
    },
    computed: {},
    data() {
        return {
            timer: null,
            curDate: '',
            curTime: '',
            curWeek: '',
        }
    },
    methods: {
        getCurrentDate() {
            const fn = () => {
                const d = new Date()
                // console.log(format(d, 'YYYY.MM.DD HH:mm:ss 星期E'))
                this.curDate = format(d, 'YYYY.MM.DD')
                this.curTime = format(d, 'HH:mm:ss')
                this.curWeek = `星期${WEEKDAYS[d.getDay()]}`
            }
            this.timer = setInterval(fn, 1000)
            fn()
        },
    },
}
</script>

<style lang="less">
.my-date {
    display: flex;
    font-size: 22px;
    line-height: 1;
    .md-date-class {
        margin-right: 8px;
    }
    .md-time-class {
    }
    .md-week-class {
        margin-left: 46px;
    }
}
</style>
