<template>
    <div ref="gantt"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
//import 'dhtmlx-gantt/codebase/locale/locale_cn'  // 本地化
export default {
    name: 'GanttS',
    props: {
        tasks: {
            type: Object,
            default() {
                return { data: [], links: [] }
            },
        },
    },
    methods: {
        $_initGanttEvents: function() {
            if (!gantt.$_eventsInitialized) {
                gantt.attachEvent('onTaskSelected', id => {
                    let task = gantt.getTask(id)
                    this.$emit('task-selected', task)
                })
                gantt.attachEvent('onTaskIdChange', (id, new_id) => {
                    if (gantt.getSelectedId() == new_id) {
                        let task = gantt.getTask(new_id)
                        this.$emit('task-selected', task)
                    }
                })
                gantt.$_eventsInitialized = true
            }
        },
        $_initDataProcessor: function() {
            if (!gantt.$_dataProcessorInitialized) {
                gantt.createDataProcessor((entity, action, data, id) => {
                    this.$emit(`${entity}-updated`, id, action, data)
                })
                gantt.$_dataProcessorInitialized = true
            }
        },
    },
    mounted: function() {
        this.$_initGanttEvents()
        gantt.config.xml_date = '%Y-%m-%d'
        //左侧是否自适应
        //gantt.config.autofit = true
        //左侧宽
        gantt.config.grid_width = 500
        //取消连线
        gantt.config.drag_links = false
        //只读
        gantt.config.readonly = false
        //右侧显示列名
        gantt.config.date_scale = '%Y-%m-%d'
        //自动调整图表坐标轴区间用于适配task的长度
        gantt.config.fit_tasks = true
        //弹窗宽
        gantt.config.wide_form = false
        // 在时间线上增加一行年份显示
        gantt.config.subscales = [
            {
                unit: 'year',
                step: 1,
                date: '%Y',
            },
        ]
        //汉化
        gantt.locale = {
            date: {
                month_full: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                month_short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                day_full: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                day_short: ['日', '一', '二', '三', '四', '五', '六'],
            },
            labels: {
                dhx_cal_today_button: '今天',
                day_tab: '日',
                week_tab: '周',
                month_tab: '月',
                new_event: '新建日程',
                icon_save: '保存',
                icon_cancel: '关闭',
                icon_details: '详细',
                icon_edit: '编辑',
                icon_delete: '删除',
                confirm_closing: '请确认是否撤销修改!', //Your changes will be lost, are your sure?
                confirm_deleting: '是否删除计划?',
                section_description: '描述:',
                section_time: '时间范围:',
                section_type: '类型',
                section_text: '计划名称:',
                section_color: '颜色:',

                /* grid columns */

                column_text: '计划名称',
                column_start_date: '开始时间',
                column_duration: '持续时间',
                column_add: '',

                /* link confirmation */

                link: '关联',
                confirm_link_deleting: '将被删除',
                link_start: ' (开始)',
                link_end: ' (结束)',

                type_task: '任务',
                type_project: '项目',
                type_milestone: '里程碑',

                minutes: '分钟',
                hours: '小时',
                days: '天',
                weeks: '周',
                months: '月',
                years: '年',
            },
        }
        //左侧显示列名
        gantt.config.columns = [
            { name: 'text', label: '计划名称', tree: true, width: '*' },
            { name: 'start_date', label: '开始时间', align: 'center' },
            {
                name: 'end_date',
                label: '结束时间',
                align: 'center',
            },
            {
                name: 'progress',
                label: '进度',
                align: 'center',
                width: '80',
                template: function(obj) {
                    return Math.floor(obj.progress * 100).toString() + '%'
                },
            },
            // { name: 'add', label: '' },
        ]
        gantt.init(this.$refs.gantt)
        gantt.parse(this.$props.tasks)
        this.$_initDataProcessor()
    },
}
</script>

<style>
@import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
</style>
