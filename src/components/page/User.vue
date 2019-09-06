<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.phone" placeholder="电话" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.mail" placeholder="邮箱" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.name" placeholder="用户姓名" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="create">新建</el-button>
            </div>
           
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户登录名" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="120">
                </el-table-column>
                <el-table-column prop="mail" label="邮箱" >
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" >
                </el-table-column>
                <el-table-column prop="registerTime" label="注册时间" >
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
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="120px">
                 <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>  
                 <el-form-item label="用户登录名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>  
                 <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>  
                 <el-form-item label="邮件">
                    <el-input v-model="form.mail"></el-input>
                </el-form-item>  
                 <el-form-item label="用户姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>                 
                 <el-form-item label="角色">
                    <el-select v-model="form.roleId" multiple placeholder="请选择">
                    <el-option
                    v-for="item in roles"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select> 
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
                 props: {
                    label: 'name',
                    children: 'zones'
                },
                dialogTitle:'新增用户',
                tableData: [],
                searchForm:{},
                pageTotal:0,
                roles:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    phone:"",
                    userName:"",
                    password:"",
                    mail:"",
                    roleId:[],
                    name:''
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            console.log("this",this)            
            this.getData();
        },
        computed: {
            data() {
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
                    pageSize:10,
                    pageCount:this.cur_page,  // this.cur_page                  
                }
                fetch({
                    url:'Api/Tourism/GetUserList',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.tableData = res.result;
                    this.pageTotal=parseInt(res.pageTotal);
                })
                
            },
            getRoleData(){
                let params={
                    pageSize:20,
                    pageCount:1,  // this.cur_page 
                    status:1                 
                }
                fetch({
                    url:'Api/Tourism/GetRolePage',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.roles = res.result;
                })
                
            },
            search() {
                this.getData() 
            },
            create(){  
                this.getRoleData();              
                this.form = {
                    phone:"",
                    userName:"",
                    password:"",
                    mail:"",
                    roleId:[],
                    name:''
                },
                this.dialogTitle='新增用户',
                this.editVisible = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                return resolve([{ name: 'region1' }, { name: 'region2' }]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                hasChild = true;
                } else if (node.data.name === 'region2') {
                hasChild = false;
                } else {
                hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                var data;
                if (hasChild) {
                    data = [{
                    name: 'zone' + this.count++
                    }, {
                    name: 'zone' + this.count++
                    }];
                } else {
                    data = [];
                }

                resolve(data);
                }, 500);
                },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.dialogTitle='编辑用户',
                this.idx = index;
                this.id = row.id;
                let params={
                    id:row.id,
                }
                let _this=this;
                this.getRoleData();
                fetch({
                    url:'Api/Tourism/GetUserDetail',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result;
                    let roleId=[]
                    if(rlt.roleList.length>0){
                        roleId=rlt.roleList.map(item=>{
                            return item.id;
                        })
                    }
                    this.form = {...res.result,roleId:[...roleId]}
                    this.editVisible = true;
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
                console.log("params",params)
                let url="Api/Tourism/AddUser"
                if(params.id){
                    url="Api/Tourism/ EditUser"
                }
                fetch({
                    url:url,
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    console.log("AddFunction:",res)
                    this.editVisible = false;
                    this.getData();
                    //this.tableData = res.abilitiesList;
                })
            },
            // 确定删除
            deleteRow(){
                let params={
                    id:this.id
                }
                fetch({
                    url:'Api/Tourism/DelUser',
                    type:"post",
                    query:{...params}
                }).then((res) => {
                    if(res.code=="00000"){
                        this.$message.success('删除成功');
                        this.delVisible = false;
                        this.getData();
                    }                   
                })
                
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
