const requireComponent = require.context('./components', false, /\.vue$/)

const AttrsComponent: { [key: string]: any } = {}

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = 'attr-' + fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

    AttrsComponent[componentName] = componentConfig.default || componentConfig
})

export { AttrsComponent }
