import { dealNull, numtoThousands } from '../filters/filter.js'

/**
 * 首贷户（首页）
 */
export const setHomePieChart = (seriesName = '首贷户统计', seriesData = []) => {
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
        color: ['#73a0fa', '#73deb3', '#7585a2', '#f7c739', '#eb7e65', '#83d0ef', '#a285d2', '#ffab67'],
        series: [
            {
                name: seriesName,
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                },
                labelLine: {
                    show: false,
                },
                data: seriesData,
            },
        ],
    }
}

export default {
    setHomePieChart,
}
