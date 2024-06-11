<template>
    <BaseChart ref="chart" :config="config" :get-option="getOption" :option="option"></BaseChart>
</template>
<script>
import option from './option'
import getOption from './getOption'
import BaseChart from '../BaseChart'
import mix from '../lib/mix'

export default {
    name: 'SgPie',
    mixins: [mix],
    data() {
        return {
            option,
            getOption,
        }
    },
}
</script>
