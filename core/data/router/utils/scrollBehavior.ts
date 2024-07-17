export default function(to: any, from: any, savedPosition: any) {
    if (to.path !== from.path) {
        if (savedPosition) return savedPosition
        if (to.hash) return { selector: to.hash }
        return { x: 0, y: 0 }
    }
}
