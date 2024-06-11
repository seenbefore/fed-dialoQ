//import Loading from '../packages/loading/index.js'

import './directives'
import Pagination from '../packages/pagination/index.js'
//import QuillEditor from '../packages/quill-editor/index.js'
//import Upload from '../packages/upload/index.js'
import DataView from '../packages/data-view/index.js'
import DataExport from '../packages/data-export/index.js'
import DataExportAll from '../packages/data-export-all/index.js'
import ImgCode from '../packages/img-code/index.js'
import SmsCode from '../packages/sms-code/index.js'
import BaseForm from '../packages/base-form/index.js'
import ListView from '../packages/list-view/index.js'
// import Line from '../packages/charts/Line/index.js'
// import Pie from '../packages/charts/Pie/index.js'
// import Bar from '../packages/charts/Bar/index.js'
// import BaseChart from '../packages/charts/index.js'

const components = [
    // BaseChart,
    // Line,
    // Pie,
    // Bar,
    //QuillEditor,
    //Loading,
    //Upload,
    Pagination,

    DataExport,
    DataExportAll,
    DataView,
    ImgCode,
    SmsCode,
    BaseForm,
    ListView,
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        component.opts = opts
        Vue.component(component.name, component)
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    version: process.env.Version || 'debug',
    install,
    Pagination,
    DataExport,
    DataView,
    ImgCode,
    SmsCode,
    BaseForm,
    ListView,
}
