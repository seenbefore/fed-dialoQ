import { getRequireContextComponents } from '@/scripts/utils/getRequireContextComponents'

const files = require.context('./examples', true, /\.vue$/)

export const getComponents = () => {
    return getRequireContextComponents(files)
}
