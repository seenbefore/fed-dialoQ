// 贷前调查历史报告额外配置
export const HISTORY_OPTIONS = [
    {
        tag: 'select',
        name: 'creditStatus',
        label: '授信状态',
        attrs: {
            value: '',
            options: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '在途',
                    value: '1',
                },
                {
                    label: '授信失效',
                    value: '2',
                },
                {
                    label: '授信完成',
                    value: '3',
                },
            ],
        },
    },
    {
        tag: 'date',
        name: 'creditDate',
        label: '授信日期范围',
        attrs: {
            value: [],
            type: 'daterange',
            'value-format': 'yyyy-MM-dd',
            'start-placeholder': '请输入开始时间',
            'end-placeholder': '请输入结束时间',
        },
    },
]

// 企业及个人融资情况配置
export const ENT_PER_OPTIONS = [
    // {
    //     label: '借款人',
    //     prop: 'entname',
    //     fixed: 'left',
    //     // minWidth: 120,
    // },
    {
        label: '融资家数',
        prop: 'dkjgNum',
        width: 120,
    },
    {
        label: '贷款余额',
        prop: 'dkye',
        width: 110,
    },
    {
        label: '担保交易余额',
        prop: 'jyyeGuarantee',
        width: 140,
    },
    {
        label: '其中经营性贷款家数',
        prop: 'dkjgManageNum',
        width: 150,
    },
    {
        label: '其中经营性贷款余额占比',
        prop: 'dkyeManageRate',
        width: 180,
    },
    {
        label: '其中信用保证贷款余额占比',
        prop: 'dkyeCreditGuartRate',
        width: 190,
    },
    {
        label: '其中抵质押贷款余额占比',
        prop: 'dkyePledgeRate',
        width: 180,
    },
    {
        label: '其中组合贷款余额占比',
        prop: 'dkyeGroupRate',
        width: 180,
    },
    {
        label: '承兑汇票余额',
        prop: 'cdhpye',
        width: 140,
    },
    {
        label: '最低保证金比例',
        prop: 'bzjMinRate',
        width: 140,
    },
    {
        label: '信用证余额',
        prop: 'xyzye',
        width: 140,
    },
    {
        label: '其他担保交易余额',
        prop: 'jyyeGuaranteeOth',
        width: 140,
    },
    {
        label: '对外担保余额',
        prop: 'dbyeDw',
        width: 130,
    },
    // {
    //     label: '附件',
    //     prop: 'file',
    //     fixed: 'right',
    //     // minWidth: 110,
    // },
]

// 关联人融资情况配置
export const RELATION_PER_OPTIONS = [
    // {
    //     label: '关联人',
    //     prop: 'name',
    //     fixed: 'left',
    //     // minWidth: 120,
    // },
    // {
    //     label: '关系',
    //     prop: 'relation',
    //     // minWidth: 120,
    // },
    {
        label: '贷款机构家数',
        prop: 'dkjgNum',
        width: 120,
    },
    {
        label: '贷款授信总额',
        prop: 'dksxSum',
        width: 120,
    },
    {
        label: '贷款余额',
        prop: 'dkyeYg',
        width: 100,
    },
    {
        label: '贷款逾期月份数',
        prop: 'loanOdueMonths',
        width: 120,
    },
    {
        label: '贷款最长逾期数',
        prop: 'loanOdueMax',
        width: 120,
    },
    {
        label: '其中经营性贷款占比',
        prop: 'dkyeManageRate',
        width: 150,
    },
    {
        label: '其中信用保证类贷款占比',
        prop: 'dkyeCreditGuartRate',
        width: 180,
    },
    {
        label: '其中抵质押类贷款余额占比（剔除按揭）',
        prop: 'dkyePledgeRate',
        width: 280,
    },
    {
        label: '对外担保余额',
        prop: 'dbyeDw',
        width: 120,
    },
    {
        label: '企业担保余额占比',
        prop: 'dbyeEntRate',
        width: 140,
    },
    {
        label: '信用卡已用额度',
        prop: 'creditcardLimited',
        width: 120,
    },
    {
        label: '近6个月平均使用额度比例',
        prop: 'limitedLast6mthAvg',
        width: 190,
    },
    {
        label: '信用卡逾期月份数',
        prop: 'creditcardOdueMonths',
        width: 140,
    },
    {
        label: '最长逾期期数',
        prop: 'creditcardOdueMax',
        width: 110,
    },
    {
        label: '近6个月贷款查询次数',
        prop: 'dkcxNumLast6mth',
        width: 160,
    },
    // {
    //     label: '附件',
    //     prop: 'file',
    //     fixed: 'right',
    //     // minWidth: 110,
    // },
]

// 经营场地-租赁场地配置
export const LEASED_PREMISES = [
    {
        key: '经营场地所有权',
        name: 'type',
        val: '',
    },
    {
        key: '经营地租金',
        name: 'money',
        tag: 'input',
        val: '',
    },
    {
        key: '租赁经营地面积',
        name: 'businessArea',
        tag: 'input',
        val: '',
    },
    {
        key: '经营地租赁期限',
        name: 'leaseTerm',
        tag: 'input',
        val: '',
    },
    {
        key: '出租人（房东）',
        name: 'lessorName',
        tag: 'input',
        val: '',
    },
    {
        key: '租赁关系',
        name: 'relation',
        tag: 'input',
        val: '',
    },
]

// 审批流程默认配置
export const AUDIT_ITEM = {
    model: {},
    fields: [
        {
            tag: 'radio',
            name: 'auditType',
            label: '',
            attrs: {
                value: '',
                options: [
                    {
                        label: 'B岗复核',
                        value: '1',
                    },
                    {
                        label: '支行审查',
                        value: '2',
                    },
                    {
                        label: '风险小组审批',
                        value: '3',
                    },
                    {
                        label: '支行审批',
                        value: '4',
                    },
                    {
                        label: '总行审查',
                        value: '5',
                    },
                ],
            },
        },
        {
            tag: 'select',
            name: 'members',
            label: '',
            attrs: {
                value: '',
                appendSlot: 'membersDel',
                options: [
                    {
                        label: '全部',
                        value: '',
                    },
                ],
            },
        },
    ],
}

// 担保人情况类型枚举
export const GUARANTOR_MAP = {
    guaranteeEnt: '担保人情况（企业）',
    guaranteePer: '担保人情况（个人）',
    commercial: '抵押（商品房）',
    villa: '抵押（别墅）',
    'site-house': '抵押（立地房）',
    shops: '抵押（商铺）',
    office: '抵押（办公楼）',
    workshop: '抵押（厂房）',
    land: '抵押（国有土地使用权）',
    ship: '抵押（船舶）',
    other: '抵押（其他）',
    personal: '质押（个人储蓄存单）',
    ent: '质押（企业储蓄存单）',
    invention: '质押（发明专利）',
    practical: '质押（实用新型专利）',
    design: '质押（外观设计专利）',
    trademark: '质押（商标权）',
}

// 辅助报表不可编辑项
export const REPORT_MAP = [
    '固定资产',
    '总资产',
    '净资产',
    '短期借款',
    '应付票据',
    '长期借款',
    '总负债',
    '销售利润',
    '总收入',
    '净利润',
    '总支出',
    '新增流动资金贷款额',
    '其中企业资产',
    '其中个人资产',
    '短期-其中企业借款',
    // '短期-其中个人借款',
    '长期-其中企业借款',
    // '长期-其中个人借款',
    '其中租金支出',
]

// 担保情况枚举
export const GUARANTEE_MAP = {
    MortageContentCom: '企业',
    MortageContentSelf: '个人',
    COMMERCIAL: '商品房',
    VILLA: '别墅',
    SITEHOUSE: '立地房',
    SHOPS: '商铺',
    OFFICE: '办公楼',
    WORKSHOP: '厂房',
    LAND: '国有土地使用权',
    SHIP: '船舶',
    OTHER: '其他',
    PERSONAL: '个人储蓄存单',
    ENT: '企业储蓄存单',
    INVENTION: '发明专利',
    PRACTICAL: '实用新型专利',
    DESIGN: '外观设计专利',
    TRADEMARK: '商标权',
}

// 授信方案种类枚举value
export const CREDIT_VMAP = {
    贷款: 1,
    '承兑汇票（敞口）': 2,
    '贸易融资（敞口）': 3,
    其他: 4,
}

// 授信方案种类枚举key
export const CREDIT_KMAP = {
    1: '贷款',
    2: '承兑汇票（敞口）',
    3: '贸易融资（敞口）',
    4: '其他',
}

// 授信方案担保方式种类枚举
export const GUARANTEE_TYPE_MAP = {
    1: '信用',
    2: '保证',
    3: '抵押',
    4: '质押',
    5: '其他',
}

// 经营场地种类V枚举
export const BUSINESS_SITE_VMAP = {
    '经营场地-自有场地': 1,
    '经营场地-租赁场地': 2,
}

// 经营场地种类K枚举
export const BUSINESS_SITE_KMAP = {
    1: '经营场地-自有场地',
    2: '经营场地-租赁场地',
}

// 关联报告报告类型枚举
export const RELATION_REPORT_TYPE = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '小额授信',
        value: '1',
    },
    {
        label: '大额授信',
        value: '2',
    },
    {
        label: '季度贷后检查',
        value: '3',
    },
    {
        label: '首次贷后检查',
        value: '4',
    },
]

/* 报告状态枚举 */
export const REPORT_STATUS_MAP = {
    '1': '待提交',
    '2': '已提交',
    '3': '待审查审批',
    '5': '审查审批未通过',
    '6': '审查审批中',
    '7': '审查审批通过',
}

// 关联报告报告状态枚举
export const RELATION_REPORT_STATUS = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '待提交',
        value: '1',
    },
    {
        label: '已提交',
        value: '2',
    },
    {
        label: '待审查审批',
        value: '3',
    },
    {
        label: '审查审批未通过',
        value: '5',
    },
    {
        label: '审查审批中',
        value: '6',
    },
    {
        label: '审查审批通过',
        value: '7',
    },
]

// 贷后报告类型枚举
export const LOAN_REPORT_TYPE = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '首次贷后检查',
        value: '4',
    },
    {
        label: '季度贷后检查',
        value: '3',
    },
]

// 贷后风险点详细信息枚举
export const RISK_MAP = {
    // 被执行信息
    EXEC_INFO: [
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '案号',
                prop: 'caseNo',
            },
            {
                label: '执行法院',
                prop: 'executionCourt',
            },
            {
                label: '执行标的（元）',
                prop: 'executionTarget',
            },
            {
                label: '立案日期',
                prop: 'filingDate',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                fixed: 'left',
                width: 80,
                align: 'center',
            },
            {
                label: '案号',
                prop: 'anno',
                align: 'center',
            },
            {
                label: '被执行人身份证号码/组织机构代码',
                prop: 'entUnicode',
                align: 'center',
            },
            {
                label: '疑似申请执行人',
                prop: 'entName',
                align: 'center',
            },
            {
                label: '立案时间',
                prop: 'lianDate',
                align: 'center',
            },
            {
                label: '执行法院',
                prop: 'executeGov',
                align: 'center',
            },
            {
                label: '执行标的',
                prop: 'biaodi',
                align: 'center',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '案号',
                prop: 'caseNo',
            },
            {
                label: '执行依据文号',
                prop: 'zxyjwh',
            },
            {
                label: '执行法院',
                prop: 'zxfy',
            },
            {
                label: '涉案金额（元）',
                prop: 'saje',
            },
            {
                label: '被执行人的履行情况',
                prop: 'bzxrlvqk',
            },
            {
                label: '被执行人姓名',
                prop: 'bzxrxm',
            },
            {
                label: '被执行人董监高',
                prop: 'bzxrdjg',
            },
            {
                label: '失信行为',
                prop: 'sxxw',
            },
            {
                label: '立案时间',
                prop: 'filingDate',
            },
            {
                label: '发布时间',
                prop: 'publishDate',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '立案号',
                prop: 'caseNo',
            },
            {
                label: '执行法院',
                prop: 'zxfy',
            },
            {
                label: '执行标的（元）',
                prop: 'zxbd',
            },
            {
                label: '被执行人姓名',
                prop: 'bzxrxm',
            },
            {
                label: '被执行人董监高',
                prop: 'bzxrdjg',
            },
            {
                label: '立案时间',
                prop: 'filingDate',
            },
        ],
    ],
    // 裁判文书
    ADJU_DOCU: [
        {
            label: '序号',
            type: 'index',
            fixed: 'left',
            width: 80,
            align: 'center',
        },
        {
            label: '文书标题',
            prop: 'caseName',
            align: 'center',
        },
        {
            label: '案由',
            prop: 'caseReason',
            align: 'center',
        },
        {
            label: '案号',
            prop: 'caseNo',
            align: 'center',
        },
        {
            label: '当事人',
            prop: 'partyListInfo',
            align: 'center',
        },
        {
            label: '案件金额',
            prop: 'amount',
            align: 'center',
        },
        {
            label: '裁判结果',
            prop: 'judgeResult',
            align: 'center',
        },
        {
            label: '发布日期',
            prop: 'publishDate',
            align: 'center',
        },
        {
            label: '裁判日期',
            prop: 'judgeDate',
            align: 'center',
        },
    ],
    // 行政处罚
    ADMIN_SAN: [
        {
            label: '序号',
            type: 'index',
            fixed: 'left',
            width: 80,
            align: 'center',
        },
        {
            label: '决定书文号',
            prop: 'docNo',
            align: 'center',
        },
        {
            label: '违法事实',
            prop: 'punishReason',
            align: 'center',
            slotName: 'punishReasonSlot',
        },
        {
            label: '处罚结果',
            prop: 'punishResult',
            align: 'center',
            slotName: 'punishResultSlot',
        },
        // {
        //     label: '处罚金额（元）',
        //     prop: 'cfje',
        //     align: 'center',
        // },
        {
            label: '处罚单位',
            prop: 'punishOffice',
            align: 'center',
        },
        {
            label: '处罚日期',
            prop: 'punishDate',
            align: 'center',
        },
    ],
    // 不动产查封
    REAL_EST_SEI: [
        {
            label: '序号',
            type: 'index',
            width: 80,
        },
        {
            label: '查封机关',
            prop: 'cfjg',
        },
        {
            label: '查封类型',
            prop: 'cflx',
        },
        {
            label: '不动产单元号',
            prop: 'bdcdyh',
        },
        {
            label: '房地产坐落',
            prop: 'fdczl',
        },
        {
            label: '查封文件',
            prop: 'cfwj',
        },
        {
            label: '查封文号',
            prop: 'cfwh',
        },
        {
            label: '查封起始时间',
            prop: 'cfqssj',
        },
        {
            label: '查封结束时间',
            prop: 'cfjssj',
        },
        {
            label: '查封范围',
            prop: 'cffw',
        },
    ],
    // 纳税稽查信息
    TAX_AUDIT: [
        {
            label: '序号',
            type: 'index',
            width: 80,
        },
        {
            label: '税款所属期',
            prop: 'skssq',
        },
        {
            label: '违法手段',
            prop: 'wfsf',
        },
        {
            label: '查补金额（元）',
            prop: 'cbje',
        },
        {
            label: '处罚金额（元）',
            prop: 'cfje',
        },
        {
            label: '文号',
            prop: 'wh',
        },
        {
            label: '处罚时间',
            prop: 'cfsj',
        },
    ],
    // 欠缴
    ARREARS: [
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '税务部门',
                prop: 'swbm',
            },
            {
                label: '征收品目',
                prop: 'zspm',
            },
            {
                label: '欠税余额（元）',
                prop: 'qsye',
            },
            {
                label: '年度',
                prop: 'nd',
            },
            {
                label: '季度',
                prop: 'jd',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '欠费期数',
                prop: 'qfqs',
            },
            {
                label: '金额（元）',
                prop: 'qfje',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '单位累计欠缴金额（元）',
                prop: 'dwljqjje',
            },
            {
                label: '累计欠缴滞纳金（元）',
                prop: 'ljqjznj',
            },
        ],
        [
            {
                label: '序号',
                type: 'index',
                width: 80,
            },
            {
                label: '查处文号',
                prop: 'ccwh',
            },
            {
                label: '查处情况',
                prop: 'ccqk',
            },
            {
                label: '失信事实',
                prop: 'sxss',
            },
            {
                label: '结案日期',
                prop: 'jarq',
            },
            {
                label: '查处时间',
                prop: 'ccsj',
            },
        ],
    ],
    // 列入异常经营
    ABNO_OPER: [
        {
            label: '序号',
            type: 'index',
            fixed: 'left',
            width: 80,
            align: 'center',
        },
        {
            label: '列入日期',
            prop: 'addDate',
            align: 'center',
        },
        {
            label: '作出决定机关（列入）',
            prop: 'decisionOffice',
            align: 'center',
        },
        {
            label: '列入经营异常名录原因',
            prop: 'addReason',
            align: 'center',
        },
        {
            label: '移出日期',
            prop: 'removeDate',
            align: 'center',
        },
        {
            label: '移出决定机关',
            prop: 'removeDecisionOffice',
            align: 'center',
        },
        {
            label: '移出经营异常名录原因',
            prop: 'removeReason',
            align: 'center',
        },
    ],
    // 关键信息变更
    KEY_INFO: [
        {
            label: '序号',
            type: 'index',
            fixed: 'left',
            width: 80,
            align: 'center',
        },
        {
            label: '变更事项',
            prop: 'projectName',
            align: 'center',
        },
        {
            label: '变更前',
            prop: 'beforeListDesc',
            align: 'center',
        },
        {
            label: '变更后',
            prop: 'afterListDesc',
            align: 'center',
        },
        {
            label: '变更时间',
            prop: 'changeDate',
            align: 'center',
        },
    ],
    // 高风险预警
    HIGH_RISK: [
        {
            label: '序号',
            type: 'index',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
        {
            label: '预警日期',
            prop: 'yjrq',
            width: 120,
            align: 'center',
        },
        {
            label: '描述',
            prop: 'msDesc',
            align: 'center',
        },
    ],
    // 警示风险
    WARN_RISK: [
        {
            label: '序号',
            type: 'index',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
        {
            label: '预警日期',
            prop: 'yjrq',
            width: 120,
            align: 'center',
        },
        {
            label: '描述',
            prop: 'msDesc',
            align: 'center',
        },
    ],
    // 提示风险
    PROM_RISK: [
        {
            label: '序号',
            type: 'index',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
        {
            label: '预警日期',
            prop: 'yjrq',
            width: 120,
            align: 'center',
        },
        {
            label: '描述',
            prop: 'msDesc',
            align: 'center',
        },
    ],
    // 良好信息
    GOOD_INFO: [
        {
            label: '序号',
            type: 'index',
            width: 80,
            fixed: 'left',
            align: 'center',
        },
        {
            label: '预警日期',
            prop: 'yjrq',
            width: 120,
            align: 'center',
        },
        {
            label: '描述',
            prop: 'msDesc',
            align: 'center',
        },
    ],
}

// 企业征信情况个人配置
export const PER_DATA = {
    creditName: '',
    creditPosition: '',
    data: [
        {
            key: '未结清信贷余额',
            name: 'outBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '经营性贷款余额',
            name: 'manageBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '贷记卡已用额度',
            name: 'useQuota',
            val: 0,
            oldVal: 0,
        },
        {
            key: '不良类信贷笔数',
            name: 'badNum',
            val: 0,
            oldVal: 0,
        },
        {
            key: '为个人担保余额',
            name: 'personalBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '为企业担保余额',
            name: 'entBalance',
            val: 0,
            oldVal: 0,
        },
    ],
}

// 企业征信情况企业配置
export const ENT_DATA = {
    creditName: '',
    creditPosition: '',
    data: [
        {
            key: '融资银行数',
            name: 'bankNum',
            val: 0,
            oldVal: 0,
        },
        {
            key: '未结清信贷余额',
            name: 'outBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '担保余额',
            name: 'guaranteeBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '关注类信贷余额',
            name: 'attentionBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '不良类信贷笔数',
            name: 'badNum',
            val: 0,
            oldVal: 0,
        },
        {
            key: '不良类信贷余额',
            name: 'badBalance',
            val: 0,
            oldVal: 0,
        },
    ],
}

// 担保人征信情况(对公公共征信信息)
export const PUB_DATA = {
    creditName: '',
    data: [
        {
            key: '融资银行数',
            name: 'bankNum',
            val: 0,
            oldVal: 0,
        },
        {
            key: '未结清信贷余额',
            name: 'outBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '担保总额',
            name: 'guaranteeBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '关注类信贷余额',
            name: 'attentionBalance',
            val: 0,
            oldVal: 0,
        },
        {
            key: '不良类信贷笔数',
            name: 'badNum',
            val: 0,
            oldVal: 0,
        },
        {
            key: '不良类信贷余额',
            name: 'badBalance',
            val: 0,
            oldVal: 0,
        },
    ],
}

// 担保人征信情况(对私公共征信信息)
export const PRI_DATA = {
    creditName: '',
    data: [
        {
            key: '融资银行数',
            name: 'bankNum',
            val: '',
            oldVal: '',
        },
        {
            key: '未结清贷款余额',
            name: 'outBalance',
            val: '',
            oldVal: '',
        },
        {
            key: '对外担保余额',
            name: 'dwdbBalance',
            val: '',
            oldVal: '',
        },
        {
            key: '贷记卡已用额度',
            name: 'useQuota',
            val: '',
            oldVal: '',
        },
        {
            key: '当前逾期贷款总额',
            name: 'loanOverdue',
            val: '',
        },
        {
            key: '当前贷记卡逾期总额',
            name: 'debitOverdue',
            val: '',
        },
        {
            key: '当前不良贷款条数',
            name: 'dqbldkNum',
            val: '',
        },
        {
            key: '当前不良贷款余额',
            name: 'dqbldkBalance',
            val: '',
        },
        {
            key: '被执行信息条数',
            name: 'bzxNum',
            val: '',
        },
        {
            key: '民事判决记录条数',
            name: 'mspjNum',
            val: '',
        },
    ],
}

// 表格、描述列表通用样式
export const TABLE_DES_STYLE = {
    background: '#DCEBFF',
    'border-right': '1px solid #C0D3EA',
    'border-bottom': '1px solid #C0D3EA',
    color: '#666',
}

// 关联企业融资情况相关配置
export const REL_ENT = {
    listsData: [
        {
            key: '融资家数',
            name: 'financeEntNum',
            val: 0,
        },
        {
            key: '授信总额',
            name: 'totalCredit',
            val: 0,
        },
        {
            key: '其中贷款余额',
            name: 'loanBalance',
            val: 0,
        },
        {
            key: '本行黑灰名单',
            name: 'blackList',
            val: '',
        },
        {
            key: '核销贷款',
            name: 'writeOffAmount',
            val: 0,
        },
        {
            key: '法院网（诉讼）',
            name: 'involvedInAppeal',
            val: '',
        },
        {
            key: '被执行人',
            name: 'executee',
            val: '',
        },
    ],
    restList: [
        {
            key: '*企业经营情况描述',
            name: 'manageDesc',
            val: '',
        },
        {
            key: '其他说明',
            name: 'otherExplain',
            val: '',
        },
    ],
}

// 标签颜色枚举
export const LABEL_MAP = {
    red: '红色',
    orange: '橙色',
    yellow: '黄色',
    green: '绿色',
    ching: '青色',
    blue: '蓝色',
    purple: '紫色',
}

// 标签颜色选项
export const LABEL_COLOR_OPTIONS = [
    { label: '红色', value: 'red' },
    { label: '橙色', value: 'orange' },
    { label: '黄色', value: 'yellow' },
    { label: '绿色', value: 'green' },
    { label: '青色', value: 'ching' },
    { label: '蓝色 (默认项)', value: 'blue' },
    { label: '紫色', value: 'purple' },
]
