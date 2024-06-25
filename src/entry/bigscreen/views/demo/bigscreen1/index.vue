<template>
    <my-big-screen :is-scale="true" class="sg-page page-demo-bigscreen1 " bg-class="demo-bigscreen1-bg">
        <div class="head">
            <h1>全国消费情况大数据科技感页面html源码</h1>
            <div class="weather">
                <span id="showTime"></span>
            </div>
        </div>
        <div class="mainbox">
            <ul class="clearfix">
                <li>
                    <div class="boxall" style="height: 320px">
                        <div class="alltitle">
                            模块标题样式
                        </div>
                        <div class="allnav" id="echart1"></div>
                        <div class="boxfoot"></div>
                    </div>
                    <div class="boxall" style="height: 320px">
                        <div class="alltitle">
                            模块标题样式
                        </div>
                        <div class="allnav" id="echart2"></div>
                        <div class="boxfoot"></div>
                    </div>
                    <div class="boxall" style="height: 300px">
                        <div style=" width: 100%;height:100%;">
                            <div class="sy" id="fb1"></div>
                            <div class="sy" id="fb2"></div>
                            <div class="sy" id="fb3"></div>
                        </div>
                        <div class="boxfoot"></div>
                    </div>
                </li>
                <li>
                    <div class="bar">
                        <div class="barbox">
                            <ul class="clearfix">
                                <li class="pulll_left counter">12581189</li>
                                <li class="pulll_left counter">3912410</li>
                            </ul>
                        </div>
                        <div class="barbox2">
                            <ul class="clearfix">
                                <li class="pulll_left">2018年总收入情况</li>
                                <li class="pulll_left">2018年总支出情况</li>
                            </ul>
                        </div>
                    </div>
                    <div class="map">
                        <div class="map1">
                            <img src="@bigScreen/assets/images/lbx.png" />
                        </div>
                        <div class="map2">
                            <img src="@bigScreen/assets/images/jt.png" />
                        </div>
                        <div class="map3">
                            <img src="@bigScreen/assets/images/map.png" />
                        </div>
                        <div class="map4" id="map_1"></div>
                    </div>
                </li>
                <li>
                    <div class="boxall" style="height:320px">
                        <div class="alltitle">
                            模块标题样式
                        </div>
                        <div class="allnav" id="echart4"></div>
                        <div class="boxfoot"></div>
                    </div>
                    <div class="boxall" style="height: 320px">
                        <div class="alltitle">
                            模块标题样式
                        </div>
                        <div class="allnav" id="echart5"></div>
                        <div class="boxfoot"></div>
                    </div>
                    <div class="boxall" style="height: 300px">
                        <div class="alltitle">
                            模块标题样式
                        </div>
                        <div class="allnav" id="echart6"></div>
                        <div class="boxfoot"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="back"></div>
    </my-big-screen>
</template>

<script>
export default {
    name: 'DemoBigscreen1',
    components: {},
    props: {},
    data() {
        return {
            bgElement: '',
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        let t = null
        t = setTimeout(time, 1000)
        function time() {
            clearTimeout(t)
            let dt = new Date()
            let y = dt.getFullYear()
            let mt = dt.getMonth() + 1
            let day = dt.getDate()
            let h = dt.getHours()
            let m = dt.getMinutes()
            let s = dt.getSeconds()
            document.getElementById('showTime').innerHTML = y + '年' + mt + '月' + day + '-' + h + '时' + m + '分' + s + '秒'
            t = setTimeout(time, 1000)
        }
    },
    methods: {},
}
</script>
<style lang="less">
.page-demo-bigscreen1 {
    background: #000d4a;
}
.demo-bigscreen1-bg {
    overflow: hidden;
    background: #000d4a url('~@bigScreen/assets/images/bg.jpeg') center top;
    background-size: cover;
}
</style>
<style lang="less" scoped>
.head {
    position: relative;
    z-index: 100;
    width: 1920px;
    height: 105px;
    background: url('~@bigScreen/assets/images/head_bg.png') no-repeat center center;
    background-size: 100% 100%;
}

.head h1 {
    color: #fff;
    text-align: center;
    font-size: 40px;
    line-height: 80px;
}

.head h1 img {
    display: inline-block;
    margin-right: 20px;
    width: 150px;
    vertical-align: middle;
}

.weather {
    position: absolute;
    top: 0;
    right: 30px;
    line-height: 75px;
}

.weather img {
    display: inline-block;
    width: 37px;
    vertical-align: middle;
}

.weather span {
    padding-right: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
}

.mainbox {
    // padding: 10px 10px 0 10px;
    padding: 0;
}

.mainbox > ul > li {
    float: left;
    overflow: hidden;
    padding: 0 10px;
}

.mainbox > ul > li {
    width: 30%;
}

.mainbox > ul > li:nth-child(2) {
    padding: 0;
    width: 40%;
}

.boxall {
    position: relative;
    z-index: 10;
    margin-bottom: 15px;
    padding: 0 20px 40px 15px;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgba(255, 255, 255, 0.04) url('~@bigScreen/assets/images/line.png');
    background-size: 100% auto;
}

.boxall:before,
.boxall:after {
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    content: '';
}

.boxall:before,
.boxfoot:before {
    left: 0;
    border-left: 2px solid #02a6b5;
}

.boxall:after,
.boxfoot:after {
    right: 0;
    border-right: 2px solid #02a6b5;
}

.alltitle {
    color: #fff;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
}

.boxfoot {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.boxfoot:before,
.boxfoot:after {
    position: absolute;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    content: '';
}

.bar {
    padding: 15px;
    background: rgba(101, 132, 226, 0.1);
}

.barbox li,
.barbox2 li {
    position: relative;
    z-index: 100;
    width: 50%;
    text-align: center;
}

.barbox:before,
.barbox:after {
    position: absolute;
    width: 30px;
    height: 10px;
    content: '';
}

.barbox:before {
    left: 0;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
}

.barbox:after {
    right: 0;
    bottom: 0;
    border-right: 2px solid #02a6b5;
    border-bottom: 2px solid #02a6b5;
}

.barbox li:first-child:before {
    position: absolute;
    top: 25%;
    right: 0;
    width: 1px;
    height: 50%;
    background: rgba(255, 255, 255, 0.2);
    content: '';
}

.barbox {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
}

.barbox li {
    padding: 5px 0;
    color: #ffeb7b;
    font-weight: bold;
    font-size: 70px;
    font-family: electronicFont;
}

.barbox2 li {
    padding-top: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 19px;
}

.map {
    position: relative;
    z-index: 9;
    overflow: hidden;
    height: 720px;
}

.map img {
    vertical-align: top;
}
.map4 {
    position: relative;
    top: 4%;
    left: -50%;
    z-index: 5;
    margin-top: 20px;
    width: 200%;
    height: 700px;
}

.map1,
.map2,
.map3 {
    position: absolute;
    opacity: 0.5;
}

.map1 {
    top: 45px;
    left: 70px;
    z-index: 2;
    width: 643px;
    animation: myfirst2 15s infinite linear;
}

.map2 {
    top: 85px;
    left: 120px;
    z-index: 3;
    width: 566px;
    opacity: 0.2;
    animation: myfirst 10s infinite linear;
}

.map3 {
    top: 107px;
    left: 140px;
    z-index: 1;
    width: 518px;
}

.tabs {
    padding: 10px 0 0 0;
    text-align: center;
}

.tabs a {
    position: relative;
    display: inline-block;
    margin-left: 1px;
    padding: 5px 20px;
    color: #898989;
    font-size: 14px;
    transition: all 0.3s ease-out 0s;
}

.tabs li {
    display: inline-block;
}

.tabs a:after {
    position: absolute;
    right: -1px;
    margin-top: 7px;
    margin-left: 0;
    width: 1px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    content: '';
}

.tabs li a.active {
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
}

.tit02 {
    position: relative;
    margin: 10px 0;
    text-align: center;
}

.tit02 span {
    padding: 1px 20px;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgba(255, 255, 255, 0.05);
    color: #49bcf7;
    letter-spacing: 2px;
    font-size: 18px;
}

.tit02:before,
.tit02:after {
    position: absolute;
    top: 12px;
    width: 26%;
    height: 1px;
    background: rgba(25, 186, 139, 0.2);
    content: '';
}

.tit02:after {
    right: 0;
}

.tit02:before {
    left: 0;
}

.wrap {
    overflow: hidden;
    height: 254px;
}

.wrap li {
    margin-bottom: 10px;
    height: 42px;
    text-indent: 24px;
    font-size: 18px;
    line-height: 42px;
}

.wrap li p {
    border: 1px solid rgba(25, 186, 139, 0.17);
    color: rgba(255, 255, 255, 0.6);
}

.sy {
    float: left;
    margin-top: 25px;
    width: 33%;
    height: 95%;
}

.adduser {
    overflow: hidden;
    height: 150px;
}

.adduser li {
    height: 50px;
}

.adduser img {
    display: inline-block;
    margin-right: 10px;
    width: 40px;
    border-radius: 50px;
    vertical-align: middle;
}

.adduser span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
    line-height: 50px;
}

.sycm ul {
    margin-right: -50px;
    margin-left: -50px;
    padding: 16px 0;
}

.sycm li {
    position: relative;
    float: left;
    width: 33.33%;
    text-align: center;
}

.sycm li:before {
    position: absolute;
    top: 15%;
    right: 0;
    width: 1px;
    height: 30%;
    background: rgba(255, 255, 255, 0.1);
    content: '';
}

.sycm li:last-child:before {
    width: 0;
}

.sycm li h2 {
    color: #c5ccff;
    font-size: 30px;
}

.sycm li span {
    color: #fff;
    font-size: 18px;
    opacity: 0.5;
}

@keyframes myfirst2 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}

@keyframes myfirst {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(-359deg);
    }
}

/*Plugin CSS*/
.str_wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

.str_move {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    cursor: move;
}

.str_move_clone {
    position: absolute;
    top: 0;
    left: 100%;
    display: inline-block;
    vertical-align: top;
}

.str_vertical .str_move_clone {
    top: 100%;
    left: 0;
}

.str_down .str_move_clone {
    bottom: 100%;
    left: 0;
}

.str_vertical .str_move,
.str_down .str_move {
    width: 100%;
    white-space: normal;
}

.str_static .str_move,
.no_drag .str_move,
.noStop .str_move {
    cursor: inherit;
}

.str_wrap img {
    max-width: none !important;
}
</style>
