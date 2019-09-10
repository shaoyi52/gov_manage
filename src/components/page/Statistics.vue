<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 统计分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20" class="sumDataWrap">
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20 card-wrap bg1"> 
                         <el-row :gutter="24" class="sumDataWrap">
                             <el-col :span="12">
                                 <div class="card-caption">今年累计出团数</div>
                                <div class="card-data">1200 </div>
                             </el-col>                             
                         </el-row>
                    </el-card>               
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20 card-wrap bg2">
                         <el-row :gutter="8" class="sumDataWrap">
                             <el-col :span="12">
                                 <div class="card-caption">今年景区累计人次</div>
                                <div class="card-data">21200 </div>
                             </el-col>
                             <el-col :span="12">
                                <div class="card-caption textCenter">奖金</div>
                                <div class="card-data">21.2万</div>
                             </el-col>
                         </el-row>
                    </el-card>  
                </el-col>               
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20 card-wrap bg2">
                         <el-row :gutter="8" class="sumDataWrap">
                             <el-col :span="12">
                                 <div class="card-caption">今年住宿累计人次</div>
                                <div class="card-data">6000 </div>
                             </el-col>
                             <el-col :span="12">
                                <div class="card-caption textCenter">奖金</div>
                                <div class="card-data">30万</div>
                             </el-col>
                         </el-row>
                    </el-card>  
                </el-col>               
                
            
            </el-row>
            <el-row :gutter="20">           
                <el-col :span="24">
                    <el-card shadow="hover">
                        <div slot="header" class="clearfix">
                            <span>近一周每天有效游客数</span>
                        </div>
                        <div class="schart-box">
                            <div class="content-title" v-if=false>柱状图</div>
                                <ve-histogram :data="chartData"></ve-histogram>                        
                            </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';
    export default {
        name: 'Statistics',
        data() {
            return {
                chartData: {
                    columns: ['日期', '景区人次', '住宿人次'],
                    rows: [
                        { '日期': '9-7', '景区人次': 320, '住宿人次': 220},
                        { '日期': '9-8', '景区人次': 332, '住宿人次': 182},
                        { '日期': '9-9', '景区人次': 301, '住宿人次': 191},
                        { '日期': '9-10', '景区人次': 334, '住宿人次': 234},
                        { '日期': '9-11', '景区人次': 390, '住宿人次': 290},
                        { '日期': '9-12', '景区人次': 440, '住宿人次': 300},
                        { '日期': '9-13', '景区人次': 340, '住宿人次': 240}
                    ], 
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
