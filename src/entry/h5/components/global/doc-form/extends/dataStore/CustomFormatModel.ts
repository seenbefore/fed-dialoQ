import { Component, Vue } from 'vue-property-decorator'

@Component
export class CustomFormatModel<T = any> extends Vue {
    public data: UndefinedAble<T> = void 0

    /*
     * 在存储数据的时候最终合并 formData 数据的时候是否用 field 的 name 作为 key 存储数据
     * example:
     * field:
     *      { tag: () => import('xxx.vue'), name: 'test', label: '测试组件', props: { label: '测试组件-test' }) }
     * formData:
     *          useFieldNameByFormDataKey is true   =》 { test: xxx组件通过getData的值 }
     *          useFieldNameByFormDataKey is false  =》 { ...xxx组件通过getData的值 } // 必须要为 Object
     *  */
    public useFieldNameByFormDataKey = true

    /* 初始化默认值 */
    public initData(data: T): void {
        this.$set(this, 'data', data)
    }

    /* 校验 */
    public validate(): Promise<void> {
        return Promise.resolve()
    }

    /* 获取数据 */
    public getData(): UndefinedAble<T> {
        return this.data
    }
}
