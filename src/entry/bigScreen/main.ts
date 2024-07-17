import '@/theme/element-ui'
import '@/sharegood-ui'
import 'normalize.css'
import { bigScreenInit } from '@@core/data/configurations/initConfig/bigScreenInit'
import Vue from 'vue'
import App from './App.vue'
import './components'
import router from './router'
import http from './scripts/http'
import './styles/index.less'

Vue.prototype.$http = http
const { bootstrap } = bigScreenInit(Vue)

bootstrap().then(mount => mount({ router, App: App }))
