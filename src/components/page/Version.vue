<template>
    <div class="version">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>设备列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.versionNum" placeholder="版本号" class="handle-input mr10"></el-input>
                <el-select v-model="searchForm.status"  placeholder="选择上下架">
                    <el-option  key="0" label="下架" value="0"></el-option>
                    <el-option  key="1" label="上架" value="1"></el-option>
                    <el-option  key="" label="全部" value=""></el-option>
                </el-select>                
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="create">新建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="versionNum" label="版本号" sortable width="150">
                </el-table-column>               
                <el-table-column prop="deviceTypeName" label="设备类型名">
                </el-table-column>
                 <el-table-column prop="versionName" label="版本名" width="120">
                </el-table-column>
                 <el-table-column prop="desc" label="版本描述" width="120">
                </el-table-column>
                 <el-table-column prop="path" label="APK路径" width="120">
                </el-table-column>
                 <el-table-column prop="status" label="是否上架" width="120">
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="设备类型名">
                    <el-select v-model="form.deviceTypeName" class="deviceTypeSelect" placeholder="请选择">
                        <el-option
                        v-for="item in DeviceTypes"
                        :key="item.id"
                        :label="item.typename"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-input v-model="form.versionNum"></el-input>
                </el-form-item>                
                <el-form-item label="版本名">
                    <el-input v-model="form.versionName"></el-input>
                </el-form-item>
                <el-form-item label="版本描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="APK路径">
                    <el-input placeholder="请输入内容"  v-model="form.path" class="input-with-select">
                        <el-upload
                        slot="append"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handleChange"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-input>
                </el-form-item>
                <el-form-item label="是否上架">
                     <el-radio-group v-model="form.status">
                        <el-radio :label="0">下架</el-radio>
                        <el-radio :label="1">上架</el-radio>
                    </el-radio-group>
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
                cur_page: 1,
                pageTotal:0,
                DeviceTypes:[],
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
            handleChange(){},
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
                    url:'/GetVersionList',
                    query:{...params}
                }).then((res) => {
                    this.tableData = res.result;
                    this.pageTotal=parseInt(res.pageTotal);
                })
            },
            getDeviceTypes(){
                let params={                    
                    pageSize:100,
                    pageCount:1,
                }
                 fetch({
                    url:'/GetDeviceTypeList',
                    query:{...params}
                }).then((res) => {
                    this.DeviceTypes = res.result;
                })
            },
            search() {
                //this.is_search = true;
                this.getData();
            },
            create(){
                this.getDeviceTypes();
                this.form = {
                    versionName: "测试用",
                    versionNum: "0",
                    desc: "测试用",
                    deviceTypeName: "固定测试专用类型",
                    path: '\test',
                    status: 1                   
                },
                this.dialogTitle='新增版本',
                this.editVisible = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.getDeviceTypes();
                let params={
                    id:row.id,
                }
                let _this=this;
                fetch({
                    url:'/GetVersionInfo',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result;
                    if(rlt.length>0){
                        this.form = {...rlt[0]}
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
                this.editVisible = false;
                let params={...this.form}
                let url="/AddVersion"
                if(params.id){
                    url="/EditVersion"
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
<style>
.version .el-upload--text{
    background-color: unset; 
    border: none;
    border-radius: 0;
    -webkit-box-sizing: border-box;
    width: unset;
    height: unset;
    cursor: pointer;   
}
.version .el-upload span{
     padding: 0 12px;
}
.version .el-upload-list{
    display: none;
}
</style>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }
    .deviceTypeSelect{
        width:100%;
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




