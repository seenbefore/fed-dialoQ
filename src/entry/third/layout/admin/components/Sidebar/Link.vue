<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isSubAppPath } from '@/scripts/utils'

export default {
    props: {
        meta: {
            type: Object,
            default() {
                return {}
            },
        },
        to: {
            type: String,
            required: true,
        },
        external: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        type() {
            if (this.external) {
                return 'a'
            }
            return 'router-link'
        },
    },
    methods: {
        linkProps(to) {
            if (this.external) {
                return {
                    href: to,
                    target: '_blank',
                    tag: 'a',
                }
            } else if (isSubAppPath(to)) {
                const meta = this.meta
                return {
                    to: {
                        path: to,
                        query: {
                            origin: meta.origin,
                        },
                    },
                }
            } else {
                return {
                    to: {
                        path: to,
                    },
                }
            }
        },
    },
}
</script>
