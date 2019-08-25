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
    return request({
        url: url,
        method: type,
        params: query
    })
}