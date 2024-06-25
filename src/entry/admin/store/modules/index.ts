// https://vuex.vuejs.org/en/modules.html

import { requireStore } from '@/scripts/utils'

const files = require.context('.', true, /\.ts$/)

export default requireStore(files)
