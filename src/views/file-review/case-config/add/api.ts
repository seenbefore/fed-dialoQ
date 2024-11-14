export const getDetail = (params: Record<string, any> = {}) => {
    return {
        code: 200,
        message: 'success',
        data: {
            id: 1,
            businessLine: '行政许可',
            caseType: '1',
            caseName: '食品经营许可',
            volumeType: '正卷',
            directory: '正卷60件',
        },
    }
}
