import { dealNull, numtoThousands } from '../filters/filter.js'

/**
 * 首贷户（首页）
 */
export const setHomeBarChart = (seriesName = '首贷户统计', yData = [], seriesData = []) => {
    return {
        tooltip: {
            show: true,
            formatter: function(params) {
                let html = ''
                if (params) {
                    let val = dealNull(params.value) != '-' ? numtoThousands(params.value, 0) : '-'
                    html = `<p>${params.name}</p>
                            <div>
                                ${params.marker}<label>${params.seriesName}</label>：${val}家
                            </div>`
                }
                return html
            },
        },
        grid: {
            top: 15,
            bottom: 30,
            left: 80,
            right: 30,
        },
        xAxis: {
            splitLine: {
                show: true,
                lineStyle: { color: '#ddd' },
            },
            axisLabel: { color: '#999' },
            axisTick: { show: false },
            axisLine: { show: false },
        },
        yAxis: {
            type: 'category',
            data: yData,
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: '#ddd' },
            },
            axisLabel: { color: '#999' },
        },
        series: [
            {
                name: seriesName,
                type: 'bar',
                barMaxWidth: 25,
                itemStyle: { color: '#5B8FF9' },
                data: seriesData,
            },
        ],
    }
}

export default {
    setHomeBarChart,
}
