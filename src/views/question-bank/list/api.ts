// 获取题库列表数据
export const list = async (params?: any) => {
    return {
        code: 200,
        message: 'success',
        data: {
            data: [
                {
                    id: '24732',
                    title: '行政机关履行行政管理职责,依照（）的规定,实施行政强制措施',
                    kind_name: '2024年全省协助执法文员考试',
                    case_name: '法律法规',
                    option1: '法律法规',
                    option2: '规章',
                    option3: '规范性文件',
                    option4: '上级文件',
                    answer: 'A',
                    case_flag: '0',
                },
                // ...模拟更多数据
            ],
            recordsTotal: 10,
        },
    }
}
