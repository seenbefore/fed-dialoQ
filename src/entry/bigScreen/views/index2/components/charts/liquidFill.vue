<template>
    <div class="" style="width:180px;height:180px;">
        <Chart :config="config" :chart-style="{ width: '180px', height: '180px' }"></Chart>
    </div>
</template>

<script>
import Chart from '@/components/base/Chart/index.vue'
export default {
    components: {
        Chart,
    },
    props: {},
    data() {
        return {
            config: {
                title: {
                    text: '入库率(%)',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#fff',
                    },
                    x: 'center',
                    y: '55%',
                },
                //backgroundColor: '#fff', //背景色
                series: [
                    {
                        type: 'liquidFill',
                        radius: '45%',
                        center: ['50%', '50%'],
                        data: [0.6, 0.6, 0.6], // 三个波浪的值
                        backgroundStyle: {
                            color: {
                                type: 'linear',
                                x: 1,
                                y: 0,
                                x2: 0.5,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 1,
                                        color: 'rgba(68, 145, 253, 0)',
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(68, 145, 253, .25)',
                                    },
                                    {
                                        offset: 0,
                                        color: 'rgba(68, 145, 253, 1)',
                                    },
                                ],
                                globalCoord: false,
                            },
                        },
                        label: {
                            color: '#fff',
                            show: false,
                            normal: {
                                formatter: '60',
                                textStyle: {
                                    fontSize: 26,
                                    color: '#fff',
                                },
                            },
                        },
                        outline: {
                            show: false,
                        },
                    },
                ],
            },
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less" scoped></style>
