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
        id: '1',
        type: QuestionType.SINGLE,
        title: '企业安全生产主体责任由谁承担？',
        options: ['企业主要负责人', '安全管理人员', '全体员工', '安全生产委员会'],
    },
    {
        id: '2',
        type: QuestionType.MULTIPLE,
        title: '以下哪些属于安全生产管理的重要内容？',
        options: ['安全教育培训', '隐患排查治理', '应急管理', '职业健康'],
    },
    {
        id: '3',
        type: QuestionType.JUDGE,
        title: '企业主要负责人是本单位安全生产第一责任人',
        options: ['正确', '错误'],
    },
    // ... 补充更多题目
]

// 安全管理员题库
const SAFETY_QUESTIONS = [
    {
        id: '1',
        type: QuestionType.SINGLE,
        title: '安全检查的方式包括哪些？',
        options: ['日常检查', '定期检查', '专项检查', '以上都是'],
    },
    {
        id: '2',
        type: QuestionType.MULTIPLE,
        title: '安全生产管理人员应具备以下哪些条件？',
        options: ['具有相关专业学历', '具有一定工作经验', '取得安全资格证书', '身体健康'],
    },
    {
        id: '3',
        type: QuestionType.JUDGE,
        title: '安全生产管理人员可以兼任其他职务',
        options: ['正确', '错误'],
    },
    // ... 补充更多题目
]

/**
 * 获取考试题目列表
 * @param params.role 角色类型：manager-企业负责人，safety-安全管理员
 */
export const getQuestionList = async (params?: { role: 'manager' | 'safety' }, options?: ExAxiosRequestConfig) => {
    return {
        code: 200,
        message: 'success',
        data: params?.role === 'manager' ? MANAGER_QUESTIONS : SAFETY_QUESTIONS,
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
