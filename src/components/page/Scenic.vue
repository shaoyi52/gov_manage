<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 景区列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="scenicName" placeholder="景区名称" class="handle-input mr10"></el-input>
                <el-input v-model="ticket" placeholder="门票金额" class="handle-input mr10"></el-input>
                <el-input v-model="grade" placeholder="景区等级" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="create">新建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="scenicName" label="景区名称" sortable width="150">
                </el-table-column>               
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                 <el-table-column prop="ticket" label="门票" width="120">
                </el-table-column>
                 <el-table-column prop="responsible" label="景区负责人" width="120">
                </el-table-column>
                 <el-table-column prop="phone" label="联系电话" width="120">
                </el-table-column>
                 <el-table-column prop="feature" label="特色" width="120">
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="景区名称">
                    <el-input v-model="form.scenicName"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="门票">
                    <el-input v-model="form.ticket"></el-input>
                </el-form-item>
                <el-form-item label="景区负责人">
                    <el-input v-model="form.responsible"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="特色">
                    <el-input v-model="form.feature"></el-input>
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
                    page:this.cur_page,
                }
                fetch({
                    url:'/GetScenicList',
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
                    scenicName:"",
                    address:"",
                    ticket:"",
                    responsible:"",
                    phone:'',
                    feature:''
                },
                this.dialogTitle='新增景区',
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
                    url:'/GetScenicDetail',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result;                    
                    this.form = {...rlt}
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
                let url="//ScenicAdd"
                if(params.id){
                    url="/ScenicEdit"
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
