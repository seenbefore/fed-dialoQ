import { mock } from 'mockjs'

export default [
    {
        name: '/workbench/analysis/data',
        method: 'get',
        description: '获取分析页数据',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    visitCount: 594833,
                    uniqueIp: 19523,
                    statisticsExample: 88888,
                    regionData: [
                        { name: '广东省', value: 102696 },
                        { name: '北京市', value: 62786 },
                        { name: '浙江省', value: 43973 },
                        { name: '江苏省', value: 42777 },
                        { name: '上海市', value: 39834 },
                        { name: '四川省', value: 36837 },
                        { name: '湖北省', value: 26052 },
                    ],
                    terminalData: [
                        { name: 'Windows 10', value: 64 },
                        { name: 'OSX', value: 21 },
                        { name: 'Android', value: 11.84 },
                        { name: 'Linux', value: 1.26 },
                        { name: '其他', value: 0.65 },
                    ],
                    browserData: [
                        { name: 'Chrome', value: 68.1 },
                        { name: 'MSEdge', value: 25 },
                        { name: 'Firefox', value: 2.98 },
                        { name: 'MicroMessenger', value: 2.25 },
                        { name: '其他', value: 1.33 },
                    ],
                    timeAnalysis: [
                        { time: '00:00', value: 20000 },
                        { time: '01:00', value: 18000 },
                        { time: '02:00', value: 16000 },
                        { time: '03:00', value: 15000 },
                        { time: '04:00', value: 20000 },
                        { time: '05:00', value: 25000 },
                        { time: '06:00', value: 30000 },
                        { time: '07:00', value: 45000 },
                        { time: '08:00', value: 65000 },
                        { time: '09:00', value: 80000 },
                        { time: '10:00', value: 85000 },
                        { time: '11:00', value: 90000 },
                        { time: '12:00', value: 100000 },
                        { time: '13:00', value: 105000 },
                        { time: '14:00', value: 108000 },
                        { time: '15:00', value: 110000 },
                        { time: '16:00', value: 105000 },
                        { time: '17:00', value: 95000 },
                        { time: '18:00', value: 90000 },
                        { time: '19:00', value: 80000 },
                        { time: '20:00', value: 65000 },
                        { time: '21:00', value: 50000 },
                        { time: '22:00', value: 45000 },
                        { time: '23:00', value: 40000 },
                    ],
                },
                message: '请求成功',
            })
        },
    },
]
