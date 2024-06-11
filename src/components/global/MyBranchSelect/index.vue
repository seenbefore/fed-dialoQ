<template>
    <div class="sg-data-form-field MyBranchSelect">
        <el-input placeholder="" readonly v-model="inputValue">
            <el-button class="add" slot="append" icon="el-icon-plus" @click="openDialog"></el-button>
        </el-input>

        <MyDialog @success="onSave" :visible.sync="visible" :checked="checked" v-if="visible"></MyDialog>
    </div>
</template>

<script>
import MyDialog from './dialog.vue'
export default {
    name: 'MyBranchSelect',
    components: {
        MyDialog,
    },
    props: {
        value: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            inputValue: '',
            visible: false,
            checked: [],
        }
    },
    watch: {
        value(val) {
            // 表单重置的时候会返回[undefined]
            if (val && !val[0]) {
                this.inputValue = ''
                this.checked = []
                this.$emit('input', null)
            }
        },
    },
    mounted() {},
    methods: {
        onSave(val) {
            this.inputValue = val.map(item => item.label).join('、')
            this.checked = [...val]
            this.$emit('input', [...val])
        },
        openDialog() {
            this.visible = true
        },
    },
}
</script>
<style lang="less">
.MyBranchSelect {
    .el-button.add {
        vertical-align: middle;
        i {
            font-style: normal;
        }
    }
}
</style>
