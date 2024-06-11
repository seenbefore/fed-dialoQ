<template>
    <div class="pdf-generater-module">
        <div class="pdf-generater-section">
            <div class="pdf-generater-content">
                <div id="id_html2pdfprint" class="pdf-html-content">
                    <p class="pdf-html-title" :class="classNameBasic">根据HTML结构生成pdf文件</p>
                    <p :class="classNameBasic" class="title-module">element表格</p>
                    <sg-data-view
                        :columns="tableViewMulHead.columns"
                        :load="tableViewMulHead.load"
                        ref="tableRef"
                        class="pgc-eltable"
                        :class="[classNameBasic, classNameTable]"
                        border
                        :page-action-layout="[]"
                        :page-visible="false"
                    >
                        <template #slotImg>
                            <div class="table-img">
                                <img :src="require('@/assets/logo.svg')" />
                            </div>
                        </template>
                    </sg-data-view>
                    <p :class="classNameBasic" class="title-module">手写列表</p>
                    <div :class="[classNameBasic, classNameTable]" class="h2p-list">
                        <div v-for="item in 13" :key="item" :class="classNameRow" class="h2p-item">
                            <div class="h2p-content">{{ item }}、这是列表中的一条记录</div>
                        </div>
                    </div>
                    <p :class="classNameBasic" class="title-module">表格集合dom</p>
                    <div :class="[classNameBasic, classNameListCollection]" class="table-collection-class">
                        <div v-for="index in 3" :key="index" class="table-collection-item" :class="classNameTable">
                            <div class="nb-title">内表{{ index }}</div>
                            <sg-data-view :columns="tableViewList.columns" :load="tableViewList.load" ref="tableRef" class="pgc-eltable" border :page-action-layout="[]" :page-visible="false">
                                <template #slotNbName>
                                    <div>这是内表 - {{ index }}</div>
                                </template>
                            </sg-data-view>
                        </div>
                    </div>
                    <!-- 图片 -->
                    <img :src="require('@/assets/images/success.png')" class="sealimg" :class="[classNameBasic, classNameFixed]" />
                </div>
            </div>
        </div>
        <div class="pdf-generater-operate">
            <el-button type="primary" @click="handleGenerate(false)">生成PDF</el-button>
            <el-button type="warning" @click="handleGenerate(true)">调试模式</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Loading } from 'element-ui'
import {
    htmlToPdf,
    HTML2PDF_CLASS_NAME_TABLE,
    HTML2PDF_CLASS_NAME_BASIC,
    HTML2PDF_CLASS_NAME_WHOLE,
    HTML2PDF_CLASS_NAME_FXIED,
    HTML2PDF_CLASS_NAME_LIST_COLLECTION,
    HTML2PDF_CLASS_NAME_LIST_ROW,
} from '@/scripts/utils/pdf'

@Component({
    components: {},
})
export default class Html2Pdf extends Vue {
    mounted() {
        setTimeout(() => {
            // this.handleGenerate(false)
        }, 300)
    }

    classNameListCollection = HTML2PDF_CLASS_NAME_LIST_COLLECTION
    classNameTable = HTML2PDF_CLASS_NAME_TABLE
    classNameRow = HTML2PDF_CLASS_NAME_LIST_ROW
    classNameBasic = HTML2PDF_CLASS_NAME_BASIC
    classNameWhole = HTML2PDF_CLASS_NAME_WHOLE
    classNameFixed = HTML2PDF_CLASS_NAME_FXIED

    async handleGenerate(debug = false) {
        const loading = Loading.service({
            lock: true,
            text: '正在生成文件，请稍等...',
            spinner: 'el-icon-loading',
        })
        await this.$nextTick()
        try {
            const container: any = document.querySelector(`#id_html2pdfprint`)
            const width = container.getBoundingClientRect().width + 40
            const uri: any = await htmlToPdf({
                container,
                width,
                grid: {
                    top: 30,
                    bottom: 30,
                    left: 20,
                    right: 20,
                },
                output: 'blob',
                debug,
                isConsole: debug,
                save: false,
                fileName: '文件名.pdf',
                options: [
                    {
                        type: 'table',
                        includes: ['pgc-eltable', 'table-collection-item'],
                        classNameHead: 'el-table__header-wrapper',
                        classNameRow: 'el-table__row',
                    },
                    {
                        type: 'fixed',
                        includes: ['sealimg'],
                        pagination: [1],
                        styles: {
                            top: '30px',
                            right: '30px',
                        },
                    },
                ],
            })
            this.$modalDialog(() => import('../components/PdfView.vue'), {
                data: window.URL.createObjectURL(uri),
            })
        } catch (e) {
            console.error(e)
            this.$message.error('打印失败')
        }
        loading.close()
    }

    public tableViewList: any = {
        selected: [],
        load: (params: any) => {
            const result = []
            for (let i = 0; i < 10; i++) {
                result.push({
                    name: '这是内表',
                })
            }
            return {
                result: result,
                total: result.length,
            }
        },
        columns: [
            {
                type: 'index',
                label: '序号',
                width: 80,
            },
            {
                label: '内表名称',
                slotName: 'slotNbName',
            },
        ],
    }
    public tableViewMulHead: any = {
        selected: [],
        load: (params: any) => {
            const result = []
            for (let i = 0; i < 30; i++) {
                result.push({
                    userName: '员工-' + (i + 1),
                    userId: `NO-${Math.floor(Math.random() * 100000)}`,
                    userStatus: '在职',
                })
            }
            return {
                result: result,
                total: result.length,
            }
        },
        columns: [
            {
                type: 'index',
                label: '序号',
                width: 80,
            },
            {
                label: '员工基本信息',
                children: [
                    {
                        label: '姓名',
                        prop: 'userName',
                        width: 150,
                    },
                    {
                        label: '工号',
                        prop: 'userId',
                    },
                    {
                        label: '状态',
                        prop: 'userStatus',
                    },
                ],
            },
            {
                label: '图像',
                slotName: 'slotImg',
            },
        ],
    }
}
</script>

<style lang="less" scoped>
.pdf-generater-content {
    width: 1010px !important;
    .pdf-html-content {
        position: relative;
        .pdf-html-title {
            font-size: 26px;
            font-weight: bold;
            text-align: center;
            padding: 20px 0 0;
            color: #0062ff;
        }
        .table-img {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                display: block;
                width: 40px;
                height: 40px;
            }
        }
        .table-collection-class {
            .table-collection-item {
                margin: 10px 0;
                .nb-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #666;
                    padding: 10px 0 5px;
                }
            }
        }
        .h2p-list {
            .h2p-item {
                padding: 5px 0;
                .h2p-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 80px;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    color: #fff;
                    background: #5f7b93;
                }
            }
        }
        .title-module {
            font-size: 24px;
            font-weight: bold;
            padding: 14px 0 10px;
            text-align: center;
        }
        .sealimg {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 80px;
            height: 80px;
        }
    }
}
</style>
