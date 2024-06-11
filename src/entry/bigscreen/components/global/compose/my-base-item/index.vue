<!--
   my-base-item
-->
<template>
    <div :class="['my-base-item', item.class || item.className]">
        <my-badge class="item-icon" v-bind="item.iconConfig" :img="imgSrc" v-if="hasLeftIcon"></my-badge>
        <div class="item-right">
            <template v-if="isResDataType === 'array'">
                <my-text-item
                    :class="[`item-right__${index ? 'bottom' : 'top'}`, child.class || child.className]"
                    :layout="child.layout"
                    :color="getNumberStyle(child.style, 'color')"
                    :font-size="getNumberStyle(child.style, 'fontSize')"
                    :item="child.attrs"
                    :key="index"
                    v-for="(child, index) in options"
                />
            </template>

            <template v-else>
                <my-text-item
                    :class="[`item-right__${index ? 'bottom' : 'top'}`, child.class || child.className]"
                    :layout="child.layout"
                    :color="getNumberStyle(child.style, 'color')"
                    :font-size="getNumberStyle(child.style, 'fontSize')"
                    :res-data="resData"
                    :item="child.attrs"
                    :key="index"
                    v-for="(child, index) in options"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IBaseItem } from '../../../../types/index'

const DEFAULT_FIELD_CONFIG = { key: 'itemCode', valueKey: 'itemValue' }

@Component({
    name: 'MyBaseItem',
    components: {},
})
export default class MyBaseItem extends Vue {
    /** 是否组件中自动转换数据，默认为false */
    @Prop({ type: Boolean, default: false }) isAutoTranData!: boolean
    /** 组件的配置项 - item */
    @Prop({ type: Object, default: () => ({}) }) item!: IBaseItem
    /** 接口数据 */
    @Prop({ type: [Array, Object], default: () => [] }) resData!: Array<any> | Record<string, any>
    /** 接口数据类型，默认为array */
    @Prop({ type: String, default: 'array' }) isResDataType!: 'array' | 'object'
    /** 接口数组对象的key-value字段配置项 */
    @Prop({
        type: Object,
        default: () => DEFAULT_FIELD_CONFIG,
    })
    fieldConfig!: Record<string, any>
    /** 自定义格式化接口数据 */
    @Prop() customFormatResData!: (data: any) => Promise<any>
    /** 有左侧icon */
    get hasLeftIcon() {
        const { iconUrl, icon } = this.item
        return iconUrl || icon
    }
    get imgSrc() {
        if (this.item.iconUrl) return this.item.iconUrl
        const icon = this.item.icon || 'icon-sqbs'
        return require(`@/entry/bigscreen/assets/base-svg/${icon}.svg`)
    }
    /** text-item 组件数据集 */
    get options() {
        // console.log('this.isAutoTranData :>> ', this.isAutoTranData)
        return this.isAutoTranData ? this.getOptions() : this.item.options
    }
    created() {}
    mounted() {}
    getNumberStyle(data: any, key: 'color' | 'fontSize') {
        return data?.[key] || ''
    }
    getOptions() {
        const source = this.item.options
        const target = this.resData
        if (!Array.isArray(source) || !Array.isArray(target) || !target?.length) {
            return source
        }
        // console.log('base-item-source :>> ', source)
        // console.log('base-item-target :>> ', target)
        const result = source.map((c: any) => ({
            ...c,
            attrs: this.itemHandler(c.attrs, target, this.fieldConfig),
        }))
        // console.log('result :>> ', result)
        return result
    }
    /**
     * @param {*} source base-item组件的options-item
     * @param {Array} target 接口返回的数组数据
     * @param {*} config 接口数组对象的key-value字段配置项，例如：{ key: 'itemCode', valueKey: 'itemValue' }
     * @returns
     */
    itemHandler(source: any, target: any, config: any) {
        const { key, valueKey } = config
        const findData = target.find((v: any) => {
            return v[key] === source.key
        })
        const result = { ...source }
        result.number = findData?.[valueKey] ?? '--'
        return result
    }
}
</script>

<style lang="less" scoped>
.my-base-item {
    display: flex;
    align-items: center;

    .item-icon {
        margin-right: 8px;
    }
}
</style>
