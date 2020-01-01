<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 委派及行程单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="scenicName" placeholder="线路名" class="handle-input mr10"></el-input>
                <el-input v-model="ticket" placeholder="组团社名" class="handle-input mr10"></el-input>
                <el-input v-model="grade" placeholder="导游姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="route" label="线路名称" sortable width="150">
                </el-table-column>               
                <el-table-column prop="travelAgency" label="组团社">
                </el-table-column>
                 <el-table-column label="游客数"  width="120">
                    <template slot-scope="scope">
                           <el-link type="primary"  @click="linkTo(scope.$index, scope.row)">{{scope.row.visitorCount}}</el-link>
                    </template>                    
                </el-table-column>
                 <el-table-column prop="guideName" label="导游姓名" width="120">
                </el-table-column>
                 <el-table-column prop="startTime" label="抵达日期" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" >
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-link" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" v-if="false" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->

         <el-dialog title="查看" :visible.sync="editVisible" width="80%"  :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="110px">
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="团队编号">
                             <template>
                                <span v-text="form.teamNum"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="线路名称">
                             <template>
                                <span v-text="form.route"></span>
                            </template>
                        </el-form-item>
                    </el-col> 
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">                             
                         <el-form-item label="接团日期">
                             <template>
                                <span v-text="form.startTime"></span>
                            </template> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="送团日期">
                            <template>
                                <span v-text="form.endTime"></span>
                            </template>
                        </el-form-item>
                    </el-col> 
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="车牌号">
                             <template>
                                <span v-text="form.carNum"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="司机姓名">
                             <template>
                                <span v-text="form.driverName"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="司机电话">
                             <template>
                                <span v-text="form.driverPhone"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="司机身份证">
                             <template>
                                <span v-text="form.driverIdCard"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="导游姓名">
                             <template>
                                <span v-text="form.guideName"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="导游电话">
                             <template>
                                <span v-text="form.guidePhone"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="导游证号">
                             <template>
                                <span v-text="form.guideNum"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="导游身份证">
                             <template>
                                <span v-text="form.guideIdCard"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="游玩天数">
                             <template>
                                <span v-text="form.dateCount"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="游客人数">
                             <template>
                                <span v-text="form.visitorCount"></span>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row> 
                 
            </el-form>
            <el-card class="box-card travelList">
                <div slot="header" class="clearfix">
                    <span>行程单</span> 
                </div>
                <el-table
                    class="tableList"
                    height="150"
                    :data="form.detail"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center">
                    <el-table-column label="序列"   width="50" header-align="center">
                        <template slot-scope="{row,$index}">
                            <span>{{$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="日期"  prop="date"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.date"></span>                            
                        </template>
                    </el-table-column>
                    <el-table-column label="景区"  prop="scenicName"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.scenicName"></span> 
                        </template>
                    </el-table-column>
                    <el-table-column label="酒店"  prop="hotelName"   align="center">
                        <template slot-scope="{row}">
                             <span v-text="row.hotelName"></span>                             
                        </template>
                    </el-table-column>
                    <el-table-column label="行程描述"  prop="description"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.description"></span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

            <el-card class="box-card visitorList">
                <div slot="header" class="clearfix">
                    <span>游客信息</span>
                </div>
                <el-table   
                    class="tableList" 
                    height="150"                
                    :data="form.visitor"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center">
                    <el-table-column label="序列"   width="50" header-align="center">
                        <template slot-scope="{row,$index}">
                            <span>{{$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="证件类型"     align="center">
                        <template slot-scope="{row}">
                            <span v-text="formatterSfzjlx(row.IdType)"></span>                           
                        </template>
                    </el-table-column>
                    <el-table-column label="证件号码"  prop="IdNumber"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.IdNumber"></span>                           
                        </template>
                        
                    </el-table-column>
                    <el-table-column label="姓名"  prop="name"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.name"></span>                           
                        </template> 
                    </el-table-column>
                    <el-table-column label="性别"  prop="sex"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="formatter(row.sex)"></span>                           
                        </template>
                    </el-table-column>
                    <el-table-column label="出生日期"  prop="birthday"   align="center">
                        <template slot-scope="{row}">
                            <span v-text="row.birthday"></span>
                        </template>
                    </el-table-column>
                </el-table>

            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';
    import bus from '../common/bus';

    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                idList:[{
                    id:"1",
                    name:"身份证"
                },{
                    id:"2",
                    name:"回乡证"
                },{
                    id:"3",
                    name:"台胞证"
                },{
                    id:"4",
                    name:"港澳通行证"
                },{
                    id:"5",
                    name:"护照"
                },{
                    id:"6",
                    name:"军官证"
                }],              
                cur_pageCount: 1,
                pageTotal:0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                ticket:"",
                grade:"",
                scenicName:'',
                del_list: [],
                
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData;
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let params={
                    scenicName:this.scenicName,
                    ticket:this.ticket,
                    grade:this.grade,
                    pageCount:this.cur_page,
                }
                fetch({
                    url:'/Tourism/GetTravelList',
                    query:{...params}
                }).then((res) => {
                    this.tableData = res.result;
                    this.pageTotal=parseInt(res.pageTotal);
                })
            },
            linkTo(index, row) {
                //this.$router.push({path:'/VisitorsRecord',query: {paicheNo: obj.paicheNo}})
                this.$router.push({path:'/visitorsRecord',query: {tourId: row.id,refresh:true}})
            },
            search() {
                //this.is_search = true;
                this.getData();
            },
            formatter(sex) {
                return sex=='1'?'男':'女';
            },
            formatterSfzjlx(type){
                let sfzjItem={name:""};
                this.idList.filter(item=>{
                     item.id==type?sfzjItem=item:""
                })
                return sfzjItem.name
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                 this.id = row.id;
                let params={
                    id:row.id,
                }
                let _this=this;
                 this.form ={
                     teamNum:10523
                 }
                this.editVisible = true;
                fetch({
                    url:'/Tourism/GetTravelDetail',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result;
                    let roleId=[]
                    
                    this.form = {...rlt}
                   
                })
               
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                /* this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                } */
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.tableData[this.idx].id === this.id){
                    this.tableData.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.tableData.splice(i, 1);
                            return ;
                        }
                    }
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 160px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>




