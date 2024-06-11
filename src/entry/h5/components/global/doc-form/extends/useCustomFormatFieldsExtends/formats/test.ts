import { CustomFormatFields } from '../index'
import { Field } from '@/entry/h5/components/global/app-form/index.vue'

export class TestCustomFormatFields extends CustomFormatFields {
    public format(): Field[] {
        this.fields.push({
            tag: () => import('../../../example/format-example.vue'),
            name: 'xxx',
            label: '测试组件',
            props: {
                label: '测试组件-test',
            },
            groupId: 'ea4e70f9-2717-4f31-fcd2-6ea8765b8754',
            groupName: '携带资料：',
            sort: '12',
        })
        return this.fields
    }
}
