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
                 <el-table-column prop="visitorNum" label="游客人数" >
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
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="80%">
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
                            <el-date-picker
                            v-model="form.startTime"                            
                            type="date"
                            class="edit-cell"                           
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">                            
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="送团日期">
                            <el-date-picker
                            v-model="form.endTime"
                            type="date"
                            class="edit-cell"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
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
            <el-card class="box-card travelList">
                <div slot="header" class="clearfix">
                    <span>行程单</span> 
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addTravel">新增</el-button>
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
                            <el-date-picker
                            v-model="row.date"
                            type="date"
                            value-format="yyyy-MM-dd"
                            class="edit-cell"
                            placeholder="选择日期">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column label="景区"  prop="scenicName"   align="center">
                        <template slot-scope="{row}">
                            <el-select  v-model="row.scenicId" placeholder="请选择">
                                <el-option
                                v-for="item in scenicList"                                
                                :key="item.id"
                                :label="item.scenicName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="酒店"  prop="hotelName"   align="center">
                        <template slot-scope="{row}">
                            <el-select  v-model="row.hotelId" :name="row.hotelName" placeholder="请选择">
                                <el-option
                                v-for="item in hotelList"                                
                                :key="item.id"
                                :label="item.hotelName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="行程描述"  prop="description"   align="center">
                        <template slot-scope="{row}">
                            <el-input v-model="row.description"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                        <template slot-scope="{row,$index}">
                            <el-button type="text" size="small"     @click.native="deleteTravelRow($index, row)" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

            <el-card class="box-card visitorList">
                <div slot="header" class="clearfix">
                    <span>游客信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="addVisitors">新增</el-button>
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
                            <el-select  v-model="row.IdType" name="row.name" placeholder="请选择">
                                <el-option
                                v-for="item in idList"                                
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="证件号码"  prop="IdNumber"   align="center">
                        <template slot-scope="{row}">
                            <el-input v-model="row.IdNumber"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名"  prop="name"   align="center">
                        <template slot-scope="{row}">
                            <el-input v-model="row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别"  prop="sex"   align="center">
                        <template slot-scope="{row}">
                            <el-select  v-model="row.sex" placeholder="请选择">
                                <el-option   key="1" label="男" value="1"></el-option>
                                <el-option   key="0" label="女" value="0"></el-option>
                            </el-select>                        
                            </template>
                    </el-table-column>
                    <el-table-column label="出生日期"  prop="birthday"   align="center">
                        <template slot-scope="{row}">
                            <el-date-picker
                            v-model="row.birthday"
                            type="date"
                            class="edit-cell"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </template>
                    </el-table-column>


                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                        <template slot-scope="{row,$index}">                    
                            <el-button type="text" size="small"  @click.native="deleteVisitorsRow($index, row)" >删除</el-button>
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
                hotelList:[],
                scenicList:[],
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
                cur_page: 1,
                pageTotal:0,
                showEdit: [],
                showBtn: [],
                
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
                this.getInitData();
                this.dialogTitle='修改行程',
                this.idx = index;
                this.id = row.id;
                let params={
                    id:this.id
                }
                fetch({
                    url:'Api/Travel/GetTravelDetail',
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
                this.dialogTitle='新增行程';              
                this.form2 = { 
                    "teamNum": "sd45221",
                        
                    "route": "行程测试11",
                        
                    "startTime": "2019-10-01",
                        
                    "endTime": "2019-10-03",
                    
                    "carNum": "粤A1111",
                        
                    "driverName": "张三",
                        
                    "driverPhone": "13570339011",
                        
                    "driverIdCard": "350582199502112022",
                    
                    "guideName": "李四",
                        
                    "guidePhone": "13570339011",
                        
                    "guideNum": "OV43015F",
                    
                    "guideIdCard": "350582199502112022",
                        
                    "remark": "行程测试",
                        
                    "dateCount": "0",
                    
                    "visitorCount": "0",
                        
                    "detail": [
                            
                        {
                                "date": "2019-10-01",
                            
                            "scenicName": "景区固定测试专用",
                                
                    "scenicId": "02AB0D02-3065-4D5A-B31F-46D00113AA93",
                            
                    "hotelName": "酒店固定测试专用",
                            
                    "hotelId": "F71BE181-74B1-4469-9F69-46D000FE5893",
                            
                    "description": "旅游行程描述"
                            },
                        
                    {
                                "date": "2019-10-02",
                                
                    "scenicName": "景区固定测试专用",
                            
                    "scenicId": "DE90100C-FF94-4E4E-AF62-46D00113AB61",
                            
                    "hotelName": "酒店固定测试专用",
                            
                    "hotelId": "02A7725A-D2D7-4AF3-AE56-46D000FE68C1",
                            
                    "description": "旅游行程描述"
                        
                    },
                            {
                                "date": "2019-10-03",
                            
                                "scenicName": "景区固定测试专用",
                                            
                                "scenicId": "93EC4F61-9C61-4286-99DA-46D00113ABBA",
                                        
                                "hotelName": "酒店固定测试专用",
                                            
                                "hotelId": "4418D2C5-5B47-4BA9-9C59-46D000FF8E51",
                                "description": "旅游行程描述"
                            }
                        ],
                        "visitor": [
                            {
                                "IdNumber": "440882199206064424",
                                "IdType": "1",
                                "name": "小红",
                                "sex": "0",
                                "birthday": "2019-09-02"
                            },
                            {
                                "IdNumber": "440882199206064427",
                                "IdType": "1",
                                "name": "小李",
                                "sex": "0",
                                "birthday": "2019-09-02"
                            },
                            {
                                "IdNumber": "440882199206064425",
                                "IdType": "1",
                                "name": "小王",
                                "sex": "1",
                                "birthday": "2019-09-02"
                            }
                        ]
                    };
                this.form={
                    carNum: "",
                    dateCount: "",
                    DriverIdCard: "",
                    driverName: "",
                    driverPhone: "",
                    endTime: "",
                    guideIdCard: "",
                    guideName: "",
                    guideNum: "",
                    GuidePhone: "",
                    route: "",
                    sex: 1,
                    startTime: "",
                    teamNum: "",
                    visitorCount: "",
                    detail:[{
                        date: '',
                        description: "",
                        hotelId: "",
                        hotelName: "",
                        scenicId: "",
                        scenicName: "",
                    }],
                    visitor:[{ 
                            IdCard: "", IdNumber: "", IdType:"" ,birthday: "", name: "",sex: ""
                        }  
                    
                    ],
                };
                this.getInitData();
                
                this.editVisible = true;
            },
            getInitData(){
                let params={pageCount:1,pageSize:100}
                fetch({
                    url:'Api/Tourism/GetScenicList',
                    type:"post",
                    query:{...params}
                }).then((res) => {
                    this.scenicList=res.result;
                   console.log('GetScenicList',res)
                    
                })
                fetch({
                    url:'Api/Tourism/GetHotelList',
                    type:"post",
                    query:{...params}
                }).then((res) => {
                    this.hotelList=res.result;
                   console.log('GetHotelList',res)
                    
                })
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

            //编辑旅途行
            handleEditTravelRow(index,row){
                console.log(index);
                this.$set(this.showEdit,index,true)
                //this.showEdit[index]=true;
            },
            // 保存编辑
            saveEdit() {
                let params={...this.form}
                console.log("params",params)
                let url="Api/Travel/TravelAdd"
                if(params.id){
                    url="Api/Travel/TravelEdit"
                }
                fetch({
                    url:url,
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    console.log("AddFunction:",res)
                    if(res.code=="00000"){
                        this.editVisible = false;
                        this.$message.success(`保存成功`)
                        this.getData();
                    }
                   
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
                 let params={
                    id:this.id
                }
                fetch({
                    url:'Api/Travel/TravelDel',
                    type:"post",
                    query:{...params}
                }).then((res) => {
                    if(res.code=="00000"){
                        this.$message.success('删除成功');
                        this.delVisible = false;
                        this.getData();
                    }                   
                })
                
            },
            /*******travelList action****** */
            addTravel(){
                const  travel={date:"",scenicName:"", scenicId:"", hotelName:"",hotelId:"",description:""}
                this.form["detail"]=[...this.form["detail"],travel];
            },
            deleteTravelRow(index,row){
                this.form["detail"].splice(index,1)
            },
            /*******visitorlList action****** */
            addVisitors(){
                const  travel={IdType:"", IdNumber:"",name:"",sex:"1",birthday:"",}
                this.form["visitor"].push(travel);
            },
            deleteVisitorsRow(index,row){
                this.form["visitor"].splice(index,1)
            },
        }
    }

</script>
<style >
    .visitorList, .travelList{
        width:100%;
        margin-bottom: 15px;
    }
    
</style>
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
    
    .edit-cell{
        width:100%
    }
    
</style>
