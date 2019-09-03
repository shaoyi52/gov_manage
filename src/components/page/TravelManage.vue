<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 行程列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.guideName" placeholder="导游名称" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.leadership" placeholder="导游资格" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="create">新建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="guideName" label="导游名称" sortable width="150">
                </el-table-column>
                <el-table-column prop="guidePhone" label="导游电话" >
                </el-table-column>
                 <el-table-column prop="visitorCount" label="游客人数" >
                </el-table-column>
                 <el-table-column prop="startTime" label="行程开始时间" width="120">
                </el-table-column>
                 <el-table-column prop="scenicCount" label="行程景点数" width="120">
                </el-table-column>                 
                 <el-table-column prop="dateCount" label="行程天数" width="120">
                </el-table-column>
                 <el-table-column prop="stayPeriod" label="住宿天数" width="120">
                </el-table-column>
                 <el-table-column prop="addTime" label="填报时间" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" >
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="80%">
            <el-form ref="form" :model="form" label-width="110px">
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="团队编号">
                            <el-input v-model="form.teamNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="线路名称">
                            <el-input v-model="form.route"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="接团日期">
                            <el-input v-model="form.startTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="送团日期">
                            <el-input v-model="form.endTime"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="车牌号">
                            <el-input v-model="form.carNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="司机姓名">
                            <el-input v-model="form.driverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="司机电话">
                            <el-input v-model="form.driverPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="司机身份证">
                            <el-input v-model="form.driverIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="导游姓名">
                            <el-input v-model="form.guideName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="导游电话">
                            <el-input v-model="form.guidePhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="导游证号">
                            <el-input v-model="form.guideNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="导游身份证">
                            <el-input v-model="form.guideIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="40">
                    <el-col :span="12">
                         <el-form-item label="游玩天数">
                            <el-input v-model="form.dateCount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="游客人数">
                            <el-input v-model="form.visitorCount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                 
            </el-form>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>行程单</span>
                </div>
                <el-table
                    :data="travelList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center">
                    <el-table-column label="序列"   width="50" header-align="center">
                        <template slot-scope="{row,$index}">
                            <span>{{$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="景点"  prop="scenicName"   align="center">
                        <template slot-scope="{row,$index}">
                            <input class="edit-cell" v-if="showEdit[$index]"    v-model="row.scenicName">
                            <span v-if="!showEdit[$index]">{{row.scenicName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                        <template slot-scope="{row,$index}">
                            <el-button type="text" size="small"     @click.native="handleUpdate($index, row)"     v-if="showBtn[$index]">更新</el-button>
                            <el-button type="text" size="small"     @click.native="handleCancel($index, row)"     v-if="showBtn[$index]">取消</el-button>
                    
                            <el-button type="text" size="small"     @click.native="handleEdit($index, row)"     v-if="!showBtn[$index]">编辑</el-button>
                            <el-button type="text" size="small"     @click.native="handleDelete($index, row)"     v-if="!showBtn[$index]">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>游客信息</span>
                </div>
                <el-table
                    :data="travelList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center">
                    <el-table-column label="序列"   width="50" header-align="center">
                        <template slot-scope="{row,$index}">
                            <span>{{$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="景点"  prop="scenicName"   align="center">
                        <template slot-scope="{row,$index}">
                            <input class="edit-cell" v-if="showEdit[$index]"    v-model="row.scenicName">
                            <span v-if="!showEdit[$index]">{{row.scenicName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                        <template slot-scope="{row,$index}">
                            <el-button type="text" size="small"     @click.native="handleUpdate($index, row)"     v-if="showBtn[$index]">更新</el-button>
                            <el-button type="text" size="small"     @click.native="handleCancel($index, row)"     v-if="showBtn[$index]">取消</el-button>
                    
                            <el-button type="text" size="small"     @click.native="handleEdit($index, row)"     v-if="!showBtn[$index]">编辑</el-button>
                            <el-button type="text" size="small"     @click.native="handleDelete($index, row)"     v-if="!showBtn[$index]">删除</el-button>
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
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],                
                cur_page: 1,
                pageTotal:0,
                showEdit: [],
                showBtn: [],
                travelList:[{
                    date:"",
                    scenicName:"文博宫",
                    scenicId:"",
                    hotelName:"",
                    hotelId:"",
                    description:""
                }],
                visitorsdList:[],
                multipleSelection: [],
                searchForm:{},
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
            // 获取 列表数据
            getData() {
                let params={
                    ...this.searchForm,
                    page:this.cur_page,
                }
                fetch({
                    url:'Api/Travel/GetTravelList',
                    type:"post",
                    query:{...params}
                }).then((res) => {                    
                    this.tableData = res.result;
                    this.pageTotal=parseInt(res.pageTotal);
                })
            },
            search() {
                //this.is_search = true;
                this.getData();
            },
            formatter(row, column) {
                return row.sex==0?'女':'男';
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.dialogTitle='修改导游人员',
                this.idx = index;
                this.id = row.id;
                let params={
                    id:this.id
                }
                fetch({
                    url:'Api/Travel/GetGuideDetail',
                    type:"post",
                    query:{...params}
                }).then((res) => {
                    let rlt =res.result;
                    this.form = {...rlt,sex:parseInt(rlt.sex)};
                    this.editVisible = true;
                })
                
                
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            create(){  
                //this.getRoleData();
                this.dialogTitle='新增导游人员';              
                this.form = {
                    guideName:"",
                    idCard:"",
                    guideNum:"",
                    leadership:"",
                    phone:"",
                    grade:"",
                    sex:1,
                    approvalDate:""
                };
                
                this.editVisible = true;
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
                let params={...this.form}
                console.log("params",params)
                let url="Api/Travel/GuideAdd"
                if(params.id){
                    url="Api/Travel/GuideEdit"
                }
                fetch({
                    url:url,
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    console.log("AddFunction:",res)
                    this.editVisible = false;
                    this.$message.success(`保存成功`)
                    this.getData();
                    //this.tableData = res.abilitiesList;
                })
                /*this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }*/
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
