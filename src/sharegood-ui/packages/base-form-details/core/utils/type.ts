import { IRenderType } from '@/sharegood-ui/packages/base-form-details/core'

export interface IDescriptionsProps {
    /* with or without border */
    border: boolean

    /* numbers of Descriptions Item in one line */
    column: number

    /* direction of list */
    direction: 'vertical' | 'horizontal'

    /* size of list */
    size: 'medium' | 'small' | 'mini'

    /* title text, display on the top left */
    title: string

    /* extra text, display on the top right */
    extra: string | IRenderType

    /* change default props colon value of Descriptions Item */
    colon: boolean

    /* custom label class name */
    labelClassName: string

    /* custom content class name */
    contentClassName: string

    /* custom label style */
    labelStyle: Obj<string, string>

    /* custom content style */
    contentStyle: Obj<string, string>
}

export interface IDescriptionsItemProps {
    /* label text */
    label: string

    /*  the number of columns included */
    span: number

    /* custom label class name */
    labelClassName: string

    /* custom content class name */
    contentClassName: string

    /* custom label style */
    labelStyle: Obj<string, string>

    /* custom content style */
    contentStyle: Obj<string, string>
}
