<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 功能资源列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="createForm">新建</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="definition" label="资源名称" sortable width="150">
                </el-table-column>
                <el-table-column prop="superior" label="上级" width="120">
                </el-table-column>
                <el-table-column prop="pathUrl" label="路径">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="addPerson" label="添加人" >
                </el-table-column>
                <el-table-column prop="describe" label="功能描述">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="false" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="功能名称">
                            <el-input v-model="form.definition"></el-input>
                        </el-form-item>                       
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="路径">
                            <el-input v-model="form.adminPath"></el-input>
                        </el-form-item>                       
                    </el-col>                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="上级">
                             <el-cascader
                             width="100%"
                             v-model="form.superiorId"
                            :options="options"
                            :props="{ checkStrictly: true ,value:'id',label:'name',emitPath:false}"
                            clearable></el-cascader>
                        </el-form-item>                       
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>                       
                    </el-col>                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="是否菜单">
                            <el-radio-group v-model="form.isMenu">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>                       
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="功能请求路径">
                            <el-input v-model="form.action"></el-input>
                        </el-form-item>                       
                    </el-col>                   
                </el-row>
                <el-row :gutter="20">
                     <el-col :span="12">
                        <el-form-item label="描述">
                            <el-input
                                type="textarea"
                                placeholder="请输入描述内容"
                                v-model="form.description"
                                maxlength="30"
                                show-word-limit
                                >
                            </el-input>
                        </el-form-item>                
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>              

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
    import { listToTree } from '../../utils/common';
    export default {
        name: 'function',
        data() {
            return {
                dialogTitle:'新增功能资源',
                tableData: [],
                pageTotal:0,
                options: [],
                cur_pageCount: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: '',
                    superiorId:''
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            //https://www.jianshu.com/p/b021f3d94ccb
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
                    pageSize:10,
                    pageCount:this.cur_page,  // this.cur_page                  
                }
                fetch({
                    url:'/Tourism/GetFunctionPage',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.tableData = res.abilitiesList;
                    this.pageTotal=parseInt(res.pageTotal);
                })
                fetch({
                    url:'/Tourism/GetMenuList',//'/Tourism/GetSourceChild',
                    type:"post",                   
                    query:{"isMenu":1} 
                }).then((res) => {
                    console.log('GetSourceChild',res)
                    let treeList=res.treeList;
                    let treeData=treeList.concat([{id:"0",name:"顶级"}]);
                    let tree=listToTree(treeData,"pId","id","0");
                    this.options=tree;
                    console.log(tree);
                   // this.tableData = res.abilitiesList;
                })
                
            },
            createForm(){                
                this.form = {
                    definition: "",
                    superiorId: ["0"],
                    adminPath:"",
                    status: 1,
                    isMenu:0,
                    action:"",
                    description:""
                }
                this.dialogTitle='新增用户',
                this.editVisible = true;
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.status==1?"是":"否";
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                let params={
                    abilitieId:row.abilitieId,
                }
                fetch({
                    url:'/Tourism/GetFunctionIfo',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.form={...res, status: parseInt(res.status), isMenu:parseInt(res.isMenu),};
                    this.editVisible = true;
                })
                
               /* this.form={
                    definition: row.definition,
                    superiorId: ["0"],
                    adminPath:row.superior,
                    status: parseInt(row.status),
                    isMenu:parseInt(row.isMenu),
                    action:"",
                    description:row.describe
                }
                
                
                console.log("form",this.form)
                this.editVisible = true;*/
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
                let url='/Tourism/AddFunction'
                if(params.abilitieId){
                    url='/Tourism/UpdateFunction'
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
                    url:'/Tourism/DelUser',
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
        width: 300px;
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
    .el-cascader{
        width:100%;
    }
</style>
