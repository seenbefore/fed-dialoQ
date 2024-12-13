/* eslint-disable */
const InspectionForm = () => import(/* webpackChunkName: "InspectionForm" */ './index')

export default {
    path: '/inspection',
    name: 'InspectionForm',
    component: InspectionForm,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '现场勘察',
        keepAlive: true,
    },
}
