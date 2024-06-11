<!--
    左侧模块
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayoutConfig, ModuleDataConfig } from './config'
import Service from './service'
import { IBaseItem } from '@/entry/bigscreen/types/index'

@Component({
    name: 'ModuleLeft',
    components: {},
})
export default class ModuleLeft extends Vue {
    public moduleData = ModuleDataConfig
    public resData: any = {}
    created() {
        this.syncData()
    }
    mounted() {}
    async syncData() {
        const res = await Service.get('module接口数据1')()
        this.resData = res.data || {}
        console.log('module接口数据1-res :>> ', res.data)
    }

    /**
     * @description 获取my-base-item节点元素
     * @param {BaseItem} option 配置项
     * @param {*} resData 接口数据，类型为对象
     */
    getBaseItemNode(option: IBaseItem, resData: Record<string, any>) {
        return <my-base-item class="item" is-auto-tran-data={true} is-res-data-type="object" item={option} res-data={resData} />
    }
    render() {
        const { one, two, three, four, five, six, seven, eight } = LayoutConfig
        const { oneData, twoData, threeData, fourData, fiveData, sixData, sevenData, eightData } = this.moduleData

        const moduleTwoNodes = twoData.map(v => this.getBaseItemNode(v, this.resData))

        const moduleFourNodes = fourData.map(v => this.getBaseItemNode(v, this.resData))

        const moduleSixNodes = sixData.map(v => this.getBaseItemNode(v, this.resData))

        const moduleEightNodes = eightData.map(v => this.getBaseItemNode(v, this.resData))

        return (
            <div class="">
                <my-container props={one}>
                    <my-module-title class="big-title" props={oneData}></my-module-title>
                </my-container>

                <my-container props={two}>
                    <div class="is-group">{moduleTwoNodes}</div>
                </my-container>

                <my-container props={three}>
                    <my-module-title class="big-title" props={threeData}></my-module-title>
                </my-container>

                <my-container props={four}>
                    <div class="is-group">{moduleFourNodes}</div>
                </my-container>

                <my-container props={five}>
                    <my-module-title class="big-title" props={fiveData}></my-module-title>
                </my-container>

                <my-container props={six}>
                    <div class="group-one">{moduleSixNodes}</div>
                </my-container>

                <my-container props={seven}>
                    <my-module-title class="big-title" props={sevenData}></my-module-title>
                </my-container>

                <my-container props={eight}>
                    <div class="group-one">{moduleEightNodes}</div>
                </my-container>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.is-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;

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

.group-one {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .item {
        width: calc(50%);
        margin-bottom: 26px;

        ::v-deep {
            .item-right__bottom {
                font-size: 14px;

                .text-item__content {
                    position: relative;
                    align-items: flex-end;

                    .text-item--title {
                        font-size: 14px;
                    }

                    .text-item__right {
                        position: absolute;
                        left: 30px;
                        bottom: 0;
                        width: 150px;
                        line-height: 18px;

                        .text-item--number {
                            margin: 0 2px 0 4px;
                        }
                    }
                }
            }
        }
    }

    ::v-deep {
        .field_1 {
            width: 100%;

            .item-right {
                display: flex;
                align-items: flex-end;

                .item-right__bottom {
                    padding-bottom: 3px;
                    padding-left: 17px;
                }
            }
        }
    }
}
</style>
