<template>
    <MyProduct :author_id="author_id" v-if="author_id"></MyProduct>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MyProduct from '../list/index.vue'
import { userStore } from '@/entry/devops/store/useStore'
@Component({
    name: 'AdminProductMy',
    components: {
        MyProduct,
    },
})
export default class AdminProductMy extends Vue {
    get author_id() {
        console.log(212, userStore.info)

        return userStore.info.username
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
