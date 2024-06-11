import { getRequireContextComponents } from '@/scripts/utils/getRequireContextComponents'

const context = require.context('./components', true, /index\.vue$/)

const designComponents = getRequireContextComponents(context, key => {
    return !key.includes('AppExample/examples')
})

export { designComponents }
