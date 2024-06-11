import { getRequireContextComponents } from '@/scripts/utils/getRequireContextComponents'

const context = require.context('./components', true, /index\.vue$/)

const configComponents = getRequireContextComponents(context)

export { configComponents }
