<template>
    <div>
        <el-row :gutter="20" class="sumDataWrap">
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20 card-wrap bg1">                   
                    <div class="card-caption">在案酒店数</div>
                    <div class="card-data">{{sumsData.hotelTotal}}家</div>
                </el-card>               
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20 card-wrap bg2">                   
                    <div class="card-caption">管理景点数</div>
                    <div class="card-data">{{sumsData.scenicTotal}}个</div>
                </el-card>               
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20 card-wrap bg3">                   
                    <div class="card-caption">在册旅行社数</div>
                    <div class="card-data">{{sumsData.travelTotal}}家</div>
                </el-card>               
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20 card-wrap bg4">                   
                    <div class="card-caption">平台注册导游数</div>
                    <div class="card-data">{{sumsData.guideTotal}}人</div>
                </el-card>               
            </el-col>
           
        </el-row>
        <el-row :gutter="20">           
            <el-col :span="24">
                <el-card shadow="hover" class="monthDataCard">
                    <div slot="header" class="clearfix">
                        <span class="monthDataCardTitle">2019年7月月报完成情况</span>
                    </div>
                    <el-tabs v-model="message" >
                        <el-tab-pane class="monthDataCardLabel" :label="`已提交家数(16)`" name="first">
                            <el-table
                            :data="tableData"
                            class="travelList"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="旅行社"
                                width="230">
                            </el-table-column> 
                            <el-table-column
                                prop="tel"
                                label="联系电话"
                                 width="230">
                            </el-table-column>   
                            <el-table-column
                                prop="address"
                                label="地址"
                                width="230">
                            </el-table-column>                          
                            
                            
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane class="monthDataCardLabel"  :label="`未提交家数(5)`" name="second">
                            <template v-if="message === 'second'">
                                 <el-table
                                 class="travelList"
                                :data="tableData2"
                                style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="旅行社"
                                width="230">
                            </el-table-column> 
                            <el-table-column
                                prop="tel"
                                label="联系电话"
                                 width="230">
                            </el-table-column>   
                            <el-table-column
                                prop="address"
                                label="地址"
                                width="230">
                            </el-table-column>                                </el-table>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import { fetchData,fetch } from '../../api/index';
    export default {
        name: 'dashboard',
        data() {
            return {                
                message: 'first',
                name: localStorage.getItem('ms_username'),
                todoList: [{
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ],
                sumsData:{
                    hotelTotal: 0,
                    scenicTotal:0,
                    travelTotal:0,
                    guideTotal:0,
                },
                data: [{
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                tableData: [{
                    tel: '0652-8888888',
                    name: '福建瀚翔国际旅行社有限公司',
                    address: '福建普陀区金沙江路 1518 弄'
                }, {
                    tel: '0652-6666666',
                    name: '平安假日旅行社',
                    address: '福建普陀区金沙江路 1318 弄'
                },{
                    tel: '0652-888777',
                    name: '安假翔国际旅行社有限公司',
                    address: '福建普陀区金沙江路 1118 弄'
                },{
                    tel: '0652-8844444',
                    name: '福建安假旅行社有限公司',
                    address: '福建普陀区金沙江路 145 弄'
                }],
                tableData2: [{
                    tel: '0652-8888888',
                    name: '安假日国际旅行社有限公司2',
                    address: '福建普陀区金沙江路 1518 弄'
                }, {
                    tel: '0652-6666666',
                    name: '平安假日旅行社3',
                    address: '福建普陀区金沙江路 1318 弄'
                },{
                    tel: '0652-888777',
                    name: '安假翔国际旅行社有限公司4',
                    address: '福建普陀区金沙江路 1118 弄'
                },{
                    tel: '0652-8844444',
                    name: '福建安假旅行社有限公司',
                    address: '福建普陀区金沙江路 145 弄'
                },]
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.getData();
            this.handleListener();
            //this.changeDate();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            //window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
             getData() {
                let params={}
                fetch({
                    url:'/Tourism/HomeTotalData',
                    query:{...params}
                }).then((res) => {
                    let sumData=res.result;
                    this.sumsData={
                        hotelTotal: sumData.hotelTotal,
                        scenicTotal:sumData.scenicTotal,
                        travelTotal: sumData.travelTotal,
                        guideTotal: sumData.guideTotal,
                    }
                    
                    console.log(res.result)
                })
            },
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                //window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                //this.$refs.bar.renderChart();
               // this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped lang="scss">
    .sumDataWrap{
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
        
        .card-wrap{
            color:#fff;
            font-size: 18px;
        }       
        .card-data{
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            line-height: 74px;
        }
        
    }

    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .monthDataCard{
        .monthDataCardTitle{
            font-size: 18px !important;
        }
        
    }
    .el-tabs__item{
        font-size: 16px !important;
    }
    .travelList{
        font-size: 16px !important;        
    }

</style>
