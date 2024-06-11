/* axios 中文文档：http://www.axios-js.com/zh-cn/docs/ */

import axios from 'axios'
import createAxios from './createAxios'
import createAPI from './createAPI'
import http from './http'
import { cancel } from './exCancel'
const { isCancel } = axios

export { axios, createAxios, http, cancel, isCancel, createAPI }
export default http
