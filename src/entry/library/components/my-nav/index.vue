<template>
    <nav class="mb-nav-org MyNav" id="nav">
        <div class="nav-header">
            <div id="header-left" class="header-left"><router-link to="/" class="group-logo"></router-link></div>
            <div class="header-nav">
                <div id="menu-center" class="menu-center" style="display: block;">
                    <ul class="menu-content">
                        <li class="pc-menu-center material">
                            <router-link to="/" style="" class="link" :class="{ active: '/' === $route.path }">
                                <div class="menu-content-a">首页</div>
                            </router-link>
                        </li>
                        <li class="pc-menu-center material">
                            <router-link to="/community" class="link" :class="{ active: '/community' === $route.path }">
                                <div class="menu-content-a">资产广场</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div id="menu-right" class="menu-right">
                    <ul id="login-menu">
                        <li class="workspace-signUp-btn" data-track-id="workspace">
                            <template v-if="hasLogin">
                                <a class="primary workspace" href="javascript:void(0)" @click="redirectToUpload">我要发布</a>
                            </template>
                            <template v-else>
                                <a class="primary workspace" href="javascript:void(0)" @click="redirectToLogin">立即登录</a>
                            </template>
                        </li>
                        <li class="toggle-dropdown" id="toggle-drop-down" v-if="hasLogin">
                            <el-popover placement="bottom" title="" width="200" trigger="hover" popper-class="my-toggle-dropdown">
                                <div class="user-info-dropdown">
                                    <div class="dropdown-content">
                                        <div class="me">
                                            <div class="left-part avatar_container">
                                                <span class="avatar-name">{{ firstLetter }}</span>
                                            </div>
                                            <div class="right-part user-wrapper">
                                                <p class="user-name-info">
                                                    <span class="user-name">{{ user.name }}</span>
                                                </p>
                                                <p class="user-account">{{ user.username }}</p>
                                            </div>
                                        </div>
                                        <ul class="nav">
                                            <li>
                                                <router-link to="/author/me" class="square-me">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="-2 0 16 16">
                                                        <path
                                                            fill="#9EA9BC"
                                                            d="M5.867 8.13c2.166 0 3.866-1.65 3.866-3.815C9.733 2.213 7.967.5 5.867.5 3.7.5 1.933 2.246 1.933 4.315c0 2.166 1.767 3.814 3.934 3.814ZM9.7 9.745c-.733-.518-1.7-.744-2.6-.744H4.833c-.9 0-1.866.226-2.6.711C.9 10.586 0 12.073 0 13.754v.291C0 15.468 2.133 15.5 4.867 15.5h2.266c2.734 0 4.867 0 4.867-1.455v-.29c0-1.682-.933-3.169-2.3-4.01Z"
                                                        ></path>
                                                    </svg>
                                                    我的主页
                                                </router-link>
                                            </li>
                                        </ul>
                                        <ul class="nav sign-out">
                                            <li>
                                                <a href="javascript:void(0)" @click="logout">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="-1.5 0 16 16">
                                                        <g fill="#9EA9BC" clip-path="url(#clip0_3947_14635)">
                                                            <path
                                                                d="M11.25 12.5H7.5V4.008a.75.75 0 0 0-.471-.697L3.75 2h7.5v1.125c0 .207.168.375.375.375h.75a.375.375 0 0 0 .375-.375V1.25A.75.75 0 0 0 12 .5H.75a.75.75 0 0 0-.75.75v10.742a.75.75 0 0 0 .471.697l6.515 2.605a.375.375 0 0 0 .514-.348V14h5.25v-2.625a.375.375 0 0 0-.375-.375h-.75a.375.375 0 0 0-.375.375V12.5Z"
                                                            ></path>
                                                            <path
                                                                d="M14.466 7.571a.375.375 0 0 0 0-.643L11.82 5.34a.375.375 0 0 0-.568.322V6.5H8.627a.375.375 0 0 0-.375.375v.75c0 .207.168.375.375.375h2.625v.837c0 .292.318.472.568.322l2.646-1.588Z"
                                                            ></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3947_14635"><path fill="#fff" d="M0 .5h15v15H0z"></path></clipPath>
                                                        </defs>
                                                    </svg>
                                                    退出登录
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div slot="reference" class="sg-flexbox ">
                                    <div class="avatar_container with-red-point">
                                        <span class="avatar-name">{{ firstLetter }}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="angle_bracket_down" viewBox="0 0 10 7" aria-hidden="true">
                                        <path d="M4.95 4.071l2.828-2.828a1 1 0 1 1 1.414 1.414L5.657 6.192a.997.997 0 0 1-1.414 0L.707 2.657a1 1 0 0 1 1.414-1.414L4.95 4.07z"></path>
                                    </svg>
                                </div>
                            </el-popover>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="deco"></div>
        </div>
    </nav>
</template>

<script lang="ts">
import { userStore } from '@library/store/useStore'
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'MyNav',
    components: {},
})
export default class MyNav extends Vue {
    get user() {
        const user = userStore.info || {}
        return user
    }
    get firstLetter() {
        const name = this.user.name || ''
        return name.substr(0, 1)
    }
    get hasLogin() {
        return !!userStore.token
    }
    // 退出跳转到首页
    async logout() {
        const { href } = this.$router.resolve({
            path: '/',
        })
        //location.replace(href)
        this.$router.replace('/')
        setTimeout(async () => {
            await userStore.FedLogOut()
            location.replace(href)
        }, 200)
    }
    async redirectToLogin() {
        await userStore.FedLogOut()
        await userStore.ThirdLogin()
    }
    redirectToUpload() {
        const { href } = this.$router.resolve({
            path: '/community/upload',
        })
        window.open(href, '_blank')
    }
}
</script>
<style lang="less">
.my-toggle-dropdown {
    padding: 0;
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}
.user-info-dropdown {
    filter: drop-shadow(0 2px 10px rgba(39, 54, 78, 0.12)) drop-shadow(4px 12px 40px rgba(39, 54, 78, 0.12));

    width: 100%;
    font-size: 12px;

    -webkit-transform-origin: 50% 0;
    -moz-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    transform: scale(0.9);
    margin: 0.25em 0;
    -webkit-transition: opacity 0.2s ease-in-out 0s, -webkit-transform 0.2s ease-in-out 0s;
    transition: opacity 0.2s ease-in-out 0s, -webkit-transform 0.2s ease-in-out 0s;
    -moz-transition: transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s, -moz-transform 0.2s ease-in-out 0s;
    transition: transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;
    transition: transform 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s, -webkit-transform 0.2s ease-in-out 0s, -moz-transform 0.2s ease-in-out 0s;

    .dropdown-content {
        font-size: 14px;
        border-radius: 6px;
        padding: 0;
        background: #fff;

        .me {
            z-index: 999;
            overflow: hidden;
            display: -webkit-flex;
            display: -moz-box;
            display: flex;
            -webkit-justify-content: space-between;
            -moz-box-pack: justify;
            justify-content: space-between;
            -webkit-align-items: center;
            -moz-box-align: center;
            align-items: center;
            position: relative;
            padding: 0 24px 0 16px;
            height: 80px;
            background: -webkit-gradient(linear, left bottom, left top, color-stop(0.01%, #edf5ff), color-stop(102.95%, #c8dbff));
            background: -webkit-linear-gradient(bottom, #edf5ff 0.01%, #c8dbff 102.95%);
            background: -moz-linear-gradient(bottom, #edf5ff 0.01%, #c8dbff 102.95%);
            background: linear-gradient(1turn, #edf5ff 0.01%, #c8dbff 102.95%);
            border-radius: 6px 6px 0 0;
            -webkit-transition: all 0.15s ease-out;
            -moz-transition: all 0.15s ease-out;
            transition: all 0.15s ease-out;
            cursor: default;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            .left-part {
                width: 42px;
                height: 42px;
                margin-right: 10px;
                .avatar-name {
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                    -webkit-justify-content: center;
                    -moz-box-pack: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background-color: #1684fc;
                    border-radius: 50%;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                }
            }
            .right-part.user-wrapper {
                -webkit-flex-grow: 1;
                -moz-box-flex: 1;
                flex-grow: 1;
                width: 0;
                .user-name-info {
                    width: 150px;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                }
                .user-account {
                    margin-top: 6px;
                    font-size: 12px;
                    line-height: 1.6;
                    color: #5d6f8f;
                    max-width: none;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .nav {
            padding: 6px 0;
            &.sign-out {
                border-top: 1px solid #dedee4;
            }
            li {
                height: 40px;
                margin: 0;
                svg {
                    margin-right: 15px;
                }
                a {
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    padding: 0 24px;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #5d6f8f;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                    &:hover {
                        background: #f1f8ff;
                        -webkit-transition: all 0.15s ease-out;
                        -moz-transition: all 0.15s ease-out;
                        transition: all 0.15s ease-out;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less" scoped>
.MyNav ::v-deep {
    background: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    background-color: #fff;
    font-family: Noto Sans SC, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    box-shadow: 0 1px #0000000d;

    .link.active {
        .menu-content-a {
            color: var(--color-text-link) !important;
        }
    }
    .link {
        display: block;
        margin-left: 25px;
    }
    // .link + .link {
    //     margin-left: 15px;
    // }

    .nav-header {
        background-color: #fff;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;
        -webkit-align-items: center;
        -moz-box-align: center;
        align-items: center;
        color: #415058;
        position: relative;
        -webkit-justify-content: space-between;
        -moz-box-pack: justify;
        justify-content: space-between;
        z-index: 1000;
        max-width: 1408px;
        margin: 0 auto;
        height: 72px;

        .header-left {
            display: flex;
            .group-logo {
                height: 62px;
                width: 190px;
                background-image: url('./assets/logo.png');
                background-size: 100% 100%;
            }
        }
        .header-nav {
            display: flex;
            height: 100%;
            justify-content: space-between;
            flex: 1;
            margin-left: 30px;

            .menu-center {
                white-space: nowrap;
                line-height: 72px;
                margin-right: 40px;

                .menu-content {
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                    height: 100%;

                    .pc-menu-center {
                        cursor: pointer;
                        text-decoration: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        height: 100%;

                        .menu-content-a {
                            display: block;
                            height: 72px;
                            font-size: 14px;
                            font-weight: 400;
                            color: #000;
                            text-decoration: none;
                        }
                    }
                }
            }
            .menu-right {
                height: 100%;
                display: -webkit-flex;
                display: -moz-box;
                display: flex;
                white-space: nowrap;
                #login-menu,
                #login-menu > li {
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                }
                #login-menu > li {
                    position: relative;
                    height: 100%;
                }
                .workspace-signUp-btn {
                    width: 6.875rem;
                    -webkit-justify-content: center;
                    -moz-box-pack: center;
                    justify-content: center;
                    position: relative;
                    height: 100%;
                    .workspace {
                        color: #fff;
                        border-radius: 40px;
                        line-height: 1;
                        font-weight: 400;
                        font-size: 0.875rem;
                        padding: 0.5rem 1rem;
                        background: -webkit-linear-gradient(219.53deg, #ffbf1c -0.87%, #ff3a3a 25.89%, #ff123d 77.87%, #ff27c3 97.94%), #e73828;
                        background: -moz-linear-gradient(219.53deg, #ffbf1c -0.87%, #ff3a3a 25.89%, #ff123d 77.87%, #ff27c3 97.94%), #e73828;
                        background: linear-gradient(230.47deg, #ffbf1c -0.87%, #ff3a3a 25.89%, #ff123d 77.87%, #ff27c3 97.94%), #e73828;
                        -webkit-transition: all 0.5s;
                        -moz-transition: all 0.5s;
                        transition: all 0.5s;
                        margin: 0 0.25rem;
                    }
                }
                .avatar_container {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    position: relative;
                }
                .avatar-name {
                    display: -webkit-flex;
                    display: -moz-box;
                    display: flex;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    align-items: center;
                    -webkit-justify-content: center;
                    -moz-box-pack: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background-color: #1684fc;
                    border-radius: 50%;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                }
                .toggle-dropdown {
                    margin-left: 20px;
                    cursor: pointer;
                    .angle_bracket_down {
                        -webkit-transition: all 0.2s ease-in;
                        -moz-transition: all 0.2s ease-in;
                        transition: all 0.2s ease-in;
                        width: 10px;
                        height: auto;
                        fill: #c8cdd1;
                        margin-left: 0.75em;
                    }
                }
            }
        }
    }

    @media (max-width: 1460px) {
        .nav-header {
            padding: 0 130px;
        }
    }
}
</style>
