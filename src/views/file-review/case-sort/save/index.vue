<template>
    <div class="sg-page icinfo-ai CaseSave">
        <!-- Steps indicator -->
        <div class="steps-wrapper">
            <el-steps :active="1" align-center>
                <el-step title="卷宗封面"></el-step>
                <el-step title="卷内备考表"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </div>
        <!-- Main content -->
        <div class="content">
            <DocInput
                ref="docInputRef"
                :doc-params="docParams"
                :custom-get-doc-base-info="customGetDocBaseInfo"
                :custom-get-doc-form="customGetDocForm"
                :cus-doc-form-data="cusDocFormData"
                is-custom-save-http
                @emitDataMap="emitDataMap"
            ></DocInput>
        </div>

        <!-- Fixed bottom action bar -->
        <div class="fixed-bottom">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleNext">下一步</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'
import DocInput from '@/components/doc-input/index.vue'

@Component({
    name: 'CaseSave',
    components: {
        DocInput,
    },
})
export default class CaseSave extends Vue {
    public viewPdfSrc = ''
    /**预览/返回编辑 */
    async handlePreview() {
        try {
            const res: any = await this.docInputRef.docPreview().finally(() => {})
            console.log('%c Line:55 🍊 res', 'background:#376ff3', res)
            this.viewPdfSrc = res?.data.pdfUrl
            await this.$modalDialog(() => import('@/views/file-review/my-case/save/components/preview-dialog/index.vue'), {
                pdfSrc: this.viewPdfSrc,
            })
        } catch (error) {
            console.error(error)
        }
    }
    /**步骤 */
    @Prop({ type: String, default: '1' })
    step!: string
    @Ref('formRef')
    formRef!: FormRef

    docParams: Record<string, any> = {
        caseId: '',
        documentId: '',
        documentCatalogCode: 'DC2A0223300WWFGJCNS0000001',
        documentTemplateCode: 'DT2A0223300QWWFGJCNS0000000001',
        partyId: '',
        sourcePage: '',
    }
    cusDocFormData: {
        /**当事人名称 */
        partyName: ''
        /**证件号码 */
        zjhm: ''
        /**住址 */
        partiesAddress: ''
        /**电话 */
        phone: ''
        /**执法人员姓名 */
        zfrymz: ''
    }
    /**自定义获取文书模板的接口 */
    get customGetDocBaseInfo() {
        return () => this.$http.post('/punish/stagedoc/common/getFirstIllegalityDocBaseInfo', this.docParams)
    }
    /**自定义获取文书表单的接口 */
    get customGetDocForm() {
        return () => this.$http.post('/punish/stagedoc/common/getFirstIllegalityDocFormData', this.docParams)
    }
    // 触发文书保存事件
    async emitDataMap(tabIndex, values, sendData) {
        // console.log(tabIndex, values, sendData)
        // if (!values) return
        // const paramsData: Record<string, any> = {
        //     sourceDocCommonOperateSaveDto: sendData,
        //     partiesLegalInfoList: null,
        //     partiesPersonInfoList: null,
        // }
        // const { data } = await this.$http.post('/punish/ucase/case/firstIllegality/saveFirstIllegalityInfo', paramsData)
        // if (data?.caseId) {
        //     this.$router.replace({
        //         path: '/source-case/detail',
        //         query: { sourceId: data.caseId },
        //     })
        // }
    }
    @Ref('docInputRef')
    docInputRef!: DocInput
    /**提交 */
    async handleNext() {
        //await this.docInputRef.saveData()
        this.$router.push({ path: '/file-review/case-sort/step2' })
    }

    handleCancel() {
        this.$router.back()
    }
}
</script>

<style lang="less" scoped>
.CaseSave {
    padding: 0 !important;
    height: 100%;
    display: flex !important;
    flex-direction: column;

    .steps-wrapper {
        padding: 20px;
        background: #fff;
        border-bottom: 1px solid #eee;
        //flex: 0 0 auto;
    }

    .content {
        padding: 20px;
        overflow-y: auto;
        //height: calc(100% - 60px - 100px); // 减去底部操作栏高度和步骤条高度
        flex: 1;
    }

    .fixed-bottom {
        height: 50px;
        padding: 0 20px;
        display: flex;
        //flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #ddd;

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>
