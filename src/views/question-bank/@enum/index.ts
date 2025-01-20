/** 题库大类 */
export enum QuestionBankCategoryEnum {
    /** 安全法规 */
    SAFETY_REGULATIONS = '101',
}

export const QuestionBankCategoryEnumMap: Record<string, any> = {
    [QuestionBankCategoryEnum.SAFETY_REGULATIONS]: {
        label: '安全法规',
        value: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
    },
}

/** 题库小类 */
export enum QuestionBankSubCategoryEnum {
    /** 企业负责人 */
    ENTERPRISE_LEADER = '10101',
    /** 安全管理员 */
    SAFETY_MANAGER = '10102',
}

export const QuestionBankSubCategoryEnumMap: Record<string, any> = {
    [QuestionBankSubCategoryEnum.ENTERPRISE_LEADER]: {
        label: '企业负责人',
        value: QuestionBankSubCategoryEnum.ENTERPRISE_LEADER,
        parentValue: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
    },
    [QuestionBankSubCategoryEnum.SAFETY_MANAGER]: {
        label: '安全管理员',
        value: QuestionBankSubCategoryEnum.SAFETY_MANAGER,
        parentValue: QuestionBankCategoryEnum.SAFETY_REGULATIONS,
    },
}

/** 题目类型 */
export enum QuestionTypeEnum {
    /** 单选题 */
    SINGLE_CHOICE = '1',
    /** 多选题 */
    MULTIPLE_CHOICE = '2',
    /** 判断题 */
    TRUE_FALSE = '3',
}

export const QuestionTypeEnumMap: Record<string, any> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: {
        label: '单选题',
        value: QuestionTypeEnum.SINGLE_CHOICE,
    },
    [QuestionTypeEnum.MULTIPLE_CHOICE]: {
        label: '多选题',
        value: QuestionTypeEnum.MULTIPLE_CHOICE,
    },
    [QuestionTypeEnum.TRUE_FALSE]: {
        label: '判断题',
        value: QuestionTypeEnum.TRUE_FALSE,
    },
}
