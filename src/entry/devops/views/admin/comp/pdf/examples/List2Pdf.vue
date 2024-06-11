<template>
    <div class="pdf-generater-module">
        <div class="pdf-generater-section">
            <div class="pdf-generater-content">
                <div class="page-first">
                    <img :src="IMGSRC" />
                    <p class="pgc-title">{{ titleStr }}</p>
                </div>
                <div class="pgc-header">
                    <p class="pgch-title">Headline</p>
                    <div class="pgch-desc">{{ descStr }}</div>
                </div>
                <img :src="imgBig" class="image-big" />
                <div class="pgch-list">
                    <div v-for="(item, index) in contentData" :key="index" class="pgch-item">{{ index + 1 }}、{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="pdf-generater-operate">
            <el-button type="primary" @click="handleGenerate">生成PDF</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { listToPdf } from '@/scripts/utils/pdf'

@Component({
    components: {},
})
export default class List2Pdf extends Vue {
    mounted() {
        // this.handleGenerate()
    }

    IMGSRC = require('../assets/bg.jpg')
    imgBig = require('@/assets/images/bigscreen/big-data-header-bg.png')

    async handleGenerate() {
        const gapSide = 30
        const hasHead = (params: any) => {
            return params?.page !== 1
        }
        const dynamicData = this.contentData.map((item: string, index: number) => {
            return {
                type: 'text',
                value: `${index + 1}. ${item}`,
                gap: 5,
                textColor: '#333',
                fontSize: 16,
                textIndent: 2,
            }
        })
        const pageHead: any = [
            {
                fixed: true,
                type: 'image',
                format: 'PNG',
                value: require('@/assets/images/success.png'),
                show: hasHead,
                width: 40,
                height: 40,
                left: gapSide,
                top: 25,
            },
            {
                fixed: true,
                type: 'line',
                show: hasHead,
                left: gapSide,
                right: gapSide,
                top: 85,
                lineWidth: 0.5,
                drawColor: 'rgb(190, 190, 190)',
            },
            {
                fixed: true,
                type: 'text',
                value: `phone1: 0521-888888888`,
                fontSize: 14,
                show: (params: any) => {
                    return params?.page !== 1
                },
                left: (params: any) => {
                    return params.pageWidth - params.contentWidth - gapSide
                },
                top: 45,
            },
            {
                fixed: true,
                type: 'text',
                value: `phone2: 0521-888888888`,
                fontSize: 14,
                show: (params: any) => {
                    return params?.page !== 1
                },
                left: (params: any) => {
                    return params.pageWidth - params.contentWidth - gapSide
                },
                top: 68,
            },
            {
                fixed: true,
                type: 'line',
                show: hasHead,
                left: gapSide,
                right: gapSide,
                top: (params: any) => {
                    return params.pageHeight - 40
                },
                lineWidth: 0.5,
                drawColor: 'rgb(190, 190, 190)',
            },
            {
                fixed: true,
                type: 'text',
                value: (params: any) => {
                    const { page, totalPage } = params
                    return `Page ${page} of ${totalPage}`
                },
                fontSize: 12,
                align: 'center',
                top: (params: any) => {
                    return params.pageHeight - 15
                },
            },
        ]
        const template: any = [
            {
                type: 'image',
                format: 'JPEG',
                value: this.IMGSRC,
                width: (params: any) => {
                    const { pageWidth, grid } = params
                    return pageWidth - grid.left - grid.right
                },
                height: (params: any) => {
                    const { pageHeight, grid } = params
                    return pageHeight - grid.top - grid.bottom
                },
            },
            {
                fixed: true,
                type: 'text',
                value: this.titleStr,
                fontSize: 46,
                textColor: 'rgb(255, 255, 255)',
                fontWeight: 'bold',
                align: 'center',
                show: (params: any) => {
                    return params?.page === 1
                },
                top: (params: any) => {
                    return params.pageHeight / 2 - 16
                },
            },
            {
                type: 'text',
                value: 'Headline',
                fontSize: 24,
                fontWeight: 'bold',
                align: 'center',
                gap: 25,
                gapAlwaysExists: true,
            },
            {
                type: 'text',
                value: this.descStr,
                gap: 5,
                textIndent: 2,
                textColor: '#666',
                fontWeight: 'bold',
            },
            {
                type: 'image',
                format: 'PNG',
                value: this.imgBig,
                width: (params: any) => {
                    return params.pageWidth - gapSide * 2
                },
                height: (params: any) => {
                    return params.width / 11
                },
            },
            ...dynamicData,
            {
                type: 'text',
                value: 'User signature',
                left: (params: any) => {
                    const { pageWidth, contentWidth } = params
                    return pageWidth - contentWidth - gapSide
                },
                gap: 20,
            },
        ]
        const uri: any = await listToPdf(
            [...pageHead, ...template],
            {
                save: false,
                grid: {
                    left: gapSide,
                    right: gapSide,
                    top: (params: any) => {
                        return params?.page === 1 ? 40 : 100
                    },
                    bottom: 35,
                },
                textColor: 'rgb(0, 0, 0)',
                drawColor: 'rgb(255, 0, 0)',
                output: 'blob',
            },
            (pdf: any) => {
                // 设置字体
                // pdf.addFileToVFS('SourceHanSans-Normal.ttf', window.SourceHanSansNormal)
                // pdf.addFont('SourceHanSans-Normal.ttf', 'SourceHanSans-Normal', 'normal')
            },
        )
        // console.log('----生成的pdf----', uri)
        this.$modalDialog(() => import('../components/PdfView.vue'), {
            data: window.URL.createObjectURL(uri),
        })
    }

    titleStr = 'Title of the article'
    descStr =
        'In the above code,variable i is declared by the var command and is valid globally,so there is only one variable i globally. With each iteration,the value of variable i changes,and the console. log (i) inside the function assigned to array a in the loop points to the global i. That is to say,the i in all members of array a points to the same i,resulting in the runtime outputting the value of the last round of i,which is 10.'
    contentData = [
        'Realization of the Turnover Management Function for Technical Documents Based on OA System',
        'Publish,search for and retrieve a wide variety of technical documents which describe a customers SOA environment',
        'Technical documentation usually requires HTML,PDF and other formats of output',
        'If you want to generate PDF from HTML content and preserve its style (including line breaks),you can consider using tools like html2canvas and HTML plugins for jsPDF. But please note that this method may not be 100% reliable and may not support all CSS styles ES5 compares two values for equality using only two operators: the equality operator (==) and the strict equality operator (==). They all have their drawbacks,the formerautomatically converts data types,the latters NaN is not equal to itself,and+0 equals -0. JavaScript lacks an operation where in all environments,as long as two values are the same,they should be equalAs mentioned in the chapter "Traverse",the Iterator interface is a protocol for data traversal. As long as the next method of the traverser object is called,an object representing the information of the current traversal pointer position will be obtained. The structure of the object returned by the next method is {value,done},where value represents the current value of the data and done is a Boolean value indicating whether the traversal has ended or not',
        'In the above code,if the variable foo is declared with the var command,it will cause variable elevation. That is,when the script starts running,the variable foo already exists but has no value,so it will output undefined. The variable bar is declared with the let command,and there will be no variable elevation. This means that before declaring it,the variable bar does not exist,and if it is used,an error will be thrownSets text font face, variant for upcoming text elements. See output of jsPDF.getFontList() for possible font names, stylesTo add the font to jsPDF use our fontconverter in /fontconverter/fontconverter.html. The fontconverter will create a js-file with the content of the provided ttf-file as base64 encoded string and additional code for jsPDF. You just have to add this generated js-File to your project. You are then ready to go to use setFont-method in your code and write your UTF-8 encoded textjsPDF cannot live without help from the community! If you think a feature is missing or you found a bug, please consider if you can spare one or two hours and prepare a pull request. If youre simply interested in this project and want to help, have a look at the open issues.',
    ]
}
</script>

<style lang="less" scoped>
.pdf-generater-content {
    .page-first {
        width: 100%;
        height: 848px;
        position: relative;
        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }
        .pgc-title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            text-align: center;
            font-size: 50px;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
            margin-bottom: 10px;
        }
    }
    .pgc-header {
        margin-bottom: 20px;
        .pgch-title {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
        }
        .pgch-desc {
            font-size: 20px;
            text-indent: 40px;
            color: #666;
            font-weight: bold;
            text-indent: 2em;
        }
    }
    .image-big {
        width: 100%;
    }
    .pgch-list {
        .pgch-item {
            font-size: 18px;
            margin: 15px;
            text-indent: 2em;
        }
    }
}
</style>
