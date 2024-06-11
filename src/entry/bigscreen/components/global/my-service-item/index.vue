<!--
   my-service-item
-->
<template>
    <div>
        <div class="title">{{ item.title }}</div>
        <my-text-item
            :class="[`item-right__${index ? 'bottom' : 'top'}`, child.className]"
            :layout="child.layout"
            :color="getNumberStyle(child.style, 'color')"
            :font-size="getNumberStyle(child.style, 'fontSize')"
            :item="child.attrs"
            :key="index"
            v-for="(child, index) in options"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IBaseItem } from '../../../types/index'

const DEFAULT_FIELD_CONFIG = { key: 'itemCode', valueKey: 'itemValue' }

@Component({
    name: 'MyServiceItem',
    components: {},
})
export default class MyServiceItem extends Vue {
    /** 是否组件中自动转换数据，默认为false */
    @Prop({ type: Boolean, default: false }) isAutoTranData!: boolean
    /** 组件的配置 - item */
    @Prop({ type: Object, default: () => ({}) }) item!: IBaseItem
    /** 接口数据 */
    @Prop({ type: Array, default: () => [] }) resData!: Array<any>
    /** 接口数组对象的key-value字段配置项 */
    @Prop({
        type: Object,
        default: () => DEFAULT_FIELD_CONFIG,
    })
    fieldConfig!: Record<string, any>
    /** 自定义格式化接口数据 */
    @Prop() customFormatResData!: (data: any) => Promise<any>

    /** text-item 组件数据集 */
    get options() {
        console.log('this.isAutoTranData :>> ', this.isAutoTranData)
        console.log('this.item.options', this.item.options)
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

<style lang="less" scoped></style>
