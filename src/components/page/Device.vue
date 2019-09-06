<template>
    <div class="table">
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="设备SN">
                    <el-input v-model="form.sn"></el-input>
                </el-form-item>
                <el-form-item label="设备类型名">
                    <el-input v-model="form.version"></el-input>
                </el-form-item>
                <el-form-item label="设备版本名">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="设备归属">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="设备类型名">
                    <el-input v-model="form.belongName"></el-input>
                </el-form-item>
                <el-form-item label="设备部署位置">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
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
                    url:'web/GetDeviceList',
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
            create(){  
                this.form = {
                    sn:"",
                    type:"",
                    remark:"",
                    version:"",
                    belongName:'',
                    location:''
                },
                this.dialogTitle='新增设备',
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
                let params={
                    id:row.id,
                }
                let _this=this;
                fetch({
                    url:'web/GetDeviceInfo',
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
                let url="web/AddDevice"
                if(params.id){
                    url="web/DeviceInfoEdit"
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




