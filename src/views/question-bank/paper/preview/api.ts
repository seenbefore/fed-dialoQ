// 获取试卷详情
export const getPaperDetail = async (params?: any) => {
    return {
        code: 200,
        message: 'success',
        data: {
            id: '48',
            title: '2024年全省协助执法文员考试试卷',
            duration: '60',
            grade_score: '100',
            dan_grade: '0.5',
            duo_grade: '1',
            pan_grade: '0.5',
            case_grade: '2',
            // 单选题
            danList: [
                {
                    id: '24732',
                    title: '下列属于应当予以公开的政府信息是_____。',
                    option1: '有关国家经济和社会发展中的秘密事项',
                    option2: '国家事务的重大决策中的秘密事项',
                    option3: '申请公开的政府信息涉及商业秘密、个人隐私，行政机关认为不公开可能对公共利益造成重大影响的',
                    option4: '个人财产、名誉或者不宜对外公开的情况和资料',
                    answer: 'C',
                },
                {
                    id: '24731',
                    title: '总建筑面积_____平方米以上的甲类厂房，或者总建筑面积3000平方米以上的乙类厂房为消防安全重点单位。',
                    option1: '500',
                    option2: '1000',
                    option3: '1500',
                    option4: '2000',
                    answer: 'D',
                },
            ],
            // 多选题
            duoList: [
                {
                    id: '24730',
                    title: '高层民用建筑室内消火栓口的出水压力大于（）MpA.时，应设减压设施，静水压力大于 Mpa，应采取分区给水系统。',
                    option1: '0.8',
                    option2: '0.5',
                    answer: 'A,B',
                },
            ],
            // 判断题
            panList: [
                {
                    id: '24729',
                    title: '属于主动公开范围的政府信息，应当自该政府信息形成或者变更之日起20个工作日内予以公开。',
                    answer: '1',
                },
            ],
        },
    }
}
