import BaseUrl from "../config";
import request from '../utils/request';
import router from '../router'
import qs  from 'qs'

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
            if(sessionStorage.getItem("token")&&sessionStorage.getItem("uid")){
                query['token']=sessionStorage.getItem("token");
                query['uid']=sessionStorage.getItem("uid");
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
        data: qs.stringify(query)
        //data: JSON.stringify(query)
    })
}