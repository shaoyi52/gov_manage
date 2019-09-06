<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 导游列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">         
                <el-input v-model="searchForm.visitorName" placeholder="游客姓名" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.guideName" placeholder="导游姓名" class="handle-input mr10"></el-input>
                <el-input v-model="searchForm.scenic" placeholder="刷证景点" class="handle-input mr10"></el-input>
                <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="visitorName" label="游客姓名" >
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="120" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="guideName" label="导游姓名" sortable width="150">
                </el-table-column>                
                 <el-table-column prop="scenic" label="刷证景点" >
                </el-table-column>
                 <el-table-column prop="brushTime" label="刷证时间" width="120">
                </el-table-column>
                 
                 <el-table-column prop="generateTime" label="提前录入时间" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" v-if="false" >
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
                searchForm:{},
                scenicName:'',
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
                    url:'Api/Travel/GetVisitorRecordList',
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
