import Vue from 'vue'
// /* 小插件 Vue.use (重量级插件放主目录，如：vue-router、vuex、element-ui、i18n ...) */

/**
 * 重写keep-alive组件, 解决process.env.NODE_ENV === "development"时热重载bug
 * https://blog.csdn.net/weixin_39547883/article/details/117700147
 */

const patternTypes = [String, RegExp, Array]

function pruneCacheEntry(cache, key, keys, current) {
    const cached$$1 = cache[key]
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
        cached$$1.componentInstance.$destroy()
    }
    cache[key] = null
    remove(keys, key)
}

function pruneCache(keepAliveInstance, filter) {
    const cache = keepAliveInstance.cache
    const keys = keepAliveInstance.keys
    const _vnode = keepAliveInstance._vnode
    for (const key in cache) {
        const cachedNode = cache[key]
        if (cachedNode) {
            const name = getComponentName(cachedNode.componentOptions)
            if (name && !filter(name)) {
                pruneCacheEntry(cache, key, keys, _vnode)
            }
        }
    }
}

function matches(pattern, name) {
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
}

function isDef(v) {
    return v !== undefined && v !== null
}

/**
 * Remove an item from an array.
 */
function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const c = children[i]
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c
            }
        }
    }
}

function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
}

const keepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number],
    },

    created: function created() {
        this.cache = Object.create(null)
        this.keys = []
        this.$emit('getInstance', this)
    },

    destroyed: function destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys)
        }
    },

    mounted: function mounted() {
        const this$1 = this

        this.$watch('include', function(val) {
            pruneCache(this$1, function(name) {
                return matches(val, name)
            })
        })
        this.$watch('exclude', function(val) {
            pruneCache(this$1, function(name) {
                return !matches(val, name)
            })
        })
    },

    render: function render() {
        const slot = this.$slots.default
        const vnode = getFirstComponentChild(slot)
        const componentOptions = vnode && vnode.componentOptions
        if (componentOptions) {
            if (componentOptions.Ctor) {
                vnode._cid = componentOptions.Ctor.cid //记录cid
            }
            // check pattern
            const name = getComponentName(componentOptions)
            const ref = this
            const include = ref.include
            const exclude = ref.exclude
            if (
                // not included
                (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))
            ) {
                return vnode
            }

            const ref$1 = this
            const cache = ref$1.cache
            const keys = ref$1.keys
            const key =
                vnode.key == null
                    ? // same constructor may get registered as different local components
                      // so cid alone is not enough (#3269)
                      componentOptions.Ctor.cid + (componentOptions.tag ? '::' + componentOptions.tag : '')
                    : vnode.key
            if (cache[key]) {
                //判断cid是否相同, 不同则有过热重载的reload, 需要重建缓存
                if (vnode._cid === cache[key]._cid) {
                    vnode.componentInstance = cache[key].componentInstance
                    // make current key freshest
                    remove(keys, key)
                    keys.push(key)
                } else {
                    cache[key].componentInstance.$destroy()
                    cache[key] = vnode
                }
            } else {
                cache[key] = vnode
                keys.push(key)
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode)
                }
            }

            vnode.data.keepAlive = true
        }
        return vnode || (slot && slot[0])
    },
}
//只在开发模式下生效
if (process.env.NODE_ENV === 'development') {
    Vue.component('keep-alive', keepAlive)
}
