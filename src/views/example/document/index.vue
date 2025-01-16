<template>
    <admin-page>
        <template #header>
            <el-tabs v-model="activeName">
                <el-tab-pane label="1、文书模板默认" name="1"></el-tab-pane>
                <el-tab-pane label="2、文书自定义保存" name="2"></el-tab-pane>
                <el-tab-pane label="3、文书自定义(模板获取、初始化数据、保存)" name="3"></el-tab-pane>
            </el-tabs>
        </template>

        <DocInput v-if="activeName === '1'" ref="docInputRef" :doc-params="docParams" key="1"></DocInput>

        <DocInput v-if="activeName === '2'" ref="docInputRef" :doc-params="docParams" :is-custom-save-http="true" @emitDataMap="handleEmitDataMap" key="2"></DocInput>

        <DocInput
            v-if="activeName === '3'"
            ref="docInputRef"
            :doc-params="docParams"
            :custom-get-doc-base-info="customGetDocBaseInfo"
            :custom-get-doc-form="customGetDocForm"
            :is-custom-save-http="true"
            @emitDataMap="handleEmitDataMap"
            key="3"
        ></DocInput>
        <template #footer>
            <el-button type="primary" @click="save">保存</el-button>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DocInput from '@/components/doc-input/index.vue'
import { getArchiveVolumeRecordById } from '@/services/auto/my/volume'
import { getDocBaseInfo } from '@/services/auto/common/volume'
/** 卷宗封面 */
export interface CaseStepCoverClass {
    /** 获取表单数据 */
    save: () => Promise<any>
}
/** 卷宗封面 */
@Component({
    name: 'Step1',
    components: {
        DocInput,
    },
})
export default class Step1 extends Vue {
    activeName = '1'
    /**
     * 文书数据
     */
    @Prop({
        default: () => ({}),
    })
    row!: any
    /**
     * 文书参数
     */
    @Prop({
        default: () => ({
            // 案件id
            caseId: '111111111',
            // 文书目录编码
            documentCatalogCode: 'DC2A0223300WWFGJCNS0000001',
        }),
    })
    docParams!: any
    @Ref('docInputRef')
    docInputRef!: DocInput
    /** 自定义保存时触发文书保存 */
    handleEmitDataMap(tabIndex: number, values: any, sendData: any, resolve: Function) {
        console.log('触发自定义保存 values', values)
    }
    public async save() {
        try {
            // is-custom-save-http 为true时，会触发 handleEmitDataMap 方法
            await this.docInputRef.saveData()
            this.$message.success('保存成功')
            // 自定义保存时自己实现保存逻辑
        } catch (error) {
            this.$message.error('保存失败')
        }
    }
    /** 自定义获取文书模板的接口 */
    get customGetDocBaseInfo() {
        console.log('自定义获取文书模板接口')
        return async () => {
            const res = await this.$http.post('/punish/stagedoc/common/getDocBaseInfo', this.docParams)
            return res
        }
    }
    /** 自定义获取文书数据接口 */
    get customGetDocForm() {
        console.log('自定义获取文书数据接口')
        return async () => {
            // 模拟获取文书数据
            return {
                code: 200,
                message: '获取成功',
                data: {
                    dataMap: {
                        orgStandardName1: '哈哈哈哈哈',
                    },
                },
            }
        }
    }
}
</script>
