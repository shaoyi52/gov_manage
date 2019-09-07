import BaseUrl from "../config";
import request from '../utils/request';
import router from '../router'
import {Loading,Message} from "element-ui";
export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}

export const fetch= (obj) => {    
    let url=obj.url,
        type=obj.type||'post',
        query=obj.query,
        disToken=obj.disToken;
        console.log("params",obj)
        if(!disToken){
            if(sessionStorage.getItem("token")&&sessionStorage.getItem("uid")&&sessionStorage.getItem("taId")){
                query['token']=sessionStorage.getItem("token");
                query['uid']=sessionStorage.getItem("uid");
                query['taId']=sessionStorage.getItem("taId");
            }else{
                Message({
                    type: 'error',
                    message: '登录信息过期！'
                });
                router.replace({ 
                    path: '/login' // 到登录页重新获取token     
                })
                return false
            }
        };
    return request({
        url: BaseUrl.ROOT + url,
        method: type,
        data: query
    })
}