<template>
    <div class="top_menu">
        <div class="left_date_weather">
            <div class="left_item_div"></div>
        </div>
        <div class="center_logo_route">
            <div class="img_title_div" @click="reload"><img src="../../assets/title_img.png" alt="" /></div>
        </div>
        <div class="right_user_out"></div>
    </div>
</template>
<script>
import { bus } from '../../bus'
export default {
    data() {},
    created() {},

    methods: {
        reload() {
            bus.$emit('map-change', '衢州市')
        },
    },
}
</script>
<style scoped lang="less">
.top_menu {
    width: 100%;
    z-index: 100;
    background: url('../../assets//menu_bg.png') no-repeat;
    background-size: 100% 128px;
    background-color: #020b23;
    display: flex;
    justify-content: space-around;
    height: 81px;
}
.top_menu .center_logo_route .img_title_div {
    cursor: pointer;
    margin: 0 auto;
}
</style>
