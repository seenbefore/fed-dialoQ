<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ModulesComp from './module'

@Component({
    name: 'ExampleEcharts',
    components: {},
})
export default class ExampleEcharts extends Vue {
    created() {}
    mounted() {}
    public totalData: Record<string, any> = {}
    async getData() {}
    titleImg = require('./assets/title-img.png')
    render() {
        const nodeComponents = Object.values(ModulesComp).map((item: any) => {
            return <item dataSource={this.totalData}></item>
        })
        return (
            <my-sg-page width={1920} height={1080} title-img={this.titleImg} is-scale>
                {nodeComponents}
            </my-sg-page>
        )
    }
}
</script>

<style lang="less" scoped></style>
