<template>
    <div class="sg-page AdminFeatPrint">
        <el-button type="primary" @click="handleClick">打印</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import printJS from 'print-js'
@Component({
    name: 'AdminFeatPrint',
    components: {},
})
export default class AdminFeatPrint extends Vue {
    handleClick() {
        printJS({
            printable: [
                { name: 'll', email: '123@gmail.com', phone: '123' },
                { name: 'qq', email: '456@gmail.com', phone: '456' },
            ],
            properties: ['name', 'email', 'phone'],
            type: 'json',
        })
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
