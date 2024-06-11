<!-- 素材详情 -->
<template>
    <div class="Community_uuid " id="web" v-loading="view.loading">
        <div class="mainContainerWrap">
            <div class="sc-hyBbbR jIuDfe lightTheme">
                <div class="content">
                    <div type="file" class="sc-fbKhjd eoKnhL" style="padding-right: 32px;">
                        <div class="detailMessage">
                            <div class="title">
                                <span>{{ row.name }}</span>
                                <!-- <span class="tags">
                                    <div class="tag"><span>22</span></div>
                                </span> -->
                            </div>
                            <div class="message">
                                <!-- <span class="Tooltip">
                                    <i class="el-icon-user"></i>
                                    <span class="">{{ row.owner }}</span>
                                </span> -->
                                <div class="avater-item">
                                    <div class="avatar">
                                        <span class="el-icon-user"></span>
                                    </div>
                                    <div class="name">{{ row.owner }}</div>
                                </div>
                                <template v-if="Array.isArray(row.meta)">
                                    <el-tooltip class="item" effect="dark" :content="`${item.position}#${item.name}`" placement="top-start" v-for="(item, index) in row.meta" :key="index">
                                        <div class="avater-item">
                                            <div class="avatar">
                                                <span>{{ item.position.substring(0, 1) }}</span>
                                            </div>
                                            <div class="name">{{ item.name }}</div>
                                        </div>
                                    </el-tooltip>
                                </template>

                                <span class="Tooltip">
                                    <i class="el-icon-paperclip"></i>
                                    <span class="">{{ row.type$ }}</span>
                                </span>

                                <span class="Tooltip last-update-container">
                                    <i class="el-icon-time"></i>
                                    <span class="last-update-text">{{ row.updatedAt$ }}</span>
                                </span>
                                <span class=" Tooltip view-count-container">
                                    <i class="el-icon-view"></i>
                                    <span class="view-count">{{ row.views }}</span>
                                </span>

                                <span class="Tooltip" v-if="row.tags$">
                                    <i class="el-icon-price-tag"></i>
                                    <span class="">{{ row.tags$ }}</span>
                                </span>
                            </div>

                            <div class="intro">{{ row.intro }}</div>
                        </div>
                        <div class="buttonGroup">
                            <!-- <el-button type="">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10.9949 1.31792C11.5349 1.31792 12.0649 1.43792 12.5649 1.67792C13.0549 1.89792 13.4849 2.21792 13.8549 2.61792C14.2349 3.01792 14.5249 3.46792 14.7349 3.97792C14.9549 4.51792 15.0649 5.05792 15.0649 5.62792C15.0649 6.67792 14.7849 7.77792 14.2349 8.91792C13.7549 9.89792 13.1149 10.8479 12.3149 11.7579C11.5849 12.5779 10.8349 13.2579 10.0549 13.7979C9.24491 14.3679 8.56491 14.6579 8.01491 14.6779H7.97491C7.43491 14.6579 6.75491 14.3679 5.93491 13.8079C5.16491 13.2679 4.41491 12.5879 3.68491 11.7679C2.88491 10.8579 2.24491 9.90792 1.76491 8.93792C1.21491 7.78792 0.934906 6.68792 0.934906 5.62792C0.934906 5.05792 1.04491 4.51792 1.26491 3.97792C1.47491 3.46792 1.76491 3.01792 2.14491 2.61792C2.52491 2.21792 2.95491 1.89792 3.43491 1.67792C3.94491 1.43792 4.46491 1.31792 5.00491 1.31792C5.79491 1.31792 6.53491 1.55792 7.21491 2.03792C7.48491 2.22792 7.75491 2.46792 7.99491 2.73792C8.24491 2.46792 8.51491 2.22792 8.79491 2.03792C9.46491 1.55792 10.2049 1.31792 10.9949 1.31792ZM7.50491 4.03792C7.20491 3.60792 6.87491 3.26792 6.51491 3.01792C6.04491 2.68792 5.54491 2.51792 5.00491 2.51792C4.64491 2.51792 4.28491 2.59792 3.94491 2.75792C3.59491 2.91792 3.29491 3.14792 3.01491 3.43792C2.74491 3.72792 2.52491 4.06792 2.37491 4.43792C2.21491 4.82792 2.13491 5.21792 2.13491 5.62792C2.13491 6.49792 2.37491 7.42792 2.85491 8.40792C3.27491 9.28792 3.85491 10.1479 4.58491 10.9779C5.24491 11.7179 5.92491 12.3379 6.62491 12.8179C6.93491 13.0379 7.22491 13.2079 7.48491 13.3179C7.69491 13.4179 7.86491 13.4679 7.99491 13.4779C8.12491 13.4679 8.29491 13.4179 8.50491 13.3179C8.77491 13.2079 9.05491 13.0379 9.37491 12.8179C10.0749 12.3279 10.7449 11.7179 11.4149 10.9679C12.1449 10.1279 12.7249 9.27792 13.1549 8.39792C13.6249 7.41792 13.8649 6.49792 13.8649 5.62792C13.8649 5.21792 13.7849 4.82792 13.6249 4.43792C13.4749 4.06792 13.2549 3.72792 12.9849 3.43792C12.7049 3.14792 12.4049 2.91792 12.0549 2.75792C11.7149 2.59792 11.3549 2.51792 10.9949 2.51792C10.0449 2.51792 9.20491 3.02792 8.48491 4.03792L7.99491 4.72792L7.50491 4.03792Z"
                                        fill="currentcolor"
                                    ></path>
                                </svg>
                                <span class="likeNum">1695</span>
                            </el-button> -->

                            <el-button type="primary" @click="handleUseList">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="secondBtnIcon">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M13.4 14.68C13.69 14.56 13.95 14.39 14.17 14.17C14.39 13.95 14.56 13.69 14.68 13.4C14.8 13.11 14.85 12.81 14.85 12.5V5.89999C14.85 5.58999 14.8 5.29999 14.68 5.00999C14.56 4.71999 14.39 4.45999 14.17 4.23999C13.95 4.01999 13.69 3.84999 13.4 3.72999C13.11 3.60999 12.81 3.54999 12.5 3.54999H12.45V3.41999C12.45 3.11999 12.38 2.81999 12.26 2.53999C12.15 2.26999 11.98 2.02999 11.77 1.81999C11.56 1.60999 11.32 1.43999 11.05 1.32999C10.77 1.20999 10.47 1.14999 10.16 1.14999H3.66999C3.32999 1.14999 2.99999 1.21999 2.68999 1.34999C2.38999 1.47999 2.11999 1.65999 1.88999 1.88999C1.65999 2.11999 1.47999 2.38999 1.34999 2.68999C1.21999 2.99999 1.14999 3.32999 1.14999 3.66999V10.16C1.14999 10.47 1.20999 10.77 1.32999 11.05C1.43999 11.32 1.60999 11.56 1.81999 11.77C2.02999 11.98 2.26999 12.15 2.53999 12.26C2.81999 12.38 3.11999 12.45 3.41999 12.45H3.54999V12.5C3.54999 12.81 3.60999 13.11 3.72999 13.4C3.84999 13.69 4.01999 13.95 4.23999 14.17C4.45999 14.39 4.71999 14.56 5.00999 14.68C5.29999 14.8 5.58999 14.85 5.89999 14.85H12.5C12.81 14.85 13.11 14.8 13.4 14.68ZM2.73999 2.73999C2.98999 2.47999 3.30999 2.34999 3.66999 2.34999H10.16C10.46 2.34999 10.71 2.45999 10.93 2.66999C11.14 2.87999 11.24 3.12999 11.25 3.42999V3.54999H5.89999C5.58999 3.54999 5.29999 3.60999 5.00999 3.72999C4.71999 3.84999 4.45999 4.01999 4.23999 4.23999C4.01999 4.45999 3.84999 4.71999 3.72999 5.00999C3.60999 5.29999 3.54999 5.58999 3.54999 5.89999V11.25H3.43999C3.12999 11.25 2.87999 11.14 2.66999 10.93C2.45999 10.71 2.34999 10.46 2.34999 10.16V3.66999C2.34999 3.30999 2.47999 2.98999 2.73999 2.73999ZM13.32 13.32C13.1 13.54 12.82 13.65 12.5 13.65H5.89999C5.57999 13.65 5.30999 13.54 5.08999 13.32C4.86999 13.1 4.74999 12.82 4.74999 12.5V5.89999C4.74999 5.57999 4.86999 5.30999 5.08999 5.08999C5.30999 4.86999 5.57999 4.74999 5.89999 4.74999H11.96L12.41 4.76999V4.74999H12.5C12.82 4.74999 13.1 4.86999 13.32 5.08999C13.54 5.30999 13.65 5.57999 13.65 5.89999V12.5C13.65 12.82 13.54 13.1 13.32 13.32Z"
                                        fill="white"
                                    ></path>
                                </svg>
                                <span class="secondBtnText">已使用&nbsp;</span>
                                <span class="secondBtnNum">{{ row.used }}</span>
                            </el-button>
                        </div>
                    </div>

                    <div class="sc-cyRcrZ hNvofi">
                        <div class="contentWrapper">
                            <!-- 左测 -->
                            <div class="messageContent">
                                <!-- 图片预览 -->
                                <section class="preview-panel combo_group applet sg-flexbox" v-if="row.preview_urls$ && row.preview_urls$.length">
                                    <div class="style__StyledWidgetItem-sc-wuopb3-0 fUVLXS component-item combo_group applet" v-for="(item, index) in row.preview_urls$" :key="index">
                                        <div class="component-cover-wrapper">
                                            <div class="component-cover" slot="reference">
                                                <img class="snapshot" :src="item.url" />
                                            </div>

                                            <div class="hover-options">
                                                <div class="options"><p class="option preview" @click="preview(index, row.preview_urls$)">预览</p></div>
                                            </div>
                                        </div>
                                        <div class="component-name text-no-wrap">{{ item.name }}</div>
                                    </div>
                                </section>

                                <section class="preview-panel combo_group applet" v-if="row.demoUrl && row.demoUrl.indexOf('/admin/admin') === -1">
                                    <div class="preview-demo">
                                        <DemoModel :src="row.demoUrl"></DemoModel>
                                    </div>
                                </section>

                                <div class="preview-content">
                                    <template v-if="row.content">
                                        <MarkdownArticle :container="'#web'" v-if="row.content" :show-catalog="false">
                                            <div v-html="row.content" class="element-doc"></div>
                                        </MarkdownArticle>
                                    </template>

                                    <template v-else-if="row.url && !row.demoUrl">
                                        <template v-if="row.url.indexOf('192') > -1 && row.url.indexOf('/admin/admin') === -1">
                                            <iframe :src="row.url" frameborder="0"></iframe>
                                        </template>
                                        <!-- <template v-else>
                                            <div>
                                                <a :href="row.url" target="_blank">{{ row.url }}</a>
                                            </div>
                                        </template> -->
                                        <!-- <div>
                                                <a :href="row.url" target="_blank">{{ row.url }}</a>
                                                <br />
                                                <br />
                                                <div v-for="(item, index) in row.preview_urls$" :key="index">
                                                    <img :src="item.url" alt="" style="max-width:100%;" />
                                                </div>
                                            </div> -->
                                    </template>

                                    <template v-else-if="isEmpty(row)">
                                        <div class="empty">
                                            暂无介绍
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <!-- 右侧 -->
                            <!-- <div class="sc-eHsDsR hhHScg vertical"></div> -->
                        </div>
                    </div>

                    <!-- 推荐 -->

                    <div class="styles__StyledRecommend-sc-b08p8j-0 iedfhq" v-if="dataList.length">
                        <section class="headContainer">
                            <div class="left">相关推荐</div>
                        </section>
                        <section class="listContainer">
                            <div class="styles__StyledRecommendTemplateCard-sc-b08p8j-1 thghq recommendCard" v-for="(item, index) in dataList" :key="index">
                                <div class="templateCover" @click="redirectToDetail(item)">
                                    <img class="templateCoverImage" :src="item.cover$" />

                                    <div class="plabel" v-if="item.communityState$">
                                        {{ item.communityState$ }}
                                    </div>
                                    <div class="templateCoverImageText" v-if="item.templateCoverImageText">{{ item.templateCoverImageText }}</div>
                                </div>
                                <div class="templateInfo">
                                    <div class="titleIcon">
                                        <span class="sc-jSUZER dCfvCv Tooltip Ellipsis isnt-truncated templateTitle" type="inline" data-max="15" title="后台常用交互组件" style="max-width: 15em;">
                                            【{{ item.plabel }}】{{ item.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="sidePanel">
                    <div class="sidePanelInner">
                        <div class="sc-emIrwa cYJWa pageTools isPage Light">
                            <div data-type="button" class="toolWrapper a_c sidebar_copy sidebar_item_show second_button notActive" @click.prevent.stop="handleEdit(row)" v-if="isAuthor">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox">
                                        <i class="el-icon-edit"></i>
                                    </div>
                                </div>
                                <div class="toolText"><span>编辑</span></div>
                            </div>

                            <div data-type="button" class="toolWrapper a_c sidebar_copy sidebar_item_show second_button " @click="handleUse">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="secondIcon">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.46154 14.54H5.32C5.01 14.54 4.7 14.48 4.42 14.36C4.14 14.24 3.89 14.07 3.68 13.86C3.47 13.65 3.3 13.4 3.18 13.12C3.06 12.84 3 12.53 3 12.22V5.57C3 5.22 3.07 4.89 3.2 4.57C3.33 4.26 3.52 3.99 3.75 3.75C3.99 3.52 4.26 3.33 4.57 3.2C4.89 3.07 5.22 3 5.57 3H12.22C12.53 3 12.84 3.06 13.12 3.18C13.4 3.3 13.65 3.47 13.86 3.68C14.07 3.89 14.24 4.14 14.36 4.42C14.48 4.7 14.54 5.01 14.54 5.32V5.34L14.5367 5.46154H14.6215C14.9415 5.46154 15.2515 5.52154 15.5515 5.65154C15.8315 5.77154 16.0815 5.94154 16.3015 6.16154C16.5215 6.38154 16.6915 6.63154 16.8115 6.91154C16.9415 7.21154 17.0015 7.52154 17.0015 7.84154V14.6215C17.0015 14.9415 16.9415 15.2515 16.8115 15.5515C16.6915 15.8315 16.5215 16.0815 16.3015 16.3015C16.0815 16.5215 15.8315 16.6915 15.5515 16.8115C15.2515 16.9415 14.9415 17.0015 14.6215 17.0015H7.84154C7.52154 17.0015 7.21154 16.9415 6.91154 16.8115C6.63154 16.6915 6.38154 16.5215 6.16154 16.3015C5.94154 16.0815 5.77154 15.8315 5.65154 15.5515C5.52154 15.2515 5.46154 14.9415 5.46154 14.6215V14.54ZM5.46154 13.34H5.32C5.01 13.34 4.75 13.23 4.53 13.01C4.31 12.79 4.2 12.53 4.2 12.22V5.57C4.2 5.19 4.33 4.87 4.6 4.6C4.87 4.33 5.19 4.2 5.57 4.2H12.22C12.53 4.2 12.79 4.31 13.01 4.53C13.23 4.74 13.34 5.01 13.34 5.31L13.3358 5.46154H7.84154C7.52154 5.46154 7.21154 5.52154 6.91154 5.65154C6.63154 5.77154 6.38154 5.94154 6.16154 6.16154C5.94154 6.38154 5.77154 6.63154 5.65154 6.91154C5.52154 7.21154 5.46154 7.52154 5.46154 7.84154V13.34ZM7.01154 15.4515C6.78154 15.2215 6.66154 14.9415 6.66154 14.6215V7.84154C6.66154 7.52154 6.78154 7.24154 7.01154 7.01154C7.24154 6.78154 7.52154 6.66154 7.84154 6.66154H14.6215C14.9415 6.66154 15.2215 6.78154 15.4515 7.01154C15.6815 7.24154 15.8015 7.52154 15.8015 7.84154V14.6215C15.8015 14.9415 15.6815 15.2215 15.4515 15.4515C15.2215 15.6815 14.9415 15.8015 14.6215 15.8015H7.84154C7.52154 15.8015 7.24154 15.6815 7.01154 15.4515Z"
                                                fill="currentcolor"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="toolText"><span>使用</span></div>
                            </div>

                            <div data-type="button" class="toolWrapper a_c sidebar_like sidebar_item_show" @click.prevent.stop="handleThumb(row.id)">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox_like toolBox">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon thumb" viewBox="0 0 17 17" :class="isThumb ? 'active' : ''">
                                            <path
                                                d="M8.5 1c-.354 0-.665.145-.885.4-.263.307-.398.747-.399 1.296-.036.955-.454 2.349-1.133 3.434C5.413 7.2 4.5 7.91 3.56 8l-2.546.296-.01 6.7c-.001.276.11.526.291.707.182.182.434.294.712.295l10.7-.013c.267 0 .428-.087.623-.214.224-.145.386-.363.593-.787l1.17-6.529a1.51 1.51 0 00-.219-.821c-.249-.41-.645-.592-1.21-.625l-3.65-.012C10.008 6.587 10 6.207 10 6c0-.253.01-.758.02-1.266.01-.498.02-.999.02-1.252 0-.446-.05-.896-.175-1.433a1.456 1.456 0 00-.509-.759A1.397 1.397 0 008.5 1z"
                                                fill-rule="nonzero"
                                                stroke="#415058"
                                                stroke-width="2"
                                                fill="none"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="unreadNum">{{ row.likes }}</div>
                                <div class="toolText"><span>点赞</span></div>
                            </div>

                            <div class="toolWrapper a_c copyLinkIcon" data-type="button" v-if="row.url" @click="open(row.url)">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M13.6398 5.99982C13.7398 5.89982 13.8998 5.89982 13.9998 5.99982C14.0998 6.09982 14.0998 6.25982 13.9998 6.35982L8.68983 12.2098C8.54983 12.3598 8.49983 12.5798 8.55983 12.7698L10.6798 17.7398C10.6798 17.7498 10.6798 17.7598 10.6898 17.7598C10.7998 18.0998 11.0998 18.3298 11.4498 18.3498H11.4898C11.8498 18.3498 12.1798 18.1298 12.3198 17.7898L17.7898 3.32982C17.9198 3.00982 17.8398 2.64982 17.5998 2.39982C17.3598 2.15982 16.9898 2.08982 16.6698 2.20982L2.20983 7.67982C1.85983 7.80982 1.63983 8.14982 1.64983 8.50982C1.65983 8.87982 1.89983 9.19982 2.23983 9.30982L2.25983 9.31982L7.21983 11.4398C7.41983 11.4998 7.62983 11.4498 7.77983 11.3098L13.6398 5.99982Z"
                                                fill="currentcolor"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="toolText"><span>文档地址</span></div>
                            </div>

                            <div class="toolWrapper a_c copyLinkIcon" data-type="button" v-if="row.demoUrl" @click="open(row.demoUrl)">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M13.6398 5.99982C13.7398 5.89982 13.8998 5.89982 13.9998 5.99982C14.0998 6.09982 14.0998 6.25982 13.9998 6.35982L8.68983 12.2098C8.54983 12.3598 8.49983 12.5798 8.55983 12.7698L10.6798 17.7398C10.6798 17.7498 10.6798 17.7598 10.6898 17.7598C10.7998 18.0998 11.0998 18.3298 11.4498 18.3498H11.4898C11.8498 18.3498 12.1798 18.1298 12.3198 17.7898L17.7898 3.32982C17.9198 3.00982 17.8398 2.64982 17.5998 2.39982C17.3598 2.15982 16.9898 2.08982 16.6698 2.20982L2.20983 7.67982C1.85983 7.80982 1.63983 8.14982 1.64983 8.50982C1.65983 8.87982 1.89983 9.19982 2.23983 9.30982L2.25983 9.31982L7.21983 11.4398C7.41983 11.4998 7.62983 11.4498 7.77983 11.3098L13.6398 5.99982Z"
                                                fill="currentcolor"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="toolText"><span>案例地址</span></div>
                            </div>

                            <div class="toolWrapper a_c copyLinkIcon" data-type="button" v-if="row.git" @click="open(row.git)">
                                <div class="toolBoxWrapper">
                                    <div class="toolBox">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M13.6398 5.99982C13.7398 5.89982 13.8998 5.89982 13.9998 5.99982C14.0998 6.09982 14.0998 6.25982 13.9998 6.35982L8.68983 12.2098C8.54983 12.3598 8.49983 12.5798 8.55983 12.7698L10.6798 17.7398C10.6798 17.7498 10.6798 17.7598 10.6898 17.7598C10.7998 18.0998 11.0998 18.3298 11.4498 18.3498H11.4898C11.8498 18.3498 12.1798 18.1298 12.3198 17.7898L17.7898 3.32982C17.9198 3.00982 17.8398 2.64982 17.5998 2.39982C17.3598 2.15982 16.9898 2.08982 16.6698 2.20982L2.20983 7.67982C1.85983 7.80982 1.63983 8.14982 1.64983 8.50982C1.65983 8.87982 1.89983 9.19982 2.23983 9.30982L2.25983 9.31982L7.21983 11.4398C7.41983 11.4998 7.62983 11.4498 7.77983 11.3098L13.6398 5.99982Z"
                                                fill="currentcolor"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="toolText"><span>代码地址</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <PublishButton></PublishButton> -->
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import * as API from '@/entry/library/services/community'
import moment from 'moment'
import { useImagePreview } from '@/components/image-preview/hooks/useImagePreview'
import MarkdownArticle from '@/components/MarkdownArticle/index.vue'
import { userStore } from '@/entry/library/store/useStore'
import PublishButton from '../components/PublishButton/index.vue'
import iframeResize from 'iframe-resizer/js/iframeResizer'
import DemoModel from './components/demo-model/index.vue'

@Component({
    name: 'Community_uuid',
    components: {
        MarkdownArticle,
        PublishButton,
        DemoModel,
    },
})
export default class Community_uuid extends Vue {
    @Prop({ default: '' }) id!: string
    row: any = {}
    view = {
        loading: false,
    }
    backgrounds = [
        //require('@/entry/library/views/community/assets/backgrounds/1.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/2.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/3.jpg'),
        require('@/entry/library/views/community/assets/backgrounds/4.jpg'),
    ]
    dataList: any[] = []
    get isAuthor() {
        const row = this.row || {}
        const role = userStore.info?.role || ''
        const isAdmin = role.includes('admin')
        const isAuthor = row.owner === userStore.info?.name
        return isAdmin || isAuthor
    }
    get isThumb() {
        const row = this.row || {}
        const like_users: any[] = row.like_users || []
        let result = !!like_users.filter(item => item.username === userStore.info?.username).length
        return result
    }
    open(url: string) {
        window.open(url)
    }
    isEmpty(row: any) {
        let result = true
        if (row.content) {
            return false
        }
        if (row.demoUrl && row.demoUrl.indexOf('admin/admin') === -1) {
            return false
        }
        if (row.url && row.url.indexOf('admin/admin') === -1) {
            return false
        }
        return result
    }

    /* 点赞 */
    async handleThumb(id: any) {
        try {
            const { data } = await API.like({
                id,
            })
            const { isLike, like_users, likes } = data

            this.$set(this.row, 'like_users', like_users)
            this.$set(this.row, 'likes', likes)

            if (isLike) {
                this.$message.success('点赞成功')
            } else {
                this.$message.success('取消点赞成功')
            }
        } catch (error) {
            console.log(error)
        }
    }
    async mounted() {
        await this.syncData()
        this.syncViews()
        this.syncSimilars()
    }
    redirectToDetail(item: any) {
        const { href } = this.$router.resolve({
            path: `/community/${item.id}`,
        })
        window.open(href, '_blank')
    }
    async syncSimilars() {
        const tags = this.row.tags || []
        if (tags.length === 0) {
            return
        }
        let { data } = await API.similar({
            tags,
        })
        data = data.filter((item: any) => item.id !== this.row.id)
        this.dataList = data.map((item: any) => {
            const name = item.name || ''
            let cover_urls = item.cover_urls
            let templateCoverImageText = ''

            let defaultCover = this.backgrounds[name.length % this.backgrounds.length]
            let cover$ = defaultCover
            if (cover_urls) {
                try {
                    cover_urls = JSON.parse(cover_urls)
                    cover$ = cover_urls[0]?.url
                } catch (error) {
                    templateCoverImageText = name
                    cover$ = defaultCover
                }
            } else {
                templateCoverImageText = name
            }
            let communityState = item.communityState || 'done'
            let communityState$ = communityState !== 'done' ? '建设中' : ''

            return {
                ...item,
                cover$,
                templateCoverImageText,
                communityState$,
            }
        })
    }
    preview(index: number, list: any[]) {
        let urls = list.map(item => {
            return item.url
        })
        const url = urls[index]
        useImagePreview(urls, {
            start: index,
        })
    }
    handleEdit(item: any) {
        this.$router.push({
            path: '/community/upload',
            query: {
                action: 'update',
                id: item.id,
            },
        })
    }
    async syncViews() {
        const { data } = await API.views({
            id: this.id,
        })
        console.log(111, data, this.row)
        this.row.views = data
    }
    async syncData() {
        try {
            this.view.loading = true
            const { data } = await API.get({
                id: this.id,
            })
            let { updatedAt, createdAt, plabel, clabel, views, cover_urls, preview_urls, owner = '', communityState = 'done' } = data
            cover_urls = data.cover_urls || []
            preview_urls = data.preview_urls || []
            const updatedAt$ = moment(updatedAt).format('YYYY-MM-DD HH:mm')
            const createdAt$ = moment(createdAt).format('YYYY-MM-DD HH:mm')

            const preview_urls$ = preview_urls.length === 0 ? [...cover_urls] : [...preview_urls]
            const one$ = owner.substring(0, 1)
            const type$ = [plabel, clabel].filter(item => item).join('-')
            let tags = data.tags || []
            const tags$ = tags.join('、')

            let communityState$ = communityState !== 'done' ? '建设中' : ''
            owner = owner.trim().length > 0 ? owner : '匿名'
            this.$set(this, 'row', {
                ...data,
                updatedAt$,
                createdAt$,

                preview_urls$,
                one$,
                type$,
                tags$,
                communityState$,
                owner,
            })
        } catch (error) {
            console.error(error)
        } finally {
            this.view.loading = false
        }
    }

    async handleUse() {
        if (!userStore.token) {
            this.$notify({
                title: '警告',
                message: '请先登录',
                type: 'warning',
            })
            return
        }
        const result = await this.$modalDialog(() => import('../components/UseDialog/index.vue'), {
            communityId: this.id,
            communityName: this.row.name,
        })
        if (result) {
            this.syncData()
        }
    }
    async handleUseList() {
        await this.$modalDialog(() => import('../components/UseListDialog/index.vue'), {
            communityId: this.id,
            communityName: this.row.name,
        })
    }
}
</script>

<style lang="less" scoped>
.Community_uuid ::v-deep {
    padding-top: 72px;
    .mainContainerWrap {
        max-width: 1438px;
        margin: 0 auto;
    }

    .jIuDfe {
        display: flex;
        width: 100%;
        .content {
            flex: 1 1 0%;
            padding: 40px 0px;
            min-width: 0px;
        }
        .sidePanel {
            width: 90px;
            display: flex;
            flex-direction: column;
            position: relative;
            height: initial;
            .sidePanelInner {
                max-height: 100vh;
                position: sticky;
                top: 0px;
                padding: 122px 20px 0px 0px;
                .pageTools {
                    display: flex;
                    flex-direction: column;
                    width: fit-content;
                    height: fit-content;
                    gap: 20px;
                }

                .toolWrapper {
                    position: relative;
                    display: flex;
                    -webkit-box-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 2px;
                    transition: var(--transition-easeOut-2);
                    border-radius: 50%;
                    cursor: pointer;
                    .toolBoxWrapper {
                        border-radius: 50%;
                        width: fit-content;
                        height: fit-content;
                        transition: var(--transition-easeOut-2);
                        .toolBox {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            display: flex;
                            -webkit-box-pack: center;
                            justify-content: center;
                            -webkit-box-align: center;
                            align-items: center;
                            color: var(--color-text);
                            transition: var(--transition-easeOut-2);
                            border: 1px solid var(--color-border);
                            color: var(--color-text);
                            &:hover {
                                // border: 1px solid var(--color-border-secondary);
                                border: 1px solid rgba(0, 0, 0, 0.34);
                            }
                        }
                    }

                    .toolText {
                        width: 100%;
                        display: flex;
                        -webkit-box-align: center;
                        align-items: center;
                        -webkit-box-pack: center;
                        justify-content: center;
                        height: 18px;
                        span {
                            color: var(--color-text-secondary-new);
                        }
                    }
                }
            }
        }
    }
    .eoKnhL {
        display: flex;
        height: 42px;
        -webkit-box-align: center;
        align-items: center;
        gap: 12px;
        width: 100%;
        min-width: 0px;
        padding-left: 50px;
        .headerImg {
            width: 40px;
            height: 40px;
            flex: 0 0 auto;
            .multiAvatarWrapper {
                width: 100%;
                height: 100%;
                .avatarContainer {
                    width: 100%;
                    height: 100%;
                    box-shadow: var(--border-shadow-out);
                }
            }
        }
        .detailMessage {
            display: flex;
            flex-direction: column;
            text-overflow: ellipsis;
            min-width: 0px;
            gap: 4px;
            flex: 1 1 0%;
            white-space: nowrap;

            .title {
                color: var(--color-text);
                display: flex;
                line-height: 24px;
                font-size: 20px;
                font-weight: bold;
                span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .hotResource {
                    margin-left: 4px;
                    width: fit-content;
                    height: 20px;
                    flex: 0 0 auto;
                }
            }
            .message {
                display: flex;
                gap: 8px;

                .Tooltip {
                    color: #7d8b94;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                    margin-right: 33px;
                    i {
                        margin-right: 5px;
                    }
                }
            }
            .intro {
                word-break: break-all;
                white-space: normal;
                padding-right: 30px;
            }
        }
        .buttonGroup {
            display: flex;
            flex: 0 0 auto;
            gap: 8px;
            height: 36px;

            button {
                align-items: center;
                display: flex;
                svg {
                    margin-bottom: -3px;
                    margin-right: 5px;
                }
            }
        }
    }

    .hNvofi {
        display: flex;
        flex-direction: column;
        padding-top: 40px;
        .contentWrapper {
            margin: 0px 50px 0px;
            // display: flex;
        }
        .desP {
            max-width: 100%;
            padding: 0px 40px;
            margin-bottom: 56px;
            font-size: 16px;
            line-height: 28px;
        }
    }

    .tag {
        width: fit-content;
        padding: 3px 8px;
        background-color: var(--color-bg-component);
        border-radius: 4px;
        font: var(--font-400-13);
        color: var(--color-text-secondary-new);
        transition: var(--transition-easeOut-1);
    }
    .tag1 {
        display: inline-flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        flex: 0 0 auto;
        width: 32px;
        height: 16px;
        margin-left: 4px;
        border-radius: 3px;
        background: var(--color-bg-teamTag);
        transition: var(--transition-easeOut-2);
    }
    .second_button.notActive .toolBoxWrapper {
        background: var(--color-bg-blue-button);
        .toolBox {
            color: var(--color-white) !important;
        }
    }

    .icon {
        &.thumb {
            width: 17px;
            height: auto;
            &.active {
                path {
                    stroke: rgb(255, 97, 97);
                    fill: rgb(255, 97, 97);
                }
            }
        }
    }
    .unreadNum {
        position: absolute;
        top: -5px;
        left: 30px;
        background: var(--color-bg);
        min-width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text);
        padding: 2px 5px;
        border-radius: 999px;
        line-height: 12px;
        border: 1px solid var(--color-border);
    }

    .preview-panel {
        box-sizing: border-box;

        // min-height: 100px;
        // display: flex;
        // flex-flow: wrap;
        // justify-content: space-around;
        position: relative;
        // overflow: hidden;
        overflow-y: auto;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px;
        border-radius: 8px;
        .fUVLXS.combo_group {
            width: 164px;
            margin: 15px 12px;
            .component-cover {
                height: 164px;
                border-radius: 4px;
                border: 1px solid rgb(219, 219, 219);
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                .snapshot {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: cover;
                }
            }
            .hover-options {
                display: flex;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0px;
                top: 0px;
                background: rgba(31, 41, 46, 0.9);
                flex-direction: column;
                -webkit-box-pack: center;
                justify-content: center;
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.2s ease 0s;

                .option {
                    height: 36px;
                    line-height: 36px;
                    font-size: 14px;
                    text-align: center;
                    background: rgb(22, 132, 252);
                    color: rgb(255, 255, 255);
                    cursor: pointer;
                }
            }
        }

        .component-cover-wrapper {
            position: relative;

            &:hover .hover-options {
                opacity: 1;
            }
        }
        .component-name {
            text-align: center;
            margin-top: 12px;
            font-size: 14px;
            line-height: 20px;
            color: rgb(65, 80, 88);
        }
        .component-cover {
            box-sizing: border-box;
            background: url('../assets/square_component_background.png') center center / cover no-repeat;
            overflow: hidden;
            position: relative;
        }
    }
    .preview-panel + .preview-panel {
        margin-top: 15px;
    }
    iframe {
        width: 1px;
        min-width: 100%;
        min-height: 100vh;
    }
    .preview-content {
        padding: 20px 0px;
    }
    .empty {
        padding: 20px 10px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        width: 400px;
        margin: 0 auto;
        background: url('~@/entry/library/assets/empty.png') no-repeat center 0;
        padding-top: 320px;
    }
    .iedfhq {
        padding-top: 20px;
        margin: 0 50px;
        .headContainer {
            display: flex;
            flex-direction: row;
            -webkit-box-pack: justify;
            justify-content: space-between;
            .left {
                font-size: 16px;
                line-height: 18px;
                font-weight: 700;
                color: rgb(51, 51, 51);
            }
        }
        .listContainer {
            width: 100%;
            margin-top: 16px;
            display: flex;
            flex-wrap: nowrap;
            column-gap: 11px;
            margin-bottom: 48px;
            .thghq {
                cursor: pointer;
                flex: 1 1 0%;
                max-width: 210px;
                padding: 8px 8px 12px;

                background: rgb(255, 255, 255);
                outline: rgba(0, 0, 0, 0.08) solid 1px;
                box-shadow: rgba(0, 0, 0, 0.1) 1px 4px 15px;
                border-radius: 8px;

                &:hover {
                    background: rgb(255, 255, 255);
                    outline: rgba(0, 0, 0, 0.08) solid 1px;
                    box-shadow: rgba(0, 0, 0, 0.1) 1px 4px 15px;
                    border-radius: 8px;
                }
                .templateCover {
                    width: 100%;
                    height: 145px;
                    position: relative;
                    border-radius: 6px;
                    transition: all 0.15s ease-in-out 0s;
                    overflow: hidden;
                    outline: rgba(0, 0, 0, 0.08) solid 1px;
                    .templateCoverImage {
                        width: 100%;
                        height: auto;
                        border-radius: 6px;
                    }
                }
                .templateInfo {
                    width: 100%;
                    padding-top: 12px;
                    .titleIcon {
                        display: flex;
                        -webkit-box-align: center;
                        align-items: center;
                        -webkit-box-pack: justify;
                        justify-content: space-between;
                        .templateTitle {
                            color: rgb(65, 80, 88);
                            font-size: 14px;
                            line-height: 20px;
                            font-weight: 500;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }

    .avater-item {
        display: flex;
        margin-right: 10px;
        align-items: center;
        .avatar {
            width: 28px;
            height: 28px;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: bold;
            background: rgb(206, 109, 132);
            margin-right: 10px;
        }
        .name {
            color: #7d8b94;
        }

        &:nth-child(1) {
            .avatar {
                background: rgb(199, 117, 105);
            }
        }
        &:nth-child(2) {
            .avatar {
                background: rgb(69, 142, 170);
            }
        }
        &:nth-child(3) {
            .avatar {
                background: rgb(120, 78, 202);
            }
        }
        &:nth-child(4) {
            .avatar {
                background: rgb(59, 159, 221);
            }
        }
        &:nth-child(5) {
            .avatar {
                background: rgb(247, 99, 134);
            }
        }
        &:nth-child(6) {
            .avatar {
                background: rgb(57, 111, 179);
            }
        }
    }
}
</style>
