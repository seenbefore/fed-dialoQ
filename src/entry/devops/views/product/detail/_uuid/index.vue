<template>
    <div class="sg-page ProductDetail_uuid">
        <div class="product-banner">
            <div class="ic-container sg-flexbox">
                <div class="left ic-mr-7">
                    <div class="ic-avatar">
                        <i v-text="model.title.substring(0, 1)"></i>
                    </div>
                </div>
                <div class="right sg-ml-6">
                    <div class="title sg-mb-4">
                        <span v-text="model.title"></span>
                        <span v-text="model.version"></span>
                    </div>

                    <div style="font-size:16px;font-weight:bold;">
                        <router-link
                            class="sg-link"
                            :to="{
                                path: `/admin/product/list`,
                                query: {
                                    _: model.title,
                                    title: model.title,
                                    version: model.version,
                                    affix: 0,
                                },
                            }"
                        >
                            我要编辑
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <header class="next-shell-header">
            <div class="next-navigation ic-container">
                <ul class="next-menu">
                    <li class="next-menu-item" @click="handleChange('product')">
                        <div class="next-menu-item-link " :class="{ active: activeName === 'product' }">
                            产品原型
                        </div>
                    </li>
                    <li class="next-menu-item" @click="handleChange('ued')">
                        <div class="next-menu-item-link " :class="{ active: activeName === 'ued' }">
                            UED设计稿
                        </div>
                    </li>
                </ul>
            </div>
        </header>
        <div class="product-main">
            <div class="product-content" v-if="activeName == 'product'">
                <div class="product-box">
                    <div class="headline">说明</div>
                    <div class="ic-row row-box">
                        <div class="col-box">
                            <span class="label">链接</span>
                            <a class="sg-link" target="_blank" :href="model.url" v-text="model.url"></a>
                        </div>
                    </div>
                </div>
                <iframe v-if="model.url.indexOf('http') > -1" class="iframe" :src="model.url" frameborder="0"></iframe>
            </div>
            <div class="product-content" v-if="activeName == 'ued'">
                <div class="product-box">
                    <div class="headline">设计稿</div>
                    <div class="ic-row row-box">
                        <div class="col-box" v-for="(item, index) in ued_urls" :key="index">
                            <span class="label" v-text="item.name"></span>
                            <a class="sg-link" target="_blank" :href="item.response" v-text="item.response"></a>
                        </div>
                    </div>
                </div>
                <div class="product-box">
                    <div class="headline">设计稿图标</div>
                    <div class="ic-row row-box">
                        <div class="col-box" v-for="(item, index) in ued_icons" :key="index">
                            <span class="label" v-text="item.name"></span>
                            <a class="sg-link" :href="item.response" v-text="item.response"></a>
                        </div>
                    </div>
                </div>

                <iframe v-if="model.ued_url.indexOf('http') > -1" class="iframe" :src="model.ued_url" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api'

@Component({
    name: 'ProductDetail_uuid',
    components: {},
})
export default class ProductDetail_uuid extends Vue {
    @Prop() uuid!: string
    @Prop() title!: string
    @Prop() version!: string
    get ued_urls() {
        let { ued_urls = [], ued_url, ued_type } = this.model
        if ('zip' === ued_type) {
            ued_urls = ued_urls || []
            return ued_urls
        } else {
            return [
                {
                    name: '链接',
                    response: ued_url,
                },
            ]
        }
    }
    get ued_icons() {
        const { ued_icons = [] } = this.model
        if (ued_icons && ued_icons.length) {
            return ued_icons
        } else {
            return []
        }
    }
    model = {
        title: '',
        version: '',
        url: '',
        ued_url: '',
        ued_type: 'zip',
        ued_urls: [],
        ued_icons: [],
    }
    activeName = 'product'
    handleChange(name: string) {
        this.activeName = name
    }
    async mounted() {
        const { title = '', version = '' } = this
        if (this.uuid) {
            const { data } = await API.ProductService.findOneByParams({
                uuid: decodeURIComponent(this.uuid),
            })
            Object.assign(this.model, data)
        } else {
            const { data } = await API.ProductService.findOneByParams({
                title: decodeURIComponent(title),
                version: decodeURIComponent(version),
            })

            Object.assign(this.model, data)
        }
    }
}
</script>

<style lang="less" scoped>
.iframe {
    width: 100%;
    height: 800px;
}
.product-banner {
    background: url(https://img.alicdn.com/imgextra/i4/O1CN017yEuUY1xTrJRtP8Zy_!!6000000006445-2-tps-1600-1676.png) no-repeat 80% 60% / auto 500px rgb(235, 246, 255);
    height: 140px;
    position: relative;
    > .ic-container {
        padding: 40px 40px 0 40px;
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // align-content: center;
    }
    .ic-avatar {
        height: 70px;
        width: 70px;
        border-radius: 100%;
        line-height: 70px;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-style: normal;
            width: 100%;
            height: 100%;
            font-size: 24px;
            color: #ffffff;
            border-radius: 100%;
            background-color: #0089ff;
        }
    }
    .right {
        position: relative;
        .title {
            font-size: 24px;
            font-weight: bold;
        }
        .note {
            color: var(--gray);
            font-size: 18px;
        }
        .action {
            position: absolute;
            bottom: 40px;
            left: 0;
        }
    }
}

.next-shell-header {
    color: #000;
    height: 52px;
    background: #fff;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.06);
    padding: 0 16px;
    display: block;

    .next-navigation {
        padding: 0 40px;

        .next-menu-item-link {
            font-size: 16px;
        }
    }
}

.product-main {
    padding-bottom: 20px;
    .product-box {
        padding: 15px 70px;
    }
    .headline {
        position: relative;
        margin-left: 12px;
        color: #333;
        font-weight: 700;
        font-size: 18px;
        line-height: 1;
        margin-bottom: 16px;
        &:before {
            position: absolute;
            top: 0;
            left: -12px;
            width: 4px;
            height: 16px;
            background-color: #158dff;
            content: '';
        }
    }
    .label {
        color: var(--gray);
        display: inline-block;
        margin-right: 10px;
        text-align: right;
    }
}
</style>
