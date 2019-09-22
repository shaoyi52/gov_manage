<template>
    <div class="table device">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>设备列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.sn" placeholder="设备SN" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.type" placeholder="设备类型名" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.belongName" placeholder="设备归属" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="create">新建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="sn" label="设备SN" sortable width="150">
                </el-table-column>               
                <el-table-column prop="type" label="设备类型名">
                </el-table-column>
                 <el-table-column prop="remark" label="备注" width="120">
                </el-table-column>
                 <el-table-column prop="version" label="设备版本名" width="120">
                </el-table-column>
                 <el-table-column prop="belongName" label="设备归属" width="120">
                </el-table-column>
                 <el-table-column prop="location" label="设备部署位置" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
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
        <el-dialog title="编辑" :visible.sync="editVisible" class="modal" width="60%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="设备名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="设备类型名">
                    <el-select v-model="form.deviceTypeId" placeholder="请选择">
                        <el-option
                        v-for="item in deviceTypes"
                        :key="item.id"
                        :label="item.typename"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备SN">
                    <el-input v-model="form.sn"></el-input>
                </el-form-item>
                <el-form-item label="当前版本">
                    <el-select v-model="form.versionId" placeholder="请选择">
                        <el-option
                        v-for="item in versionList"
                        :key="item.Id"
                        :label="item.versionName"
                        :value="item.Id">
                        </el-option>
                    </el-select>                    
                </el-form-item>
                <el-form-item label="设备状态">
                     <el-radio-group v-model="form.status">
                        <el-radio :label="0">停用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea"  maxlength="30"  show-word-limit v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="设备归属">
                    <el-row :gutter="15" class="belongRow"> 
                        <el-col :span="8">
                            <el-select v-model="form.belongType" placeholder="请选择" @change="belongTypeChange">
                                <el-option key="0" label="景区" value="0"></el-option>
                                <el-option key="1" label="酒店" value="1"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-select v-model="form.belongId" placeholder="请选择景区或酒店" @change="belongChange">
                                <el-option
                                v-for="item in belongList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row> 
                </el-form-item>
                
                <el-form-item label="放置位置">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>

            </el-form>
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
                deviceTypes:[],
                versionList:[],
                belongList:[],
                hotelList:[],
                scenicList:[],
                cur_page: 1,
                pageTotal:0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                searchForm:{},
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    belongId:'',
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
                    ...this.searchForm,
                    page:this.cur_page,
                }
                fetch({
                    url:'/GetDeviceList',
                    query:{...params}
                }).then((res) => {
                    this.tableData = res.result;
                    this.pageTotal=parseInt(res.pageTotal);
                })
            },
            getDeviceTypeData(){
                let params={
                    pageSize:20,
                    pageCount:1,  // this.cur_page 
                }
                fetch({
                    url:'/GetDeviceTypeList',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.deviceTypes = res.result;
                })
                
            },
            getVersionData(){
                let params={
                    pageSize:20,
                    pageCount:1,  // this.cur_page 
                }
                fetch({
                    url:'/GetVersionList',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.versionList = res.result;
                })
                
            },
            getHotelData() {
                if(this.hotelList.length>0) return
                let params={                   
                    page:1,
                    pageSize:20,
                }
                fetch({
                    url:'/GetHotelList',
                    query:{...params}
                }).then((res) => {
                    let hotelList=[];
                    res.result.map(item=>{
                        hotelList.push({
                            id:item.id,
                            name:item.hotelName
                        })
                    })
                    this.hotelList = [...hotelList];
                    if(this.form&&this.form.belongType=='1'){
                        this.belongList=[...this.hotelList]
                    }

                })
            },         
            getScenicData() {
                if(this.scenicList.length>0) return
                let params={
                    page:1,
                    pageSize:20,
                }
                fetch({
                    url:'/GetScenicList',
                    query:{...params}
                }).then((res) => {
                    let scenicList=[];
                    res.result.map(item=>{
                        scenicList.push({
                            id:item.id,
                            name:item.scenicName
                        })
                    })
                    this.scenicList = [...scenicList];
                    this.belongList=[...this.scenicList] 
                })
            },
            belongTypeChange(v){
                this.form['belongId']="";
                if(v==1){
                    this.belongList=[].concat(this.hotelList) 
                }else{
                    this.belongList=[].concat(this.scenicList) 
                }
            },
            belongChange(v){
                this.$forceUpdate();               
                console.log(v);
            },
            search() {
                //this.is_search = true;
                this.getData();
            },
           async create(){  
               this.dialogTitle='新增设备';
               this.editVisible = true;
               await this.getDeviceTypeData()
               await this.getVersionData()
               await this.getHotelData() 
               await this.getScenicData() 
               this.belongList=[...this.scenicList] 
               this.form = {
                    sn:"",
                    type:"",
                    remark:"",
                    version:"",
                    belongType:"0",
                    belongName:'',
                    status:1,
                    location:''
                };
                
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            async handleEdit(index, row) {
                await this.getDeviceTypeData()
                await this.getVersionData()
                await this.getHotelData() 
                await this.getScenicData()                 
                this.idx = index;
                this.id = row.id;
                let params={
                    id:row.id,
                }
                let _this=this;
                fetch({
                    url:'/GetDeviceInfo',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result;
                    if(rlt.length>0){
                        let deviceDetail={...rlt[0]}
                        deviceDetail.belongType=="1"?this.belongList=[...this.hotelList]:this.belongList=[...this.scenicList]; 
                        this.form = {...deviceDetail,belongId:deviceDetail.belong.id,deviceTypeId:deviceDetail.deviceType.id,versionId:deviceDetail.version.id}
                        this.editVisible = true;
                    }                    
                   
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
                let params={...this.form}
                let url="/AddDevice"
                if(params.id){
                    url="/DeviceInfoEdit"
                }
                fetch({
                    url:url,
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {                    
                    this.editVisible = false;
                    this.$message.success(`保存成功`);
                    this.getData();
                    //this.tableData = res.abilitiesList;
                })
            },
            // 确定删除
            deleteRow(){
                let params={
                    id:this.id,
                }
                fetch({
                    url:'/DelDevice',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.$message.success('删除成功');
                    this.delVisible = false;                  
                    this.getData();
                })
            }
        }
    }

</script>
<style lang="scss">
    .device{
        .belongRow {
            margin: unset!important;
            .el-col{
                padding: unset!important;
            }
        }
        
    }
</style>
<style scoped >
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




