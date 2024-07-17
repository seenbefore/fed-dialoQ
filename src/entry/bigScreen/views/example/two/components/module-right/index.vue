<!--
    右侧模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig } from './config'
import Service from './service'

@Component({
    name: 'ModuleRight',
    components: {},
})
export default class ModuleRight extends Vue {
    public moduleData = ModuleDataConfig
    public options: Record<string, any> = {
        0: {
            title: '社融规模总量',
            unit: '（亿元）',
            number: '0',
            key: 'key1',
            ratioItem: {
                title: '同比',
                number: 0,
                unit: '%',
                decimals: 2,
                key: 'key1_ratio',
            },
            textList: [
                {
                    title: '一季度数据',
                },
            ],
        },
        1: {
            title: '存贷款余额',
            unit: '（亿元）',
            number: '0',
            key: 'key2',
            ratioItem: {
                title: '同比',
                number: 0,
                unit: '%',
                decimals: 2,
                key: 'key2_ratio',
            },
            textList: [
                {
                    title: '其中存款',
                    number: 0,
                    decimals: 2,
                    unit: '亿元',
                    key: 'key3',
                },
                {
                    title: '|',
                },
                {
                    title: '贷款',
                    number: 0,
                    decimals: 2,
                    unit: '亿元',
                    key: 'key4',
                },
                {
                    title: '新增制造业中长期贷款',
                    number: 0,
                    decimals: 0,
                    unit: '亿元',
                    key: 'key5',
                },
            ],
        },
    }
    public resData: any = {}
    get tranOptions() {
        const options: any = Object.values(this.options).map((item: any) => {
            const { key: valueKey } = item
            const { key: ratioKey } = item.ratioItem
            return {
                ...item,
                number: this.resData?.[valueKey] ?? '--',
                ratioItem: {
                    ...item.ratioItem,
                    number: this.resData?.[ratioKey] ?? '--',
                },
            }
        })
        return [...options]
    }
    created() {
        this.syncData()
    }
    mounted() {}
    async syncData() {
        const res: any = await Service.get('module接口数据1')()
        console.log('other-res :>> ', res)
        this.resData = res.data
    }
    render() {
        const { one, two, three, four } = LayoutConfig
        const { oneData } = this.moduleData

        const groupNodes = this.tranOptions.map((v: any) => {
            return (
                <div class="is-group">
                    <my-card-number class="sg-m-b-8" font-size="34px" color="#00FFFF" dot-flex="end" gutter="4" item={v} is-has-ratio={true}></my-card-number>
                    <div class="group-bottom sg-flexbox wrap align-center">
                        {v.textList.map((c: any) => {
                            return <my-text-item color="#00FFFF" font-size="16px" item={c} res-data={this.resData} />
                        })}
                    </div>
                </div>
            )
        })

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData}></my-module-title>
                </my-container>

                <my-container props={two}>{groupNodes}</my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.is-group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;

    .item {
        width: calc(50%);
        margin-bottom: 26px;
    }

    ::v-deep {
        .field_1 {
            width: 100%;
        }
    }
}
</style>
