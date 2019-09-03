import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/companyInfo',
                    component: resolve => require(['../components/page/CompanyInfo.vue'], resolve),
                    meta: { title: '公司信息' }
                },
                {
                    path: '/guideManage',
                    component: resolve => require(['../components/page/GuideManage.vue'], resolve),
                    meta: { title: '导游管理' }
                },
                {
                    path: '/travelManage',
                    component: resolve => require(['../components/page/TravelManage.vue'], resolve),
                    meta: { title: '行程管理' }
                },   
                {
                    path: '/visitorsRecord',
                    component: resolve => require(['../components/page/VisitorsRecord.vue'], resolve),
                    meta: { title: '游客记录' }
                },               
                {
                    path: '/statistics',
                    component: resolve => require(['../components/page/Statistics.vue'], resolve),
                    meta: { title: '统计分析' }
                },
                
                {
                    path: '/travel_itinerary',
                    component: resolve => require(['../components/page/Travel_itinerary.vue'], resolve),
                    meta: { title: '委派及行程单' }
                },
                {
                    path: '/touristGuide',
                    component: resolve => require(['../components/page/TouristGuide.vue'], resolve),
                    meta: { title: '导游业绩' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: resolve => require(['../components/page/Donate.vue'], resolve),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/regist',
            name:'regist',
            meta: { title: 'regist' },
            component: resolve => require(['../components/page/Regist.vue'], resolve)

        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
