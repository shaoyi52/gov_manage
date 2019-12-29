<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 导游排行</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>导游排行前十</span>
            </div>
            <div class="schart-box">
                <div class="content-title" v-if=false>柱状图</div>
                <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>                    
            </div>
        </el-card>

    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';
    export default {
        name: 'Statistics',
        data() {
            return {
                chartSettings:{
                    //xAxisType: ['KMB', 'KMB'],导游名
                    xAxisName: ['导游', '所在旅行社'],
                        axisSite: {
                        //top: ['导游']
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                },
                chartData:{
                    columns: ['导游名', '导游', '所在旅行社'],
                    rows: [
                        { '导游名': '张三（青旅）', '导游': 203, '所在旅行社': 1325 },
                        { '导游名': '李四（中旅）', '导游': 209, '所在旅行社': 1438 },
                        { '导游名': '万五（东方旅行）', '导游': 234, '所在旅行社': 1000 },
                        { '导游名': '赵倩（国旅）', '导游': 270, '所在旅行社': 1594 },
                        { '导游名': '肖锋（国旅）', '导游': 274, '所在旅行社': 1141 },
                        { '导游名': '孙启（青旅）', '导游': 330, '所在旅行社': 1807 }
                    ]
                }      
            }
        },
        created() {

        },
        methods: {

        }
    }

</script>

<style scoped lang="scss">
    .sumDataWrap{
        margin-bottom: 0!important;
        .bg1{
            background: #33CCFF;
        }
        .bg2{
            background: rgb(39, 123, 248);
        }
        .bg3{
            background: rgb(20, 118, 245);
        }
        .bg4{
            background: rgb(25, 0, 255);
        }
        .textCenter{
            text-align: center;
        }
        
        .card-wrap{
            color:#fff;
            font-size: 18px;
        }       
        .card-data{
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            line-height: 94px;
        }
        
    }
    .el-row {
        margin-bottom: 20px;
    }

</style>
