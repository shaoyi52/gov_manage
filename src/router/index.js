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
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/Role.vue'], resolve),
                    meta: { title: '角色信息' }
                },
                {
                    path: '/function',
                    component: resolve => require(['../components/page/Function.vue'], resolve),
                    meta: { title: '功能菜单' }
                },
                {
                    path: '/hotel',
                    component: resolve => require(['../components/page/Hotel.vue'], resolve),
                    meta: { title: '酒店信息' }
                },
                {
                    path: '/device',
                    component: resolve => require(['../components/page/Device.vue'], resolve),
                    meta: { title: '设备信息' }
                },
                {
                    path: '/deviceType',
                    component: resolve => require(['../components/page/DeviceType.vue'], resolve),
                    meta: { title: '设备类型列表' }
                },
                {
                    path: '/version',
                    component: resolve => require(['../components/page/Version.vue'], resolve),
                    meta: { title: '版本列表' }
                },
                {
                    path: '/scenic',
                    component: resolve => require(['../components/page/Scenic.vue'], resolve),
                    meta: { title: '景区信息' }
                },                
                {
                    path: '/travelAgency',
                    component: resolve => require(['../components/page/TravelAgency.vue'], resolve),
                    meta: { title: '旅行社' }
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
                    // 富文本编辑器组件
                    path: '/visitorsRecord',
                    component: resolve => require(['../components/page/VisitorsRecord.vue'], resolve),
                    meta: { title: '游客记录' }
                },                                
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
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
            path: '*',
            redirect: '/404'
        }
    ]
})
