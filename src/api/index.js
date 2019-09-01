import request from '../utils/request';

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
        query=obj.query;
        console.log("params",obj)
        if(sessionStorage.getItem("token")&&sessionStorage.getItem("uid")){
            query['token']=sessionStorage.getItem("token");
            query['uid']=sessionStorage.getItem("uid");
        }
        //localStorage.setItem('ms_username',this.ruleForm.username);
    return request({
        url: url,
        method: type,
        data: query
    })
}