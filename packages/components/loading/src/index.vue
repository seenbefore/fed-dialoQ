<template>
    <div class="ic-loading-tip">
        <div class="ic-loading-fusion-reactor">
            <div class="ic-loading-dot"></div>
            <div class="ic-loading-dot"></div>
            <div class="ic-loading-dot"></div>
            <div class="ic-loading-dot"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'IcLoading',
    components: {},
})
export default class IcLoading extends Vue {}
</script>
