<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>游客记录列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.travelName" placeholder="旅行社名称" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.guideName" placeholder="导游姓名" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.visitorName" placeholder="游客姓名" class="handle-input mr10"></el-input>
                <el-select v-model="searchForm.isSameNum" placeholder="证件号比对" class="handle-input mr10">
                    <el-option   key="" label="全部" value=""> </el-option>
                    <el-option   key="1" label="证件号一致" value="1"> </el-option>
                    <el-option   key="0" label="证件号不一致" value="0"> </el-option>
                </el-select>
                <el-date-picker
                v-model="searchForm.brushTime"
                type="date"
                placeholder="刷证日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="calAward">计入奖励</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="travelName" label="旅行社名称" sortable width="150">
                </el-table-column>               
                <el-table-column prop="guideName" label="导游姓名">
                </el-table-column>
                 <el-table-column prop="visitorName" label="游客姓名" width="120">
                </el-table-column>
                
                 <el-table-column prop="scenicHotel" label="景区/酒店" width="120">
                </el-table-column>
                 <el-table-column prop="brushTime" label="刷证时间"  width="150">
                </el-table-column>
                 <el-table-column prop="registerNum" label="登记时证件号"  width="170">
                </el-table-column>
                 <el-table-column prop="brushNum" label="刷证时证件号"  width="170">
                </el-table-column>
                 <el-table-column prop="isReward" label="是否计入奖励" width="120">
                     <template slot-scope="scope">
                         <el-tag type="success" v-if="scope.row.isReward==1">是</el-tag>
                        <el-tag type="info" v-if="scope.row.isReward==0" >否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否计入奖励" width="200" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isReward" active-value='1' inactive-value='0'  active-text="是" inactive-text="否" @change="awardSwich(scope.$index, scope.row)"></el-switch>
                        <el-button v-if="false" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button v-if="false"  type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>            
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next" @size-change="handleSizeChange" :page-size="pageSize" :page-sizes="[20,50,100, 200, 300, 400]" :total="pageTotal">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
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
                tourId:"",
                tableData: [],                
                cur_pageCount: 1,
                pageTotal:0,
                pageSize:20,
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
        activated(){
            //let tourId=this.$route.query.tourId||'';
            console.log('activated')            
            this.getData();
            
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleSizeChange(val){
                this.pageSize=val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let tourId=this.$route.query.tourId;
                let params={
                    ...this.searchForm,
                    tourId,
                    pageCount:this.cur_page,
                }
                fetch({
                    url:'/Tourism/GetVisitorRecordList',
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
            //计入奖励
            calAward(){
                if(this.multipleSelection.length==0){
                    this.$message.error("请选择一条记录！")
                }else if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条记录！")
                }else{
                    let recode=this.multipleSelection[0];
                    let params={
                        id:recode.id,
                        isReward:1,
                    };
                    fetch({
                        url:'/Tourism/RecordIsReward',
                        query:{...params}
                    }).then((res) => {
                        this.$message.success("记入奖励成功！")
                        this.getData();
                    })
                }
                
               
            },
            awardSwich(index,row){
                let params={
                    id:row.id,
                    isReward:row.isReward
                };
                fetch({
                    url:'/Tourism/RecordIsReward',
                    query:{...params}
                }).then((res) => {
                    let msg=row.isReward=="0"?"取消奖励成功！":"记入奖励成功！"
                    this.$message.success(msg)
                })
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
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
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
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
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




