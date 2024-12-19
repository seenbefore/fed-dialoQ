/** 文章状态 */
export enum ArticleStatusEnum {
    /** 草稿 */
    DRAFT = '0',
    /** 待审核 */
    PENDING = '1',
    /** 已发布 */
    PUBLISHED = '2',
    /** 已下线 */
    OFFLINE = '3',
}

export const ArticleStatusEnumMap: Record<string, any> = {
    [ArticleStatusEnum.DRAFT]: {
        label: '草稿',
        value: ArticleStatusEnum.DRAFT,
        color: '#909399',
    },
    [ArticleStatusEnum.PENDING]: {
        label: '待审核',
        value: ArticleStatusEnum.PENDING,
        color: '#E6A23C',
    },
    [ArticleStatusEnum.PUBLISHED]: {
        label: '已发布',
        value: ArticleStatusEnum.PUBLISHED,
        color: '#67C23A',
    },
    [ArticleStatusEnum.OFFLINE]: {
        label: '已下线',
        value: ArticleStatusEnum.OFFLINE,
        color: '#F56C6C',
    },
}
