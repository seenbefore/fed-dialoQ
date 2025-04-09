<template>
    <div style="height: 600px; width: 100%;">
        <my-chat />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyChat from '../index.vue'

@Component({
    name: 'Demo1',
    components: {
        MyChat,
    },
})
export default class Demo1 extends Vue {}
</script>
