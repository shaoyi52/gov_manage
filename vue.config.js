// 引进config.js
const BaseUrl = require("./src/config.js");
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,    
    devServer: {
        proxy: {           
            [BaseUrl.ROOT]: { 
                target: BaseUrl.URL, // 通过本地服务器将你的请求转发到这个地址
                ws: false,       
                changeOrigin: true, // 设置这个参数可以避免跨域       
                pathRewrite: {        
                    [`^${BaseUrl.ROOT}`]: '/' ,       
                } 
            },
            [BaseUrl.FileRoot]: { 
                target: BaseUrl.FileUrl, // 通过本地服务器将你的请求转发到这个地址
                ws: false,       
                changeOrigin: true, // 设置这个参数可以避免跨域       
                pathRewrite: {        
                    [`^${BaseUrl.FileRoot}`]: '/' ,       
                } 
            }         
        }        
    },
    // devServer: {
    //     proxy: {
    //         '/Api':{
    //             //target:'http://jsonplaceholder.typicode.com',
    //             target:"http://121.204.164.176:8001/Api",
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '^/Api':'/Api'
    //             }
    //         }
    //     }
    // }
}