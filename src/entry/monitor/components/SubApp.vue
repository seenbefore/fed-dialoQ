<template>
    <div class="sg-page page-sub-app" style="height: 100%">
        <iframe class="iframe" :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SubApp extends Vue {
    @Prop() private fullPath!: string

    get origin() {
        return decodeURIComponent(this.fullPath.replace('/sub-app/', ''))
    }
    get src() {
        const origin = this.origin

        let uri = origin
        const query: any = {
            ts: new Date().valueOf(),
        }
        const query$ = Object.keys(query)
            .map(key => {
                return `${key}=${query[key]}`
            })
            .join('&')
        if (uri.indexOf('?') > -1) {
            uri = uri + '&' + query$
        } else {
            uri = uri + '?' + query$
        }

        return uri
    }
}
</script>
