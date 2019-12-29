<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 旅行社排行</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>近一周每天有效游客数</span>
            </div>
            <div class="schart-box">
                <div class="content-title"  v-if=false>柱状图</div>
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
                    stack: {
                    'xxx': ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                },
                chartData: {
                    columns: ['旅行社', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
                    rows: [
                        { '旅行社': '中青旅', '星期一': 134, '星期二':107, '星期三':107, '星期四':102, '星期五':82, '星期六':202, '星期天':92 },
                        { '旅行社': '国旅', '星期一': 122, '星期二':67, '星期三':114, '星期四':102, '星期五':202, '星期六':202, '星期天':105 },
                        { '旅行社': '青旅', '星期一':112, '星期二':64, '星期三':197, '星期四':202, '星期五':202, '星期六':202, '星期天':132 },
                        { '旅行社': '东方旅行','星期一': 130, '星期二':94, '星期三':114, '星期四':202, '星期五':202, '星期六':202, '星期天':202 },
                        { '旅行社': '天天旅行', '星期一': 180, '星期二':114, '星期三':214, '星期四':202, '星期五':202, '星期六':202, '星期天':202 },
                        { '旅行社': '时尚旅行','星期一': 220, '星期二':114, '星期三':214, '星期四':202, '星期五':202, '星期六':202, '星期天':202 },
                        { '旅行社': '尚旅行', '星期一': 230, '星期二':214, '星期三':214, '星期四':202, '星期五':202, '星期六':202, '星期天':202 }
                    ]}       

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
