export interface Render {
    (
        h: CreateElement,
        column: {
            /**
             * 数据
             */
            row: any
            [propName: string]: any
        },
    ): any
}
