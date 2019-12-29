<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [{
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-group',
                        index: '1',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'user',
                                title: '用户信息',
                            },
                            {
                                index: 'role',
                                title: '角色信息',
                            },
                            {
                                index: 'function',
                                title: '功能菜单',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-locationfill',
                        index: 'scenic',
                        title: '景区信息'
                    },
                    {
                        icon: 'el-icon-lx-shop',
                        index: 'hotel',
                        title: '酒店信息'
                    },
                    {
                        icon: 'el-icon-lx-mobile',
                        index: 'device',
                        title: '设备信息'
                    },
                    {
                        icon: 'el-icon-lx-hot',
                        index: '2',
                        title: '旅行社管理',
                        subs: [                            
                            {
                                index: 'travelAgency',
                                title: '旅行社',
                            },
                            {
                                index: 'travel_itinerary',
                                title: '委派及行程单',
                            },
                            {
                                index: 'travel_performance',
                                title: '旅行社业绩',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-group',
                        index: '3',
                        title: '导游管理',
                        subs: [{ 
                                index: 'guideList',
                                title: '导游列表',
                                }, {
                                index: 'touristGuide',
                                title: '导游业绩',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-rank',
                        index: '4',
                        title: '业绩报告',
                        subs: [
                            {
                                index: 'visitorsRecord',
                                title: '游客记录',
                            }, {
                                index: 'travelStatistics',
                                title: '旅行社排行',
                            }, {
                                index: 'guideStatistics',
                                title: '导游排行',
                            }
                        ]
                    }]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){    
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
