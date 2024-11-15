import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

// 题目类型枚举
export enum QuestionType {
    SINGLE = 'single', // 单选题
    MULTIPLE = 'multiple', // 多选题
    JUDGE = 'judge', // 判断题
}

// 企业负责人题库
const MANAGER_QUESTIONS = [
    {
        id: 'm_1',
        type: QuestionType.SINGLE,
        title: '以下哪些情况是肌肤敏感的现象?',
        options: ['角质层薄、易出现红血丝', '红肿', '出疹', '以上都是'],
    },
    {
        id: 'm_2',
        type: QuestionType.SINGLE,
        title: '企业安全生产检查应当多久进行一次？',
        options: ['每周一次', '每月一次', '每季度一次', '每年一次'],
    },
    {
        id: 'm_3',
        type: QuestionType.SINGLE,
        title: '以下哪些属于安全生产必须遵守的规定？',
        options: ['定期检查', '及时维修', '按规程操作', '以上都是'],
    },
    {
        id: 'm_4',
        type: QuestionType.SINGLE,
        title: '安全生产责任制度必须由企业负责人签署才能生效？',
        options: ['正确', '错误'],
    },
    {
        id: 'm_5',
        type: QuestionType.SINGLE,
        title: '企业安全生产主体责任由谁承担？',
        options: ['企业主要负责人', '安全管理人员', '全体员工', '安全生产委员会'],
    },
    {
        id: 'm_6',
        type: QuestionType.SINGLE,
        title: '安全生产管理人员应具备哪些条件？',
        options: ['持证上岗', '专业知识', '工作经验', '以上都是'],
    },
    {
        id: 'm_7',
        type: QuestionType.SINGLE,
        title: '以下哪些属于安全隐患排查的重点区域？',
        options: ['生产区域', '仓储区域', '办公区域', '以上都是'],
    },
    {
        id: 'm_8',
        type: QuestionType.SINGLE,
        title: '安全生产管理人员必须每年参加安全培训？',
        options: ['正确', '错误'],
    },
    {
        id: 'm_9',
        type: QuestionType.SINGLE,
        title: '企业应当建立健全全员安全生产责任制，明确各级人员的安全职责？',
        options: ['正确', '错误'],
    },
    {
        id: 'm_10',
        type: QuestionType.SINGLE,
        title: '安全生产检查的方式包括哪些？',
        options: ['日常检查', '定期检查', '专项检查', '以上都是'],
    },
    // 第二页
    {
        id: 'm_11',
        type: QuestionType.SINGLE,
        title: '安全生产管理的基本要求不包括？',
        options: ['安全培训', '隐患排查', '应急演练', '利润最大化'],
    },
    {
        id: 'm_12',
        type: QuestionType.SINGLE,
        title: '企业安全生产投入应当保证？',
        options: ['满足安全需要', '控制在最低', '视情况而定', '不做要求'],
    },
    {
        id: 'm_13',
        type: QuestionType.SINGLE,
        title: '特种作业人员必须经过专门培训并取得相应资格？',
        options: ['正确', '错误'],
    },
    {
        id: 'm_14',
        type: QuestionType.SINGLE,
        title: '安全生产管理最重要的是？',
        options: ['预防为主', '事后处理', '惩罚为主', '以上都不是'],
    },
    {
        id: 'm_15',
        type: QuestionType.SINGLE,
        title: '发现重大安全隐患应当如何处理？',
        options: ['立即停产整改', '继续生产', '等待上级指示', '视情况而定'],
    },
    {
        id: 'm_16',
        type: QuestionType.SINGLE,
        title: '安全生产责任制的目的是？',
        options: ['明确责任', '推卸责任', '分散责任', '以上都不是'],
    },
    {
        id: 'm_17',
        type: QuestionType.SINGLE,
        title: '安全生产管理的对象是？',
        options: ['人员', '设备', '环境', '以上都是'],
    },
    {
        id: 'm_18',
        type: QuestionType.SINGLE,
        title: '安全生产管理应当坚持？',
        options: ['预防为主', '以人为本', '综合治理', '以上都是'],
    },
    {
        id: 'm_19',
        type: QuestionType.SINGLE,
        title: '安全生产管理的核心是？',
        options: ['人的管理', '物的管理', '环境管理', '制度管理'],
    },
    {
        id: 'm_20',
        type: QuestionType.SINGLE,
        title: '安全生产管理的基本原则是？',
        options: ['安全第一', '预防为主', '综合治理', '以上都是'],
    },
]

/**
 * 获取考试题目列表
 * @param params.role 角色类型：manager-企业负责人，safety-安全管理员
 * @param params.page 页码，从1开始
 * @param params.pageSize 每页数量
 */
export const getQuestionList = async (
    params?: {
        role: 'manager' | 'safety'
        page?: number
        pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) => {
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize

    // 只有2页数据
    const total = 20
    const hasMore = start + pageSize < total

    // 从预设题库中截取对应页的数据
    const questions = MANAGER_QUESTIONS.slice(start, start + pageSize)

    return {
        code: 200,
        message: 'success',
        data: {
            list: questions,
            total,
            hasMore,
        },
    }
}

/**
 * 提交答案
 */
export const submitAnswer = async (
    data: {
        examId: string
        questionId: string
        answer: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
        data: null,
    }
}
