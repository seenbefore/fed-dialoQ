<!--  -->
<template>
    <div class="SidePanel " @mouseenter="onHover" @mouseleave="onLeave">
        <div class="ne-toc-view mini" ref="view" :class="myClass">
            <div class="ne-toc-view-inner">
                <div class="ne-toc-content">
                    <div class="ne-toc-item">
                        <span class="title" @click="redirct({})">撒库拉大阿斯顿撒</span>
                    </div>
                    <div class="ne-toc-item active">
                        <span class="title">撒库拉大阿斯顿撒打撒昆仑大道快乐撒多了</span>
                    </div>
                    <div class="ne-toc-item">
                        <span class="prefix">待审</span>
                        <span class="title">撒库拉大阿斯顿撒</span>
                    </div>
                    <div class="ne-toc-item">
                        <span class="prefix">待审</span>
                        <span class="title">撒库拉大阿斯撒看到啦收到啦打死了扩大顿撒</span>
                    </div>
                </div>
            </div>
            <div class="ne-toc-pin" @click="toggle">
                <span class="ne-toc-pin-text" @click.stop="toggle">{{ text }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'SidePanel',
    components: {},
})
export default class SidePanel extends Vue {
    async created() {
        setTimeout(() => {
            this.close()
        }, 1000)
    }
    @Prop({ type: String }) title!: string
    closed = false
    get myClass() {
        if (this.closed) {
            return 'closed'
        } else {
            return ''
        }
    }
    get text() {
        if (this.closed) {
            return '展开'
        } else {
            return '收起'
        }
    }
    toggle() {
        this.closed = !this.closed
    }
    onHover() {
        this.closed = false
    }
    onLeave() {
        this.closed = true
    }
    close() {
        this.closed = true
    }
    redirct(params: any = {}) {
        this.$router.replace({
            path: this.$route.path,
            query: {
                ...this.$route.query,
                ...params,
            },
        })
    }
}
</script>

<style lang="less" scoped>
.SidePanel {
    position: fixed;
    z-index: 998;
    max-width: 305px;

    .ne-toc-view {
        width: 210px;
        background: #ffffff;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.23);
        border-radius: 0px 6px 6px 0px;
        transition: width 0.1s linear;
        // padding: 10px 0;
        &.closed {
            width: 40px;
            .title,
            .prefix {
                // display: none !important;
                opacity: 0 !important;
                transition: opacity 0.1s linear !important;
            }

            .ne-toc-item::before {
                display: block !important;
            }
        }

        .ne-toc-view-inner {
            padding: 10px 0;
            .ne-toc-item {
                overflow: hidden;
                display: flex;
                height: 40px;
                align-items: center;
                padding-left: 10px;
                padding-right: 10px;
                cursor: pointer;
                position: relative;

                opacity: 1;
                &::before {
                    content: ' ';
                    display: block;
                    height: 2px;
                    // width: 8px;
                    width: 24px;
                    position: absolute;
                    right: 0;
                    top: 10px;
                    background: #c8c9cc;
                    display: none;
                }

                .prefix {
                    line-height: 1;
                    display: flex;
                    padding: 5px 7px;
                    background: rgba(237, 169, 0, 0.4);
                    border-radius: 4px;
                    color: #eda900;
                    font-size: 12px;
                    margin-right: 5px;
                    flex-shrink: 0;
                    transition: opacity 1s linear;
                    opacity: 1;
                }
                .title {
                    opacity: 1;
                    transition: opacity 1s linear;
                }

                &.active {
                    color: var(--ic-blue);
                    &::before {
                        background: var(--ic-blue);
                    }
                }
                &:hover {
                    color: var(--ic-blue);
                }
            }
        }

        .ne-toc-pin {
            border-top: 1px solid #ddd;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--ic-blue);
            cursor: pointer;
        }
    }
}
</style>
