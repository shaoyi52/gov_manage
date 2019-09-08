import axios from 'axios';
import router from '../router'
import {Loading,Message} from "element-ui";
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    //baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: '/',    
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //'Content-Type': 'application/json; charset=utf-8'
    },  
    timeout: 5000
})

service.interceptors.request.use( config => {
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200&&response.data&&response.data.code=='00000'){
        return response.data;
    }else if(response.status === 200&&response.data&&response.data.code=='407'){
        //console.log("vm",router)
        Message({
            type: 'error',
            message: response.data.msg
        });
        router.replace({ 
            path: '/login' // 到登录页重新获取token     
        })
        return response.data;
    }else{
        Message({
            type: 'error',
            message: response.data.msg
        });
        console.log("response")
        return Promise.reject(new Error( response.data.msg || 'Error'));
    }
}, error => {
    console.log(error);
    Message({
        type: 'error',
        message: error
    });
    return Promise.reject();
})

export default service;