<template>
    <!-- 阻止冒泡导致父菜单收起 -->
    <div class="cascader-popup" :class="{ 'check-strictly': checkStrictly }" @click.stop>
        <van-popup v-model="showPopup" position="bottom" :safe-area-inset-bottom="true" :close-on-click-overlay="false" @click-overlay="cancel">
            <div class="cascader-popup-header">
                <van-button class="text cancel" @click="cancel">
                    取消
                </van-button>
                <van-button class="text confirm" @click="confirm">
                    确定
                </van-button>
            </div>
            <van-cascader ref="vanCascader" v-model="myValue" :options="myOptions" @change="onchange" @finish="onfinish" @close="cancel" />
        </van-popup>
    </div>
</template>

<script>
import { deepClone } from 'icinfo-util'
import { dfsTreeSome } from '../../service/index.js'
export default {
    name: 'CascaderPopup',
    props: {
        value: { type: [String, Number], default: '' },
        options: {
            type: Array,
            default() {
                return [
                    // {
                    //     label: '浙江省',
                    //     value: '330000',
                    //     children: [{ label: '杭州市', value: '330100' }],
                    // },
                    // {
                    //     label: '江苏省',
                    //     value: '320000',
                    //     children: [{ label: '南京市', value: '320100' }],
                    // },
                ]
            },
        },
        // 是否严格的遵守父子节点不互相关联
        checkStrictly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showPopup: false,
            myValue: this.value,
            selectInfos: {},
        }
    },
    computed: {
        myOptions({ options }) {
            const options_ = deepClone(options)
            dfsTreeSome(options_, node => {
                node.text = node.label
            })
            return options_
        },
    },
    mounted() {
        this.showPopup = true
    },
    methods: {
        cancel() {
            this.showPopup = false
            setTimeout(() => {
                this.$options.cancel()
            }, 500)
        },
        confirm() {
            this.showPopup = false
            setTimeout(() => {
                this.$options.confirm(this.selectInfos)
            }, 500)
        },
        onchange({ value, selectedOptions, tabIndex }) {
            this.selectInfos = { value, selectedOptions, tabIndex }
        },
        onfinish({ value, selectedOptions, tabIndex }) {
            if (!this.checkStrictly) {
                this.selectInfos = { value, selectedOptions, tabIndex }
                this.confirm()
            }
        },
    },
}
</script>

<style lang="less" scoped>
.cascader-popup {
    .cascader-popup-header {
        display: none;
        // display: flex;
        height: 45px;
        align-items: center;
        justify-content: space-between;
        button {
            height: 100%;
            &.cancel {
                color: #999999;
            }
            &.confirm {
                color: #0076ff;
            }
        }
    }
    /deep/.van-cascader {
        .van-cascader__header {
            // display: none;
        }
    }
    .check-strictly {
        .cascader-popup-header {
            display: flex;
        }
        /deep/.van-cascader {
            .van-cascader__header {
                display: none;
            }
        }
    }
}
</style>
